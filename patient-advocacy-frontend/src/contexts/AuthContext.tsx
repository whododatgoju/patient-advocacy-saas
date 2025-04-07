/**
 * AuthContext.tsx
 * Provides authentication state and functions throughout the app
 */

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AuthService, { UserData, LoginCredentials, SignupData } from '../services/AuthService';

// Toggle this flag to enable the test user functionality
const USE_TEST_USER = true;

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUserData: UserData) => void;
  error: string | null;
  clearError: () => void;
}

// Create the Auth Context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: () => {},
  error: null,
  clearError: () => {},
});

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

// Provider component to wrap around app components
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const initAuth = () => {
      try {
        if (USE_TEST_USER) {
          // For testing purposes - use the test user
          // This loads the test patient by default
          const testUser = TEST_USERS.patient as UserData;
          setUser(testUser);
          localStorage.setItem('authToken', 'mock-token-123');
          localStorage.setItem('userData', JSON.stringify({ data: { user: testUser } }));
          console.info('🔑 Using test user account. To disable, set USE_TEST_USER to false in AuthContext.tsx');
        } else {
          // Normal authentication flow
          const userData = AuthService.getCurrentUser();
          if (userData) {
            setUser(userData.data.user);
          }
        }
      } catch (err) {
        console.error('Failed to initialize authentication', err);
        // Clear potential corrupted data
        AuthService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(credentials);
      setUser(response.data.user);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.signup(userData);
      setUser(response.data.user);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const updateUser = (updatedUserData: UserData) => {
    setUser(updatedUserData);
    
    // Update localStorage if not using test user
    if (!USE_TEST_USER) {
      const currentUserData = AuthService.getCurrentUser();
      if (currentUserData) {
        const updatedStorage = {
          ...currentUserData,
          data: {
            ...currentUserData.data,
            user: updatedUserData
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedStorage));
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isAuthenticated: !!user,
    isLoading,
    user,
    login,
    signup,
    logout,
    updateUser,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
