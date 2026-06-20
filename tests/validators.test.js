import { describe, it, expect } from 'vitest';
import {
  validateDiaryInput, validateHabitName, validateEmail,
  validatePassword, validateDisplayName,
} from '../src/utils/validators.js';

describe('validators', () => {
  describe('validateDiaryInput', () => {
    it('rejects empty string', () => {
      const result = validateDiaryInput('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('describe your day');
    });

    it('rejects null', () => {
      expect(validateDiaryInput(null).valid).toBe(false);
    });

    it('rejects whitespace-only', () => {
      expect(validateDiaryInput('   ').valid).toBe(false);
    });

    it('rejects too-short input', () => {
      const result = validateDiaryInput('hi');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('more detail');
    });

    it('rejects input over 2000 characters', () => {
      const longText = 'a'.repeat(2001);
      const result = validateDiaryInput(longText);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('accepts valid input', () => {
      const result = validateDiaryInput('Took the bus to work and had lunch at canteen');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('accepts input exactly at minimum length', () => {
      expect(validateDiaryInput('took a bus.').valid).toBe(true);
    });
  });

  describe('validateHabitName', () => {
    it('rejects empty name', () => {
      expect(validateHabitName('').valid).toBe(false);
    });

    it('rejects null', () => {
      expect(validateHabitName(null).valid).toBe(false);
    });

    it('rejects name over 100 characters', () => {
      const longName = 'a'.repeat(101);
      const result = validateHabitName(longName);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('accepts valid name', () => {
      const result = validateHabitName('Carry reusable water bottle');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.in')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('user @domain.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('rejects passwords shorter than 6 characters', () => {
      expect(validatePassword('12345').valid).toBe(false);
      expect(validatePassword('').valid).toBe(false);
    });

    it('rejects null/undefined', () => {
      expect(validatePassword(null).valid).toBe(false);
      expect(validatePassword(undefined).valid).toBe(false);
    });

    it('accepts passwords with 6+ characters', () => {
      expect(validatePassword('123456').valid).toBe(true);
      expect(validatePassword('securePassword!').valid).toBe(true);
    });
  });

  describe('validateDisplayName', () => {
    it('rejects names shorter than 2 characters', () => {
      expect(validateDisplayName('A').valid).toBe(false);
    });

    it('rejects empty/null', () => {
      expect(validateDisplayName('').valid).toBe(false);
      expect(validateDisplayName(null).valid).toBe(false);
    });

    it('rejects names over 50 characters', () => {
      const longName = 'A'.repeat(51);
      expect(validateDisplayName(longName).valid).toBe(false);
    });

    it('accepts valid names', () => {
      expect(validateDisplayName('Yuvraj').valid).toBe(true);
      expect(validateDisplayName('AB').valid).toBe(true);
    });

    it('boundary: exactly 50 chars is valid', () => {
      const name50 = 'A'.repeat(50);
      expect(validateDisplayName(name50).valid).toBe(true);
    });
  });
});
