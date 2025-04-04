import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './AccessibilityPanel.css';

const AccessibilityPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  const handleSettingChange = (setting: keyof typeof settings) => {
    updateSettings({ [setting]: !settings[setting] });
  };

  return (
    <div className="accessibility-panel-container">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessibility button */}
      <button 
        className="accessibility-toggle-button" 
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-label="Accessibility settings"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm2.84 4.78l-3.25 3.25c-.2.2-.51.2-.71 0l-1.78-1.78c-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0L11 12.94l2.84-2.84c.2-.2.51-.2.71 0 .19.2.19.51 0 .68z" fill="currentColor"/>
        </svg>
        <span className="sr-only">Accessibility</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="accessibility-panel" role="dialog" aria-labelledby="accessibility-title">
          <div role="document">
            <h2 id="accessibility-title">Accessibility Settings</h2>
            
            <div className="accessibility-options">
              <div className="option">
                <input
                  type="checkbox"
                  id="high-contrast"
                  checked={settings.highContrast}
                  onChange={() => handleSettingChange('highContrast')}
                />
                <label htmlFor="high-contrast">High Contrast</label>
                <p className="option-description">Increases color contrast for better readability</p>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  id="large-text"
                  checked={settings.largeText}
                  onChange={() => handleSettingChange('largeText')}
                />
                <label htmlFor="large-text">Large Text</label>
                <p className="option-description">Increases text size throughout the application</p>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  id="reduce-motion"
                  checked={settings.reduceMotion}
                  onChange={() => handleSettingChange('reduceMotion')}
                />
                <label htmlFor="reduce-motion">Reduce Motion</label>
                <p className="option-description">Reduces or eliminates animations and transitions</p>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  id="screen-reader"
                  checked={settings.screenReaderOptimized}
                  onChange={() => handleSettingChange('screenReaderOptimized')}
                />
                <label htmlFor="screen-reader">Screen Reader Optimization</label>
                <p className="option-description">Enhances compatibility with screen readers</p>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  id="keyboard-focus"
                  checked={settings.keyboardFocusVisible}
                  onChange={() => handleSettingChange('keyboardFocusVisible')}
                />
                <label htmlFor="keyboard-focus">Keyboard Focus Indicators</label>
                <p className="option-description">Shows clear visual indicators when navigating with keyboard</p>
              </div>
            </div>

            <div className="accessibility-panel-buttons">
              <button className="reset-button" onClick={resetSettings}>
                Reset to Default
              </button>
              <button className="close-button" onClick={togglePanel}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;
