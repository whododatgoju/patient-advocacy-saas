/**
 * UserService.ts
 * Handles API requests related to user profile management
 */

import axios from 'axios';
import AuthService from './AuthService';
import { UserData } from './AuthService';

// Base URL for API (netlify functions use this path pattern)
const API_URL = '/.netlify/functions/api';

// Flag to use mock data for development
const USE_MOCK_DATA = true;

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

// Mock user data for development
const mockUserData: Record<string, UserData> = {
  'patient': {
    _id: 'patient-123',
    name: 'Alex Johnson',
    email: 'test@patient.com',
    role: 'patient',
    bio: 'Living with Type 2 Diabetes and navigating the healthcare system.',
    location: 'Boston, MA',
    phone: '555-123-4567',
    profilePicture: 'https://randomuser.me/api/portraits/women/32.jpg',
    medicalConditions: ['Type 2 Diabetes', 'Hypertension'],
    healthGoals: ['Better blood sugar control', 'Increase physical activity'],
    insuranceProvider: 'Blue Cross Blue Shield',
    createdAt: new Date('2023-01-15'),
    languages: ['English', 'Spanish']
  },
  'advocate': {
    _id: 'advocate-456',
    name: 'Jordan Smith',
    email: 'test@advocate.com',
    role: 'advocate',
    bio: 'Healthcare advocate with 7+ years experience navigating complex medical systems.',
    location: 'Chicago, IL',
    phone: '555-987-6543',
    profilePicture: 'https://randomuser.me/api/portraits/men/42.jpg',
    specializations: ['Insurance appeals', 'Chronic illness support', 'Elder care navigation'],
    yearsOfExperience: 7,
    languages: ['English', 'French'],
    certifications: ['Certified Patient Advocate', 'Healthcare Navigation Certificate'],
    createdAt: new Date('2022-05-10')
  },
  'provider': {
    _id: 'provider-789',
    name: 'Dr. Taylor Richardson',
    email: 'test@provider.com',
    role: 'provider',
    bio: 'Board certified physician specializing in endocrinology.',
    location: 'San Francisco, CA',
    phone: '555-456-7890',
    profilePicture: 'https://randomuser.me/api/portraits/women/58.jpg',
    organization: 'Bay Area Medical Center',
    title: 'Endocrinologist',
    licensure: 'CA Medical License #12345',
    specializations: ['Diabetes Care', 'Thyroid Disorders'],
    yearsOfExperience: 12,
    languages: ['English', 'Mandarin'],
    certifications: ['Board Certified - Endocrinology', 'American Medical Association'],
    createdAt: new Date('2021-11-22')
  }
};

const UserService = {
  /**
   * Get current user profile
   * @returns Promise with user data
   */
  async getProfile(): Promise<UserData> {
    if (USE_MOCK_DATA) {
      // Get mock data based on the current user role
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Determine which mock data to use based on the email
      const email = currentUser.data?.user?.email || '';
      let mockDataKey = 'patient'; // default
      
      if (email.includes('advocate')) {
        mockDataKey = 'advocate';
      } else if (email.includes('provider')) {
        mockDataKey = 'provider';
      }
      
      // Return a copy of the mock data to avoid mutations
      return { ...mockUserData[mockDataKey] };
    }
    
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
    if (USE_MOCK_DATA) {
      // Mock the profile update
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Determine which mock data to update based on the email
      const email = currentUser.data?.user?.email || '';
      let mockDataKey = 'patient'; // default
      
      if (email.includes('advocate')) {
        mockDataKey = 'advocate';
      } else if (email.includes('provider')) {
        mockDataKey = 'provider';
      }
      
      // Update mock data
      mockUserData[mockDataKey] = {
        ...mockUserData[mockDataKey],
        ...profileData
      };

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return the updated mock data
      return { ...mockUserData[mockDataKey] };
    }
    
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
    if (USE_MOCK_DATA) {
      // Validate mock password update
      if (passwordData.currentPassword !== 'password123') {
        // Simulate wrong password error
        throw new Error('Current password is incorrect');
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { message: 'Password updated successfully' };
    }
    
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
    if (USE_MOCK_DATA) {
      // Mock file upload by creating a local object URL
      const fileUrl = URL.createObjectURL(file);
      
      // Get current user info
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Determine which mock data to update based on the email
      const email = currentUser.data?.user?.email || '';
      let mockDataKey = 'patient'; // default
      
      if (email.includes('advocate')) {
        mockDataKey = 'advocate';
      } else if (email.includes('provider')) {
        mockDataKey = 'provider';
      }
      
      // Update the profile picture in mock data
      mockUserData[mockDataKey] = {
        ...mockUserData[mockDataKey],
        profilePicture: fileUrl
      };
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return the updated mock data
      return { ...mockUserData[mockDataKey] };
    }
    
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
