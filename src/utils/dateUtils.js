/**
 * Format a Date object or timestamp to 'YYYY-MM-DD' string.
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date as 'YYYY-MM-DD'.
 * @returns {string}
 */
export function getToday() {
  return formatDate(new Date());
}

/**
 * Check if a date string is today.
 * @param {string} dateString - 'YYYY-MM-DD'
 * @returns {boolean}
 */
export function isToday(dateString) {
  return dateString === getToday();
}

/**
 * Get the Monday–Sunday range for a given date's week.
 * @param {Date|string} date
 * @returns {{ start: string, end: string }}
 */
export function getWeekRange(date) {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
  };
}

/**
 * Get the number of days between two dates.
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {number}
 */
export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get an array of the last N dates as 'YYYY-MM-DD'.
 * @param {number} n
 * @returns {string[]}
 */
export function getLastNDays(n) {
  const dates = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDate(d));
  }
  return dates;
}

/**
 * Format a date string to a human-friendly format.
 * @param {string} dateString - 'YYYY-MM-DD'
 * @returns {string} e.g. 'Mon, 15 Jan'
 */
export function formatDateHuman(dateString) {
  const d = new Date(dateString + 'T00:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Get relative date label.
 * @param {string} dateString - 'YYYY-MM-DD'
 * @returns {string}
 */
export function getRelativeDate(dateString) {
  const today = getToday();
  if (dateString === today) return 'Today';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateString === formatDate(yesterday)) return 'Yesterday';

  return formatDateHuman(dateString);
}
