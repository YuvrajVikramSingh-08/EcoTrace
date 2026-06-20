export const PRESET_HABITS = [
  // Transport
  { id: 'h001', name: 'Use public transport', description: 'Take bus/metro instead of personal vehicle', category: 'transport', co2SavedPerDayKg: 2.3, icon: '🚌', difficulty: 'medium' },
  { id: 'h002', name: 'Walk short trips', description: 'Walk instead of driving for trips under 2 km', category: 'transport', co2SavedPerDayKg: 1.0, icon: '🚶', difficulty: 'easy' },
  { id: 'h003', name: 'Carpool', description: 'Share a ride with at least one other person', category: 'transport', co2SavedPerDayKg: 1.5, icon: '🚗', difficulty: 'medium' },
  { id: 'h004', name: 'Cycle to work', description: 'Ride a bicycle instead of a motor vehicle', category: 'transport', co2SavedPerDayKg: 2.8, icon: '🚴', difficulty: 'hard' },
  { id: 'h005', name: 'No car day', description: 'Avoid using a personal car for the entire day', category: 'transport', co2SavedPerDayKg: 3.1, icon: '🚫🚗', difficulty: 'medium' },

  // Food
  { id: 'h006', name: 'No-meat meal', description: 'Eat at least one fully vegetarian meal', category: 'food', co2SavedPerDayKg: 0.8, icon: '🥗', difficulty: 'easy' },
  { id: 'h007', name: 'Fully plant-based day', description: 'All meals are vegan/vegetarian', category: 'food', co2SavedPerDayKg: 2.1, icon: '🌱', difficulty: 'medium' },
  { id: 'h008', name: 'No beef or lamb', description: 'Avoid ruminant meat today', category: 'food', co2SavedPerDayKg: 4.0, icon: '🐄', difficulty: 'easy' },
  { id: 'h009', name: 'Eat local produce', description: 'Buy vegetables from a local market', category: 'food', co2SavedPerDayKg: 0.3, icon: '🛒', difficulty: 'easy' },
  { id: 'h010', name: 'Zero food waste', description: 'Finish all food, compost or donate leftovers', category: 'food', co2SavedPerDayKg: 0.5, icon: '♻️', difficulty: 'medium' },

  // Energy
  { id: 'h011', name: 'AC at 26°C or above', description: 'Set air conditioner to 26°C instead of lower', category: 'energy', co2SavedPerDayKg: 0.6, icon: '❄️', difficulty: 'easy' },
  { id: 'h012', name: 'No AC day', description: 'Use fans instead of AC for the entire day', category: 'energy', co2SavedPerDayKg: 2.0, icon: '🌬️', difficulty: 'hard' },
  { id: 'h013', name: 'Lights off when leaving', description: 'Turn off all lights when leaving a room', category: 'energy', co2SavedPerDayKg: 0.2, icon: '💡', difficulty: 'easy' },
  { id: 'h014', name: 'Cold water wash', description: 'Use cold water for laundry instead of hot', category: 'energy', co2SavedPerDayKg: 0.3, icon: '🧺', difficulty: 'easy' },
  { id: 'h015', name: 'Unplug idle electronics', description: 'Unplug chargers and appliances not in use', category: 'energy', co2SavedPerDayKg: 0.1, icon: '🔌', difficulty: 'easy' },
  { id: 'h016', name: 'Short shower (< 5 min)', description: 'Limit shower to under 5 minutes', category: 'energy', co2SavedPerDayKg: 0.4, icon: '🚿', difficulty: 'medium' },
  { id: 'h017', name: 'Air dry clothes', description: 'Skip the dryer and hang clothes to dry', category: 'energy', co2SavedPerDayKg: 0.7, icon: '👕', difficulty: 'easy' },
  { id: 'h018', name: 'Use solar cooker', description: 'Cook one meal using a solar cooker', category: 'energy', co2SavedPerDayKg: 0.5, icon: '☀️', difficulty: 'hard' },

  // Shopping
  { id: 'h019', name: 'Refuse plastic bags', description: 'Carry a reusable bag when shopping', category: 'shopping', co2SavedPerDayKg: 0.05, icon: '👜', difficulty: 'easy' },
  { id: 'h020', name: 'Buy second-hand', description: 'Buy a clothing or household item second-hand', category: 'shopping', co2SavedPerDayKg: 3.0, icon: '🔄', difficulty: 'medium' },
  { id: 'h021', name: 'No online shopping', description: 'Avoid placing delivery orders for a day', category: 'shopping', co2SavedPerDayKg: 0.5, icon: '📦', difficulty: 'medium' },
  { id: 'h022', name: 'Repair instead of replace', description: 'Fix a broken item instead of buying new', category: 'shopping', co2SavedPerDayKg: 2.0, icon: '🔧', difficulty: 'hard' },

  // Waste
  { id: 'h023', name: 'Segregate waste', description: 'Sort waste into wet, dry, and hazardous bins', category: 'waste', co2SavedPerDayKg: 0.2, icon: '🗑️', difficulty: 'easy' },
  { id: 'h024', name: 'Compost kitchen scraps', description: 'Compost vegetable/fruit peels today', category: 'waste', co2SavedPerDayKg: 0.3, icon: '🌿', difficulty: 'medium' },
  { id: 'h025', name: 'Zero single-use plastic', description: 'Avoid all single-use plastic for the day', category: 'waste', co2SavedPerDayKg: 0.15, icon: '🚯', difficulty: 'medium' },
  { id: 'h026', name: 'Print nothing', description: 'Go paperless — avoid printing documents', category: 'waste', co2SavedPerDayKg: 0.05, icon: '📄', difficulty: 'easy' },

  // Digital
  { id: 'h027', name: 'Digital detox hour', description: 'Switch off screens for 1 hour (saves electricity)', category: 'energy', co2SavedPerDayKg: 0.05, icon: '📵', difficulty: 'medium' },
  { id: 'h028', name: 'Video call instead of travel', description: 'Replace a meeting trip with a video call', category: 'transport', co2SavedPerDayKg: 1.5, icon: '💻', difficulty: 'easy' },

  // Water
  { id: 'h029', name: 'Fix a dripping tap', description: 'Repair a leaking tap (saves water heating energy)', category: 'energy', co2SavedPerDayKg: 0.08, icon: '💧', difficulty: 'hard' },
  { id: 'h030', name: 'Collect and reuse water', description: 'Reuse cooking water for plants', category: 'waste', co2SavedPerDayKg: 0.02, icon: '🪣', difficulty: 'easy' },
];

export function getHabitById(habitId) {
  return PRESET_HABITS.find((h) => h.id === habitId) || null;
}

export function getHabitsByCategory(category) {
  return PRESET_HABITS.filter((h) => h.category === category);
}

export const HABIT_CATEGORIES = [
  { id: 'transport', name: 'Transport', icon: '🚌', color: '#3b82f6' },
  { id: 'food', name: 'Food', icon: '🥗', color: '#f59e0b' },
  { id: 'energy', name: 'Energy', icon: '⚡', color: '#eab308' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#a855f7' },
  { id: 'waste', name: 'Waste', icon: '♻️', color: '#f43f5e' },
];
