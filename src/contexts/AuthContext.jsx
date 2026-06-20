import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase.js';

export const AuthContext = createContext(null);

const DEFAULT_USER_DATA = {
  dietType: 'non-vegetarian',
  vehicleType: 'car-petrol',
  homeSizeKwh: 150,
  location: 'Lucknow, India',
  weeklyBudgetKg: 36.4,
  xp: 0,
  level: 1,
  totalCarbonSavedKg: 0,
  longestStreak: 0,
  currentStreak: 0,
  lastLogDate: null,
  unlockedBadgeIds: [],
  activeHabitIds: [],
  weeklyReportLastGeneratedAt: null,
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signup(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });

    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      displayName,
      email,
      photoURL: null,
      createdAt: serverTimestamp(),
      ...DEFAULT_USER_DATA,
    });

    return cred.user;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    const userDocRef = doc(db, 'users', cred.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        displayName: cred.user.displayName || 'User',
        email: cred.user.email,
        photoURL: cred.user.photoURL,
        createdAt: serverTimestamp(),
        ...DEFAULT_USER_DATA,
      });
    }

    return cred.user;
  }

  async function logout() {
    await signOut(auth);
  }

  async function deleteAccount() {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
