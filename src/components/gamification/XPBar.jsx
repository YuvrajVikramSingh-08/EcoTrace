import PropTypes from 'prop-types';
import { getLevelForXP, getXPProgress } from '../../data/levels.js';
import { formatXP } from '../../utils/formatters.js';

function XPBar({ xp = 0, showLabel = true }) {
  const level = getLevelForXP(xp);
  const progress = getXPProgress(xp);

  return (
    <div className="space-y-2" role="progressbar" aria-valuenow={progress.percentage} aria-valuemin="0" aria-valuemax="100" aria-label={`XP Progress: ${formatXP(xp)}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">{level.icon}</span>
            <span className="font-medium text-gray-200">{level.name}</span>
          </div>
          <span className="text-gray-400">{formatXP(xp)}</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          style={{
            width: `${progress.percentage}%`,
            backgroundColor: level.color,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 text-right">
          {progress.current} / {progress.total === Infinity ? '∞' : progress.total} XP to next level
        </p>
      )}
    </div>
  );
}

XPBar.propTypes = {
  xp: PropTypes.number,
  showLabel: PropTypes.bool,
};

export default XPBar;
