import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { USER_ROLES } from '../contexts/AuthContext';
import { isDevBypassEnabled } from '../config/development';
import { logUserLogin, logError } from '../utils/analytics';
import { UserService } from '../services/UserService'; // Import the new API service

// Toggle this flag to show test user buttons
const SHOW_TEST_USERS = true;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<typeof USER_ROLES[keyof typeof USER_ROLES]>(USER_ROLES.PATIENT);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate input
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await UserService.login({ email, password });
      logUserLogin(role);
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid email or password');
      logError('Login failed', error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = (testEmail: string, testPassword: string, testRole: typeof USER_ROLES[keyof typeof USER_ROLES]) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setRole(testRole);
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Welcome Back</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <FiMail className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="email-error"
            />
          </div>

          <div className={styles.formGroup}>
            <FiLock className={styles.icon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className={styles.formGroup}>
            <FiUser className={styles.icon} />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as typeof USER_ROLES[keyof typeof USER_ROLES])}
              required
              aria-label="User role"
            >
              <option value={USER_ROLES.PATIENT}>Patient</option>
              <option value={USER_ROLES.ADVOCATE}>Advocate</option>
              <option value={USER_ROLES.PROVIDER}>Healthcare Provider</option>
              {isDevBypassEnabled && (
                <option value={USER_ROLES.ADMIN}>Admin</option>
              )}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="Remember me"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
            aria-label="Login"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
          <Link to="/signup" className={styles.link}>
            Create Account
          </Link>
        </div>

        {SHOW_TEST_USERS && (
          <div className={styles.testUsers}>
            <h3>Test Users</h3>
            <div className={styles.testUserList}>
              <button
                className={`${styles.testUserButton} ${styles.patient}`}
                onClick={() => handleTestLogin('test@patient.com', 'password123', USER_ROLES.PATIENT)}
              >
                Patient
              </button>
              <button
                className={`${styles.testUserButton} ${styles.advocate}`}
                onClick={() => handleTestLogin('test@advocate.com', 'password123', USER_ROLES.ADVOCATE)}
              >
                Advocate
              </button>
              <button
                className={`${styles.testUserButton} ${styles.provider}`}
                onClick={() => handleTestLogin('test@provider.com', 'password123', USER_ROLES.PROVIDER)}
              >
                Provider
              </button>
              {isDevBypassEnabled && (
                <button
                  className={`${styles.testUserButton} ${styles.admin}`}
                  onClick={() => handleTestLogin('test@admin.com', 'password123', USER_ROLES.ADMIN)}
                >
                  Admin
                </button>
              )}
            </div>
            <p className={styles.testUserNote}>
              Test users use "password123" as password
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
