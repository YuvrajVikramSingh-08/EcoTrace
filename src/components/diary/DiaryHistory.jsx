import { useState } from 'react';
import PropTypes from 'prop-types';
import DiaryEntry from './DiaryEntry.jsx';
import { getRelativeDate } from '../../utils/dateUtils.js';
import EmptyState from '../shared/EmptyState.jsx';

function DiaryHistory({ entries = [], onDelete }) {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'transport', 'food', 'energy', 'shopping', 'waste'];

  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter((e) =>
        e.activities?.some((a) => a.category === filter)
      );

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="📔"
        title="No entries yet"
        description="Start tracking your footprint — describe your day above."
      />
    );
  }

  return (
    <section aria-label="Diary history">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-200">Past Entries</h2>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === cat
                  ? 'bg-eco-600/20 text-eco-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <div key={entry.id}>
            <p className="text-xs font-medium text-gray-500 mb-2">
              {getRelativeDate(entry.date)}
            </p>
            <DiaryEntry
              entry={entry}
              onDelete={onDelete ? () => onDelete(entry.id) : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

DiaryHistory.propTypes = {
  entries: PropTypes.array,
  onDelete: PropTypes.func,
};

export default DiaryHistory;
