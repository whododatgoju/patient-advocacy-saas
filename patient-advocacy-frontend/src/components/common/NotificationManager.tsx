import React, { useState, useEffect } from 'react';
import { requestNotificationPermission, subscribeToPushNotifications } from '../../pwaUtils';
import styles from './NotificationManager.module.css';

interface NotificationPreferences {
  appointments: boolean;
  medications: boolean;
  journalReminders: boolean;
  healthTips: boolean;
}

interface NotificationManagerProps {
  onClose?: () => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ onClose }) => {
  const [permissionStatus, setPermissionStatus] = useState<string>('default');
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    appointments: true,
    medications: true,
    journalReminders: false,
    healthTips: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check the current notification permission status
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }

    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('notificationPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleRequestPermission = async () => {
    setIsLoading(true);
    try {
      const granted = await requestNotificationPermission();
      setPermissionStatus(granted ? 'granted' : 'denied');
      if (granted) {
        // Subscribe to all enabled notification topics
        await subscribeToEnabledTopics();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToEnabledTopics = async () => {
    const topics = [];
    if (preferences.appointments) topics.push('appointments');
    if (preferences.medications) topics.push('medications');
    if (preferences.journalReminders) topics.push('journal-reminders');
    if (preferences.healthTips) topics.push('health-tips');

    for (const topic of topics) {
      await subscribeToPushNotifications(topic);
    }

    // Save preferences to localStorage
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  };

  const handleTogglePreference = async (key: keyof NotificationPreferences) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    };
    
    setPreferences(newPreferences);
    
    // If permission is granted, update subscriptions
    if (permissionStatus === 'granted') {
      localStorage.setItem('notificationPreferences', JSON.stringify(newPreferences));
      
      // Subscribe or unsubscribe based on the new preference
      if (newPreferences[key]) {
        await subscribeToPushNotifications(key === 'journalReminders' ? 'journal-reminders' : key);
      }
      // Unsubscribe would be handled server-side based on the stored preferences
    }
  };

  const renderPermissionButton = () => {
    if (permissionStatus === 'granted') {
      return <p className={styles.permissionGranted}>Notifications are enabled</p>;
    }

    if (permissionStatus === 'denied') {
      return (
        <div className={styles.permissionDenied}>
          <p>Notifications are blocked. Please update your browser settings to enable notifications.</p>
          <button 
            onClick={() => window.open('about:preferences#privacy', '_blank')}
            className={styles.settingsButton}
          >
            Open Browser Settings
          </button>
        </div>
      );
    }

    return (
      <button 
        onClick={handleRequestPermission} 
        disabled={isLoading}
        className={styles.enableButton}
      >
        {isLoading ? 'Requesting permission...' : 'Enable Notifications'}
      </button>
    );
  };

  return (
    <div className={styles.notificationManager}>
      <div className={styles.header}>
        <h2>Notification Preferences</h2>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        )}
      </div>

      <div className={styles.permissionSection}>
        <h3>Notification Access</h3>
        {renderPermissionButton()}
      </div>

      <div className={styles.preferencesSection}>
        <h3>What would you like to be notified about?</h3>
        <div className={styles.preferenceList}>
          <div className={styles.preferenceItem}>
            <label>
              <input
                type="checkbox"
                checked={preferences.appointments}
                onChange={() => handleTogglePreference('appointments')}
                disabled={permissionStatus !== 'granted'}
              />
              Appointment Reminders
            </label>
            <p className={styles.description}>Get notified about upcoming medical appointments</p>
          </div>

          <div className={styles.preferenceItem}>
            <label>
              <input
                type="checkbox"
                checked={preferences.medications}
                onChange={() => handleTogglePreference('medications')}
                disabled={permissionStatus !== 'granted'}
              />
              Medication Schedules
            </label>
            <p className={styles.description}>Reminders to take your medications</p>
          </div>

          <div className={styles.preferenceItem}>
            <label>
              <input
                type="checkbox"
                checked={preferences.journalReminders}
                onChange={() => handleTogglePreference('journalReminders')}
                disabled={permissionStatus !== 'granted'}
              />
              Journal Reminders
            </label>
            <p className={styles.description}>Reminders to log your symptoms and health data</p>
          </div>

          <div className={styles.preferenceItem}>
            <label>
              <input
                type="checkbox"
                checked={preferences.healthTips}
                onChange={() => handleTogglePreference('healthTips')}
                disabled={permissionStatus !== 'granted'}
              />
              Health Tips & Resources
            </label>
            <p className={styles.description}>Receive occasional health tips and resource updates</p>
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <h3>About Notifications</h3>
        <p>
          Notifications help you stay on top of your health management. They'll appear on your device even when the app isn't open.
        </p>
        <p>
          You can change these settings at any time from your profile page.
        </p>
      </div>
    </div>
  );
};

export default NotificationManager;
