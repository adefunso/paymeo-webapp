// src/utils/api.js - Fixed for proper CSRF/CORS handling
import axios from "axios";

// Use environment variables properly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.paymeo.co/mango/manig";

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Set to false if using API key authentication (no cookies needed)
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let csrfToken = null;

/**
 * Fetches the CSRF token from the backend (if needed for non-GET requests)
 */
export const fetchCsrfToken = async () => {
  try {
    const response = await api.get('/api/csrf-token');
    csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error.message);
    return null;
  }
};

export const initializeCsrfProtection = async () => {
  return await fetchCsrfToken();
};

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    
    // Add API key to all requests
    const apiKey = process.env.NEXT_PUBLIC_PAYMEO_API_KEY || "D5NN602kTIoOFAbhicH6oovHUxzqYVZg";
    config.headers["x-api-key"] = apiKey;
    
    // Add CSRF token for state-changing methods if available
    if (csrfToken && method && ['post', 'put', 'patch', 'delete'].includes(method)) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Add JWT token if available
    const authToken = localStorage.getItem('_t');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('_t');
      localStorage.removeItem('userData');
      localStorage.removeItem('accountDetails');
      // Optional: Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};