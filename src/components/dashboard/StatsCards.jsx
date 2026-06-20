import PropTypes from 'prop-types';
import { formatCO2 } from '../../utils/formatters.js';

function StatsCards({ todayCO2 = 0, weekCO2 = 0, totalSaved = 0, streak = 0 }) {
  const cards = [
    { label: "Today's CO₂", value: formatCO2(todayCO2), icon: '📊', color: 'from-blue-500/10 to-blue-600/5' },
    { label: 'This Week', value: formatCO2(weekCO2), icon: '📅', color: 'from-purple-500/10 to-purple-600/5' },
    { label: 'Total Saved', value: formatCO2(totalSaved), icon: '🌿', color: 'from-eco-500/10 to-eco-600/5' },
    { label: 'Active Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, icon: '🔥', color: 'from-amber-500/10 to-amber-600/5' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`glass-card p-4 bg-gradient-to-br ${card.color} animate-fade-in`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" aria-hidden="true">{card.icon}</span>
            <span className="text-xs text-gray-400 font-medium">{card.label}</span>
          </div>
          <p className="text-xl font-bold text-gray-100">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

StatsCards.propTypes = {
  todayCO2: PropTypes.number,
  weekCO2: PropTypes.number,
  totalSaved: PropTypes.number,
  streak: PropTypes.number,
};

export default StatsCards;
