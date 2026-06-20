import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useHabits } from '../hooks/useHabits.js';
import { useToast } from '../hooks/useToast.js';
import { estimateHabitSaving } from '../services/geminiService.js';
import HabitHub from '../components/habits/HabitHub.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import { getToday } from '../utils/dateUtils.js';
import { getChallengeById } from '../data/challenges.js';

function HabitsPage() {
  const { currentUser } = useAuth();
  const { userData } = useContext(UserDataContext);
  const {
    todayCompletions, activeHabitIds, loading,
    checkInHabit, addHabit, removeHabit, createCustomHabit, getActiveHabits,
  } = useHabits();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('my-habits');
  const [customLoading, setCustomLoading] = useState(false);

  async function handleCheckIn(habitId) {
    const xp = await checkInHabit(habitId);
    if (xp > 0) showToast(`+${xp} XP — Habit completed!`, 'success');
  }

  async function handleAdd(habitId) {
    await addHabit(habitId);
    showToast('Habit added!', 'success');
  }

  async function handleRemove(habitId) {
    await removeHabit(habitId);
    showToast('Habit removed.', 'info');
  }

  async function handleCreateCustom(habitData) {
    setCustomLoading(true);
    try {
      const { data: co2Saving } = await estimateHabitSaving(
        habitData.name + ': ' + habitData.description
      );
      await createCustomHabit({ ...habitData, co2SavedPerDayKg: co2Saving });
      showToast('Custom habit created!', 'success');
    } catch {
      showToast('Failed to create habit.', 'error');
    } finally {
      setCustomLoading(false);
    }
  }

  async function handleStartChallenge(challengeId) {
    if (!currentUser) return;
    const challenge = getChallengeById(challengeId);
    if (!challenge) return;
    const today = getToday();
    await setDoc(
      doc(db, 'users', currentUser.uid, 'activeChallenges', challengeId),
      {
        challengeId, startDate: today, endDate: today,
        durationDays: challenge.duration, completedDays: 0,
        status: 'active', xpReward: challenge.xpReward,
      }
    );
    showToast(`Challenge "${challenge.name}" started!`, 'success');
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">Habit Hub</h1>
        <p className="text-sm text-gray-400">Build green habits, track streaks, and join challenges.</p>
      </div>
      <HabitHub
        activeHabits={getActiveHabits()} todayCompletions={todayCompletions}
        activeHabitIds={activeHabitIds} activeChallenges={[]}
        onCheckIn={handleCheckIn} onAdd={handleAdd} onRemove={handleRemove}
        onCreateCustom={handleCreateCustom} onStartChallenge={handleStartChallenge}
        customHabitLoading={customLoading} activeTab={activeTab} onTabChange={setActiveTab}
      />
    </div>
  );
}

HabitsPage.propTypes = {};
export default HabitsPage;
