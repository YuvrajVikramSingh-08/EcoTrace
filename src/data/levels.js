export const LEVELS = [
  {
    level: 1,
    name: 'Seedling',
    minXP: 0,
    maxXP: 149,
    icon: '🌱',
    color: '#4ade80',
  },
  {
    level: 2,
    name: 'Sapling',
    minXP: 150,
    maxXP: 399,
    icon: '🌿',
    color: '#22c55e',
  },
  {
    level: 3,
    name: 'Guardian',
    minXP: 400,
    maxXP: 849,
    icon: '🌳',
    color: '#16a34a',
  },
  {
    level: 4,
    name: 'Eco Hero',
    minXP: 850,
    maxXP: 1799,
    icon: '🌍',
    color: '#15803d',
  },
  {
    level: 5,
    name: 'Eco Warrior',
    minXP: 1800,
    maxXP: Infinity,
    icon: '⚡',
    color: '#166534',
  },
];

export const XP_AWARDS = {
  FIRST_DIARY_ENTRY: 50,
  DAILY_DIARY_ENTRY: 10,
  DIARY_BELOW_AVG_BONUS: 15,
  HABIT_CHECKIN: 5,
  HABIT_STREAK_7: 30,
  HABIT_STREAK_30: 100,
  CHALLENGE_7_DAY: 75,
  CHALLENGE_14_DAY: 150,
  CHALLENGE_30_DAY: 300,
  COACH_CHAT: 2,
  COACH_CHAT_MAX_PER_DAY: 10,
  FIRST_STREAK_3: 20,
  WEEKLY_REPORT: 25,
  FIRST_BADGE: 20,
  SHARE_CARD: 10,
};

export function getLevelForXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getXPProgress(xp) {
  const currentLevel = getLevelForXP(xp);
  if (currentLevel.maxXP === Infinity) {
    return { current: xp - currentLevel.minXP, total: 1000, percentage: 100 };
  }
  const levelRange = currentLevel.maxXP - currentLevel.minXP + 1;
  const progress = xp - currentLevel.minXP;
  return {
    current: progress,
    total: levelRange,
    percentage: Math.min(100, Math.round((progress / levelRange) * 100)),
  };
}
