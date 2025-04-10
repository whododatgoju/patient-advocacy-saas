/**
 * AuthService.ts
 * Handles API requests related to authentication
 */

import axios from 'axios';
import { DEV_USERS, DEV_BYPASS_KEY, isDevBypassEnabled } from '../config/development';

// Base URL for API (netlify functions use this path pattern)
const API_URL = '/.netlify/functions/api';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'advocate' | 'provider' | 'admin';
  profilePicture?: string;
  specialty?: string;
  bio?: string;
  location?: string;
  phone?: string;
  
  // Patient-specific fields
  medicalConditions?: string[];
  healthGoals?: string[];
  insuranceProvider?: string;
  
  // Advocate-specific fields
  specializations?: string[];
  yearsOfExperience?: number;
  languages?: string[];
  
  // Provider-specific fields
  organization?: string;
  title?: string;
  licensure?: string;
  
  certifications?: string[];
  experiences?: {
    title: string;
    organization: string;
    description: string;
    startDate: Date;
    endDate?: Date;
  }[];
  availability?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  createdAt: Date;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: UserData;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'advocate' | 'provider' | 'admin';
  profilePicture?: string;
  specialty?: string;
  bio?: string;
  location?: string;
  phone?: string;
  
  // Patient-specific fields
  medicalConditions?: string[];
  healthGoals?: string[];
  insuranceProvider?: string;
  
  // Advocate-specific fields
  specializations?: string[];
  yearsOfExperience?: number;
  languages?: string[];
  
  // Provider-specific fields
  organization?: string;
  title?: string;
  licensure?: string;
  
  certifications?: string[];
  experiences?: {
    title: string;
    organization: string;
    description: string;
    startDate: Date;
    endDate?: Date;
  }[];
  availability?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

// Add development bypass function
async function devBypassLogin(role: keyof typeof DEV_USERS, bypassKey: string): Promise<AuthResponse> {
  if (!isDevBypassEnabled()) {
    throw new Error('Development bypass is not enabled');
  }

  if (bypassKey !== DEV_BYPASS_KEY) {
    throw new Error('Invalid development bypass key');
  }

  const testUser = DEV_USERS[role];
  if (!testUser) {
    throw new Error('Invalid user role');
  }

  // Create mock response
  const mockResponse: AuthResponse = {
    status: 'success',
    token: `dev-token-${Date.now()}`,
    data: {
      user: {
        ...testUser,
        _id: testUser.id,
        createdAt: new Date(),
        bio: `Development ${testUser.role} account`,
        specialty: testUser.role === 'provider' ? 'General Practice' : undefined
      }
    }
  };

  // Store in localStorage
  localStorage.setItem('token', mockResponse.token);
  localStorage.setItem('user', JSON.stringify(mockResponse));

  return mockResponse;
}

export default {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Check for development bypass
      if (credentials.email === 'dev' && credentials.password === DEV_BYPASS_KEY) {
        return await devBypassLogin('patient', credentials.password);
      }

      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ token, user }));
      
      return { status: 'success', token, data: { user } };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ token, user }));
      
      return { status: 'success', token, data: { user } };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): AuthResponse | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch (error) {
      // If JSON parsing fails, clear invalid data and return null
      localStorage.removeItem('user');
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  getAuthHeader(): { Authorization?: string } {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
