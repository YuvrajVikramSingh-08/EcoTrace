import { BADGES } from '../data/badges.js';
import { INDIA_NATIONAL_AVG_KG_PER_DAY } from '../data/carbonFactors.js';

/**
 * Check which badges should be unlocked based on current user state.
 * @param {object} userState
 * @returns {string[]} Array of badge IDs that should be newly unlocked
 */
export function checkBadgeUnlocks(userState) {
  const {
    diaryEntryCount = 0,
    currentStreak = 0,
    totalCarbonSavedKg = 0,
    todayCO2Kg = null,
    todayCategories = [],
    habitCompletionCount = 0,
    chatMessageCount = 0,
    completedChallenges = [],
    shareCount = 0,
    weeklyGrades = [],
    profileComplete = false,
    unlockedBadgeIds = [],
  } = userState;

  const newBadges = [];

  const criteriaMap = {
    first_log: diaryEntryCount >= 1,
    profile_complete: profileComplete,
    first_habit: habitCompletionCount >= 1,
    first_chat: chatMessageCount >= 1,
    streak_3: currentStreak >= 3,
    streak_7: currentStreak >= 7,
    streak_30: currentStreak >= 30,
    below_avg_day:
      todayCO2Kg !== null && todayCO2Kg < INDIA_NATIONAL_AVG_KG_PER_DAY,
    saved_1kg: totalCarbonSavedKg >= 1,
    saved_10kg: totalCarbonSavedKg >= 10,
    saved_50kg: totalCarbonSavedKg >= 50,
    saved_100kg: totalCarbonSavedKg >= 100,
    no_car_day:
      todayCO2Kg !== null &&
      !todayCategories.some(
        (c) =>
          c.category === 'transport' &&
          ['CAR_PETROL', 'CAR_DIESEL', 'CAR_EV'].includes(c.emissionFactor)
      ),
    public_transport: todayCategories.some(
      (c) =>
        c.category === 'transport' &&
        ['BUS', 'TRAIN', 'METRO'].includes(c.emissionFactor)
    ),
    veg_day:
      todayCO2Kg !== null &&
      todayCategories.length > 0 &&
      !todayCategories.some(
        (c) =>
          c.category === 'food' &&
          ['BEEF', 'LAMB', 'PORK', 'CHICKEN', 'FISH_AVERAGE'].includes(
            c.emissionFactor
          )
      ),
    veg_week: false, // tracked separately over 7 days
    challenge_7: completedChallenges.some((c) => c.durationDays === 7),
    challenge_30: completedChallenges.some((c) => c.durationDays === 30),
    first_share: shareCount >= 1,
    grade_a: weeklyGrades.some((g) => g === 'A+' || g === 'A'),
  };

  for (const badge of BADGES) {
    if (unlockedBadgeIds.includes(badge.id)) continue;
    if (criteriaMap[badge.id]) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}

/**
 * Calculate XP for a diary entry.
 * @param {object} params
 * @returns {number}
 */
export function calculateDiaryXP({
  isFirstEntry = false,
  totalCO2Kg = 0,
  currentStreak = 0,
}) {
  let xp = 10; // base XP for diary entry

  if (isFirstEntry) {
    xp += 50; // first diary entry bonus
  }

  if (totalCO2Kg < INDIA_NATIONAL_AVG_KG_PER_DAY) {
    xp += 15; // below average bonus
  }

  if (currentStreak === 3) {
    xp += 20; // first 3-day streak bonus
  }

  return xp;
}

/**
 * Calculate total XP from multiple actions.
 * @param {object[]} actions - Array of { type, count }
 * @returns {number}
 */
export function calculateTotalXP(actions) {
  const xpMap = {
    diary_entry: 10,
    first_diary: 50,
    below_avg: 15,
    habit_checkin: 5,
    streak_7_bonus: 30,
    streak_30_bonus: 100,
    challenge_7: 75,
    challenge_14: 150,
    challenge_30: 300,
    coach_chat: 2,
    streak_3_first: 20,
    weekly_report: 25,
    first_badge: 20,
    share_card: 10,
  };

  return actions.reduce((total, action) => {
    const perAction = xpMap[action.type] || 0;
    return total + perAction * (action.count || 1);
  }, 0);
}
