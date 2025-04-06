/**
 * UserService.ts
 * Handles API requests related to user profile management
 */

import axios from 'axios';
import AuthService from './AuthService';
import { UserData } from './AuthService';

// Base URL for API (netlify functions use this path pattern)
const API_URL = '/.netlify/functions/api';

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  phone?: string;
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
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserService = {
  /**
   * Get current user profile
   * @returns Promise with user data
   */
  async getProfile(): Promise<UserData> {
    try {
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: AuthService.getAuthHeader()
      });
      
      return response.data.data.user;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param profileData User profile data to update
   * @returns Promise with updated user data
   */
  async updateProfile(profileData: ProfileUpdateData): Promise<UserData> {
    try {
      const response = await axios.patch(
        `${API_URL}/api/users/profile`,
        profileData,
        { headers: AuthService.getAuthHeader() }
      );
      
      // Update local storage with new user data
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const updatedUserData = {
          ...currentUser,
          data: {
            ...currentUser.data,
            user: response.data.data.user
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }
      
      return response.data.data.user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  /**
   * Update user password
   * @param passwordData Password update data
   * @returns Promise with success message
   */
  async updatePassword(passwordData: PasswordUpdateData): Promise<{ message: string }> {
    try {
      const response = await axios.patch(
        `${API_URL}/api/users/password`,
        passwordData,
        { headers: AuthService.getAuthHeader() }
      );
      
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
  async uploadProfilePicture(file: File): Promise<UserData> {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await axios.post(
        `${API_URL}/api/users/profile-picture`,
        formData,
        { 
          headers: {
            ...AuthService.getAuthHeader(),
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Update local storage with new user data
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const updatedUserData = {
          ...currentUser,
          data: {
            ...currentUser.data,
            user: response.data.data.user
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }
      
      return response.data.data.user;
    } catch (error) {
      console.error('Upload profile picture error:', error);
      throw error;
    }
  }
};

export default UserService;
