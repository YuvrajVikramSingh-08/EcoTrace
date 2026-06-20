import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateDiaryInput } from '../../utils/validators.js';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';

function DiaryInput({ onAnalyse, loading = false, existingText = '' }) {
  const [text, setText] = useState(existingText);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateDiaryInput(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    onAnalyse(text);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="diary-input" className="block text-sm font-medium text-gray-300 mb-2">
          Describe your day
        </label>
        <textarea
          id="diary-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          className="textarea-field min-h-[140px]"
          placeholder="e.g. 'Took the bus to work, had dal chawal for lunch, left the AC on for 3 hours, ordered a package from Amazon'"
          maxLength={2000}
          aria-describedby="diary-char-count"
          disabled={loading}
        />
        <div className="flex justify-between mt-1">
          {error && (
            <p className="text-red-400 text-xs" role="alert">{error}</p>
          )}
          <p id="diary-char-count" className="text-xs text-gray-600 ml-auto">
            {text.length}/2000
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>Analysing with AI...</span>
          </>
        ) : (
          <>
            <span aria-hidden="true">🔍</span>
            Analyse My Day
          </>
        )}
      </button>
    </form>
  );
}

DiaryInput.propTypes = {
  onAnalyse: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  existingText: PropTypes.string,
};

export default DiaryInput;
