import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { googleProvider } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userSelections, setUserSelections] = useState({
    studyPath: null,
    class: null,
    subject: null
  });
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        return { newUser: true, user };
      } else {
        const userData = userDoc.data();
        setUserRole(userData.role);
        setUserSelections(userData.selections || {});
        setSetupComplete(userData.setupComplete || false);
        return { newUser: false, user, userData };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Complete user setup after role selection
  const completeUserSetup = async (role, selections = {}) => {
    if (!user) return;
    
    try {
      const userData = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: role,
        selections: selections,
        setupComplete: true,
        createdAt: new Date(),
        approved: role === 'student', // Students auto-approved
        lastLogin: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      setUserRole(role);
      setUserSelections(selections);
      setSetupComplete(true);
      
      return userData;
    } catch (error) {
      console.error('Setup error:', error);
      throw error;
    }
  };

  // Update user selections (for students who want to change class/subject)
  const updateSelections = async (newSelections) => {
    if (!user) return;
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        selections: newSelections,
        updatedAt: new Date()
      }, { merge: true });
      
      setUserSelections(newSelections);
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserSelections({});
      setSetupComplete(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
          setUserSelections(userData.selections || {});
          setSetupComplete(userData.setupComplete || false);
          
          // Update last login
          await setDoc(doc(db, 'users', user.uid), {
            lastLogin: new Date()
          }, { merge: true });
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserSelections({});
        setSetupComplete(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userRole,
    userSelections,
    setupComplete,
    loading,
    signInWithGoogle,
    completeUserSetup,
    updateSelections,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
