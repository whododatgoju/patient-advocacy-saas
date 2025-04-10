import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { isDevBypassEnabled } from '../config/development';

// Toggle this flag to show test user buttons
const SHOW_TEST_USERS = true;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, error: authError, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'advocate' | 'provider'>('patient');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    
    // Update local error state when auth error changes
    if (authError) {
      setError(authError);
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate, authError, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearError();
    
    // Validate input
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await login({ email, password });
      // Successfully logged in, redirect will happen in useEffect
    } catch (err) {
      // Error handling is done via the authError state from context
      setIsLoading(false);
    }
  };

  const loginAsTestUser = async (userType: 'patient' | 'advocate' | 'provider') => {
    setError(null);
    clearError();
    setIsLoading(true);
    
    // Test user credentials
    const testCredentials = {
      patient: { email: 'test@patient.com', password: 'password123' },
      advocate: { email: 'test@advocate.com', password: 'password123' },
      provider: { email: 'test@provider.com', password: 'password123' }
    };
    
    try {
      // Use the login function from AuthContext
      await login(testCredentials[userType]);
      // Redirect will happen in useEffect
    } catch (err) {
      // In case of error during login
      setError(`Failed to log in as test ${userType}. Try again or use normal login.`);
      setIsLoading(false);
    }
  };

  const handleDevBypass = async () => {
    if (!isDevBypassEnabled()) {
      setError('Development bypass is not enabled in this environment');
      return;
    }

    try {
      await login({ email: 'dev', password: process.env.VITE_DEV_BYPASS_KEY || 'dev-bypass-2025' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Development bypass failed.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                  <path d="M20 15C22.7614 15 25 17.2386 25 20C25 22.7614 22.7614 25 20 25C17.2386 25 15 22.7614 15 20C15 17.2386 17.2386 15 20 15Z" fill="#3B82F6"/>
                </svg>
              </span>
              <h1 className={styles.logoText}>Patient Advocacy Platform</h1>
            </div>
          </div>
          <h2 className={styles.welcomeText}>Welcome Back</h2>
          <p className={styles.subheading}>Sign in to your account to continue</p>
        </div>

        <div className={styles.roleSelector}>
          <button 
            className={`${styles.roleButton} ${role === 'patient' ? styles.activeRole : ''}`}
            onClick={() => setRole('patient')}
          >
            <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(129, 140, 248, 0.1)' }}>
              <FiUser color="#818cf8" />
            </div>
            <span>Patient</span>
          </button>
          <button 
            className={`${styles.roleButton} ${role === 'advocate' ? styles.activeRole : ''}`}
            onClick={() => setRole('advocate')}
          >
            <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
              <FiUser color="#34d399" />
            </div>
            <span>Advocate</span>
          </button>
          <button 
            className={`${styles.roleButton} ${role === 'provider' ? styles.activeRole : ''}`}
            onClick={() => setRole('provider')}
          >
            <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)' }}>
              <FiUser color="#60a5fa" />
            </div>
            <span>Provider</span>
          </button>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <div className={styles.inputWithIcon}>
              <FiMail className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                className={styles.formInput}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.passwordLabelRow}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>Forgot password?</Link>
            </div>
            <div className={styles.inputWithIcon}>
              <FiLock className={styles.inputIcon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.formInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              <span>Remember me</span>
            </label>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            {!isLoading && <FiArrowRight className={styles.buttonIcon} />}
          </button>
        </form>

        {SHOW_TEST_USERS && (
          <div className={styles.testUserSection}>
            <h3>Quick Access Test Accounts</h3>
            <p className={styles.testUserInfo}>
              For demo purposes only. No real login required.
            </p>
            <div className={styles.testUserButtons}>
              <button 
                className={`${styles.testUserButton} ${styles.patientButton}`}
                onClick={() => loginAsTestUser('patient')}
                disabled={isLoading}
              >
                Login as Test Patient
              </button>
              <button 
                className={`${styles.testUserButton} ${styles.advocateButton}`}
                onClick={() => loginAsTestUser('advocate')}
                disabled={isLoading}
              >
                Login as Test Advocate
              </button>
              <button 
                className={`${styles.testUserButton} ${styles.providerButton}`}
                onClick={() => loginAsTestUser('provider')}
                disabled={isLoading}
              >
                Login as Test Provider
              </button>
            </div>
            <div className={styles.testCredentials}>
              <p><strong>Test Credentials:</strong></p>
              <ul>
                <li>Email: test@[role].com (e.g., test@patient.com)</li>
                <li>Password: password123</li>
              </ul>
            </div>
          </div>
        )}
        
        {isDevBypassEnabled() && (
          <button 
            onClick={handleDevBypass}
            className={styles.devBypassButton}
          >
            Development Bypass (Test User)
          </button>
        )}
        
        <div className={styles.divider}>
          <span>Don't have an account?</span>
        </div>

        <div className={styles.signupSection}>
          <Link to="/signup" className={styles.signupButton}>
            Create an account
          </Link>
        </div>
      </div>
      
      <div className={styles.illustration}>
        <div className={styles.illustrationContent}>
          <h2 className={styles.illustrationTitle}>
            Your Health Journey, <br/>
            <span>Your Advocate</span>
          </h2>
          <p className={styles.illustrationText}>
            Connect with healthcare advocates who will support you every step of the way.
          </p>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon} style={{backgroundColor: 'rgba(129, 140, 248, 0.1)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <span>Find the right advocate</span>
                <p>Match with advocates based on your specific healthcare needs</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon} style={{backgroundColor: 'rgba(52, 211, 153, 0.1)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <span>Expert guidance</span>
                <p>Get support from professionals who understand the healthcare system</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon} style={{backgroundColor: 'rgba(96, 165, 250, 0.1)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <span>Personalized care</span>
                <p>Your health journey is unique, and so is our approach to supporting you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
