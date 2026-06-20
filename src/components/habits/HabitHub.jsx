import PropTypes from 'prop-types';
import HabitCard from './HabitCard.jsx';
import HabitLibrary from './HabitLibrary.jsx';
import CustomHabitForm from './CustomHabitForm.jsx';
import ChallengeCard from './ChallengeCard.jsx';
import EmptyState from '../shared/EmptyState.jsx';
import { CHALLENGES } from '../../data/challenges.js';

function HabitHub({
  activeHabits = [],
  todayCompletions = [],
  activeHabitIds = [],
  activeChallenges = [],
  onCheckIn,
  onAdd,
  onRemove,
  onCreateCustom,
  onStartChallenge,
  customHabitLoading = false,
  activeTab = 'my-habits',
  onTabChange,
}) {
  const tabs = [
    { id: 'my-habits', label: 'My Habits', icon: '✅' },
    { id: 'library', label: 'Library', icon: '📚' },
    { id: 'challenges', label: 'Challenges', icon: '🎯' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900/40 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-eco-600/15 text-eco-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* My Habits */}
      {activeTab === 'my-habits' && (
        <section aria-label="Your active habits">
          {activeHabits.length === 0 ? (
            <EmptyState
              icon="🌿"
              title="No habits yet"
              description="Add your first green habit from the library."
              action="Browse Library"
              onAction={() => onTabChange('library')}
            />
          ) : (
            <div className="space-y-3">
              {activeHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCompleted={todayCompletions.includes(habit.id)}
                  onCheckIn={onCheckIn}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Library */}
      {activeTab === 'library' && (
        <section aria-label="Habit library">
          <HabitLibrary activeHabitIds={activeHabitIds} onAdd={onAdd} />
          <div className="mt-6">
            <CustomHabitForm onSubmit={onCreateCustom} loading={customHabitLoading} />
          </div>
        </section>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <section aria-label="Challenges">
          <div className="space-y-4">
            {[7, 14, 30].map((duration) => (
              <div key={duration}>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                  {duration}-Day Challenges
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CHALLENGES.filter((c) => c.duration === duration).map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      active={activeChallenges.find((ac) => ac.challengeId === challenge.id)}
                      onStart={onStartChallenge}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

HabitHub.propTypes = {
  activeHabits: PropTypes.array,
  todayCompletions: PropTypes.array,
  activeHabitIds: PropTypes.array,
  activeChallenges: PropTypes.array,
  onCheckIn: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onCreateCustom: PropTypes.func,
  onStartChallenge: PropTypes.func,
  customHabitLoading: PropTypes.bool,
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
};

export default HabitHub;
