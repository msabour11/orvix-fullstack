import axios from 'axios';

// When using React dev server with proxy, use relative URL
// In production, use the full API URL from env
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('orvix_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error - backend not running
      error.message = 'لا يمكن الاتصال بالخادم. تأكد من تشغيل Backend على المنفذ 5000';
    }
    return Promise.reject(error);
  }
);

export default api;
