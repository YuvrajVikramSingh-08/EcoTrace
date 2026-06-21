import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useGamification } from '../hooks/useGamification.js';
import { useWeeklyReport } from '../hooks/useWeeklyReport.js';
import { useToast } from '../hooks/useToast.js';
import { getBadgeById } from '../data/badges.js';
import VirtualTree from '../components/gamification/VirtualTree.jsx';
import CarbonSavingsBank from '../components/gamification/CarbonSavingsBank.jsx';
import XPBar from '../components/gamification/XPBar.jsx';
import LevelBadge from '../components/gamification/LevelBadge.jsx';
import BadgeGrid from '../components/gamification/BadgeGrid.jsx';
import ShareableCard from '../components/gamification/ShareableCard.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';

function RewardsPage() {
  const { userData, loading } = useContext(UserDataContext);
  const { xp, unlockedBadgeIds, totalCarbonSavedKg } = useGamification();
  const { latestReport } = useWeeklyReport();
  const { showToast } = useToast();

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><LoadingSpinner size="lg" /></div>;
  }

  const topBadge = unlockedBadgeIds.length > 0
    ? getBadgeById(unlockedBadgeIds[unlockedBadgeIds.length - 1])
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">Rewards</h1>
        <p className="text-sm text-gray-400">Your achievements, badges, and progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <LevelBadge xp={xp} size="lg" />
            <div className="mt-4"><XPBar xp={xp} /></div>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Badges</h2>
            <BadgeGrid unlockedBadgeIds={unlockedBadgeIds} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 flex flex-col items-center">
            <VirtualTree totalCarbonSavedKg={totalCarbonSavedKg} size="lg" />
          </div>
          <CarbonSavingsBank totalCarbonSavedKg={totalCarbonSavedKg} />
          <ShareableCard
            xp={xp}
            totalCarbonSavedKg={totalCarbonSavedKg}
            longestStreak={userData?.longestStreak || 0}
            weeklyGrade={latestReport?.grade}
            topBadge={topBadge}
            onShare={() => showToast('+10 XP — Achievement shared!', 'success')}
          />
        </div>
      </div>
    </div>
  );
}

RewardsPage.propTypes = {};
export default RewardsPage;
