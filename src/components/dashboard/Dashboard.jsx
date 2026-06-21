import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import StatsCards from './StatsCards.jsx';
import WeeklyReportCard from './WeeklyReportCard.jsx';
import VirtualTree from '../gamification/VirtualTree.jsx';
import CarbonSavingsBank from '../gamification/CarbonSavingsBank.jsx';
import XPBar from '../gamification/XPBar.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';

const CarbonTrendChart = React.lazy(() => import('./CarbonTrendChart.jsx'));
const CategoryPieChart = React.lazy(() => import('./CategoryPieChart.jsx'));
const NationalComparison = React.lazy(() => import('./NationalComparison.jsx'));

function Dashboard({
  todayCO2 = 0,
  weekCO2 = 0,
  totalSaved = 0,
  streak = 0,
  trendData = [],
  categoryData = [],
  userAvg = 0,
  weeklyReport = null,
  reportLoading = false,
  onGenerateReport,
  xp = 0,
  totalCarbonSavedKg = 0,
  activeHabits = [],
  onHabitCheckIn,
  todayCompletions = [],
}) {
  return (
    <div className="space-y-6">
      <StatsCards
        todayCO2={todayCO2}
        weekCO2={weekCO2}
        totalSaved={totalSaved}
        streak={streak}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div className="glass-card h-[300px] flex items-center justify-center"><LoadingSpinner size="md" /></div>}>
            <CarbonTrendChart data={trendData} />
          </Suspense>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div className="glass-card h-[300px] flex items-center justify-center"><LoadingSpinner size="md" /></div>}>
              <CategoryPieChart data={categoryData} />
            </Suspense>
            <Suspense fallback={<div className="glass-card h-[300px] flex items-center justify-center"><LoadingSpinner size="md" /></div>}>
              <NationalComparison userAvg={userAvg} />
            </Suspense>
          </div>

          <WeeklyReportCard
            report={weeklyReport}
            loading={reportLoading}
            onGenerate={onGenerateReport}
          />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="glass-card p-5 flex flex-col items-center">
            <VirtualTree totalCarbonSavedKg={totalCarbonSavedKg} size="md" />
          </div>

          <CarbonSavingsBank totalCarbonSavedKg={totalCarbonSavedKg} />

          <div className="glass-card p-5">
            <XPBar xp={xp} />
          </div>

          {/* Today's habits */}
          {activeHabits.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Today&apos;s Habits
              </h3>
              <div className="space-y-2">
                {activeHabits.slice(0, 5).map((habit) => {
                  const done = todayCompletions.includes(habit.id);
                  return (
                    <div key={habit.id} className="flex items-center gap-3">
                      <button
                        onClick={() => !done && onHabitCheckIn(habit.id)}
                        disabled={done}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                          done
                            ? 'bg-eco-600/20 border-eco-600/40 text-eco-400'
                            : 'border-gray-700 hover:border-eco-600/40 text-gray-600 hover:text-eco-400'
                        }`}
                        aria-label={done ? `${habit.name} completed` : `Complete ${habit.name}`}
                      >
                        {done ? '✓' : ''}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                          {habit.icon} {habit.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  todayCO2: PropTypes.number,
  weekCO2: PropTypes.number,
  totalSaved: PropTypes.number,
  streak: PropTypes.number,
  trendData: PropTypes.array,
  categoryData: PropTypes.array,
  userAvg: PropTypes.number,
  weeklyReport: PropTypes.object,
  reportLoading: PropTypes.bool,
  onGenerateReport: PropTypes.func,
  xp: PropTypes.number,
  totalCarbonSavedKg: PropTypes.number,
  activeHabits: PropTypes.array,
  onHabitCheckIn: PropTypes.func,
  todayCompletions: PropTypes.array,
};

export default Dashboard;
