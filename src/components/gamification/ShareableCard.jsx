import { useRef } from 'react';
import PropTypes from 'prop-types';
import { getLevelForXP } from '../../data/levels.js';
import { formatCO2 } from '../../utils/formatters.js';
import { downloadAsImage } from '../../services/shareService.js';

function ShareableCard({
  xp = 0,
  totalCarbonSavedKg = 0,
  longestStreak = 0,
  weeklyGrade = null,
  topBadge = null,
  onShare,
}) {
  const cardRef = useRef(null);
  const level = getLevelForXP(xp);

  async function handleDownload() {
    if (cardRef.current) {
      const { error } = await downloadAsImage(cardRef.current);
      if (!error && onShare) onShare();
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-gray-900 via-gray-950 to-eco-950 border border-eco-800/30 rounded-2xl p-6 max-w-sm mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl" aria-hidden="true">🌱</span>
          <span className="text-xl font-display font-bold gradient-text">EcoTrace</span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 text-2xl"
            style={{
              backgroundColor: `${level.color}20`,
              borderColor: `${level.color}60`,
            }}
          >
            {level.icon}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Level {level.level}</p>
            <p className="text-lg font-bold text-gray-100">{level.name}</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {weeklyGrade && (
            <div className="bg-gray-800/40 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-eco-400">{weeklyGrade}</p>
              <p className="text-xs text-gray-500">Weekly Grade</p>
            </div>
          )}
          <div className="bg-gray-800/40 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-eco-400">{formatCO2(totalCarbonSavedKg)}</p>
            <p className="text-xs text-gray-500">CO₂ Saved</p>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-400">{longestStreak}</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>
          {topBadge && (
            <div className="bg-gray-800/40 rounded-xl p-3 text-center">
              <p className="text-2xl">{topBadge.icon}</p>
              <p className="text-xs text-gray-500">{topBadge.name}</p>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="text-center text-xs text-gray-600 italic">
          &quot;Track the trace you leave on the planet&quot;
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="btn-primary w-full flex items-center justify-center gap-2"
        aria-label="Download achievement card as image"
      >
        <span aria-hidden="true">📥</span>
        Download Card
      </button>
    </div>
  );
}

ShareableCard.propTypes = {
  xp: PropTypes.number,
  totalCarbonSavedKg: PropTypes.number,
  longestStreak: PropTypes.number,
  weeklyGrade: PropTypes.string,
  topBadge: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
  }),
  onShare: PropTypes.func,
};

export default ShareableCard;
