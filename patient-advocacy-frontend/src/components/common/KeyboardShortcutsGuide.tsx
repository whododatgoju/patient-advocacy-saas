import React, { useState, useEffect, useRef } from 'react';
import './KeyboardShortcutsGuide.css';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const KeyboardShortcutsGuide: React.FC = () => {
  const { settings } = useAccessibility();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts guide when user presses ? while holding Shift
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
      
      // Close the guide with Escape key
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Store last focused element when opening modal
  useEffect(() => {
    if (isVisible) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 10);
    } else if (lastFocusedElement.current) {
      // Restore focus when closing
      lastFocusedElement.current.focus();
    }
  }, [isVisible]);

  // Trap focus within the modal
  useEffect(() => {
    if (!isVisible) return;

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    
    if (!modal) return;
    
    const focusableContent = modal.querySelectorAll(focusableElements);
    const firstFocusable = focusableContent[0] as HTMLElement;
    const lastFocusable = focusableContent[focusableContent.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isVisible]);

  if (!isVisible) return null;

  const accessibilityClasses = `
    keyboard-shortcuts-modal
    ${settings?.highContrast ? 'high-contrast' : ''}
    ${settings?.largeText ? 'large-text' : ''}
    ${settings?.reduceMotion ? 'reduce-motion' : ''}
  `.trim();

  return (
    <div 
      className={accessibilityClasses}
      role="dialog" 
      aria-labelledby="keyboard-shortcuts-title"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="keyboard-shortcuts-content" role="document">
        <div className="keyboard-shortcuts-header">
          <h2 id="keyboard-shortcuts-title">Keyboard Shortcuts</h2>
          <button 
            className="close-button" 
            onClick={() => setIsVisible(false)}
            aria-label="Close keyboard shortcuts guide"
            ref={closeButtonRef}
          >
            ×
          </button>
        </div>
        <div className="keyboard-shortcuts-body">
          <div className="shortcuts-section">
            <h3>Navigation</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>H</kbd> <span>Navigate to Home</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>D</kbd> <span>Navigate to Dashboard</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>J</kbd> <span>Navigate to Journal</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>R</kbd> <span>Navigate to Resources</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>P</kbd> <span>Navigate to Profile</span>
              </li>
            </ul>
          </div>
          
          <div className="shortcuts-section">
            <h3>Actions</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>N</kbd> <span>New Journal Entry</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>S</kbd> <span>Save Current Form</span>
              </li>
              <li>
                <kbd>Esc</kbd> <span>Close Modal / Cancel</span>
              </li>
              <li>
                <kbd>/</kbd> <span>Focus Search</span>
              </li>
            </ul>
          </div>
          
          <div className="shortcuts-section">
            <h3>Accessibility</h3>
            <ul>
              <li>
                <kbd>Alt</kbd> + <kbd>A</kbd> <span>Open Accessibility Panel</span>
              </li>
              <li>
                <kbd>Tab</kbd> <span>Navigate Through Elements</span>
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>?</kbd> <span>Show/Hide This Guide</span>
              </li>
              <li>
                <kbd>Alt</kbd> + <kbd>1</kbd> to <kbd>9</kbd> <span>Jump to Main Sections</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="keyboard-shortcuts-footer">
          <p>Press <kbd>Tab</kbd> to navigate through items and <kbd>Enter</kbd> to select.</p>
          <p>These shortcuts are designed to improve navigation and accessibility across the Patient Advocacy Platform.</p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsGuide;
