import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { INDIA_NATIONAL_AVG_KG_PER_DAY } from '../../data/carbonFactors.js';

function CarbonTrendChart({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
        Daily CO₂ Trend (Last 14 Days)
      </h3>

      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickFormatter={(d) => d.slice(5)}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                unit=" kg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#f3f4f6',
                }}
                labelFormatter={(l) => `Date: ${l}`}
                formatter={(v) => [`${v.toFixed(1)} kg`, 'CO₂']}
              />
              <ReferenceLine
                y={INDIA_NATIONAL_AVG_KG_PER_DAY}
                stroke="#f59e0b"
                strokeDasharray="5 5"
                label={{
                  value: 'India Avg',
                  position: 'right',
                  fill: '#f59e0b',
                  fontSize: 11,
                }}
              />
              <Line
                type="monotone"
                dataKey="co2Kg"
                stroke="#16c35e"
                strokeWidth={2.5}
                dot={{ fill: '#16c35e', r: 4 }}
                activeDot={{ r: 6, stroke: '#16c35e', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Accessible table fallback */}
          <table className="sr-only">
            <caption>Daily CO₂ emissions over the last 14 days</caption>
            <thead><tr><th>Date</th><th>CO₂ (kg)</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.date}><td>{d.date}</td><td>{d.co2Kg}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm">
          Log diary entries to see your trend chart
        </div>
      )}
    </div>
  );
}

CarbonTrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      co2Kg: PropTypes.number,
    })
  ),
};

export default CarbonTrendChart;
