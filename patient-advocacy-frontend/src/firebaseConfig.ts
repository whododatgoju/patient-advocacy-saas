// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMXQ6-QRoVBazODpX1RkRnT6Z4tuhbd6E",
  authDomain: "patient-advocacy-saas.firebaseapp.com",
  projectId: "patient-advocacy-saas",
  storageBucket: "patient-advocacy-saas.firebasestorage.app",
  messagingSenderId: "649007210376",
  appId: "1:649007210376:web:4dc19c730e0c16af60643d",
  measurementId: "G-MYN4DP1F66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export analytics for use in components
export { analytics };

// Export Firebase app for analytics initialization
export { app };
