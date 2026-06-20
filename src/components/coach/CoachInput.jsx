import { useState } from 'react';
import PropTypes from 'prop-types';

function CoachInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="coach-input" className="sr-only">
        Message EcoCoach
      </label>
      <input
        id="coach-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field flex-1"
        placeholder="Ask EcoCoach anything..."
        disabled={disabled}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="btn-primary px-4"
        aria-label="Send message"
      >
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

CoachInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CoachInput;
