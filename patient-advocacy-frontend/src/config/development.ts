interface DevUser {
  name: string;
  email: string;
  role: 'patient' | 'advocate' | 'provider';
  id: string;
}

// Development users for demo purposes
export const DEV_USERS: Record<string, DevUser> = {
  'patient': {
    name: 'Test Patient',
    email: 'test@patient.com',
    role: 'patient',
    id: 'dev-patient-123'
  },
  'advocate': {
    name: 'Test Advocate',
    email: 'test@advocate.com',
    role: 'advocate',
    id: 'dev-advocate-123'
  },
  'provider': {
    name: 'Test Provider',
    email: 'test@provider.com',
    role: 'provider',
    id: 'dev-provider-123'
  }
};

// Secret key for development bypass - change this in production
export const DEV_BYPASS_KEY = import.meta.env.VITE_DEV_BYPASS_KEY || 'dev-bypass-2025';

// Check if development bypass is enabled
export const isDevBypassEnabled = () => {
  return import.meta.env.MODE === 'development' && 
         import.meta.env.VITE_ENABLE_DEV_BYPASS === 'true';
};
