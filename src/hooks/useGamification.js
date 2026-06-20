import { useCallback, useContext } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from './useAuth.js';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useToast } from './useToast.js';
import { checkBadgeUnlocks } from '../services/achievementService.js';
import { getLevelForXP } from '../data/levels.js';
import { getBadgeById } from '../data/badges.js';

export function useGamification() {
  const { currentUser } = useAuth();
  const { userData, updateUserData } = useContext(UserDataContext);
  const { showToast } = useToast();

  const awardXP = useCallback(async (amount, reason) => {
    if (!currentUser || !userData) return;

    const oldXP = userData.xp || 0;
    const newXP = oldXP + amount;
    const oldLevel = getLevelForXP(oldXP);
    const newLevel = getLevelForXP(newXP);

    await updateUserData({ xp: newXP, level: newLevel.level });

    showToast(`+${amount} XP — ${reason}`, 'success');

    if (newLevel.level > oldLevel.level) {
      showToast(`🎉 Level Up! You're now a ${newLevel.name} ${newLevel.icon}`, 'success');
    }
  }, [currentUser, userData, updateUserData, showToast]);

  const checkAndUnlockBadges = useCallback(async (userState) => {
    if (!currentUser || !userData) return [];

    const newBadges = checkBadgeUnlocks({
      ...userState,
      unlockedBadgeIds: userData.unlockedBadgeIds || [],
    });

    if (newBadges.length > 0) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        unlockedBadgeIds: arrayUnion(...newBadges),
      });

      for (const badgeId of newBadges) {
        const badge = getBadgeById(badgeId);
        if (badge) {
          showToast(`🏅 Badge Unlocked: ${badge.name} ${badge.icon}`, 'success');
        }
      }

      if ((userData.unlockedBadgeIds || []).length === 0 && newBadges.length > 0) {
        await updateUserData({ xp: (userData.xp || 0) + 20 });
        showToast('+20 XP — First badge!', 'success');
      }
    }

    return newBadges;
  }, [currentUser, userData, updateUserData, showToast]);

  return {
    awardXP,
    checkAndUnlockBadges,
    xp: userData?.xp || 0,
    level: getLevelForXP(userData?.xp || 0),
    unlockedBadgeIds: userData?.unlockedBadgeIds || [],
    totalCarbonSavedKg: userData?.totalCarbonSavedKg || 0,
  };
}
