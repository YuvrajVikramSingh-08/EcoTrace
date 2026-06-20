/**
 * Validate diary input text.
 * @param {string} text
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateDiaryInput(text) {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Please describe your day before analysing.' };
  }
  if (text.length > 2000) {
    return {
      valid: false,
      error: `Entry is too long (${text.length}/2000 characters). Please shorten it.`,
    };
  }
  if (text.trim().length < 10) {
    return {
      valid: false,
      error: 'Please provide a bit more detail about your day.',
    };
  }
  return { valid: true, error: null };
}

/**
 * Validate custom habit name.
 * @param {string} name
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateHabitName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Habit name is required.' };
  }
  if (name.length > 100) {
    return {
      valid: false,
      error: `Name is too long (${name.length}/100 characters).`,
    };
  }
  return { valid: true, error: null };
}

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate password strength.
 * @param {string} password
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validatePassword(password) {
  if (!password || password.length < 6) {
    return {
      valid: false,
      error: 'Password must be at least 6 characters.',
    };
  }
  return { valid: true, error: null };
}

/**
 * Validate display name.
 * @param {string} name
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateDisplayName(name) {
  if (!name || name.trim().length < 2) {
    return {
      valid: false,
      error: 'Name must be at least 2 characters.',
    };
  }
  if (name.length > 50) {
    return {
      valid: false,
      error: 'Name must be 50 characters or fewer.',
    };
  }
  return { valid: true, error: null };
}
