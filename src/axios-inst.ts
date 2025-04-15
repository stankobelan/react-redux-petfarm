import axios from 'axios';
import { API_URL } from './share/ApiUrl';

/**
 * Pre-configured axios instance for API requests
 * - Sets the base URL from environment configuration
 * - Sets common headers for all requests
 */
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
instance.interceptors.request.use(
  config => {
    // You can add auth tokens or other request modifications here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
