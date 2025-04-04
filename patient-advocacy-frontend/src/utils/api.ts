import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/.netlify/functions/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData: any) => {
  try {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/users/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProviders = async () => {
  try {
    const response = await api.get('/api/users/providers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdvocates = async () => {
  try {
    const response = await api.get('/api/users/advocates');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video Calls
export const createVideoCall = async (videoCallData: any) => {
  try {
    const response = await api.post('/api/video-calls', videoCallData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyVideoCalls = async (filters?: any) => {
  try {
    const response = await api.get('/api/video-calls/my-calls', { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoCall = async (id: string) => {
  try {
    const response = await api.get(`/api/video-calls/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVideoCallStatus = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/api/video-calls/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Advocate Matching
export const matchWithAdvocates = async (matchData: any) => {
  try {
    const response = await api.post('/api/advocates/match', matchData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
