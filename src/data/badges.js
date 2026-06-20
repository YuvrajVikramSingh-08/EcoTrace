export const BADGES = [
  // Getting started
  {
    id: 'first_log',
    name: 'First Step',
    icon: '👣',
    description: 'Logged your first diary entry',
    category: 'milestone',
  },
  {
    id: 'profile_complete',
    name: 'Know Thyself',
    icon: '🧾',
    description: 'Completed your carbon profile',
    category: 'milestone',
  },
  {
    id: 'first_habit',
    name: 'New Habit',
    icon: '✅',
    description: 'Completed a habit for the first time',
    category: 'habit',
  },
  {
    id: 'first_chat',
    name: 'Ask the Coach',
    icon: '💬',
    description: 'Had your first EcoCoach conversation',
    category: 'coach',
  },

  // Streaks
  {
    id: 'streak_3',
    name: 'Getting Warmed Up',
    icon: '🔥',
    description: '3-day diary streak',
    category: 'streak',
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    icon: '🔥🔥',
    description: '7-day diary streak',
    category: 'streak',
  },
  {
    id: 'streak_30',
    name: 'Habit Machine',
    icon: '💪',
    description: '30-day diary streak',
    category: 'streak',
  },

  // Carbon reduction
  {
    id: 'below_avg_day',
    name: 'Below Average',
    icon: '📉',
    description: 'Had a day below India national average',
    category: 'carbon',
  },
  {
    id: 'saved_1kg',
    name: 'First Kilogram',
    icon: '🌿',
    description: 'Saved 1 kg CO₂ total',
    category: 'carbon',
  },
  {
    id: 'saved_10kg',
    name: 'Ten Down',
    icon: '🌳',
    description: 'Saved 10 kg CO₂ total',
    category: 'carbon',
  },
  {
    id: 'saved_50kg',
    name: 'Forest Maker',
    icon: '🌲',
    description: 'Saved 50 kg CO₂ total',
    category: 'carbon',
  },
  {
    id: 'saved_100kg',
    name: 'Climate Champion',
    icon: '🏆',
    description: 'Saved 100 kg CO₂ total',
    category: 'carbon',
  },

  // Transport
  {
    id: 'no_car_day',
    name: 'Car Free',
    icon: '🚶',
    description: 'Logged a day with no personal vehicle',
    category: 'transport',
  },
  {
    id: 'public_transport',
    name: 'Metro Rider',
    icon: '🚇',
    description: 'Used public transport instead of car',
    category: 'transport',
  },

  // Food
  {
    id: 'veg_day',
    name: 'Veggie Day',
    icon: '🥦',
    description: 'Logged a fully plant-based day',
    category: 'food',
  },
  {
    id: 'veg_week',
    name: 'Green Plate',
    icon: '🌱',
    description: '7 plant-based days',
    category: 'food',
  },

  // Challenges
  {
    id: 'challenge_7',
    name: 'Week Done',
    icon: '🎯',
    description: 'Completed a 7-day challenge',
    category: 'challenge',
  },
  {
    id: 'challenge_30',
    name: 'Month Strong',
    icon: '🏅',
    description: 'Completed a 30-day challenge',
    category: 'challenge',
  },

  // Social
  {
    id: 'first_share',
    name: 'Spread the Word',
    icon: '📢',
    description: 'Shared your first achievement card',
    category: 'social',
  },

  // Report
  {
    id: 'grade_a',
    name: 'Top of the Class',
    icon: '🌟',
    description: 'Received an A or A+ weekly grade',
    category: 'report',
  },
];

export function getBadgeById(badgeId) {
  return BADGES.find((b) => b.id === badgeId) || null;
}

export function getBadgesByCategory(category) {
  return BADGES.filter((b) => b.category === category);
}
