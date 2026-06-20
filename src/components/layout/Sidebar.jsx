import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/diary', label: 'EcoDiary', icon: '📝' },
  { to: '/coach', label: 'EcoCoach', icon: '💬' },
  { to: '/habits', label: 'Habits', icon: '🌿' },
  { to: '/rewards', label: 'Rewards', icon: '🏆' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-900/40 border-r border-gray-800/50 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800/50">
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <span className="text-2xl" role="img" aria-label="leaf">🌱</span>
          <span className="text-xl font-display font-bold gradient-text">EcoTrace</span>
        </NavLink>
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-eco-600/15 text-eco-400 border border-eco-600/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`
            }
          >
            <span className="text-lg" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-gray-500">EcoTrace v1.0</p>
          <p className="text-xs text-gray-600 mt-1">Track your trace 🌍</p>
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
