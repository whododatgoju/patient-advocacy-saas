import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside content area
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling of background content
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Restore scrolling when modal closes
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // Use portal to render outside the normal DOM hierarchy
  return createPortal(
    <div 
      className={styles.modalOverlay} 
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`${styles.modalContainer} ${styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button 
            className={styles.closeButton} 
            onClick={onClose} 
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
