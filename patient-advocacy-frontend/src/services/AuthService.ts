/**
 * AuthService.ts
 * Handles API requests related to authentication
 */

import axios from 'axios';

// Base URL for API (netlify functions use this path pattern)
const API_URL = '/.netlify/functions/api';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'advocate' | 'provider' | 'admin';
  profilePicture?: string;
  specialty?: string;
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
  bio?: string;
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

export interface SignupData extends LoginCredentials {
  name: string;
  role?: 'patient' | 'advocate' | 'provider' | 'admin';
  profilePicture?: string;
  specialty?: string;
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
  bio?: string;
}

const AuthService = {
  /**
   * Login user
   * @param credentials User login credentials
   * @returns Promise with user data and token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/login`,
        credentials
      );
      
      if (response.data.token) {
        // Store user info in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        // Store token separately for easier access
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   * @param userData User registration data
   * @returns Promise with user data and token
   */
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/signup`,
        userData
      );
      
      if (response.data.token) {
        // Store user info in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        // Store token separately for easier access
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  /**
   * Get current user data from localStorage
   * @returns User data or null if not logged in
   */
  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  /**
   * Get authentication token
   * @returns JWT token string or null if not logged in
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is logged in
   * @returns Boolean indicating if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  /**
   * Get authorization header
   * @returns Object with Authorization header or empty object
   */
  getAuthHeader(): { Authorization?: string } {
    const token = this.getToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }
};

export default AuthService;
