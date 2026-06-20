import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { UserDataProvider } from './contexts/UserDataContext.jsx';
import ErrorBoundary from './components/shared/ErrorBoundary.jsx';
import Toast from './components/shared/Toast.jsx';
import ProtectedRoute from './components/shared/ProtectedRoute.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import SignupPage from './components/auth/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DiaryPage from './pages/DiaryPage.jsx';
import CoachPage from './pages/CoachPage.jsx';
import HabitsPage from './pages/HabitsPage.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <ToastProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>

            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <UserDataProvider>
                      <AppLayout />
                    </UserDataProvider>
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/coach" element={<CoachPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Toast />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
