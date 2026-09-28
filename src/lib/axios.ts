import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost/devlagi-degital/public/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Auto-inject Sanctum Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

// Response Interceptor: Global Error & 401 Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      // For a hard redirect if needed, though AdminLayout useEffect will catch it too
      window.location.href = '/admin/login'; 
    }
    return Promise.reject(error);
  }
);
