/**
 * Format CO₂ value with appropriate unit.
 * @param {number} kgCO2
 * @returns {string}
 */
export function formatCO2(kgCO2) {
  if (kgCO2 === null || kgCO2 === undefined) return '0 g';
  if (kgCO2 >= 1000) {
    return `${(kgCO2 / 1000).toFixed(1)} t`;
  }
  if (kgCO2 >= 1) {
    return `${kgCO2.toFixed(1)} kg`;
  }
  return `${(kgCO2 * 1000).toFixed(0)} g`;
}

/**
 * Format XP value.
 * @param {number} xp
 * @returns {string}
 */
export function formatXP(xp) {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k XP`;
  }
  return `${xp} XP`;
}

/**
 * Format a number with commas.
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  return num.toLocaleString('en-IN');
}

/**
 * Convert kg CO₂ to tree equivalent.
 * A mature tree absorbs approximately 21 kg of CO₂ per year.
 * @param {number} kgCO2
 * @returns {number}
 */
export function treesEquivalent(kgCO2) {
  return Math.round((kgCO2 / 21) * 10) / 10;
}

/**
 * Format percentage with sign.
 * @param {number} value
 * @returns {string}
 */
export function formatPercentage(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(0)}%`;
}

/**
 * Get grade color class.
 * @param {string} grade
 * @returns {string}
 */
export function getGradeColor(grade) {
  const colors = {
    'A+': 'text-eco-400',
    A: 'text-eco-400',
    B: 'text-green-400',
    C: 'text-amber-400',
    D: 'text-orange-400',
    F: 'text-red-400',
  };
  return colors[grade] || 'text-gray-400';
}

/**
 * Get category color.
 * @param {string} category
 * @returns {string}
 */
export function getCategoryColor(category) {
  const colors = {
    transport: '#3b82f6',
    food: '#f59e0b',
    energy: '#eab308',
    shopping: '#a855f7',
    waste: '#f43f5e',
  };
  return colors[category] || '#6b7280';
}

/**
 * Get category badge class.
 * @param {string} category
 * @returns {string}
 */
export function getCategoryBadgeClass(category) {
  const classes = {
    transport: 'badge-transport',
    food: 'badge-food',
    energy: 'badge-energy',
    shopping: 'badge-shopping',
    waste: 'badge-waste',
  };
  return classes[category] || 'badge';
}
