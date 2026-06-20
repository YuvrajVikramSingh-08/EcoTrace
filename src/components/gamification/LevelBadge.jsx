import PropTypes from 'prop-types';
import { getLevelForXP } from '../../data/levels.js';

function LevelBadge({ xp = 0, size = 'md' }) {
  const level = getLevelForXP(xp);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-3xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2`}
        style={{
          backgroundColor: `${level.color}20`,
          borderColor: `${level.color}60`,
        }}
        aria-label={`Level ${level.level}: ${level.name}`}
      >
        <span aria-hidden="true">{level.icon}</span>
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Level {level.level}</p>
        <p className="font-semibold text-gray-200">{level.name}</p>
      </div>
    </div>
  );
}

LevelBadge.propTypes = {
  xp: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default LevelBadge;
