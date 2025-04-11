import axios from 'axios';
import { USER_ROLES } from '../contexts/AuthContext';

// Base URL for our API gateway
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface UserCredentials {
  email: string;
  password: string;
}

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: USER_ROLES[keyof typeof USER_ROLES];
}

export const userService = {
  login: async (credentials: UserCredentials): Promise<UserProfile> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (credentials: UserCredentials, displayName: string, role: USER_ROLES[keyof typeof USER_ROLES]): Promise<UserProfile> => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      ...credentials,
      displayName,
      role
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  },

  updateProfile: async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, updates);
    return response.data;
  }
};
