/**
 * UserService.ts
 * Handles API requests related to user profile management
 */

import axios from 'axios';
import { USER_ROLES } from '../contexts/AuthContext';

// Base URL for our API gateway
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: typeof USER_ROLES[keyof typeof USER_ROLES];
}

interface ProfileUpdateData {
  displayName?: string;
  email?: string;
}

interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface File {
  // Add file properties as needed
  name: string;
}

export default {
  /**
   * Login to the application
   * @param credentials User credentials
   * @returns Promise with user data
   */
  login: async (credentials: { email: string; password: string }): Promise<UserProfile> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },

  /**
   * Register a new user
   * @param credentials User credentials
   * @param displayName User display name
   * @param role User role
   * @returns Promise with user data
   */
  register: async (credentials: { email: string; password: string }, displayName: string, role: typeof USER_ROLES[keyof typeof USER_ROLES]): Promise<UserProfile> => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      ...credentials,
      displayName,
      role
    });
    return response.data;
  },

  /**
   * Get current user profile
   * @returns Promise with user data or null if not logged in
   */
  getCurrentUser: async (): Promise<UserProfile | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  /**
   * Logout from the application
   * @returns Promise with no data
   */
  logout: async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  },

  /**
   * Update user profile
   * @param updates User profile data to update
   * @returns Promise with updated user data
   */
  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await axios.patch(`${API_BASE_URL}/users/me`, updates);
    return response.data;
  },
  
  /**
   * Update user password
   * @param passwordData Password update data
   * @returns Promise with success message
   */
  updatePassword: async (passwordData: PasswordUpdateData): Promise<{ message: string }> => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/auth/password`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },
  
  /**
   * Upload profile picture
   * @param file Image file to upload
   * @returns Promise with updated user data including new profile picture URL
   */
  uploadProfilePicture: async (file: File): Promise<UserProfile> => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file as unknown as Blob, file.name);
      const response = await axios.post(
        `${API_BASE_URL}/users/me/profile-picture`,
        formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Upload profile picture error:', error);
      throw error;
    }
  }
};
