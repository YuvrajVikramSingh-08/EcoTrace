import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import ConfirmDialog from '../components/shared/ConfirmDialog.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import { formatDate } from '../utils/dateUtils.js';

function ProfilePage() {
  const { currentUser, logout, deleteAccount } = useAuth();
  const { userData, loading, updateUserData } = useContext(UserDataContext);
  const { showToast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [dietType, setDietType] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [weeklyBudgetKg, setWeeklyBudgetKg] = useState('');
  const [homeSizeKwh, setHomeSizeKwh] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><LoadingSpinner size="lg" /></div>;
  }

  if (userData && !initialized) {
    setDisplayName(userData.displayName || '');
    setDietType(userData.dietType || 'non-vegetarian');
    setVehicleType(userData.vehicleType || 'car-petrol');
    setWeeklyBudgetKg(String(userData.weeklyBudgetKg || 36.4));
    setHomeSizeKwh(String(userData.homeSizeKwh || 150));
    setInitialized(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    await updateUserData({
      displayName: displayName.trim(),
      dietType, vehicleType,
      weeklyBudgetKg: parseFloat(weeklyBudgetKg) || 36.4,
      homeSizeKwh: parseFloat(homeSizeKwh) || 150,
    });
    showToast('Profile updated!', 'success');
  }

  async function handleDelete() {
    try {
      await deleteAccount();
    } catch {
      showToast('Please sign in again before deleting your account.', 'error');
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">Profile</h1>
        <p className="text-sm text-gray-400">Manage your carbon profile and account settings.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-200">Carbon Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm text-gray-400 mb-1">Display Name</label>
            <input id="profile-name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="profile-diet" className="block text-sm text-gray-400 mb-1">Diet Type</label>
            <select id="profile-diet" value={dietType} onChange={(e) => setDietType(e.target.value)} className="input-field">
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label htmlFor="profile-vehicle" className="block text-sm text-gray-400 mb-1">Vehicle Type</label>
            <select id="profile-vehicle" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="input-field">
              <option value="none">None</option>
              <option value="two-wheeler">Two-Wheeler</option>
              <option value="car-petrol">Car (Petrol)</option>
              <option value="car-diesel">Car (Diesel)</option>
              <option value="ev">Electric Vehicle</option>
            </select>
          </div>
          <div>
            <label htmlFor="profile-budget" className="block text-sm text-gray-400 mb-1">Weekly Budget (kg CO₂)</label>
            <input id="profile-budget" type="number" value={weeklyBudgetKg} onChange={(e) => setWeeklyBudgetKg(e.target.value)} className="input-field" step="0.1" />
          </div>
          <div>
            <label htmlFor="profile-kwh" className="block text-sm text-gray-400 mb-1">Monthly Electricity (kWh)</label>
            <input id="profile-kwh" type="number" value={homeSizeKwh} onChange={(e) => setHomeSizeKwh(e.target.value)} className="input-field" />
          </div>
        </div>
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>

      <div className="glass-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">Account</h2>
        <p className="text-sm text-gray-400">Email: {currentUser?.email}</p>
        {userData?.createdAt && (
          <p className="text-sm text-gray-500">Joined: {formatDate(userData.createdAt.toDate ? userData.createdAt.toDate() : new Date())}</p>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>Entries: {userData?.lastLogDate ? '✓' : '0'}</span>
          <span>Longest Streak: {userData?.longestStreak || 0} days</span>
        </div>
        <button onClick={logout} className="btn-secondary">Sign Out</button>
      </div>

      <div className="glass-card p-6 border-red-500/20">
        <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-400 mb-3">Permanently delete your account and all data.</p>
        <button onClick={() => setShowDeleteConfirm(true)} className="btn-danger">Delete Account</button>
      </div>

      <ConfirmDialog isOpen={showDeleteConfirm} title="Delete account?" message="This action is permanent. All your data will be lost." confirmLabel="Delete Forever" onConfirm={handleDelete} onCancel={() => setShowDeleteConfirm(false)} />
    </div>
  );
}

ProfilePage.propTypes = {};
export default ProfilePage;
