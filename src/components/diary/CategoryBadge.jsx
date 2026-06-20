import PropTypes from 'prop-types';
import { getCategoryBadgeClass } from '../../utils/formatters.js';

function CategoryBadge({ category }) {
  const labels = {
    transport: '🚗 Transport',
    food: '🍽️ Food',
    energy: '⚡ Energy',
    shopping: '🛍️ Shopping',
    waste: '♻️ Waste',
  };

  return (
    <span className={getCategoryBadgeClass(category)}>
      {labels[category] || category}
    </span>
  );
}

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryBadge;
