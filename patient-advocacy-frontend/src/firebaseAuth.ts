import { auth, db } from './firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  UserCredential,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// User roles
export const USER_ROLES = {
  PATIENT: 'patient' as const,
  ADVOCATE: 'advocate' as const,
  PROVIDER: 'provider' as const,
  ADMIN: 'admin' as const
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Firebase Auth Service
export const firebaseAuthService = {
  // Sign up a new user
  async signUp(
    email: string,
    password: string,
    role: UserRole,
    displayName: string
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        role: role,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });

      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Sign in an existing user
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time in Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });

      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Sign out the current user
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Listen for auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
};
