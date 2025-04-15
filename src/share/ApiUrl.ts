/**
 * Base API URL based on environment
 * Uses environment variables when available, falls back to default values
 */
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.petfarm.example.com/api/v1';

/**
 * API endpoints used throughout the application
 * Centralized here for easy maintenance
 */
export const API_ENDPOINTS = {
  FARMS: '/farms',
  PETS: {
    BASE: '/pets',
    DOGS: '/pets/dogs',
    CATS: '/pets/cats',
  },
  USERS: '/users',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  CONTACT: '/contact',
};

/**
 * Helper function to build a complete API URL
 * @param endpoint - The endpoint path
 * @param params - Optional query parameters
 * @returns The complete URL
 */
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = `${API_URL}${endpoint}`;

  if (!params) {
    return url;
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${url}?${queryString}`;
};
