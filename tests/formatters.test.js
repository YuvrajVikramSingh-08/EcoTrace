import { describe, it, expect } from 'vitest';
import {
  formatCO2, formatXP, formatNumber, treesEquivalent,
  formatPercentage, getGradeColor, getCategoryColor, getCategoryBadgeClass,
} from '../src/utils/formatters.js';

describe('formatters', () => {
  describe('formatCO2', () => {
    it('formats null/undefined as 0 g', () => {
      expect(formatCO2(null)).toBe('0 g');
      expect(formatCO2(undefined)).toBe('0 g');
    });

    it('formats values >= 1000 as tonnes', () => {
      expect(formatCO2(1000)).toBe('1.0 t');
      expect(formatCO2(2500)).toBe('2.5 t');
    });

    it('formats values >= 1 as kg', () => {
      expect(formatCO2(5.2)).toBe('5.2 kg');
      expect(formatCO2(1)).toBe('1.0 kg');
    });

    it('formats values < 1 as grams', () => {
      expect(formatCO2(0.5)).toBe('500 g');
      expect(formatCO2(0.123)).toBe('123 g');
    });

    it('formats zero correctly', () => {
      expect(formatCO2(0)).toBe('0 g');
    });
  });

  describe('formatXP', () => {
    it('formats small values as plain XP', () => {
      expect(formatXP(50)).toBe('50 XP');
      expect(formatXP(999)).toBe('999 XP');
    });

    it('formats 1000+ as k XP', () => {
      expect(formatXP(1000)).toBe('1.0k XP');
      expect(formatXP(2500)).toBe('2.5k XP');
    });

    it('handles zero', () => {
      expect(formatXP(0)).toBe('0 XP');
    });
  });

  describe('formatNumber', () => {
    it('formats with Indian locale', () => {
      const result = formatNumber(100000);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('handles small numbers', () => {
      expect(formatNumber(42)).toBe('42');
    });
  });

  describe('treesEquivalent', () => {
    it('converts 21 kg CO2 to 1 tree', () => {
      expect(treesEquivalent(21)).toBe(1);
    });

    it('converts 0 kg to 0 trees', () => {
      expect(treesEquivalent(0)).toBe(0);
    });

    it('rounds to one decimal', () => {
      expect(treesEquivalent(10)).toBe(0.5);
    });

    it('handles large values', () => {
      expect(treesEquivalent(210)).toBe(10);
    });
  });

  describe('formatPercentage', () => {
    it('adds + sign for positive values', () => {
      expect(formatPercentage(25)).toBe('+25%');
    });

    it('negative values have no + sign', () => {
      expect(formatPercentage(-15)).toBe('-15%');
    });

    it('zero shows no sign', () => {
      expect(formatPercentage(0)).toBe('0%');
    });
  });

  describe('getGradeColor', () => {
    it('returns eco color for A+', () => {
      expect(getGradeColor('A+')).toBe('text-eco-400');
    });

    it('returns eco color for A', () => {
      expect(getGradeColor('A')).toBe('text-eco-400');
    });

    it('returns amber for C', () => {
      expect(getGradeColor('C')).toBe('text-amber-400');
    });

    it('returns red for F', () => {
      expect(getGradeColor('F')).toBe('text-red-400');
    });

    it('returns gray for unknown grade', () => {
      expect(getGradeColor('Z')).toBe('text-gray-400');
    });
  });

  describe('getCategoryColor', () => {
    it('returns blue for transport', () => {
      expect(getCategoryColor('transport')).toBe('#3b82f6');
    });

    it('returns amber for food', () => {
      expect(getCategoryColor('food')).toBe('#f59e0b');
    });

    it('returns gray for unknown category', () => {
      expect(getCategoryColor('unknown')).toBe('#6b7280');
    });
  });

  describe('getCategoryBadgeClass', () => {
    it('returns correct class for each category', () => {
      expect(getCategoryBadgeClass('transport')).toBe('badge-transport');
      expect(getCategoryBadgeClass('food')).toBe('badge-food');
      expect(getCategoryBadgeClass('energy')).toBe('badge-energy');
      expect(getCategoryBadgeClass('shopping')).toBe('badge-shopping');
      expect(getCategoryBadgeClass('waste')).toBe('badge-waste');
    });

    it('returns default for unknown category', () => {
      expect(getCategoryBadgeClass('other')).toBe('badge');
    });
  });
});
