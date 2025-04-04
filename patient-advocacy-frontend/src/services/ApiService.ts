/**
 * ApiService.ts
 * Handles general API requests with authentication
 */

import axios from 'axios';
import AuthService from './AuthService';

// Base URL for API (netlify functions use this path pattern)
const API_URL = '/.netlify/functions/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Logout user if token is invalid or expired
      AuthService.logout();
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Journal Entry interfaces
export interface JournalEntry {
  id?: number;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  videoBlob?: Blob | null;
  symptoms?: Symptom[];
  bodyRegions?: string[];
}

export interface Symptom {
  id: string;
  name: string;
  severity: number;
  location?: string[];
  timeOfDay?: string;
  duration?: string;
  triggers?: string[];
  notes?: string;
  date: Date;
}

// API Service with methods for different resources
const ApiService = {
  // Journal Entries
  journals: {
    getAll: async () => {
      return apiClient.get('/api/journal-entries');
    },
    getById: async (id: string) => {
      return apiClient.get(`/api/journal-entries/${id}`);
    },
    create: async (entry: JournalEntry) => {
      // Handle video upload if present
      if (entry.videoBlob) {
        const formData = new FormData();
        formData.append('video', entry.videoBlob);
        formData.append('entry', JSON.stringify({
          ...entry,
          videoBlob: null // Remove blob from JSON
        }));
        return apiClient.post('/api/journal-entries', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      return apiClient.post('/api/journal-entries', entry);
    },
    update: async (id: string, entry: JournalEntry) => {
      // Handle video upload if present
      if (entry.videoBlob instanceof Blob) {
        const formData = new FormData();
        formData.append('video', entry.videoBlob);
        formData.append('entry', JSON.stringify({
          ...entry,
          videoBlob: null // Remove blob from JSON
        }));
        return apiClient.put(`/api/journal-entries/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      return apiClient.put(`/api/journal-entries/${id}`, entry);
    },
    delete: async (id: string) => {
      return apiClient.delete(`/api/journal-entries/${id}`);
    }
  },

  // Symptoms
  symptoms: {
    getAll: async () => {
      return apiClient.get('/api/symptoms');
    },
    getById: async (id: string) => {
      return apiClient.get(`/api/symptoms/${id}`);
    },
    create: async (symptom: Symptom) => {
      return apiClient.post('/api/symptoms', symptom);
    },
    update: async (id: string, symptom: Symptom) => {
      return apiClient.put(`/api/symptoms/${id}`, symptom);
    },
    delete: async (id: string) => {
      return apiClient.delete(`/api/symptoms/${id}`);
    }
  },

  // User Profile
  profile: {
    get: async () => {
      return apiClient.get('/api/users/me');
    },
    update: async (userData: any) => {
      return apiClient.put('/api/users/me', userData);
    },
    updatePassword: async (passwordData: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      return apiClient.put('/api/users/password', passwordData);
    }
  },

  // Video Calls
  videoCalls: {
    getAll: async () => {
      return apiClient.get('/api/video-calls');
    },
    getById: async (id: string) => {
      return apiClient.get(`/api/video-calls/${id}`);
    },
    create: async (callData: any) => {
      return apiClient.post('/api/video-calls', callData);
    },
    update: async (id: string, callData: any) => {
      return apiClient.put(`/api/video-calls/${id}`, callData);
    },
    delete: async (id: string) => {
      return apiClient.delete(`/api/video-calls/${id}`);
    }
  },

  // Upload file (general purpose)
  uploadFile: async (file: File, path: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(`/api/upload/${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export default ApiService;
