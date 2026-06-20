import { useState } from 'react';
import PropTypes from 'prop-types';
import { PRESET_HABITS, HABIT_CATEGORIES } from '../../data/habits.js';

function HabitLibrary({ activeHabitIds = [], onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredHabits = selectedCategory === 'all'
    ? PRESET_HABITS
    : PRESET_HABITS.filter((h) => h.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-eco-600/20 text-eco-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          All
        </button>
        {HABIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-eco-600/20 text-eco-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredHabits.map((habit) => {
          const isActive = activeHabitIds.includes(habit.id);
          return (
            <div key={habit.id} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl" aria-hidden="true">{habit.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{habit.name}</p>
                    <p className="text-xs text-gray-500 truncate">{habit.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <span className="text-xs text-eco-400 font-medium">-{habit.co2SavedPerDayKg} kg/day</span>
                  <span className={`badge-${habit.difficulty}`}>{habit.difficulty}</span>
                </div>
                <button
                  onClick={() => onAdd(habit.id)}
                  disabled={isActive}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-eco-600/15 text-eco-400 hover:bg-eco-600/25'
                  }`}
                >
                  {isActive ? 'Added' : '+ Add'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

HabitLibrary.propTypes = {
  activeHabitIds: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
};

export default HabitLibrary;
