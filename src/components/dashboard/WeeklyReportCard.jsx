import PropTypes from 'prop-types';
import { getGradeColor } from '../../utils/formatters.js';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';

function WeeklyReportCard({ report = null, loading = false, onGenerate }) {
  if (loading) {
    return (
      <div className="glass-card p-5 flex items-center justify-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Weekly Report
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          No report yet for this week. Generate one to see your grade and personalised insights.
        </p>
        <button onClick={onGenerate} className="btn-primary flex items-center gap-2">
          <span aria-hidden="true">📊</span>
          Generate Report
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Weekly Report
        </h3>
        <span className={`text-3xl font-display font-bold ${getGradeColor(report.grade)}`}>
          {report.grade}
        </span>
      </div>

      <p className="text-sm text-gray-300 mb-4 leading-relaxed">{report.aiSummary}</p>

      {report.actions && report.actions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium uppercase">Recommended Actions</p>
          {report.actions.map((action, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-200">{action.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.detail}</p>
              <p className="text-xs text-eco-400 mt-1">
                Potential saving: {action.estimatedSavingKg} kg/week
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

WeeklyReportCard.propTypes = {
  report: PropTypes.object,
  loading: PropTypes.bool,
  onGenerate: PropTypes.func,
};

export default WeeklyReportCard;
