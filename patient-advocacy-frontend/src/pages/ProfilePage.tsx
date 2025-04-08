import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import styles from './ProfilePage.module.css';
import { FiEdit2, FiCheck, FiX, FiMapPin, FiMail, FiPhone, FiLock, FiSettings, FiShield, FiCalendar, FiBell, FiLoader, FiPlus, FiTrash2, FiUser, FiHeart, FiClipboard, FiAward, FiGlobe, FiDollarSign } from 'react-icons/fi';
import NotificationManager from '../components/common/NotificationManager';
import UserService, { ProfileUpdateData, PasswordUpdateData } from '../services/UserService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ExtendedProfileUpdateData extends ProfileUpdateData {
  [key: string]: any;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'advocate' | 'provider' | 'admin';
  bio?: string;
  location?: string;
  phone?: string;
  avatar?: string;
  joinDate?: string;
  
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
  
  // Other fields
  certifications?: string[];
  
  // Index signature for dynamic property access
  [key: string]: any;
}

interface RoleSectionProps {
  profile: UserProfile;
  onEdit: (field: string | null, value?: any) => void;
  onSave: (field: string, value: any) => void;
  isSaving: boolean;
  editing: string | null;
  editValues: Record<string, any>;
  setEditValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<string>('personal');
  
  // Password change state
  const [passwordData, setPasswordData] = useState<PasswordUpdateData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Fetch user profile data
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userData = await UserService.getProfile();
        
        // Convert the API data to our UserProfile format
        const profileData: UserProfile = {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          bio: userData.bio || '',
          location: userData.location || '',
          phone: userData.phone || '',
          avatar: userData.profilePicture || "https://randomuser.me/api/portraits/lego/1.jpg", // Default avatar
          joinDate: new Date(userData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          medicalConditions: userData.medicalConditions || [],
          healthGoals: userData.healthGoals || [],
          insuranceProvider: userData.insuranceProvider || '',
          specializations: userData.specializations || [],
          yearsOfExperience: userData.yearsOfExperience || 0,
          languages: userData.languages || [],
          organization: userData.organization || '',
          title: userData.title || '',
          licensure: userData.licensure || '',
          certifications: userData.certifications || []
        };
        
        setProfile(profileData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user, navigate]);
  
  // Handle edit field
  const handleEditField = (field: string | null, value?: any) => {
    setEditing(field);
    setEditValues({ ...editValues, [field!]: value });
  };
  
  // Save edited field
  const handleSaveField = async (field: string) => {
    if (!profile) return;
    
    try {
      setIsSaving(true);
      
      const updateData: ExtendedProfileUpdateData = {};
      updateData[field] = editValues[field];
      
      // Update user profile
      await UserService.updateProfile(updateData);
      
      // Update local profile state
      const updatedProfile = { ...profile };
      updatedProfile[field] = editValues[field];
      
      setProfile(updatedProfile);
      setNotification({ 
        message: 'Profile updated successfully!', 
        type: 'success' 
      });
      
      // Update the user in AuthContext if name was updated
      if (field === 'name' && user) {
        updateUser({
          ...user,
          name: updateData.name || user.name
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification({ 
        message: 'Failed to update profile. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
      setEditing(null);
    }
  };
  
  // Change password - used in the password form
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setNotification({
          message: 'New passwords do not match',
          type: 'error'
        });
        return;
      }
      
      await UserService.updatePassword(passwordData);
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setNotification({
        message: 'Password updated successfully!',
        type: 'success'
      });
    } catch (err: any) {
      console.error('Error updating password:', err);
      setNotification({
        message: err.response?.data?.message || 'Failed to update password',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle avatar change - used in the avatar upload input
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    
    try {
      setIsSaving(true);
      
      // Use the proper method for uploading files
      const updatedUser = await UserService.uploadProfilePicture(file);
      
      // Update local state with the returned profile picture URL
      setProfile({
        ...profile,
        avatar: updatedUser.profilePicture || profile.avatar
      });
      
      setNotification({
        message: 'Profile picture updated successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error updating profile picture:', err);
      setNotification({
        message: 'Failed to update profile picture. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(null);
  };
  
  // Switch active section
  const handleSetActiveSection = (section: string) => {
    setActiveSection(section);
  };
  
  // Get role badge color
  const getRoleBadgeClass = () => {
    if (!profile) return styles.patientBadge;
    
    switch (profile.role) {
      case 'patient':
        return styles.patientBadge;
      case 'advocate':
        return styles.advocateBadge;
      case 'provider':
        return styles.providerBadge;
      default:
        return styles.patientBadge;
    }
  };
  
  // Handle password field change
  const handlePasswordFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const PatientProfileSection: React.FC<RoleSectionProps> = ({ profile, onEdit, onSave, isSaving, editing, editValues, setEditValues }) => {
    const [showAddCondition, setShowAddCondition] = useState(false);
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [newCondition, setNewCondition] = useState('');
    const [newGoal, setNewGoal] = useState('');
    
    const handleAddCondition = () => {
      if (newCondition.trim()) {
        const updatedConditions = [...(profile.medicalConditions || []), newCondition.trim()];
        onSave('medicalConditions', updatedConditions);
        setNewCondition('');
        setShowAddCondition(false);
      }
    };
    
    const handleAddGoal = () => {
      if (newGoal.trim()) {
        const updatedGoals = [...(profile.healthGoals || []), newGoal.trim()];
        onSave('healthGoals', updatedGoals);
        setNewGoal('');
        setShowAddGoal(false);
      }
    };
    
    const handleRemoveCondition = (index: number) => {
      const updatedConditions = [...(profile.medicalConditions || [])];
      updatedConditions.splice(index, 1);
      onSave('medicalConditions', updatedConditions);
    };
    
    const handleRemoveGoal = (index: number) => {
      const updatedGoals = [...(profile.healthGoals || [])];
      updatedGoals.splice(index, 1);
      onSave('healthGoals', updatedGoals);
    };
    
    return (
      <div className={styles.roleSpecificSection}>
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiHeart /> Medical Conditions
          </h3>
          <div className={styles.tagList}>
            {profile.medicalConditions && profile.medicalConditions.length > 0 ? (
              profile.medicalConditions.map((condition: string, index: number) => (
                <div key={index} className={styles.tag}>
                  <span>{condition}</span>
                  <button 
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveCondition(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No medical conditions added</p>
            )}
          </div>
          
          {showAddCondition ? (
            <div className={styles.addItemForm}>
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Enter medical condition"
                className={styles.addItemInput}
              />
              <div className={styles.addItemActions}>
                <button 
                  onClick={handleAddCondition}
                  className={styles.addItemButton}
                  disabled={!newCondition.trim()}
                >
                  Add
                </button>
                <button 
                  onClick={() => setShowAddCondition(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={styles.addButton}
              onClick={() => setShowAddCondition(true)}
            >
              <FiPlus /> Add Condition
            </button>
          )}
        </div>
        
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiClipboard /> Health Goals
          </h3>
          <ul className={styles.goalsList}>
            {profile.healthGoals && profile.healthGoals.length > 0 ? (
              profile.healthGoals.map((goal: string, index: number) => (
                <li key={index} className={styles.goalItem}>
                  <span>{goal}</span>
                  <button 
                    className={styles.removeItemButton}
                    onClick={() => handleRemoveGoal(index)}
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))
            ) : (
              <p className={styles.emptyMessage}>No health goals added</p>
            )}
          </ul>
          
          {showAddGoal ? (
            <div className={styles.addItemForm}>
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter health goal"
                className={styles.addItemInput}
              />
              <div className={styles.addItemActions}>
                <button 
                  onClick={handleAddGoal}
                  className={styles.addItemButton}
                  disabled={!newGoal.trim()}
                >
                  Add
                </button>
                <button 
                  onClick={() => setShowAddGoal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={styles.addButton}
              onClick={() => setShowAddGoal(true)}
            >
              <FiPlus /> Add Health Goal
            </button>
          )}
        </div>
        
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiDollarSign /> Insurance Information
          </h3>
          
          {editing === 'insuranceProvider' ? (
            <div className={styles.editableField}>
              <input
                type="text"
                value={editValues.insuranceProvider || profile.insuranceProvider || ''}
                onChange={(e) => setEditValues({ ...editValues, insuranceProvider: e.target.value })}
                placeholder="Enter insurance provider"
                className={styles.editInput}
              />
              <div className={styles.editActions}>
                <button 
                  onClick={() => onSave('insuranceProvider', editValues.insuranceProvider)} 
                  className={styles.saveButton}
                  disabled={isSaving}
                >
                  {isSaving ? '...' : <FiCheck />}
                </button>
                <button 
                  onClick={() => onEdit(null)} 
                  className={styles.cancelButton}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.infoItem}>
              <p>
                <strong>Provider:</strong> {profile.insuranceProvider || 'Not specified'}
                <button 
                  onClick={() => onEdit('insuranceProvider', profile.insuranceProvider || '')} 
                  className={styles.editButton}
                >
                  <FiEdit2 />
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdvocateProfileSection: React.FC<RoleSectionProps> = ({ profile, onEdit, onSave, isSaving, editing, editValues, setEditValues }) => {
    const [showAddSpecialization, setShowAddSpecialization] = useState(false);
    const [showAddLanguage, setShowAddLanguage] = useState(false);
    const [newSpecialization, setNewSpecialization] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    
    const handleAddSpecialization = () => {
      if (newSpecialization.trim()) {
        const updatedSpecializations = [...(profile.specializations || []), newSpecialization.trim()];
        onSave('specializations', updatedSpecializations);
        setNewSpecialization('');
        setShowAddSpecialization(false);
      }
    };
    
    const handleAddLanguage = () => {
      if (newLanguage.trim()) {
        const updatedLanguages = [...(profile.languages || []), newLanguage.trim()];
        onSave('languages', updatedLanguages);
        setNewLanguage('');
        setShowAddLanguage(false);
      }
    };
    
    const handleRemoveSpecialization = (index: number) => {
      const updatedSpecializations = [...(profile.specializations || [])];
      updatedSpecializations.splice(index, 1);
      onSave('specializations', updatedSpecializations);
    };
    
    const handleRemoveLanguage = (index: number) => {
      const updatedLanguages = [...(profile.languages || [])];
      updatedLanguages.splice(index, 1);
      onSave('languages', updatedLanguages);
    };
    
    return (
      <div className={styles.roleSpecificSection}>
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiAward /> Specializations
          </h3>
          <div className={styles.tagList}>
            {profile.specializations && profile.specializations.length > 0 ? (
              profile.specializations.map((specialization: string, index: number) => (
                <div key={index} className={styles.tag}>
                  <span>{specialization}</span>
                  <button 
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveSpecialization(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No specializations added</p>
            )}
          </div>
          
          {showAddSpecialization ? (
            <div className={styles.addItemForm}>
              <input
                type="text"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Enter specialization"
                className={styles.addItemInput}
              />
              <div className={styles.addItemActions}>
                <button 
                  onClick={handleAddSpecialization}
                  className={styles.addItemButton}
                  disabled={!newSpecialization.trim()}
                >
                  Add
                </button>
                <button 
                  onClick={() => setShowAddSpecialization(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={styles.addButton}
              onClick={() => setShowAddSpecialization(true)}
            >
              <FiPlus /> Add Specialization
            </button>
          )}
        </div>
        
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiUser /> Experience
          </h3>
          
          {editing === 'yearsOfExperience' ? (
            <div className={styles.editableField}>
              <input
                type="number"
                min="0"
                value={editValues.yearsOfExperience || profile.yearsOfExperience || 0}
                onChange={(e) => setEditValues({ ...editValues, yearsOfExperience: Number(e.target.value) })}
                className={styles.editInput}
              />
              <div className={styles.editActions}>
                <button 
                  onClick={() => onSave('yearsOfExperience', editValues.yearsOfExperience)} 
                  className={styles.saveButton}
                  disabled={isSaving}
                >
                  {isSaving ? '...' : <FiCheck />}
                </button>
                <button 
                  onClick={() => onEdit(null)} 
                  className={styles.cancelButton}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.infoItem}>
              <p>
                <strong>Years of Experience:</strong> {profile.yearsOfExperience || '0'} years
                <button 
                  onClick={() => onEdit('yearsOfExperience', profile.yearsOfExperience || 0)} 
                  className={styles.editButton}
                >
                  <FiEdit2 />
                </button>
              </p>
            </div>
          )}
        </div>
        
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiGlobe /> Languages
          </h3>
          <div className={styles.tagList}>
            {profile.languages && profile.languages.length > 0 ? (
              profile.languages.map((language: string, index: number) => (
                <div key={index} className={styles.tag}>
                  <span>{language}</span>
                  <button 
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveLanguage(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No languages added</p>
            )}
          </div>
          
          {showAddLanguage ? (
            <div className={styles.addItemForm}>
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Enter language"
                className={styles.addItemInput}
              />
              <div className={styles.addItemActions}>
                <button 
                  onClick={handleAddLanguage}
                  className={styles.addItemButton}
                  disabled={!newLanguage.trim()}
                >
                  Add
                </button>
                <button 
                  onClick={() => setShowAddLanguage(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={styles.addButton}
              onClick={() => setShowAddLanguage(true)}
            >
              <FiPlus /> Add Language
            </button>
          )}
        </div>
      </div>
    );
  };

  const ProviderProfileSection: React.FC<RoleSectionProps> = ({ profile, onEdit, onSave, isSaving, editing, editValues, setEditValues }) => {
    return (
      <div className={styles.roleSpecificSection}>
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiUser /> Professional Information
          </h3>
          
          <div className={styles.infoGroup}>
            <div className={styles.infoItem}>
              <strong>Organization:</strong>
              {editing === 'organization' ? (
                <div className={styles.editableField}>
                  <input
                    type="text"
                    value={editValues.organization || profile.organization || ''}
                    onChange={(e) => setEditValues({ ...editValues, organization: e.target.value })}
                    className={styles.editInput}
                  />
                  <div className={styles.editActions}>
                    <button 
                      onClick={() => onSave('organization', editValues.organization)} 
                      className={styles.saveButton}
                      disabled={isSaving}
                    >
                      {isSaving ? '...' : <FiCheck />}
                    </button>
                    <button 
                      onClick={() => onEdit(null)} 
                      className={styles.cancelButton}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ) : (
                <span>
                  {profile.organization || 'Not specified'}
                  <button 
                    onClick={() => onEdit('organization', profile.organization || '')} 
                    className={styles.editButton}
                  >
                    <FiEdit2 />
                  </button>
                </span>
              )}
            </div>
            
            <div className={styles.infoItem}>
              <strong>Title:</strong>
              {editing === 'title' ? (
                <div className={styles.editableField}>
                  <input
                    type="text"
                    value={editValues.title || profile.title || ''}
                    onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                    className={styles.editInput}
                  />
                  <div className={styles.editActions}>
                    <button 
                      onClick={() => onSave('title', editValues.title)} 
                      className={styles.saveButton}
                      disabled={isSaving}
                    >
                      {isSaving ? '...' : <FiCheck />}
                    </button>
                    <button 
                      onClick={() => onEdit(null)} 
                      className={styles.cancelButton}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ) : (
                <span>
                  {profile.title || 'Not specified'}
                  <button 
                    onClick={() => onEdit('title', profile.title || '')} 
                    className={styles.editButton}
                  >
                    <FiEdit2 />
                  </button>
                </span>
              )}
            </div>
            
            <div className={styles.infoItem}>
              <strong>Licensure:</strong>
              {editing === 'licensure' ? (
                <div className={styles.editableField}>
                  <input
                    type="text"
                    value={editValues.licensure || profile.licensure || ''}
                    onChange={(e) => setEditValues({ ...editValues, licensure: e.target.value })}
                    className={styles.editInput}
                  />
                  <div className={styles.editActions}>
                    <button 
                      onClick={() => onSave('licensure', editValues.licensure)} 
                      className={styles.saveButton}
                      disabled={isSaving}
                    >
                      {isSaving ? '...' : <FiCheck />}
                    </button>
                    <button 
                      onClick={() => onEdit(null)} 
                      className={styles.cancelButton}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ) : (
                <span>
                  {profile.licensure || 'Not specified'}
                  <button 
                    onClick={() => onEdit('licensure', profile.licensure || '')} 
                    className={styles.editButton}
                  >
                    <FiEdit2 />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionCardTitle}>
            <FiAward /> Certifications
          </h3>
          {/* Add certifications management here */}
          <p className={styles.emptyMessage}>Feature coming soon</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loaderContainer}>
          <FiLoader className={styles.loadingSpinner} />
          <p>Loading profile...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }
  
  if (!profile) {
    return (
      <MainLayout>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>Profile not found.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {notification.message && (
        <NotificationManager
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: 'info' })}
        />
      )}
      
      <div className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.profileHeaderContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
                <label htmlFor="avatar-upload" className={styles.avatarUploadButton}>
                  <FiEdit2 />
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }} 
                  />
                </label>
              </div>
              <div className={`${styles.roleBadge} ${getRoleBadgeClass()}`}>
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </div>
            </div>
            
            <div className={styles.nameSection}>
              {editing === 'name' ? (
                <div className={styles.editableField}>
                  <input
                    type="text"
                    value={editValues.name || ''}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className={styles.editInput}
                  />
                  <div className={styles.editActions}>
                    <button 
                      onClick={() => handleSaveField('name')} 
                      className={styles.saveButton}
                      disabled={isSaving}
                    >
                      {isSaving ? '...' : <FiCheck />}
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className={styles.cancelButton}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ) : (
                <h1 className={styles.profileName}>
                  {profile.name}
                  <button 
                    onClick={() => handleEditField('name', profile.name)} 
                    className={styles.editButton}
                  >
                    <FiEdit2 />
                  </button>
                </h1>
              )}
              
              <div className={styles.profileMeta}>
                <span className={styles.metaItem}>
                  <FiCalendar /> Joined {profile.joinDate}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        <div className={styles.profileContent}>
          <aside className={styles.profileSidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Navigation</h3>
              <ul className={styles.navList}>
                <li>
                  <button 
                    className={`${styles.navButton} ${activeSection === 'personal' ? styles.active : ''}`} 
                    onClick={() => handleSetActiveSection('personal')}
                  >
                    <FiSettings /> Personal Information
                  </button>
                </li>
                <li>
                  <button 
                    className={`${styles.navButton} ${activeSection === 'security' ? styles.active : ''}`}
                    onClick={() => handleSetActiveSection('security')}
                  >
                    <FiShield /> Security & Password
                  </button>
                </li>
                <li>
                  <button 
                    className={`${styles.navButton} ${activeSection === 'notifications' ? styles.active : ''}`}
                    onClick={() => handleSetActiveSection('notifications')}
                  >
                    <FiBell /> Notification Settings
                  </button>
                </li>
              </ul>
            </div>
            
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Contact Information</h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <FiMail className={styles.contactIcon} />
                  {editing === 'email' ? (
                    <div className={styles.editableField}>
                      <input
                        type="email"
                        value={editValues.email || ''}
                        onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                        className={styles.editInput}
                      />
                      <div className={styles.editActions}>
                        <button 
                          onClick={() => handleSaveField('email')} 
                          className={styles.saveButton}
                          disabled={isSaving}
                        >
                          {isSaving ? '...' : <FiCheck />}
                        </button>
                        <button 
                          onClick={handleCancelEdit} 
                          className={styles.cancelButton}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span>{profile.email}</span>
                      <button 
                        onClick={() => handleEditField('email', profile.email)} 
                        className={styles.editButton}
                      >
                        <FiEdit2 />
                      </button>
                    </>
                  )}
                </li>
                
                <li className={styles.contactItem}>
                  <FiPhone className={styles.contactIcon} />
                  {editing === 'phone' ? (
                    <div className={styles.editableField}>
                      <input
                        type="tel"
                        value={editValues.phone || ''}
                        onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                        className={styles.editInput}
                      />
                      <div className={styles.editActions}>
                        <button 
                          onClick={() => handleSaveField('phone')} 
                          className={styles.saveButton}
                          disabled={isSaving}
                        >
                          {isSaving ? '...' : <FiCheck />}
                        </button>
                        <button 
                          onClick={handleCancelEdit} 
                          className={styles.cancelButton}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span>{profile.phone || 'No phone number added'}</span>
                      <button 
                        onClick={() => handleEditField('phone', profile.phone)} 
                        className={styles.editButton}
                      >
                        <FiEdit2 />
                      </button>
                    </>
                  )}
                </li>
                
                <li className={styles.contactItem}>
                  <FiMapPin className={styles.contactIcon} />
                  {editing === 'location' ? (
                    <div className={styles.editableField}>
                      <input
                        type="text"
                        value={editValues.location || ''}
                        onChange={(e) => setEditValues({ ...editValues, location: e.target.value })}
                        className={styles.editInput}
                      />
                      <div className={styles.editActions}>
                        <button 
                          onClick={() => handleSaveField('location')} 
                          className={styles.saveButton}
                          disabled={isSaving}
                        >
                          {isSaving ? '...' : <FiCheck />}
                        </button>
                        <button 
                          onClick={handleCancelEdit} 
                          className={styles.cancelButton}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span>{profile.location || 'No location added'}</span>
                      <button 
                        onClick={() => handleEditField('location', profile.location)} 
                        className={styles.editButton}
                      >
                        <FiEdit2 />
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </aside>
          
          <main className={styles.profileMain}>
            {activeSection === 'personal' && (
              <section className={styles.profileSection}>
                <h2 className={styles.sectionTitle}>About Me</h2>
                
                {editing === 'bio' ? (
                  <div className={styles.editableBio}>
                    <textarea
                      value={editValues.bio || ''}
                      onChange={(e) => setEditValues({ ...editValues, bio: e.target.value })}
                      className={styles.bioTextarea}
                      rows={5}
                    />
                    <div className={styles.editActions}>
                      <button 
                        onClick={() => handleSaveField('bio')} 
                        className={styles.saveButton}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button 
                        onClick={handleCancelEdit} 
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.bioSection}>
                    <p className={styles.bio}>
                      {profile.bio || 'No bio added yet.'}
                    </p>
                    <button 
                      onClick={() => handleEditField('bio', profile.bio)} 
                      className={styles.editButton}
                    >
                      <FiEdit2 /> Edit Bio
                    </button>
                  </div>
                )}
                
                {/* Role-specific information sections with specialized components */}
                {profile.role === 'patient' && (
                  <PatientProfileSection 
                    profile={profile}
                    onEdit={handleEditField}
                    onSave={handleSaveField}
                    isSaving={isSaving}
                    editing={editing}
                    editValues={editValues}
                    setEditValues={setEditValues}
                  />
                )}
                
                {profile.role === 'advocate' && (
                  <AdvocateProfileSection 
                    profile={profile}
                    onEdit={handleEditField}
                    onSave={handleSaveField}
                    isSaving={isSaving}
                    editing={editing}
                    editValues={editValues}
                    setEditValues={setEditValues}
                  />
                )}
                
                {profile.role === 'provider' && (
                  <ProviderProfileSection 
                    profile={profile}
                    onEdit={handleEditField}
                    onSave={handleSaveField}
                    isSaving={isSaving}
                    editing={editing}
                    editValues={editValues}
                    setEditValues={setEditValues}
                  />
                )}
              </section>
            )}
            
            {activeSection === 'security' && (
              <section className={styles.profileSection}>
                <h2 className={styles.sectionTitle}>
                  <FiLock /> Security & Password
                </h2>
                
                <div className={styles.passwordSection}>
                  <h3>Change Password</h3>
                  <form className={styles.passwordForm} onSubmit={handlePasswordChange}>
                    <div className={styles.formGroup}>
                      <label htmlFor="current-password">Current Password</label>
                      <input
                        type="password"
                        id="current-password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordFieldChange}
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="new-password">New Password</label>
                      <input
                        type="password"
                        id="new-password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordFieldChange}
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordFieldChange}
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
                
                <div className={styles.securitySection}>
                  <h3>Account Security</h3>
                  <p>
                    Your account security is important. We recommend using a strong password
                    and enabling two-factor authentication if available.
                  </p>
                </div>
              </section>
            )}
            
            {activeSection === 'notifications' && (
              <section className={styles.profileSection}>
                <h2 className={styles.sectionTitle}>
                  <FiBell /> Notification Preferences
                </h2>
                {/* Notification preferences would be managed here */}
              </section>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
