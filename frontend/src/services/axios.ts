// src/services/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5276/api/v1', // Set your base API URL here
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: 10 seconds timeout
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;