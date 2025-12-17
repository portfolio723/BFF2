
"use client";

import React from 'react';
import { initializeFirebase } from '@/firebase';
import { FirebaseProvider } from './provider';

// Initialize Firebase on the client
const firebaseInstance = initializeFirebase();

export const FirebaseClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseProvider value={firebaseInstance}>
      {children}
    </FirebaseProvider>
  );
};
