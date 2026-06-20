import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { INDIA_NATIONAL_AVG_KG_PER_DAY, GLOBAL_AVG_KG_PER_DAY } from '../../data/carbonFactors.js';

function NationalComparison({ userAvg = 0 }) {
  const data = [
    { name: 'You', value: userAvg, color: userAvg < INDIA_NATIONAL_AVG_KG_PER_DAY ? '#16c35e' : '#f59e0b' },
    { name: 'India Avg', value: INDIA_NATIONAL_AVG_KG_PER_DAY, color: '#6b7280' },
    { name: 'Global Avg', value: GLOBAL_AVG_KG_PER_DAY, color: '#374151' },
  ];

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
        Your Footprint vs Average
      </h3>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} unit=" kg" />
          <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} width={80} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', color: '#f3f4f6' }}
            formatter={(v) => [`${v.toFixed(1)} kg/day`, 'CO₂']}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <table className="sr-only">
        <caption>Daily CO₂ comparison</caption>
        <thead><tr><th>Source</th><th>CO₂ (kg/day)</th></tr></thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.name}><td>{d.name}</td><td>{d.value}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

NationalComparison.propTypes = {
  userAvg: PropTypes.number,
};

export default NationalComparison;
