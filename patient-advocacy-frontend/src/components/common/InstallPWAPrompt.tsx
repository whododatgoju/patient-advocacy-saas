import React, { useState, useEffect } from 'react';
import { canInstallPWA, isRunningStandalone, useInstallPrompt } from '../../pwaUtils';
import styles from './InstallPWAPrompt.module.css';

interface InstallPWAPromptProps {
  className?: string;
}

const InstallPWAPrompt: React.FC<InstallPWAPromptProps> = ({ className = '' }) => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const showInstallPrompt = useInstallPrompt();

  useEffect(() => {
    // Check if we've already shown and dismissed the prompt
    const hasPromptBeenDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (hasPromptBeenDismissed === 'true') {
      setIsDismissed(true);
    }

    // Check if the app is already installed or installable
    const checkInstallable = async () => {
      if (isRunningStandalone()) {
        // Already installed
        setIsInstallable(false);
        return;
      }

      const installable = await canInstallPWA();
      setIsInstallable(installable);
    };

    checkInstallable();

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      console.log('App installed');
      setIsInstallable(false);
      // Track the installation event
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'pwa_installed');
      }
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    showInstallPrompt();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if not installable or already dismissed
  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <div className={`${styles.installPrompt} ${className}`}>
      <div className={styles.promptContent}>
        <div className={styles.appIcon}>
          <img src="/icons/icon-192x192.png" alt="Patient Advocacy App" />
        </div>
        <div className={styles.promptText}>
          <h3>Install Patient Advocacy App</h3>
          <p>
            Get quick access to your health journal, symptom tracker, and patient resources
            even when you're offline.
          </p>
        </div>
        <div className={styles.promptActions}>
          <button className={styles.installButton} onClick={handleInstallClick}>
            Install
          </button>
          <button className={styles.dismissButton} onClick={handleDismiss}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Add TypeScript global declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
  }
}

export default InstallPWAPrompt;
