import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

// Request interceptor - log requests with timestamps
axiosClient.interceptors.request.use(
  (config) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Request:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - log responses with timestamps
axiosClient.interceptors.response.use(
  (response) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Response:`, {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Response error:`, {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });
    // Handle fake errors from backend gracefully
    return Promise.reject(error);
  }
);

export default axiosClient;
