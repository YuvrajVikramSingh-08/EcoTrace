import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateHabitName } from '../../utils/validators.js';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';

const CATEGORY_OPTIONS = [
  { value: 'transport', label: '🚗 Transport' },
  { value: 'food', label: '🍽️ Food' },
  { value: 'energy', label: '⚡ Energy' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'waste', label: '♻️ Waste' },
];

function CustomHabitForm({ onSubmit, loading = false }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('energy');
  const [icon, setIcon] = useState('🌿');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), description: description.trim(), category, icon });
    setName('');
    setDescription('');
    setIcon('🌿');
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-5 space-y-4">
      <h3 className="text-sm font-medium text-gray-300">Create Custom Habit</h3>

      {error && <p className="text-red-400 text-xs" role="alert">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="habit-name" className="block text-xs text-gray-400 mb-1">Name</label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="e.g. Walk to grocery store"
            maxLength={100}
            required
          />
        </div>
        <div>
          <label htmlFor="habit-category" className="block text-xs text-gray-400 mb-1">Category</label>
          <select
            id="habit-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="habit-desc" className="block text-xs text-gray-400 mb-1">Description</label>
        <input
          id="habit-desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          placeholder="Brief description of the habit"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
        {loading ? <LoadingSpinner size="sm" /> : '+ Create Habit'}
      </button>
    </form>
  );
}

CustomHabitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CustomHabitForm;
