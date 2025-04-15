/**
 * Environment configuration
 *
 * This file centralizes all environment-specific settings.
 * Values can be overridden by environment variables in .env files.
 */

/**
 * Configuration interface defining all environment settings
 */
interface EnvironmentConfig {
  /** API base URL */
  apiUrl: string;
  /** Application version */
  appVersion: string;
  /** Whether the app is running in production mode */
  isProduction: boolean;
  /** Whether debug features should be enabled */
  debugEnabled: boolean;
  /** Whether advanced features should be enabled */
  advancedFeaturesEnabled: boolean;
}

/**
 * Global environment configuration
 */
export const environment: EnvironmentConfig = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://api.petfarm.example.com/api/v1',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  isProduction: process.env.NODE_ENV === 'production',
  debugEnabled: process.env.REACT_APP_DEBUG === 'true',
  advancedFeaturesEnabled: process.env.REACT_APP_ADVANCED_FEATURES === 'true',
};

/**
 * Feature flags to enable/disable specific features
 */
export const featureFlags = {
  enablePetImport: process.env.REACT_APP_FEATURE_PET_IMPORT === 'true' || false,
  enableReports: process.env.REACT_APP_FEATURE_REPORTS === 'true' || false,
  enableNotifications: process.env.REACT_APP_FEATURE_NOTIFICATIONS === 'true' || false,
};
