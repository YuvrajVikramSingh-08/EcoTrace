import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { UserDataContext } from '../../contexts/UserDataContext.jsx';
import { getLevelForXP, getXPProgress } from '../../data/levels.js';
import { formatXP } from '../../utils/formatters.js';

function Navbar() {
  const { currentUser } = useAuth();
  const { userData } = useContext(UserDataContext);

  const xp = userData?.xp || 0;
  const level = getLevelForXP(xp);
  const progress = getXPProgress(xp);

  return (
    <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-3 lg:hidden">
          <span className="text-xl" role="img" aria-label="leaf">🌱</span>
          <span className="text-lg font-display font-bold gradient-text">EcoTrace</span>
        </div>

        <div className="hidden lg:block">
          <h2 className="text-sm text-gray-400">Welcome back,</h2>
          <p className="text-sm font-medium text-gray-200">
            {currentUser?.displayName || 'User'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* XP Badge */}
          <div className="hidden sm:flex items-center gap-2 glass-card px-3 py-1.5">
            <span className="text-sm" aria-hidden="true">{level.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-300">{level.name}</span>
              <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.percentage}%`,
                    backgroundColor: level.color,
                  }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-500 ml-1">{formatXP(xp)}</span>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-eco-600/20 border border-eco-600/30 flex items-center justify-center overflow-hidden">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={`${currentUser.displayName}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-eco-400">
                {(currentUser?.displayName || 'U')[0].toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {};

export default Navbar;
