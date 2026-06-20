import PropTypes from 'prop-types';

function HabitCard({ habit, isCompleted = false, onCheckIn, onRemove }) {
  return (
    <div className={`glass-card-hover p-4 flex items-center gap-4 ${isCompleted ? 'opacity-70' : ''}`}>
      <button
        onClick={() => !isCompleted && onCheckIn && onCheckIn(habit.id)}
        disabled={isCompleted}
        className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all flex-shrink-0 ${
          isCompleted
            ? 'bg-eco-600/20 border-eco-600/40 text-eco-400'
            : 'border-gray-700 hover:border-eco-500 text-gray-600 hover:text-eco-400 hover:bg-eco-600/10'
        }`}
        aria-label={isCompleted ? `${habit.name} completed` : `Complete ${habit.name}`}
      >
        {isCompleted ? '✓' : ''}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">{habit.icon}</span>
          <p className={`text-sm font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
            {habit.name}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{habit.description}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-sm font-semibold text-eco-400">-{habit.co2SavedPerDayKg} kg</p>
        <p className="text-xs text-gray-600">CO₂/day</p>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(habit.id)}
          className="text-gray-600 hover:text-red-400 transition-colors ml-1"
          aria-label={`Remove ${habit.name}`}
        >
          ✕
        </button>
      )}
    </div>
  );
}

HabitCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
    co2SavedPerDayKg: PropTypes.number,
  }).isRequired,
  isCompleted: PropTypes.bool,
  onCheckIn: PropTypes.func,
  onRemove: PropTypes.func,
};

export default HabitCard;
