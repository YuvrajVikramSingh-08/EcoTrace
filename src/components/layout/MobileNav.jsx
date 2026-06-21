import { NavLink } from 'react-router-dom';

const MOBILE_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: '📊' },
  { to: '/diary', label: 'Diary', icon: '📝' },
  { to: '/coach', label: 'Coach', icon: '💬' },
  { to: '/habits', label: 'Habits', icon: '🌿' },
  { to: '/rewards', label: 'Rewards', icon: '🏆' },
];

function MobileNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-xl border-t border-gray-800/50"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {MOBILE_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-eco-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <span className="text-lg" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;
