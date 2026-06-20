import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LandingPage() {
  const features = [
    { icon: '📝', title: 'EcoDiary', description: 'Describe your day in plain English. AI extracts and quantifies every carbon-emitting activity.' },
    { icon: '💬', title: 'EcoCoach', description: 'Your personal AI carbon advisor. Get specific, India-relevant advice to reduce your footprint.' },
    { icon: '🌿', title: 'Habit Hub', description: '30+ green habits to track daily. Build streaks, join challenges, and earn rewards.' },
  ];

  const steps = [
    { step: '01', title: 'Type your day', description: 'Describe what you ate, how you travelled, what you used — in plain English.' },
    { step: '02', title: 'AI analyses it', description: 'Gemini AI extracts every activity and calculates its CO₂ impact using India-specific data.' },
    { step: '03', title: 'Track & improve', description: 'Watch your trends, build green habits, earn badges, and grow your virtual tree.' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto" aria-label="Landing navigation">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="leaf">🌱</span>
          <span className="text-xl font-display font-bold gradient-text">EcoTrace</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
          <Link to="/signup" className="btn-primary text-sm">Get Started</Link>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="relative px-6 pt-16 pb-24 max-w-6xl mx-auto text-center" aria-label="Hero">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-eco-600/8 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-eco-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-eco-600/10 border border-eco-600/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-xs text-eco-400 font-medium">🌍 Powered by Google Gemini AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-100 mb-6 leading-tight">
              Track the trace you
              <br />
              <span className="gradient-text">leave on the planet</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Type your day in plain English. Our AI calculates your carbon footprint,
              gives personalised tips, and helps you build sustainable habits —
              all with India-specific data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base px-8 py-3 rounded-2xl">
                Start Tracking Free →
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3 rounded-2xl">
                I have an account
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 max-w-6xl mx-auto" aria-label="Features">
          <h2 className="text-2xl font-display font-bold text-center text-gray-100 mb-12">
            Everything you need to go green
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card-hover p-6 text-center">
                <span className="text-4xl mb-4 block" aria-hidden="true">{f.icon}</span>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20 max-w-6xl mx-auto" aria-label="How it works">
          <h2 className="text-2xl font-display font-bold text-center text-gray-100 mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-eco-600/15 border border-eco-600/20 flex items-center justify-center">
                  <span className="text-lg font-display font-bold text-eco-400">{s.step}</span>
                </div>
                <h3 className="font-semibold text-gray-200 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16 max-w-4xl mx-auto" aria-label="Impact statistics">
          <div className="glass-card p-8 text-center bg-gradient-to-br from-eco-600/5 to-eco-500/5">
            <h2 className="text-xl font-display font-bold text-gray-100 mb-6">
              Join users reducing their carbon footprint
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold gradient-text">5.2 kg</p>
                <p className="text-xs text-gray-500 mt-1">India avg daily CO₂</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">30+</p>
                <p className="text-xs text-gray-500 mt-1">Green habits to track</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">20+</p>
                <p className="text-xs text-gray-500 mt-1">Badges to earn</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-8 text-center">
        <p className="text-sm text-gray-600">
          🌱 EcoTrace — Built for a sustainable future
        </p>
      </footer>
    </div>
  );
}

LandingPage.propTypes = {};

export default LandingPage;
