/**
 * AuthContext.tsx
 * Provides authentication state and functions throughout the app
 */

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/ApiService';

// User role definitions
export const USER_ROLES = {
  PATIENT: 'patient',
  ADVOCATE: 'advocate',
  PROVIDER: 'provider',
  ADMIN: 'admin'
} as const;

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await api.getProfile();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login({ email, password });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('authToken');
      setUser(null);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
