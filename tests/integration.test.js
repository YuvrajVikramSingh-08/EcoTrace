import { describe, it, expect } from 'vitest';
import { calculateTransportCO2, calculateFoodCO2, calculateEnergyCO2 } from '../src/services/carbonCalculator.js';
import { formatCO2, treesEquivalent } from '../src/utils/formatters.js';
import { getLevelForXP, getXPProgress, XP_AWARDS } from '../src/data/levels.js';
import { checkBadgeUnlocks } from '../src/services/achievementService.js';
import { validateDiaryInput } from '../src/utils/validators.js';
import { getToday, getWeekRange } from '../src/utils/dateUtils.js';

/**
 * Integration tests that verify end-to-end flows spanning
 * multiple modules — no Firebase or Gemini API calls needed.
 */
describe('Integration: diary entry pipeline', () => {
  it('validates input, calculates CO2, formats output, and triggers badges', () => {
    // Step 1: Validate diary input
    const input = 'Drove 15 km in my car and had chicken for lunch';
    const validation = validateDiaryInput(input);
    expect(validation.valid).toBe(true);

    // Step 2: Simulate parsed activities (what Gemini would return)
    const activities = [
      { category: 'transport', description: 'Drove 15km', co2Kg: calculateTransportCO2('CAR_PETROL', 15) },
      { category: 'food', description: 'Chicken lunch', co2Kg: calculateFoodCO2('CHICKEN', 0.15) },
    ];

    const totalCO2 = activities.reduce((sum, a) => sum + a.co2Kg, 0);
    expect(totalCO2).toBeGreaterThan(0);

    // Step 3: Format for display
    const formatted = formatCO2(totalCO2);
    expect(formatted).toContain('kg');

    // Step 4: Check badge triggers
    const newBadges = checkBadgeUnlocks({
      diaryEntryCount: 1,
      todayCO2Kg: totalCO2,
      unlockedBadgeIds: [],
    });
    expect(newBadges).toContain('first_log');
  });

  it('complete XP progression flow', () => {
    // New user starts at 0 XP
    let xp = 0;
    expect(getLevelForXP(xp).name).toBe('Seedling');

    // First diary entry: 50 XP
    xp += XP_AWARDS.FIRST_DIARY_ENTRY;
    expect(xp).toBe(50);
    expect(getLevelForXP(xp).name).toBe('Seedling');

    // 10 more daily entries: 100 XP
    xp += 10 * XP_AWARDS.DAILY_DIARY_ENTRY;
    expect(xp).toBe(150);
    expect(getLevelForXP(xp).name).toBe('Sapling');

    // Check progress within Sapling level
    const progress = getXPProgress(xp);
    expect(progress.current).toBe(0); // just entered the level
    expect(progress.total).toBe(250); // 399 - 150 + 1

    // Add habits + coach to reach Guardian
    xp += 50 * XP_AWARDS.HABIT_CHECKIN; // 250 XP from habits
    expect(xp).toBe(400);
    expect(getLevelForXP(xp).name).toBe('Guardian');
  });

  it('carbon savings to trees conversion pipeline', () => {
    // Simulate daily savings from habits
    const dailySavings = [0.5, 0.3, 0.8, 0.2, 0.4, 0.6, 0.7]; // 7 days
    const totalSaved = dailySavings.reduce((sum, d) => sum + d, 0);
    expect(totalSaved).toBeCloseTo(3.5, 1);

    const trees = treesEquivalent(totalSaved);
    expect(trees).toBeGreaterThan(0);

    const formatted = formatCO2(totalSaved);
    expect(formatted).toContain('kg');
  });

  it('weekly budget comparison flow', () => {
    const today = getToday();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const weekRange = getWeekRange(new Date());
    expect(weekRange.start).toBeDefined();
    expect(weekRange.end).toBeDefined();
    expect(weekRange.start <= weekRange.end).toBe(true);

    // Simulate a week of entries
    const weekEntries = [
      { date: weekRange.start, totalCO2Kg: 4.2 },
      { date: weekRange.end, totalCO2Kg: 5.8 },
    ];
    const weekAvg = weekEntries.reduce((s, e) => s + e.totalCO2Kg, 0) / weekEntries.length;
    const indiaAvg = 5.2;
    const percentageDiff = ((weekAvg - indiaAvg) / indiaAvg) * 100;
    expect(typeof percentageDiff).toBe('number');
  });
});

describe('Integration: badge unlocking cascade', () => {
  it('multiple badges can unlock from a single entry', () => {
    const badges = checkBadgeUnlocks({
      diaryEntryCount: 1,
      todayCO2Kg: 3.0,   // below avg
      totalCarbonSavedKg: 2,
      currentStreak: 3,
      unlockedBadgeIds: [],
    });

    expect(badges).toContain('first_log');
    expect(badges).toContain('below_avg_day');
    expect(badges).toContain('saved_1kg');
    expect(badges).toContain('streak_3');
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });

  it('does not re-unlock already unlocked badges', () => {
    const badges = checkBadgeUnlocks({
      diaryEntryCount: 5,
      todayCO2Kg: 3.0,
      totalCarbonSavedKg: 15,
      currentStreak: 8,
      unlockedBadgeIds: ['first_log', 'below_avg_day', 'saved_1kg', 'saved_10kg', 'streak_3', 'streak_7'],
    });

    expect(badges).not.toContain('first_log');
    expect(badges).not.toContain('streak_7');
  });
});

describe('Integration: energy calculation edge cases', () => {
  it('AC usage over full day is realistic', () => {
    const co2 = calculateEnergyCO2('AC_1TON_HOUR', 8); // 8 hours
    expect(co2).toBeGreaterThan(5);
    expect(co2).toBeLessThan(20);
  });

  it('combined daily energy calculation', () => {
    const ac = calculateEnergyCO2('AC_1TON_HOUR', 3);
    const electricity = calculateEnergyCO2('ELECTRICITY_KWH', 5);
    const total = ac + electricity;
    expect(total).toBeGreaterThan(0);

    const formatted = formatCO2(total);
    expect(formatted).toBeTruthy();
  });
});
