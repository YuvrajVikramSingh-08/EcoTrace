export const CHALLENGES = [
  // 7-day challenges
  {
    id: 'c001',
    name: 'Car-Free Week',
    duration: 7,
    habitIds: ['h001', 'h002', 'h005'],
    description:
      'No personal vehicle for 7 days. Public transport and walking only.',
    xpReward: 75,
    co2TargetSavingKg: 15,
  },
  {
    id: 'c002',
    name: 'Plant-Based Week',
    duration: 7,
    habitIds: ['h006', 'h007', 'h008'],
    description: 'Eat vegetarian or vegan for 7 consecutive days.',
    xpReward: 75,
    co2TargetSavingKg: 10,
  },
  {
    id: 'c003',
    name: 'Energy Saver Week',
    duration: 7,
    habitIds: ['h011', 'h013', 'h015', 'h017'],
    description: '7 days of conscious energy reduction at home.',
    xpReward: 75,
    co2TargetSavingKg: 8,
  },

  // 14-day challenges
  {
    id: 'c004',
    name: 'Plastic-Free Fortnight',
    duration: 14,
    habitIds: ['h019', 'h025'],
    description:
      '14 days of zero single-use plastic and bag refusal.',
    xpReward: 150,
    co2TargetSavingKg: 5,
  },
  {
    id: 'c005',
    name: 'Public Transport Pro',
    duration: 14,
    habitIds: ['h001', 'h003'],
    description: '14 days of buses, metros, and carpooling.',
    xpReward: 150,
    co2TargetSavingKg: 25,
  },
  {
    id: 'c006',
    name: 'Mindful Consumption',
    duration: 14,
    habitIds: ['h019', 'h020', 'h021', 'h022'],
    description: '14 days of conscious, low-carbon shopping.',
    xpReward: 150,
    co2TargetSavingKg: 12,
  },

  // 30-day challenges
  {
    id: 'c007',
    name: 'No AC September',
    duration: 30,
    habitIds: ['h012', 'h011'],
    description:
      '30 days of fans, cross-ventilation, and minimal AC.',
    xpReward: 300,
    co2TargetSavingKg: 45,
  },
  {
    id: 'c008',
    name: 'Green Commute Month',
    duration: 30,
    habitIds: ['h001', 'h002', 'h004'],
    description: '30 days of sustainable transport choices.',
    xpReward: 300,
    co2TargetSavingKg: 60,
  },
  {
    id: 'c009',
    name: 'Zero Waste Month',
    duration: 30,
    habitIds: ['h023', 'h024', 'h025', 'h026'],
    description:
      '30 days of waste segregation, composting, and minimal trash.',
    xpReward: 300,
    co2TargetSavingKg: 15,
  },
];

export function getChallengeById(challengeId) {
  return CHALLENGES.find((c) => c.id === challengeId) || null;
}

export function getChallengesByDuration(duration) {
  return CHALLENGES.filter((c) => c.duration === duration);
}
