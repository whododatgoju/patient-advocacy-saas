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
      // Check if this is a test user login
      const isTestPatient = credentials.email === 'test@patient.com' && credentials.password === 'password123';
      const isTestAdvocate = credentials.email === 'test@advocate.com' && credentials.password === 'password123';
      const isTestProvider = credentials.email === 'test@provider.com' && credentials.password === 'password123';
      
      if (isTestPatient || isTestAdvocate || isTestProvider) {
        console.log('Using test user credentials');
        
        // Determine which test user to use
        let testUser;
        if (isTestPatient) testUser = TEST_USERS.patient;
        if (isTestAdvocate) testUser = TEST_USERS.advocate;
        if (isTestProvider) testUser = TEST_USERS.provider;
        
        // Create mock response
        const mockResponse: AuthResponse = {
          status: 'success',
          token: 'test-token-' + Date.now(), // Create a unique token
          data: {
            user: testUser as UserData
          }
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(mockResponse));
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('isTestUser', 'true');
        
        return mockResponse;
      }
      
      // Regular authentication flow for non-test users
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/login`,
        credentials
      );
      
      if (response.data.token) {
        // Store user info in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        // Store token separately for easier access
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isTestUser', 'false');
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
    localStorage.removeItem('isTestUser');
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
