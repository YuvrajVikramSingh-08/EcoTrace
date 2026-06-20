import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from '../hooks/useAuth.js';

export const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setUserData(null);
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const updateUserData = useCallback(
    async (updates) => {
      if (!currentUser) return;
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, updates);
    },
    [currentUser]
  );

  return (
    <UserDataContext.Provider value={{ userData, loading, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
