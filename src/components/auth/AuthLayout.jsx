import PropTypes from 'prop-types';

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-eco-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-eco-500/8 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-4xl" role="img" aria-label="leaf">🌱</span>
            <h1 className="text-3xl font-display font-bold gradient-text">EcoTrace</h1>
          </div>
          <p className="text-gray-400 text-sm">Track the trace you leave on the planet</p>
        </div>
        <div className="glass-card p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
