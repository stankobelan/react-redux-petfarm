/**
 * Utility functions for date manipulations and calculations
 */

/**
 * Date formatting options for consistent date display
 */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Converts a date to a beautiful age string (e.g. "3 Years 2 Months 5 Days")
 * @param date The date to convert (usually birth date)
 * @returns Formatted age string
 */
export const toBeautifulString = (date: Date | string): string => {
  const today = new Date();
  const birthDate = new Date(date);

  // Calculate differences
  let age = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate(); // Fixed: was using getDay() which returns day of week

  // Adjust age if needed
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    months += 12;
  }

  // Adjust days if needed
  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate();
    days += lastMonth;
    months--;
  }

  // Properly pluralize words
  const yearLabel = age === 1 ? 'Year' : 'Years';
  const monthLabel = Math.abs(months) === 1 ? 'Month' : 'Months';
  const dayLabel = Math.abs(days) === 1 ? 'Day' : 'Days';

  return `${age} ${yearLabel} ${Math.abs(months)} ${monthLabel} ${Math.abs(days)} ${dayLabel}`;
};

/**
 * Generates a random integer between 0 and max-1
 * @param max The upper boundary (exclusive)
 * @returns Random integer
 */
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 * Calculates age in years from a date
 * @param date The date to calculate age from (usually birth date)
 * @returns Age in years
 */
export const toAge = (date: Date | string): number => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Formats a date according to the locale
 * @param date The date to format
 * @param locale The locale to use (defaults to browser locale)
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, locale?: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
};

/**
 * Checks if a date is in the past
 * @param date The date to check
 * @returns True if the date is in the past
 */
export const isPastDate = (date: Date | string): boolean => {
  const givenDate = new Date(date);
  const today = new Date();
  return givenDate < today;
};
