import { describe, it, expect } from 'vitest';
import {
  calculateTransportCO2,
  calculateFoodCO2,
  calculateEnergyCO2,
  calculateShoppingCO2,
  calculateWasteCO2,
} from '../src/services/carbonCalculator.js';

describe('carbonCalculator', () => {
  describe('calculateTransportCO2', () => {
    it('calculates petrol car emissions correctly', () => {
      expect(calculateTransportCO2('CAR_PETROL', 10)).toBeCloseTo(1.71, 2);
    });

    it('calculates metro emissions correctly', () => {
      expect(calculateTransportCO2('METRO', 20)).toBeCloseTo(0.22, 2);
    });

    it('returns 0 for zero distance', () => {
      expect(calculateTransportCO2('CAR_PETROL', 0)).toBe(0);
    });

    it('defaults to CAR_PETROL for unknown vehicle', () => {
      expect(calculateTransportCO2('UNKNOWN_VEHICLE', 10)).toBeCloseTo(1.71, 2);
    });

    it('handles very large distances', () => {
      const result = calculateTransportCO2('FLIGHT_DOMESTIC', 1000);
      expect(result).toBeCloseTo(255, 0);
    });
  });

  describe('calculateFoodCO2', () => {
    it('calculates chicken emissions correctly', () => {
      expect(calculateFoodCO2('CHICKEN', 0.15)).toBeCloseTo(1.035, 2);
    });

    it('calculates dal emissions correctly', () => {
      expect(calculateFoodCO2('LENTILS_DAL', 0.3)).toBeCloseTo(0.27, 2);
    });

    it('returns 0 for unknown food item', () => {
      expect(calculateFoodCO2('UNKNOWN_FOOD', 1)).toBe(0);
    });

    it('returns 0 for zero quantity', () => {
      expect(calculateFoodCO2('CHICKEN', 0)).toBe(0);
    });
  });

  describe('calculateEnergyCO2', () => {
    it('calculates AC emissions correctly', () => {
      expect(calculateEnergyCO2('AC_1TON_HOUR', 3)).toBeCloseTo(2.46, 2);
    });

    it('calculates electricity correctly', () => {
      expect(calculateEnergyCO2('ELECTRICITY_KWH', 5)).toBeCloseTo(4.1, 1);
    });

    it('returns 0 for zero hours', () => {
      expect(calculateEnergyCO2('AC_1TON_HOUR', 0)).toBe(0);
    });
  });

  describe('calculateShoppingCO2', () => {
    it('calculates smartphone emissions', () => {
      expect(calculateShoppingCO2('SMARTPHONE', 1)).toBe(70);
    });
  });

  describe('calculateWasteCO2', () => {
    it('calculates landfill waste', () => {
      expect(calculateWasteCO2('LANDFILL_GENERAL', 2)).toBeCloseTo(1.16, 2);
    });
  });
});
