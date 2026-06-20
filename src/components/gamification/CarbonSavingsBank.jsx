import PropTypes from 'prop-types';
import { formatCO2, treesEquivalent } from '../../utils/formatters.js';

function CarbonSavingsBank({ totalCarbonSavedKg = 0 }) {
  const trees = treesEquivalent(totalCarbonSavedKg);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
        Carbon Savings Bank
      </h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-display font-bold gradient-text">
          {formatCO2(totalCarbonSavedKg)}
        </span>
        <span className="text-sm text-gray-500 mb-1">saved</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span aria-hidden="true">🌳</span>
        <span>
          Equivalent of{' '}
          <span className="text-eco-400 font-semibold">{trees}</span> trees this
          year
        </span>
      </div>
    </div>
  );
}

CarbonSavingsBank.propTypes = {
  totalCarbonSavedKg: PropTypes.number,
};

export default CarbonSavingsBank;
