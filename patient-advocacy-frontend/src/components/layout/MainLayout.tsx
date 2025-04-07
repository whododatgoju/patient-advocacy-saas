import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';
import styles from './MainLayout.module.css';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  role?: 'patient' | 'advocate' | 'provider';
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  role = 'patient' 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const roleStyle = {
    patient: styles.logoPatient,
    advocate: styles.logoAdvocate,
    provider: styles.logoProvider,
  };

  const roleLabel = {
    patient: 'Patient',
    advocate: 'Advocate',
    provider: 'Provider',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <Link to="/" className={styles.logo}>
                <span className={roleStyle[role]}>Patient Advocacy Platform</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.activeNavLink : ''}`}>Home</Link>
              <Link to="/dashboard" className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.activeNavLink : ''}`}>Dashboard</Link>
              <Link to="/journal" className={`${styles.navLink} ${location.pathname === '/journal' ? styles.activeNavLink : ''}`}>Health Journal</Link>
              <Link to="/schedule-call" className={`${styles.navLink} ${location.pathname === '/schedule-call' ? styles.activeNavLink : ''}`}>Video Calls</Link>
              <Link to="/resources" className={`${styles.navLink} ${location.pathname === '/resources' ? styles.activeNavLink : ''}`}>Resources</Link>
              <Link to="/advocate-match" className={`${styles.navLink} ${location.pathname === '/advocate-match' ? styles.activeNavLink : ''}`}>Find Advocate</Link>
            </nav>
            
            <div className={styles.profileSection}>
              <ThemeToggle />
              
              <div className={styles.roleLabel} style={{ backgroundColor: `var(--color-${role})` }}>
                {roleLabel[role]}
              </div>
              
              <Link to="/profile">
                <Button
                  variant="secondary"
                  size="sm"
                >
                  My Profile
                </Button>
              </Link>

              <Button
                variant="tertiary"
                size="sm"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                <FiLogOut className={styles.logoutIcon} />
                Logout
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay */}
      <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <div className={styles.mobileNavContent}>
          <nav className={styles.mobileNavLinks}>
            <Link 
              to="/" 
              className={`${styles.mobileNavLink} ${location.pathname === '/' ? styles.activeMobileNavLink : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`${styles.mobileNavLink} ${location.pathname === '/dashboard' ? styles.activeMobileNavLink : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/journal" 
              className={`${styles.mobileNavLink} ${location.pathname === '/journal' ? styles.activeMobileNavLink : ''}`}
            >
              Health Journal
            </Link>
            <Link 
              to="/schedule-call" 
              className={`${styles.mobileNavLink} ${location.pathname === '/schedule-call' ? styles.activeMobileNavLink : ''}`}
            >
              Video Calls
            </Link>
            <Link 
              to="/resources" 
              className={`${styles.mobileNavLink} ${location.pathname === '/resources' ? styles.activeMobileNavLink : ''}`}
            >
              Resources
            </Link>
            <Link 
              to="/advocate-match" 
              className={`${styles.mobileNavLink} ${location.pathname === '/advocate-match' ? styles.activeMobileNavLink : ''}`}
            >
              Find Advocate
            </Link>
            <Link 
              to="/profile" 
              className={`${styles.mobileNavLink} ${location.pathname === '/profile' ? styles.activeMobileNavLink : ''}`}
            >
              My Profile
            </Link>
            <button 
              onClick={handleLogout}
              className={styles.mobileLogoutButton}
            >
              <FiLogOut className={styles.mobileLogoutIcon} />
              Logout
            </button>
          </nav>
          
          <div className={styles.mobileNavFooter}>
            <div className={styles.mobileRoleLabel} style={{ backgroundColor: `var(--color-${role})` }}>
              {roleLabel[role]}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content */}
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3 className={styles.footerHeading}>Patient Advocacy Platform</h3>
              <p className={styles.footerAbout}>Empowering patients through advocacy, education, and support.</p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                <li><Link to="/dashboard" className={styles.footerLink}>Dashboard</Link></li>
                <li><Link to="/journal" className={styles.footerLink}>Health Journal</Link></li>
                <li><Link to="/schedule-call" className={styles.footerLink}>Video Calls</Link></li>
                <li><Link to="/resources" className={styles.footerLink}>Resources</Link></li>
                <li><Link to="/advocate-match" className={styles.footerLink}>Find an Advocate</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Patient Resources</h4>
              <ul className={styles.footerLinks}>
                <li><Link to="/resources/patient-rights" className={styles.footerLink}>Patient Rights</Link></li>
                <li><Link to="/resources/insurance" className={styles.footerLink}>Insurance & Billing</Link></li>
                <li><Link to="/resources/medical-records" className={styles.footerLink}>Medical Records</Link></li>
                <li><Link to="/resources/legal" className={styles.footerLink}>Legal Information</Link></li>
                <li><Link to="/resources/self-advocacy" className={styles.footerLink}>Self-Advocacy</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Contact</h4>
              <p className={styles.contactInfo}>Email: contact@patientadvocacy.com</p>
              <p className={styles.contactInfo}>Phone: (555) 123-4567</p>
              <div className={styles.contactButton}>
                <Button variant="primary" size="sm">Contact Us</Button>
              </div>
            </div>
          </div>
          
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Patient Advocacy Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
