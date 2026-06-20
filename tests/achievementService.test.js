import { describe, it, expect } from 'vitest';
import { checkBadgeUnlocks, calculateDiaryXP, calculateTotalXP } from '../src/services/achievementService.js';

describe('achievementService', () => {
  describe('checkBadgeUnlocks', () => {
    it('unlocks first_log when diary entry count is 1', () => {
      const result = checkBadgeUnlocks({
        diaryEntryCount: 1,
        unlockedBadgeIds: [],
      });
      expect(result).toContain('first_log');
    });

    it('unlocks streak_7 when current streak is 7', () => {
      const result = checkBadgeUnlocks({
        currentStreak: 7,
        unlockedBadgeIds: [],
      });
      expect(result).toContain('streak_7');
      expect(result).toContain('streak_3');
    });

    it('does not unlock streak_7 if already unlocked', () => {
      const result = checkBadgeUnlocks({
        currentStreak: 7,
        unlockedBadgeIds: ['streak_7', 'streak_3'],
      });
      expect(result).not.toContain('streak_7');
    });

    it('unlocks below_avg_day when CO2 is below 5.2', () => {
      const result = checkBadgeUnlocks({
        todayCO2Kg: 3.0,
        unlockedBadgeIds: [],
      });
      expect(result).toContain('below_avg_day');
    });

    it('does not unlock below_avg_day when CO2 is above 5.2', () => {
      const result = checkBadgeUnlocks({
        todayCO2Kg: 7.0,
        unlockedBadgeIds: [],
      });
      expect(result).not.toContain('below_avg_day');
    });

    it('unlocks saved_10kg when total saved is 10', () => {
      const result = checkBadgeUnlocks({
        totalCarbonSavedKg: 15,
        unlockedBadgeIds: [],
      });
      expect(result).toContain('saved_1kg');
      expect(result).toContain('saved_10kg');
      expect(result).not.toContain('saved_50kg');
    });
  });

  describe('calculateDiaryXP', () => {
    it('gives 10 XP for normal entry', () => {
      expect(calculateDiaryXP({ totalCO2Kg: 6 })).toBe(10);
    });

    it('gives 60 XP for first ever entry', () => {
      expect(calculateDiaryXP({ isFirstEntry: true, totalCO2Kg: 6 })).toBe(60);
    });

    it('gives 15 bonus for below average', () => {
      expect(calculateDiaryXP({ totalCO2Kg: 3 })).toBe(25);
    });

    it('gives streak bonus at 3 days', () => {
      expect(calculateDiaryXP({ totalCO2Kg: 6, currentStreak: 3 })).toBe(30);
    });
  });

  describe('calculateTotalXP', () => {
    it('calculates mixed actions correctly', () => {
      const result = calculateTotalXP([
        { type: 'diary_entry', count: 3 },
        { type: 'habit_checkin', count: 5 },
      ]);
      expect(result).toBe(55);
    });
  });
});
