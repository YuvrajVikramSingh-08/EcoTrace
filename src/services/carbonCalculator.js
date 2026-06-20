import {
  TRANSPORT,
  FOOD,
  ENERGY,
  SHOPPING,
  WASTE,
} from '../data/carbonFactors.js';

const ALL_FACTORS = { ...TRANSPORT, ...FOOD, ...ENERGY, ...SHOPPING, ...WASTE };

/**
 * Calculate transport CO₂.
 * @param {string} vehicle - Key from TRANSPORT factors
 * @param {number} distanceKm
 * @returns {number} kg CO₂
 */
export function calculateTransportCO2(vehicle, distanceKm) {
  if (distanceKm <= 0) return 0;
  const factor = TRANSPORT[vehicle] || TRANSPORT.CAR_PETROL;
  return Math.round(factor * distanceKm * 1000) / 1000;
}

/**
 * Calculate food CO₂.
 * @param {string} foodItem - Key from FOOD factors
 * @param {number} quantityKg
 * @returns {number} kg CO₂
 */
export function calculateFoodCO2(foodItem, quantityKg) {
  if (quantityKg <= 0) return 0;
  const factor = FOOD[foodItem];
  if (!factor) return 0;
  return Math.round(factor * quantityKg * 1000) / 1000;
}

/**
 * Calculate energy CO₂.
 * @param {string} applianceType - Key from ENERGY factors
 * @param {number} hours - hours of usage or cycles
 * @returns {number} kg CO₂
 */
export function calculateEnergyCO2(applianceType, hours) {
  if (hours <= 0) return 0;
  const factor = ENERGY[applianceType];
  if (!factor) return 0;
  return Math.round(factor * hours * 1000) / 1000;
}

/**
 * Calculate shopping CO₂.
 * @param {string} item - Key from SHOPPING factors
 * @param {number} quantity
 * @returns {number} kg CO₂
 */
export function calculateShoppingCO2(item, quantity) {
  if (quantity <= 0) return 0;
  const factor = SHOPPING[item];
  if (!factor) return 0;
  return Math.round(factor * quantity * 1000) / 1000;
}

/**
 * Calculate waste CO₂.
 * @param {string} wasteType - Key from WASTE factors
 * @param {number} quantityKg
 * @returns {number} kg CO₂
 */
export function calculateWasteCO2(wasteType, quantityKg) {
  if (quantityKg <= 0) return 0;
  const factor = WASTE[wasteType];
  if (!factor) return 0;
  return Math.round(factor * quantityKg * 1000) / 1000;
}

/**
 * Calculate CO₂ from a parsed activity using emissionFactor key.
 * @param {string} emissionFactor - Key from any factor category
 * @param {number} quantity
 * @returns {number} kg CO₂
 */
export function calculateCO2FromFactor(emissionFactor, quantity) {
  if (quantity <= 0) return 0;
  const factor = ALL_FACTORS[emissionFactor];
  if (!factor) return 0;
  return Math.round(factor * quantity * 1000) / 1000;
}
