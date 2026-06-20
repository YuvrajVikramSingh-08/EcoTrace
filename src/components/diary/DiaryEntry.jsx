import PropTypes from 'prop-types';
import CategoryBadge from './CategoryBadge.jsx';
import { formatCO2 } from '../../utils/formatters.js';

function DiaryEntry({ entry, onSave, onDelete, showSave = false }) {
  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold gradient-text">
            {formatCO2(entry.totalCO2Kg)}
          </span>
          <span className="text-sm text-gray-500">total CO₂</span>
        </div>
        {entry.totalCO2Kg < 5.2 ? (
          <span className="badge bg-eco-500/15 text-eco-400 border border-eco-500/20">
            📉 Below average
          </span>
        ) : (
          <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/20">
            📈 Above average
          </span>
        )}
      </div>

      <div className="space-y-3">
        {entry.activities?.map((activity, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-xl"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-200">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <CategoryBadge category={activity.category} />
                <span className="text-xs text-gray-500">
                  {activity.quantity} {activity.unit}
                </span>
                <span
                  className={`text-xs ${
                    activity.confidence === 'high'
                      ? 'confidence-high'
                      : activity.confidence === 'medium'
                      ? 'confidence-medium'
                      : 'confidence-low'
                  }`}
                >
                  • {activity.confidence} confidence
                </span>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-300 whitespace-nowrap">
              {formatCO2(activity.co2Kg)}
            </span>
          </div>
        ))}
      </div>

      {/* Accessible table fallback */}
      <table className="sr-only">
        <caption>Diary entry activities</caption>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Category</th>
            <th>CO₂ (kg)</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {entry.activities?.map((a, i) => (
            <tr key={i}>
              <td>{a.description}</td>
              <td>{a.category}</td>
              <td>{a.co2Kg}</td>
              <td>{a.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {(showSave || onDelete) && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800/50">
          {showSave && onSave && (
            <button onClick={onSave} className="btn-primary flex items-center gap-2">
              <span aria-hidden="true">💾</span>
              Save Entry
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="btn-ghost text-red-400">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

DiaryEntry.propTypes = {
  entry: PropTypes.shape({
    totalCO2Kg: PropTypes.number,
    activities: PropTypes.array,
  }).isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  showSave: PropTypes.bool,
};

export default DiaryEntry;
