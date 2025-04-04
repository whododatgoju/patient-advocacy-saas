import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  role?: 'patient' | 'advocate' | 'provider';
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  role = 'patient' 
}) => {
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
            <nav className={styles.nav}>
              <Link to="/" className={styles.navLink}>Home</Link>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <Link to="/journal" className={styles.navLink}>Health Journal</Link>
              <Link to="/schedule-call" className={styles.navLink}>Video Calls</Link>
              <Link to="/resources" className={styles.navLink}>Resources</Link>
              <Link to="/advocate-match" className={styles.navLink}>Find Advocate</Link>
            </nav>
            
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{
                padding: '0.25rem 0.75rem', 
                borderRadius: '9999px', 
                fontSize: '0.75rem', 
                marginRight: '1rem', 
                color: 'white', 
                backgroundColor: `var(--color-${role})`
              }}>
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
            </div>
          </div>
        </div>
      </header>
      
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
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
              <div>
                <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Patient Advocacy Platform</h3>
                <p style={{color: 'var(--color-gray-600)'}}>Empowering patients through advocacy, education, and support.</p>
              </div>
              <div>
                <h4 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem'}}>Quick Links</h4>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                  <li><Link to="/dashboard" className={styles.footerLink}>Dashboard</Link></li>
                  <li><Link to="/journal" className={styles.footerLink}>Health Journal</Link></li>
                  <li><Link to="/schedule-call" className={styles.footerLink}>Video Calls</Link></li>
                  <li><Link to="/resources" className={styles.footerLink}>Resources</Link></li>
                  <li><Link to="/advocate-match" className={styles.footerLink}>Find an Advocate</Link></li>
                  <li><Link to="/about" className={styles.footerLink}>About Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem'}}>Contact</h4>
                <p style={{color: 'var(--color-gray-600)'}}>Email: contact@patientadvocacy.com</p>
                <p style={{color: 'var(--color-gray-600)'}}>Phone: (555) 123-4567</p>
                <div style={{marginTop: '1rem'}}>
                  <Button variant="primary" size="sm">Contact Us</Button>
                </div>
              </div>
            </div>
            <div style={{borderTop: '1px solid var(--color-gray-300)', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center'}}>
              <p className={styles.copyright}>&copy; {new Date().getFullYear()} Patient Advocacy Platform. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
