import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useDiary } from '../hooks/useDiary.js';
import { useEcoCoach } from '../hooks/useEcoCoach.js';
import { useGamification } from '../hooks/useGamification.js';
import { useToast } from '../hooks/useToast.js';
import EcoCoach from '../components/coach/EcoCoach.jsx';
import ConfirmDialog from '../components/shared/ConfirmDialog.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';

function CoachPage() {
  const { userData } = useContext(UserDataContext);
  const { entries } = useDiary();
  const { messages, loading, sending, error: coachError, sendMessage, clearChat } = useEcoCoach();
  const { checkAndUnlockBadges } = useGamification();
  const { showToast } = useToast();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  async function handleSend(text) {
    const userContext = {
      ...userData,
      recentEntries: entries.slice(0, 5).map((e) => ({
        date: e.date,
        totalCO2Kg: e.totalCO2Kg,
        activities: e.activities?.map((a) => a.description),
      })),
    };

    await sendMessage(text, userContext);

    // Check if the AI actually responded (last message should be from model)
    // The hook sets error state if the AI call failed
    if (coachError) {
      showToast(coachError, 'error');
      return;
    }

    const chatCount = messages.filter((m) => m.role === 'user').length + 1;
    if (chatCount === 1) {
      await checkAndUnlockBadges({
        chatMessageCount: 1,
        unlockedBadgeIds: userData?.unlockedBadgeIds || [],
      });
    }

    showToast('+2 XP — Chat with EcoCoach', 'success');
  }

  async function handleClear() {
    await clearChat();
    setShowClearConfirm(false);
    showToast('Chat cleared.', 'info');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">EcoCoach</h1>
        <p className="text-sm text-gray-400">
          Your personal AI carbon advisor. Ask anything about sustainability.
        </p>
      </div>

      <EcoCoach
        messages={messages}
        sending={sending}
        onSend={handleSend}
        onClear={() => setShowClearConfirm(true)}
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear chat history?"
        message="All messages will be permanently deleted."
        confirmLabel="Clear"
        onConfirm={handleClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}

CoachPage.propTypes = {};

export default CoachPage;
