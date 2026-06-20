import { describe, it, expect } from 'vitest';
import { formatDate, getToday, isToday, getWeekRange, daysBetween, getLastNDays } from '../src/utils/dateUtils.js';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats a Date object to YYYY-MM-DD', () => {
      const date = new Date(2025, 0, 15);
      expect(formatDate(date)).toBe('2025-01-15');
    });

    it('pads single-digit month and day', () => {
      const date = new Date(2025, 2, 5);
      expect(formatDate(date)).toBe('2025-03-05');
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(getToday())).toBe(true);
    });

    it('returns false for other dates', () => {
      expect(isToday('2020-01-01')).toBe(false);
    });
  });

  describe('getWeekRange', () => {
    it('returns Monday-Sunday for a Wednesday', () => {
      const range = getWeekRange(new Date(2025, 0, 15));
      expect(range.start).toBe('2025-01-13');
      expect(range.end).toBe('2025-01-19');
    });

    it('returns correct range for a Monday', () => {
      const range = getWeekRange(new Date(2025, 0, 13));
      expect(range.start).toBe('2025-01-13');
      expect(range.end).toBe('2025-01-19');
    });

    it('returns correct range for a Sunday', () => {
      const range = getWeekRange(new Date(2025, 0, 19));
      expect(range.start).toBe('2025-01-13');
      expect(range.end).toBe('2025-01-19');
    });
  });

  describe('daysBetween', () => {
    it('calculates 0 days between same dates', () => {
      expect(daysBetween('2025-01-15', '2025-01-15')).toBe(0);
    });

    it('calculates correct days between dates', () => {
      expect(daysBetween('2025-01-10', '2025-01-15')).toBe(5);
    });

    it('works regardless of order', () => {
      expect(daysBetween('2025-01-15', '2025-01-10')).toBe(5);
    });
  });

  describe('getLastNDays', () => {
    it('returns an array of length N', () => {
      expect(getLastNDays(7)).toHaveLength(7);
    });

    it('ends with today', () => {
      const days = getLastNDays(5);
      expect(days[days.length - 1]).toBe(getToday());
    });
  });
});
