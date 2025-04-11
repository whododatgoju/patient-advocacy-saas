/**
 * ApiService.ts
 * Handles general API requests with authentication
 */

import axios from 'axios';

// Base URL for our API gateway
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Add authentication token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    role: string;
  };
}

interface Profile {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

// API endpoints
export const api = {
  // Authentication endpoints
  login: (credentials: { email: string; password: string }) => 
    axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, credentials),

  // Profile endpoints
  getProfile: () => axios.get<Profile>(`${API_BASE_URL}/profile`),
  updateProfile: (updates: Partial<Profile>) => 
    axios.patch<Profile>(`${API_BASE_URL}/profile`, updates),

  // File upload endpoint
  uploadFile: (file: File, path: string) => {
    const formData = new FormData();
    formData.append('file', file as unknown as Blob);
    return axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default api;
