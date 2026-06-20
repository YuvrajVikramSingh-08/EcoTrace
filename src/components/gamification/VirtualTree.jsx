import PropTypes from 'prop-types';

const TREE_STAGES = [
  { min: 0, max: 4.9, name: 'Sprout' },
  { min: 5, max: 19.9, name: 'Seedling' },
  { min: 20, max: 49.9, name: 'Sapling' },
  { min: 50, max: 99.9, name: 'Tree' },
  { min: 100, max: Infinity, name: 'Mighty Oak' },
];

function getStage(kgSaved) {
  for (let i = TREE_STAGES.length - 1; i >= 0; i--) {
    if (kgSaved >= TREE_STAGES[i].min) return i;
  }
  return 0;
}

function VirtualTree({ totalCarbonSavedKg = 0, size = 'md' }) {
  const stage = getStage(totalCarbonSavedKg);
  const stageInfo = TREE_STAGES[stage];

  const dimensions = {
    sm: { width: 120, height: 140 },
    md: { width: 200, height: 220 },
    lg: { width: 280, height: 300 },
  };

  const { width, height } = dimensions[size];
  const cx = width / 2;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="transition-all duration-1000"
        role="img"
        aria-label={`Virtual tree at ${stageInfo.name} stage. ${totalCarbonSavedKg.toFixed(1)} kg CO₂ saved.`}
      >
        {/* Ground */}
        <ellipse
          cx={cx}
          cy={height - 15}
          rx={width * 0.35}
          ry={8}
          fill="#1a472a"
          opacity="0.6"
          className="transition-all duration-700"
        />

        {/* Stage 0: Sprout */}
        {stage >= 0 && (
          <g className="animate-grow" style={{ transformOrigin: `${cx}px ${height - 20}px` }}>
            {/* Stem */}
            <rect
              x={cx - 2}
              y={height - 55}
              width={4}
              height={35}
              rx={2}
              fill="#4ade80"
              className="transition-all duration-700"
            />
            {/* Leaves */}
            <ellipse cx={cx - 10} cy={height - 55} rx={8} ry={5} fill="#22c55e" transform={`rotate(-30 ${cx - 10} ${height - 55})`} />
            <ellipse cx={cx + 10} cy={height - 55} rx={8} ry={5} fill="#16a34a" transform={`rotate(30 ${cx + 10} ${height - 55})`} />
          </g>
        )}

        {/* Stage 1: Seedling */}
        {stage >= 1 && (
          <g className="animate-grow" style={{ transformOrigin: `${cx}px ${height - 20}px` }}>
            <rect x={cx - 3} y={height - 80} width={6} height={25} rx={3} fill="#15803d" />
            <ellipse cx={cx - 15} cy={height - 70} rx={10} ry={6} fill="#22c55e" transform={`rotate(-25 ${cx - 15} ${height - 70})`} />
            <ellipse cx={cx + 15} cy={height - 70} rx={10} ry={6} fill="#16a34a" transform={`rotate(25 ${cx + 15} ${height - 70})`} />
            <ellipse cx={cx - 8} cy={height - 82} rx={9} ry={5} fill="#4ade80" transform={`rotate(-15 ${cx - 8} ${height - 82})`} />
            <ellipse cx={cx + 8} cy={height - 82} rx={9} ry={5} fill="#22c55e" transform={`rotate(15 ${cx + 8} ${height - 82})`} />
          </g>
        )}

        {/* Stage 2: Sapling */}
        {stage >= 2 && (
          <g className="animate-grow" style={{ transformOrigin: `${cx}px ${height - 20}px` }}>
            <rect x={cx - 5} y={height - 120} width={10} height={40} rx={4} fill="#713f12" />
            <circle cx={cx} cy={height - 115} r={25} fill="#16a34a" opacity="0.9" />
            <circle cx={cx - 12} cy={height - 105} r={15} fill="#22c55e" opacity="0.8" />
            <circle cx={cx + 15} cy={height - 110} r={18} fill="#15803d" opacity="0.85" />
          </g>
        )}

        {/* Stage 3: Tree */}
        {stage >= 3 && (
          <g className="animate-grow" style={{ transformOrigin: `${cx}px ${height - 20}px` }}>
            <rect x={cx - 8} y={height - 155} width={16} height={35} rx={5} fill="#92400e" />
            <rect x={cx - 20} y={height - 30} width={4} height={12} rx={2} fill="#78350f" transform={`rotate(40 ${cx - 20} ${height - 30})`} />
            <rect x={cx + 16} y={height - 30} width={4} height={12} rx={2} fill="#78350f" transform={`rotate(-40 ${cx + 16} ${height - 30})`} />
            <circle cx={cx} cy={height - 155} r={35} fill="#15803d" opacity="0.9" />
            <circle cx={cx - 20} cy={height - 140} r={22} fill="#16a34a" opacity="0.85" />
            <circle cx={cx + 22} cy={height - 145} r={25} fill="#166534" opacity="0.85" />
            <circle cx={cx} cy={height - 170} r={20} fill="#22c55e" opacity="0.8" />
          </g>
        )}

        {/* Stage 4: Mighty Oak */}
        {stage >= 4 && (
          <g className="animate-grow" style={{ transformOrigin: `${cx}px ${height - 20}px` }}>
            <rect x={cx - 12} y={height - 190} width={24} height={45} rx={6} fill="#78350f" />
            {/* Roots */}
            <path d={`M${cx - 12} ${height - 25} Q${cx - 35} ${height - 15} ${cx - 40} ${height - 5}`} stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d={`M${cx + 12} ${height - 25} Q${cx + 35} ${height - 15} ${cx + 40} ${height - 5}`} stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Canopy */}
            <circle cx={cx} cy={height - 190} r={45} fill="#166534" opacity="0.9" />
            <circle cx={cx - 28} cy={height - 175} r={30} fill="#15803d" opacity="0.85" />
            <circle cx={cx + 30} cy={height - 180} r={32} fill="#14532d" opacity="0.85" />
            <circle cx={cx - 10} cy={height - 215} r={25} fill="#16a34a" opacity="0.8" />
            <circle cx={cx + 15} cy={height - 210} r={28} fill="#22c55e" opacity="0.75" />
            <circle cx={cx} cy={height - 230} r={18} fill="#4ade80" opacity="0.7" />
          </g>
        )}
      </svg>

      <div className="text-center mt-2">
        <p className="text-sm font-medium text-gray-300">{stageInfo.name}</p>
        <p className="text-xs text-gray-500">{totalCarbonSavedKg.toFixed(1)} kg CO₂ saved</p>
      </div>
    </div>
  );
}

VirtualTree.propTypes = {
  totalCarbonSavedKg: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default VirtualTree;
