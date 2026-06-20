import { describe, it, expect } from 'vitest';
import { LEVELS, XP_AWARDS, getLevelForXP, getXPProgress } from '../src/data/levels.js';
import { BADGES, getBadgeById, getBadgesByCategory } from '../src/data/badges.js';
import { PRESET_HABITS, getHabitById, getHabitsByCategory } from '../src/data/habits.js';
import { CHALLENGES, getChallengeById } from '../src/data/challenges.js';
import { TRANSPORT, FOOD, ENERGY, SHOPPING, WASTE } from '../src/data/carbonFactors.js';

describe('levels data', () => {
  it('has 5 levels', () => {
    expect(LEVELS).toHaveLength(5);
  });

  it('levels are in ascending minXP order', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].minXP).toBeGreaterThan(LEVELS[i - 1].minXP);
    }
  });

  it('level 5 has Infinity maxXP', () => {
    expect(LEVELS[4].maxXP).toBe(Infinity);
  });

  it('each level has required fields', () => {
    LEVELS.forEach((level) => {
      expect(level).toHaveProperty('level');
      expect(level).toHaveProperty('name');
      expect(level).toHaveProperty('minXP');
      expect(level).toHaveProperty('maxXP');
      expect(level).toHaveProperty('icon');
      expect(level).toHaveProperty('color');
    });
  });

  describe('getLevelForXP', () => {
    it('returns Seedling for 0 XP', () => {
      expect(getLevelForXP(0).name).toBe('Seedling');
    });

    it('returns Sapling for 150 XP', () => {
      expect(getLevelForXP(150).name).toBe('Sapling');
    });

    it('returns Guardian for 400 XP', () => {
      expect(getLevelForXP(400).name).toBe('Guardian');
    });

    it('returns Eco Hero for 850 XP', () => {
      expect(getLevelForXP(850).name).toBe('Eco Hero');
    });

    it('returns Eco Warrior for 1800+ XP', () => {
      expect(getLevelForXP(1800).name).toBe('Eco Warrior');
      expect(getLevelForXP(99999).name).toBe('Eco Warrior');
    });

    it('boundary: 149 XP is still Seedling', () => {
      expect(getLevelForXP(149).name).toBe('Seedling');
    });
  });

  describe('getXPProgress', () => {
    it('returns 0 progress at level start', () => {
      const progress = getXPProgress(0);
      expect(progress.current).toBe(0);
      expect(progress.percentage).toBe(0);
    });

    it('returns percentage within level', () => {
      const progress = getXPProgress(75);
      expect(progress.current).toBe(75);
      expect(progress.total).toBe(150);
      expect(progress.percentage).toBe(50);
    });

    it('returns 100% at max level', () => {
      const progress = getXPProgress(2000);
      expect(progress.percentage).toBe(100);
    });
  });

  describe('XP_AWARDS', () => {
    it('has expected award types', () => {
      expect(XP_AWARDS.FIRST_DIARY_ENTRY).toBe(50);
      expect(XP_AWARDS.DAILY_DIARY_ENTRY).toBe(10);
      expect(XP_AWARDS.HABIT_CHECKIN).toBe(5);
      expect(XP_AWARDS.COACH_CHAT).toBe(2);
      expect(XP_AWARDS.WEEKLY_REPORT).toBe(25);
    });
  });
});

describe('badges data', () => {
  it('has at least 15 badges', () => {
    expect(BADGES.length).toBeGreaterThanOrEqual(15);
  });

  it('each badge has required fields', () => {
    BADGES.forEach((badge) => {
      expect(badge).toHaveProperty('id');
      expect(badge).toHaveProperty('name');
      expect(badge).toHaveProperty('icon');
      expect(badge).toHaveProperty('description');
      expect(badge).toHaveProperty('category');
    });
  });

  it('all badge IDs are unique', () => {
    const ids = BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe('getBadgeById', () => {
    it('finds existing badge', () => {
      const badge = getBadgeById('first_log');
      expect(badge).not.toBeNull();
      expect(badge.name).toBe('First Step');
    });

    it('returns null for non-existent badge', () => {
      expect(getBadgeById('nonexistent')).toBeNull();
    });
  });

  describe('getBadgesByCategory', () => {
    it('returns badges for known category', () => {
      const streakBadges = getBadgesByCategory('streak');
      expect(streakBadges.length).toBeGreaterThanOrEqual(2);
      streakBadges.forEach((b) => expect(b.category).toBe('streak'));
    });

    it('returns empty array for unknown category', () => {
      expect(getBadgesByCategory('nonexistent')).toEqual([]);
    });
  });
});

describe('habits data', () => {
  it('has at least 20 habits', () => {
    expect(PRESET_HABITS.length).toBeGreaterThanOrEqual(20);
  });

  it('each habit has required fields', () => {
    PRESET_HABITS.forEach((habit) => {
      expect(habit).toHaveProperty('id');
      expect(habit).toHaveProperty('name');
      expect(habit).toHaveProperty('category');
      expect(habit).toHaveProperty('co2SavedPerDayKg');
      expect(typeof habit.co2SavedPerDayKg).toBe('number');
      expect(habit.co2SavedPerDayKg).toBeGreaterThan(0);
    });
  });

  it('all habit IDs are unique', () => {
    const ids = PRESET_HABITS.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe('getHabitById', () => {
    it('finds existing habit', () => {
      const habit = getHabitById(PRESET_HABITS[0].id);
      expect(habit).not.toBeNull();
    });

    it('returns null for non-existent habit', () => {
      expect(getHabitById('nonexistent')).toBeNull();
    });
  });

  describe('getHabitsByCategory', () => {
    it('returns habits for known category', () => {
      const transportHabits = getHabitsByCategory('transport');
      expect(transportHabits.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('challenges data', () => {
  it('has at least 3 challenges', () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(3);
  });

  it('each challenge has required fields', () => {
    CHALLENGES.forEach((c) => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('duration');
      expect(c).toHaveProperty('xpReward');
      expect(typeof c.duration).toBe('number');
      expect(typeof c.xpReward).toBe('number');
    });
  });

  describe('getChallengeById', () => {
    it('finds existing challenge', () => {
      const challenge = getChallengeById(CHALLENGES[0].id);
      expect(challenge).toBeTruthy();
    });

    it('returns null for non-existent challenge', () => {
      expect(getChallengeById('nonexistent')).toBeNull();
    });
  });
});

describe('carbonFactors data', () => {
  it('has transport factors', () => {
    expect(TRANSPORT).toBeDefined();
    expect(Object.keys(TRANSPORT).length).toBeGreaterThan(0);
  });

  it('has food factors', () => {
    expect(FOOD).toBeDefined();
    expect(Object.keys(FOOD).length).toBeGreaterThan(0);
  });

  it('has energy factors', () => {
    expect(ENERGY).toBeDefined();
    expect(Object.keys(ENERGY).length).toBeGreaterThan(0);
  });

  it('has shopping factors', () => {
    expect(SHOPPING).toBeDefined();
  });

  it('has waste factors', () => {
    expect(WASTE).toBeDefined();
  });

  it('all transport factor values are positive numbers', () => {
    Object.values(TRANSPORT).forEach((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  it('all food factor values are positive numbers', () => {
    Object.values(FOOD).forEach((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });
});
