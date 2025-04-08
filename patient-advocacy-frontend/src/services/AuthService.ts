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

// Test user data for quick login/testing
const TEST_USERS = {
  patient: {
    _id: 'test-patient-123',
    name: 'Test Patient',
    email: 'test@patient.com',
    role: 'patient',
    bio: 'I am a test patient account for demonstration purposes.',
    createdAt: new Date()
  },
  advocate: {
    _id: 'test-advocate-123',
    name: 'Test Advocate',
    email: 'test@advocate.com',
    role: 'advocate',
    specialty: 'General Healthcare Navigation',
    bio: 'I am a test advocate account for demonstration purposes.',
    createdAt: new Date()
  },
  provider: {
    _id: 'test-provider-123',
    name: 'Dr. Test Provider',
    email: 'test@provider.com',
    role: 'provider',
    specialty: 'Family Medicine',
    bio: 'I am a test provider account for demonstration purposes.',
    createdAt: new Date()
  }
};

const AuthService = {
  /**
   * Login user
   * @param credentials User login credentials
   * @returns Promise with user data and token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      if (import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MOCK_API === 'true') {
        // For demo & development - mock a successful login
        const { email } = credentials;
        
        // Determine which test user to return based on email
        let testUser;
        
        if (email.includes('patient')) {
          testUser = TEST_USERS.patient;
        } else if (email.includes('advocate')) {
          testUser = TEST_USERS.advocate;
        } else if (email.includes('provider')) {
          testUser = TEST_USERS.provider;
        } else {
          // Default to patient
          testUser = TEST_USERS.patient;
        }
        
        // Mock response
        const response: AuthResponse = {
          status: 'success',
          token: 'mock-token-123',
          data: {
            user: testUser as UserData
          }
        };
        
        // Store the token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        
        return Promise.resolve(response);
      }
      
      // Regular authentication flow for non-test users
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      
      // Store the token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
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
      if (import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MOCK_API === 'true') {
        // For demo & development - mock a successful registration
        const mockUser = {
          _id: `new-user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'patient',
          bio: userData.bio || '',
          specialty: userData.specialty || '',
          createdAt: new Date()
        } as UserData;
        
        // Mock response
        const response: AuthResponse = {
          status: 'success',
          token: 'mock-token-new-123',
          data: {
            user: mockUser
          }
        };
        
        // Store the token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        
        return Promise.resolve(response);
      }
      
      // Real API call
      const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
      
      // Store the token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
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
    // Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // Remove legacy key if exists
    localStorage.removeItem('userData'); // Remove legacy key if exists
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
    
    // Check for legacy storage format as fallback
    const legacyUserData = localStorage.getItem('userData');
    if (legacyUserData) {
      const userData = JSON.parse(legacyUserData);
      const token = localStorage.getItem('authToken') || '';
      
      // Convert to new format
      const response: AuthResponse = {
        status: 'success',
        token,
        data: userData.data
      };
      
      // Update storage to new format
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response));
      
      // Clean up legacy storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      return response;
    }
    
    return null;
  },

  /**
   * Get authentication token
   * @returns JWT token string or null if not logged in
   */
  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    
    // Check for legacy token as fallback
    const legacyToken = localStorage.getItem('authToken');
    if (legacyToken) {
      // Update to new format
      localStorage.setItem('token', legacyToken);
      localStorage.removeItem('authToken');
      return legacyToken;
    }
    
    return null;
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
