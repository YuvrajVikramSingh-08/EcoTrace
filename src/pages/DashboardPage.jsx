import { useContext, useEffect, useMemo } from 'react';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useDiary } from '../hooks/useDiary.js';
import { useHabits } from '../hooks/useHabits.js';
import { useWeeklyReport } from '../hooks/useWeeklyReport.js';
import { useToast } from '../hooks/useToast.js';
import Dashboard from '../components/dashboard/Dashboard.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import { getWeekRange, getLastNDays, getToday } from '../utils/dateUtils.js';

function DashboardPage() {
  const { userData, loading: userLoading } = useContext(UserDataContext);
  const { entries, loading: diaryLoading } = useDiary();
  const { todayCompletions, getActiveHabits, checkInHabit } = useHabits();
  const { latestReport, loading: reportLoading, generateReport, fetchLatestReport } = useWeeklyReport();
  const { showToast } = useToast();

  useEffect(() => {
    fetchLatestReport();
  }, [fetchLatestReport]);

  const todayEntry = entries.find((e) => e.date === getToday());
  const todayCO2 = todayEntry?.totalCO2Kg || 0;

  const weekRange = getWeekRange(new Date());
  const weekEntries = entries.filter(
    (e) => e.date >= weekRange.start && e.date <= weekRange.end
  );
  const weekCO2 = weekEntries.reduce((sum, e) => sum + (e.totalCO2Kg || 0), 0);
  const userAvg = weekEntries.length > 0 ? weekCO2 / weekEntries.length : 0;

  const trendData = useMemo(() => {
    const last14 = getLastNDays(14);
    return last14.map((date) => {
      const entry = entries.find((e) => e.date === date);
      return { date, co2Kg: entry?.totalCO2Kg || 0 };
    });
  }, [entries]);

  const categoryData = useMemo(() => {
    const categories = {};
    weekEntries.forEach((entry) => {
      entry.activities?.forEach((a) => {
        categories[a.category] = (categories[a.category] || 0) + a.co2Kg;
      });
    });
    return Object.entries(categories).map(([category, value]) => ({
      category,
      value,
    }));
  }, [weekEntries]);

  const activeHabits = getActiveHabits();

  async function handleHabitCheckIn(habitId) {
    const xp = await checkInHabit(habitId);
    if (xp > 0) showToast(`+${xp} XP — Habit completed!`, 'success');
  }

  async function handleGenerateReport() {
    const report = await generateReport(entries);
    if (report) showToast('+25 XP — Weekly report generated!', 'success');
  }

  if (userLoading || diaryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-gray-100 mb-6">Dashboard</h1>
      <Dashboard
        todayCO2={todayCO2}
        weekCO2={weekCO2}
        totalSaved={userData?.totalCarbonSavedKg || 0}
        streak={userData?.currentStreak || 0}
        trendData={trendData}
        categoryData={categoryData}
        userAvg={userAvg}
        weeklyReport={latestReport}
        reportLoading={reportLoading}
        onGenerateReport={handleGenerateReport}
        xp={userData?.xp || 0}
        totalCarbonSavedKg={userData?.totalCarbonSavedKg || 0}
        activeHabits={activeHabits}
        onHabitCheckIn={handleHabitCheckIn}
        todayCompletions={todayCompletions}
      />
    </div>
  );
}

DashboardPage.propTypes = {};

export default DashboardPage;
