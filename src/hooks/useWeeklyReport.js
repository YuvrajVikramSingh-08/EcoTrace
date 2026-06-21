import { useState, useCallback, useContext } from 'react';
import {
  doc, setDoc, getDocs, collection, query, orderBy,
  limit, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from './useAuth.js';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { generateWeeklyReport } from '../services/geminiService.js';
import { getWeekRange } from '../utils/dateUtils.js';

export function useWeeklyReport() {
  const { currentUser } = useAuth();
  const { userData, updateUserData } = useContext(UserDataContext);
  const [latestReport, setLatestReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLatestReport = useCallback(async () => {
    if (!currentUser) return;
    try {
      const ref = collection(db, 'users', currentUser.uid, 'weeklyReports');
      const q = query(ref, orderBy('generatedAt', 'desc'), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setLatestReport({ id: snap.docs[0].id, ...snap.docs[0].data() });
      }
    } catch (err) {
      setError(err.message);
    }
  }, [currentUser]);

  const generateReport = useCallback(async (diaryEntries) => {
    if (!currentUser || !userData) return null;

    setLoading(true);
    setError(null);

    try {
      const week = getWeekRange(new Date());
      const weekEntries = diaryEntries.filter(
        (e) => e.date >= week.start && e.date <= week.end
      );

      if (weekEntries.length < 1) {
        setError('Need at least 1 diary entry this week to generate a report.');
        setLoading(false);
        return null;
      }

      const weeklyData = {
        entries: weekEntries,
        totalCO2Kg: weekEntries.reduce((sum, e) => sum + (e.totalCO2Kg || 0), 0),
        avgDailyCO2Kg:
          weekEntries.reduce((sum, e) => sum + (e.totalCO2Kg || 0), 0) /
          weekEntries.length,
        daysLogged: weekEntries.length,
      };

      const { data: report, error: aiError } = await generateWeeklyReport(
        weeklyData,
        userData
      );

      if (aiError || !report) {
        setError(aiError || 'Failed to generate report.');
        setLoading(false);
        return null;
      }

      const reportData = {
        weekStartDate: week.start,
        weekEndDate: week.end,
        grade: report.grade || 'C',
        totalCO2Kg: weeklyData.totalCO2Kg,
        avgDailyCO2Kg: weeklyData.avgDailyCO2Kg,
        comparisonToNationalAvg:
          ((weeklyData.avgDailyCO2Kg - 5.2) / 5.2) * 100,
        topCategory: report.topCategory || 'energy',
        actions: report.actions || [],
        aiSummary: report.aiSummary || '',
        generatedAt: serverTimestamp(),
      };

      const reportRef = doc(
        db,
        'users',
        currentUser.uid,
        'weeklyReports',
        week.start
      );
      await setDoc(reportRef, reportData);

      await updateUserData({
        xp: (userData.xp || 0) + 25,
        weeklyReportLastGeneratedAt: serverTimestamp(),
      });

      setLatestReport(reportData);
      setLoading(false);
      return reportData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, [currentUser, userData, updateUserData]);

  return {
    latestReport,
    loading,
    error,
    generateReport,
    fetchLatestReport,
  };
}
