import { analytics } from '../firebaseConfig';
import { logEvent } from 'firebase/analytics';

// Initialize analytics if not already initialized
const initializeAnalyticsInstance = () => {
  try {
    return analytics;
  } catch (error) {
    console.error('Analytics initialization failed:', error);
    return null;
  }
};

// User events
export const logUserLogin = (role: string) => {
  if (analytics) {
    logEvent(analytics, 'user_login', {
      role,
      method: 'email_password'
    });
  }
};

export const logUserLogout = () => {
  if (analytics) {
    logEvent(analytics, 'user_logout');
  }
};

// Page views
export const logPageView = (page: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page
    });
  }
};

// Navigation events
export const logNavigation = (from: string, to: string) => {
  if (analytics) {
    logEvent(analytics, 'navigation', {
      from,
      to
    });
  }
};

// Error tracking
export const logError = (error: Error, context?: string) => {
  if (analytics) {
    logEvent(analytics, 'error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }
};

// Custom events
export const logCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};
