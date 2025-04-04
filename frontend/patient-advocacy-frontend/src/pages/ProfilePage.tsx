import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import styles from './ProfilePage.module.css';
import { FiEdit2, FiCheck, FiX, FiMapPin, FiMail, FiPhone, FiLock, FiSettings, FiShield, FiCalendar } from 'react-icons/fi';

interface UserProfile {
  id: string;
  name: string;
  role: 'patient' | 'advocate' | 'provider';
  avatar: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  joinDate: string;
  roleSpecificInfo: {
    // Patient fields
    medicalConditions?: string[];
    healthGoals?: string[];
    insuranceProvider?: string;
    
    // Advocate fields
    specializations?: string[];
    yearsOfExperience?: number;
    languages?: string[];
    
    // Provider fields
    organization?: string;
    title?: string;
    licensure?: string;
  };
}

// Sample user data (in a real app, this would come from an API)
const sampleUser: UserProfile = {
  id: "12345",
  name: "Morgan Smith",
  role: "patient",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  bio: "I'm navigating the healthcare system for my chronic condition and looking for advocates who can help me understand my treatment options.",
  location: "Boston, MA",
  email: "morgan.smith@example.com",
  phone: "(555) 123-4567",
  joinDate: "January 15, 2025",
  roleSpecificInfo: {
    medicalConditions: ["Rheumatoid Arthritis", "Migraine"],
    healthGoals: ["Reduce pain and inflammation", "Improve mobility", "Explore alternative treatments"],
    insuranceProvider: "BlueCross BlueShield"
  }
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(sampleUser);
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<string>('personal');
  
  // Handle edit field
  const handleEditField = (field: string, value: string) => {
    setEditing(field);
    setEditValues({ ...editValues, [field]: value });
  };
  
  // Save edited field
  const handleSaveField = (field: string) => {
    if (field === 'bio') {
      setProfile({ ...profile, bio: editValues.bio || profile.bio });
    } else if (field === 'name') {
      setProfile({ ...profile, name: editValues.name || profile.name });
    } else if (field === 'email') {
      setProfile({ ...profile, email: editValues.email || profile.email });
    } else if (field === 'phone') {
      setProfile({ ...profile, phone: editValues.phone || profile.phone });
    } else if (field === 'location') {
      setProfile({ ...profile, location: editValues.location || profile.location });
    }
    
    setEditing(null);
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
  
  return (
    <MainLayout>
      <div className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.profileHeaderContent}>
            <div className={styles.avatarSection}>
              <img 
                src={profile.avatar} 
                alt={`${profile.name}'s avatar`} 
                className={styles.avatar}
              />
              <button className={styles.changeAvatarBtn}>Change Photo</button>
            </div>
            
            <div className={styles.profileInfo}>
              <div className={styles.nameSection}>
                {editing === 'name' ? (
                  <div className={styles.editField}>
                    <input
                      type="text"
                      value={editValues.name || profile.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      className={styles.editInput}
                    />
                    <div className={styles.editActions}>
                      <button onClick={() => handleSaveField('name')} className={styles.saveBtn}>
                        <FiCheck />
                      </button>
                      <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                        <FiX />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.nameWithEdit}>
                    <h1 className={styles.profileName}>{profile.name}</h1>
                    <button 
                      onClick={() => handleEditField('name', profile.name)} 
                      className={styles.editBtn}
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                )}
                <span className={`${styles.roleBadge} ${getRoleBadgeClass()}`}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              </div>
              
              <div className={styles.bioSection}>
                {editing === 'bio' ? (
                  <div className={styles.editField}>
                    <textarea
                      value={editValues.bio || profile.bio}
                      onChange={(e) => setEditValues({ ...editValues, bio: e.target.value })}
                      className={styles.editTextarea}
                    />
                    <div className={styles.editActions}>
                      <button onClick={() => handleSaveField('bio')} className={styles.saveBtn}>
                        <FiCheck />
                      </button>
                      <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                        <FiX />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.bioWithEdit}>
                    <p className={styles.profileBio}>{profile.bio}</p>
                    <button 
                      onClick={() => handleEditField('bio', profile.bio)} 
                      className={styles.editBtn}
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                )}
              </div>
              
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FiMapPin className={styles.contactIcon} />
                  {editing === 'location' ? (
                    <div className={styles.editInlineField}>
                      <input
                        type="text"
                        value={editValues.location || profile.location}
                        onChange={(e) => setEditValues({ ...editValues, location: e.target.value })}
                        className={styles.editInlineInput}
                      />
                      <div className={styles.editInlineActions}>
                        <button onClick={() => handleSaveField('location')} className={styles.saveInlineBtn}>
                          <FiCheck />
                        </button>
                        <button onClick={handleCancelEdit} className={styles.cancelInlineBtn}>
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.contactText}>
                      <span>{profile.location}</span>
                      <button 
                        onClick={() => handleEditField('location', profile.location)} 
                        className={styles.editInlineBtn}
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={styles.contactItem}>
                  <FiMail className={styles.contactIcon} />
                  {editing === 'email' ? (
                    <div className={styles.editInlineField}>
                      <input
                        type="email"
                        value={editValues.email || profile.email}
                        onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                        className={styles.editInlineInput}
                      />
                      <div className={styles.editInlineActions}>
                        <button onClick={() => handleSaveField('email')} className={styles.saveInlineBtn}>
                          <FiCheck />
                        </button>
                        <button onClick={handleCancelEdit} className={styles.cancelInlineBtn}>
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.contactText}>
                      <span>{profile.email}</span>
                      <button 
                        onClick={() => handleEditField('email', profile.email)} 
                        className={styles.editInlineBtn}
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={styles.contactItem}>
                  <FiPhone className={styles.contactIcon} />
                  {editing === 'phone' ? (
                    <div className={styles.editInlineField}>
                      <input
                        type="tel"
                        value={editValues.phone || profile.phone}
                        onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                        className={styles.editInlineInput}
                      />
                      <div className={styles.editInlineActions}>
                        <button onClick={() => handleSaveField('phone')} className={styles.saveInlineBtn}>
                          <FiCheck />
                        </button>
                        <button onClick={handleCancelEdit} className={styles.cancelInlineBtn}>
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.contactText}>
                      <span>{profile.phone}</span>
                      <button 
                        onClick={() => handleEditField('phone', profile.phone)} 
                        className={styles.editInlineBtn}
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={styles.contactItem}>
                  <FiCalendar className={styles.contactIcon} />
                  <span className={styles.joinDate}>Member since {profile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className={styles.profileContent}>
          <nav className={styles.profileNav}>
            <button 
              className={`${styles.navButton} ${activeSection === 'personal' ? styles.activeNavButton : ''}`}
              onClick={() => handleSetActiveSection('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`${styles.navButton} ${activeSection === 'privacy' ? styles.activeNavButton : ''}`}
              onClick={() => handleSetActiveSection('privacy')}
            >
              <FiLock className={styles.navIcon} />
              Privacy Settings
            </button>
            <button 
              className={`${styles.navButton} ${activeSection === 'security' ? styles.activeNavButton : ''}`}
              onClick={() => handleSetActiveSection('security')}
            >
              <FiShield className={styles.navIcon} />
              Security
            </button>
            <button 
              className={`${styles.navButton} ${activeSection === 'account' ? styles.activeNavButton : ''}`}
              onClick={() => handleSetActiveSection('account')}
            >
              <FiSettings className={styles.navIcon} />
              Account Settings
            </button>
          </nav>
          
          <div className={styles.profileSections}>
            {activeSection === 'personal' && (
              <div className={styles.personalInfoSection}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                
                {profile.role === 'patient' && (
                  <>
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Medical Conditions</h3>
                      <div className={styles.tagContainer}>
                        {profile.roleSpecificInfo.medicalConditions?.map((condition, index) => (
                          <span key={index} className={styles.tag}>{condition}</span>
                        ))}
                        <button className={styles.addTagBtn}>+ Add</button>
                      </div>
                    </div>
                    
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Health Goals</h3>
                      <ul className={styles.goalsList}>
                        {profile.roleSpecificInfo.healthGoals?.map((goal, index) => (
                          <li key={index} className={styles.goalItem}>
                            <span>{goal}</span>
                            <div className={styles.goalActions}>
                              <button className={styles.editSmallBtn}><FiEdit2 /></button>
                              <button className={styles.removeBtn}><FiX /></button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button className={styles.addItemBtn}>+ Add Health Goal</button>
                    </div>
                    
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Insurance Information</h3>
                      <div className={styles.insuranceInfo}>
                        <p className={styles.insuranceProvider}>
                          <strong>Provider:</strong> {profile.roleSpecificInfo.insuranceProvider}
                        </p>
                        <button className={styles.editBtn}><FiEdit2 /></button>
                      </div>
                    </div>
                  </>
                )}
                
                {profile.role === 'advocate' && (
                  <>
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Specializations</h3>
                      <div className={styles.tagContainer}>
                        {profile.roleSpecificInfo.specializations?.map((specialization, index) => (
                          <span key={index} className={styles.tag}>{specialization}</span>
                        ))}
                        <button className={styles.addTagBtn}>+ Add</button>
                      </div>
                    </div>
                    
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Experience</h3>
                      <p className={styles.experienceText}>
                        {profile.roleSpecificInfo.yearsOfExperience} years of experience as a Patient Advocate
                      </p>
                      <button className={styles.editBtn}><FiEdit2 /></button>
                    </div>
                    
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Languages</h3>
                      <div className={styles.tagContainer}>
                        {profile.roleSpecificInfo.languages?.map((language, index) => (
                          <span key={index} className={styles.tag}>{language}</span>
                        ))}
                        <button className={styles.addTagBtn}>+ Add</button>
                      </div>
                    </div>
                  </>
                )}
                
                {profile.role === 'provider' && (
                  <>
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoCardTitle}>Professional Information</h3>
                      <div className={styles.providerInfo}>
                        <p className={styles.infoItem}>
                          <strong>Organization:</strong> {profile.roleSpecificInfo.organization}
                        </p>
                        <p className={styles.infoItem}>
                          <strong>Title:</strong> {profile.roleSpecificInfo.title}
                        </p>
                        <p className={styles.infoItem}>
                          <strong>Licensure:</strong> {profile.roleSpecificInfo.licensure}
                        </p>
                        <button className={styles.editBtn}><FiEdit2 /></button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {activeSection === 'privacy' && (
              <div className={styles.privacySection}>
                <h2 className={styles.sectionTitle}>Privacy Settings</h2>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Profile Visibility</h3>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>Public Profile</p>
                      <p className={styles.settingDescription}>Allow your profile to be visible to all users</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={true} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>Show Email Address</p>
                      <p className={styles.settingDescription}>Display email to connected contacts</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={false} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>Show Phone Number</p>
                      <p className={styles.settingDescription}>Display phone number to connected contacts</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={false} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Communication Preferences</h3>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>Email Notifications</p>
                      <p className={styles.settingDescription}>Receive updates and notifications via email</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={true} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>SMS Notifications</p>
                      <p className={styles.settingDescription}>Receive urgent updates via text message</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={true} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'security' && (
              <div className={styles.securitySection}>
                <h2 className={styles.sectionTitle}>Security</h2>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Password</h3>
                  <div className={styles.passwordSection}>
                    <p className={styles.passwordInfo}>Last changed: 45 days ago</p>
                    <button className={styles.primaryButton}>Change Password</button>
                  </div>
                </div>
                
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Two-Factor Authentication</h3>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <p className={styles.settingName}>Enable 2FA</p>
                      <p className={styles.settingDescription}>Add an extra layer of security to your account</p>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={false} onChange={() => {}} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Login Sessions</h3>
                  <div className={styles.loginSession}>
                    <div className={styles.sessionInfo}>
                      <p className={styles.deviceInfo}>MacBook Pro - Boston, MA</p>
                      <p className={styles.sessionTime}>Current session</p>
                    </div>
                    <div className={styles.sessionActions}>
                      <span className={styles.activeSession}>Active</span>
                    </div>
                  </div>
                  
                  <div className={styles.loginSession}>
                    <div className={styles.sessionInfo}>
                      <p className={styles.deviceInfo}>iPhone 15 - Boston, MA</p>
                      <p className={styles.sessionTime}>Last active: Today, 9:15 AM</p>
                    </div>
                    <div className={styles.sessionActions}>
                      <button className={styles.logoutBtn}>Log out</button>
                    </div>
                  </div>
                  
                  <button className={styles.secondaryButton}>Log out of all devices</button>
                </div>
              </div>
            )}
            
            {activeSection === 'account' && (
              <div className={styles.accountSection}>
                <h2 className={styles.sectionTitle}>Account Settings</h2>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Language & Region</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Language</label>
                    <select className={styles.formSelect}>
                      <option value="en-US">English (United States)</option>
                      <option value="es-US">Español (Estados Unidos)</option>
                      <option value="fr-CA">Français (Canada)</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Time Zone</label>
                    <select className={styles.formSelect}>
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>Data & Privacy</h3>
                  <div className={styles.dataOptions}>
                    <button className={styles.secondaryButton}>Download My Data</button>
                    <button className={styles.secondaryButton}>Delete Account</button>
                  </div>
                  <p className={styles.dataNote}>Deleting your account will permanently remove all your personal information and cannot be undone.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
