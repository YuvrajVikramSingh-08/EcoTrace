import PropTypes from 'prop-types';

function ChallengeCard({ challenge, active = null, onStart }) {
  const isActive = active?.status === 'active';
  const isCompleted = active?.status === 'completed';
  const progress = active ? (active.completedDays / challenge.duration) * 100 : 0;

  return (
    <div className={`glass-card p-5 ${isCompleted ? 'border-eco-600/30' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-200">{challenge.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{challenge.description}</p>
        </div>
        <span className="badge bg-eco-600/15 text-eco-400 border border-eco-600/20">
          {challenge.duration} days
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        <span>🏆 {challenge.xpReward} XP</span>
        <span>🌿 Save ~{challenge.co2TargetSavingKg} kg CO₂</span>
      </div>

      {isActive && (
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Progress</span>
            <span className="text-eco-400 font-medium">
              {active.completedDays}/{challenge.duration} days
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-eco-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {isCompleted ? (
        <span className="badge bg-eco-600/15 text-eco-400">✅ Completed</span>
      ) : isActive ? (
        <span className="badge bg-amber-500/15 text-amber-400">🔄 In Progress</span>
      ) : (
        <button onClick={() => onStart && onStart(challenge.id)} className="btn-primary text-sm">
          Start Challenge
        </button>
      )}
    </div>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.number,
    xpReward: PropTypes.number,
    co2TargetSavingKg: PropTypes.number,
  }).isRequired,
  active: PropTypes.object,
  onStart: PropTypes.func,
};

export default ChallengeCard;
