import { useState, useEffect, useCallback } from 'react';
import {
  doc, setDoc, getDoc, getDocs, deleteDoc,
  collection, query, where, orderBy, serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from './useAuth.js';
import { formatDate, getToday, daysBetween } from '../utils/dateUtils.js';

export function useDiary() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const entriesRef = collection(db, 'users', currentUser.uid, 'diaryEntries');
      const q = query(entriesRef, orderBy('date', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEntries(data);

      const today = getToday();
      const todayDoc = data.find((e) => e.date === today);
      setTodayEntry(todayDoc || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = useCallback(async (rawText, activities, totalCO2Kg) => {
    if (!currentUser) return null;

    const today = getToday();
    const entryRef = doc(db, 'users', currentUser.uid, 'diaryEntries', today);
    const userRef = doc(db, 'users', currentUser.uid);

    const xpEarned = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const userData = userDoc.data() || {};

      const isFirstEntry = !userData.lastLogDate;
      let xp = 10;
      if (isFirstEntry) xp += 50;
      if (totalCO2Kg < 5.2) xp += 15;

      let newStreak = 1;
      if (userData.lastLogDate) {
        const gap = daysBetween(userData.lastLogDate, today);
        if (gap === 1) {
          newStreak = (userData.currentStreak || 0) + 1;
        } else if (gap === 0) {
          newStreak = userData.currentStreak || 1;
        }
      }

      if (newStreak === 3 && (userData.currentStreak || 0) < 3) xp += 20;

      const entryData = {
        id: today,
        date: today,
        rawText,
        totalCO2Kg,
        activities,
        xpEarned: xp,
        createdAt: serverTimestamp(),
      };

      transaction.set(entryRef, entryData);

      const updates = {
        xp: (userData.xp || 0) + xp,
        currentStreak: newStreak,
        longestStreak: Math.max(userData.longestStreak || 0, newStreak),
        lastLogDate: today,
      };

      transaction.update(userRef, updates);

      return xp;
    });

    await fetchEntries();
    return xpEarned;
  }, [currentUser, fetchEntries]);

  const deleteEntry = useCallback(async (entryId) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'diaryEntries', entryId));
    await fetchEntries();
  }, [currentUser, fetchEntries]);

  const getEntriesByRange = useCallback(async (startDate, endDate) => {
    if (!currentUser) return [];
    const entriesRef = collection(db, 'users', currentUser.uid, 'diaryEntries');
    const q = query(
      entriesRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }, [currentUser]);

  return {
    entries,
    todayEntry,
    loading,
    error,
    addEntry,
    deleteEntry,
    getEntriesByRange,
    refetch: fetchEntries,
  };
}
