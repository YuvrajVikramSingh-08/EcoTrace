import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getCategoryColor } from '../../utils/formatters.js';

function CategoryPieChart({ data = [] }) {
  const COLORS = data.map((d) => getCategoryColor(d.category));

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
        CO₂ by Category (This Week)
      </h3>

      {data.length > 0 ? (
        <>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  nameKey="category"
                  paddingAngle={3}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#f3f4f6',
                  }}
                  formatter={(v) => [`${v.toFixed(1)} kg`, 'CO₂']}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-2">
              {data.map((item, idx) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx] }}
                  />
                  <span className="text-xs text-gray-400 capitalize flex-1">{item.category}</span>
                  <span className="text-xs font-medium text-gray-300">
                    {item.value.toFixed(1)} kg
                  </span>
                </div>
              ))}
            </div>
          </div>

          <table className="sr-only">
            <caption>CO₂ by category this week</caption>
            <thead><tr><th>Category</th><th>CO₂ (kg)</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.category}><td>{d.category}</td><td>{d.value}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="h-[180px] flex items-center justify-center text-gray-500 text-sm">
          No data yet for this week
        </div>
      )}
    </div>
  );
}

CategoryPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};

export default CategoryPieChart;
