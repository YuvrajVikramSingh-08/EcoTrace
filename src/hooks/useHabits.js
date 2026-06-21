import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import {
  doc, setDoc, getDocs,
  collection, query, where, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from './useAuth.js';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { getToday } from '../utils/dateUtils.js';
import { getHabitById } from '../data/habits.js';

export function useHabits() {
  const { currentUser } = useAuth();
  const { userData, updateUserData } = useContext(UserDataContext);
  const [todayCompletions, setTodayCompletions] = useState([]);
  const [customHabits, setCustomHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeHabitIdsRaw = userData?.activeHabitIds;
  const activeHabitIds = useMemo(() => activeHabitIdsRaw || [], [activeHabitIdsRaw]);

  const fetchTodayCompletions = useCallback(async () => {
    if (!currentUser) return;
    try {
      const logsRef = collection(db, 'users', currentUser.uid, 'habitLogs');
      const q = query(logsRef, where('date', '==', getToday()));
      const snap = await getDocs(q);
      setTodayCompletions(snap.docs.map((d) => d.data().habitId));
    } catch (err) {
      setError(err.message);
    }
  }, [currentUser]);

  const fetchCustomHabits = useCallback(async () => {
    if (!currentUser) return;
    try {
      const ref = collection(db, 'users', currentUser.uid, 'customHabits');
      const snap = await getDocs(ref);
      setCustomHabits(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchTodayCompletions();
    fetchCustomHabits();
  }, [fetchTodayCompletions, fetchCustomHabits]);

  const checkInHabit = useCallback(async (habitId) => {
    if (!currentUser) return 0;
    const today = getToday();
    const habit = getHabitById(habitId) || customHabits.find((h) => h.id === habitId);
    if (!habit) return 0;

    const logId = `${habitId}_${today}`;
    const logRef = doc(db, 'users', currentUser.uid, 'habitLogs', logId);

    const xpEarned = 5;
    await setDoc(logRef, {
      habitId,
      date: today,
      completed: true,
      co2SavedKg: habit.co2SavedPerDayKg || 0,
      xpEarned,
      createdAt: serverTimestamp(),
    });

    await updateUserData({
      xp: (userData?.xp || 0) + xpEarned,
      totalCarbonSavedKg: (userData?.totalCarbonSavedKg || 0) + (habit.co2SavedPerDayKg || 0),
    });

    await fetchTodayCompletions();
    return xpEarned;
  }, [currentUser, customHabits, userData, updateUserData, fetchTodayCompletions]);

  const addHabit = useCallback(async (habitId) => {
    if (!currentUser) return;
    const newIds = [...new Set([...activeHabitIds, habitId])];
    await updateUserData({ activeHabitIds: newIds });
  }, [currentUser, activeHabitIds, updateUserData]);

  const removeHabit = useCallback(async (habitId) => {
    if (!currentUser) return;
    const newIds = activeHabitIds.filter((id) => id !== habitId);
    await updateUserData({ activeHabitIds: newIds });
  }, [currentUser, activeHabitIds, updateUserData]);

  const createCustomHabit = useCallback(async (habitData) => {
    if (!currentUser) return;
    const ref = doc(collection(db, 'users', currentUser.uid, 'customHabits'));
    await setDoc(ref, {
      ...habitData,
      id: ref.id,
      createdAt: serverTimestamp(),
    });
    await fetchCustomHabits();
    await addHabit(ref.id);
  }, [currentUser, fetchCustomHabits, addHabit]);

  const getActiveHabits = useCallback(() => {
    const presets = activeHabitIds
      .map((id) => getHabitById(id))
      .filter(Boolean);
    const customs = activeHabitIds
      .map((id) => customHabits.find((h) => h.id === id))
      .filter(Boolean);
    return [...presets, ...customs];
  }, [activeHabitIds, customHabits]);

  return {
    activeHabitIds,
    todayCompletions,
    customHabits,
    loading,
    error,
    checkInHabit,
    addHabit,
    removeHabit,
    createCustomHabit,
    getActiveHabits,
    refetch: fetchTodayCompletions,
  };
}
