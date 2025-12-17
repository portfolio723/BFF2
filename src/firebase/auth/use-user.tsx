"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/provider";
import type { User } from "firebase/auth";
import type { AppUser } from "@/lib/types";

// A mock function to get additional user data, like KYC status
const getAdditionalUserData = async (user: User): Promise<AppUser> => {
    // In a real app, you would fetch this from Firestore or your backend.
    // For now, we'll mock the `isKycVerified` status.
    // You can change this to `true` to test the verified state.
    const isKycVerified = false; 
    return { ...user, isKycVerified };
}


export const useUser = () => {
  const auth = useAuth();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = await getAdditionalUserData(firebaseUser);
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
};
