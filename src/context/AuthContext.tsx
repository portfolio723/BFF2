
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock User type, similar to Firebase's User but simplified
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

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

const MOCK_USER: User = {
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User',
    photoURL: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80',
    emailVerified: true
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isKycVerified, setIsKycVerified] = useState(false);

  useEffect(() => {
    // Simulate checking auth state on load
    const authStatus = localStorage.getItem('auth-status');
    if (authStatus === 'signed-in') {
      setUser(MOCK_USER);
    }
    const savedKyc = localStorage.getItem(KYC_STORAGE_KEY);
    if (savedKyc) {
      setIsKycVerified(JSON.parse(savedKyc));
    }
    setIsUserLoading(false);
  }, []);

  const setKycVerifiedState = (verified: boolean) => {
    setIsKycVerified(verified);
    localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(verified));
  };

  const signIn = async (email: string, password: string) => {
    setIsUserLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network request
    if (email && password) {
        setUser(MOCK_USER);
        localStorage.setItem('auth-status', 'signed-in');
    }
    setIsUserLoading(false);
  };

  const signUp = async (email: string, password: string, profileData: { displayName: string; phoneNumber: string; }) => {
    setIsUserLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
        ...MOCK_USER,
        email,
        displayName: profileData.displayName,
    });
    localStorage.setItem('auth-status', 'signed-in');
    setIsUserLoading(false);
  };

  const signOut = async () => {
    setIsUserLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setKycVerifiedState(false);
    localStorage.removeItem('auth-status');
    setIsUserLoading(false);
  };

  const sendPasswordReset = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Password reset email sent to ${email}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        userError: null,
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