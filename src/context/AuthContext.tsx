
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { useAuth as useFirebaseAuth, useFirebase, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  isKycVerified: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData: { displayName: string; phoneNumber: string; }) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  setKycVerified: (verified: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const KYC_STORAGE_KEY = 'books-for-fosters-kyc';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isUserLoading, userError } = useFirebase();
  const auth = useFirebaseAuth();
  const firestore = useFirestore();

  const [isKycVerified, setIsKycVerified] = useState(false);

  useEffect(() => {
    const savedKyc = localStorage.getItem(KYC_STORAGE_KEY);
    if (savedKyc) {
      setIsKycVerified(JSON.parse(savedKyc));
    }
  }, []);

  const setKycVerifiedState = (verified: boolean) => {
    setIsKycVerified(verified);
    localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(verified));
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, profileData: { displayName: string; phoneNumber: string; }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update Firebase Auth profile
    await updateProfile(userCredential.user, {
        displayName: profileData.displayName
    });

    // Create user document in Firestore
    const userDocRef = doc(firestore, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
        id: userCredential.user.uid,
        userName: profileData.displayName,
        email: userCredential.user.email,
        phoneNumber: profileData.phoneNumber,
        firstName: profileData.displayName.split(' ')[0] || '',
        lastName: profileData.displayName.split(' ')[1] || '',
    });

    await sendEmailVerification(userCredential.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setKycVerifiedState(false);
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        userError,
        isKycVerified,
        signIn,
        signUp,
        signOut,
        sendPasswordReset,
        setKycVerified: setKycVerifiedState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
