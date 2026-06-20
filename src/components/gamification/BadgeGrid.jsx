import PropTypes from 'prop-types';
import { BADGES } from '../../data/badges.js';

function BadgeGrid({ unlockedBadgeIds = [] }) {
  const categories = [...new Set(BADGES.map((b) => b.category))];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const badges = BADGES.filter((b) => b.category === category);
        return (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {badges.map((badge) => {
                const isUnlocked = unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`glass-card p-3 flex flex-col items-center text-center transition-all duration-300 ${
                      isUnlocked
                        ? 'border-eco-600/30 hover:border-eco-500/50'
                        : 'opacity-40 grayscale'
                    }`}
                    title={isUnlocked ? badge.description : `🔒 ${badge.description}`}
                  >
                    <span className="text-2xl mb-1" aria-hidden="true">{badge.icon}</span>
                    <p className="text-xs font-medium text-gray-300 leading-tight">{badge.name}</p>
                    {!isUnlocked && (
                      <p className="text-[10px] text-gray-600 mt-1">🔒 Locked</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

BadgeGrid.propTypes = {
  unlockedBadgeIds: PropTypes.arrayOf(PropTypes.string),
};

export default BadgeGrid;
