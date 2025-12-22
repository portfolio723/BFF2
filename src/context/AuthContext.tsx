
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

// Mock User type to avoid breaking components
interface MockUser {
  id: string;
  email: string | undefined;
}

interface AuthContextType {
  user: MockUser | null;
  isUserLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    options?: any
  ) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might check a token from localStorage here
    // For now, we simulate loading and then set user to null
    const timer = setTimeout(() => {
      setUser(null); // No user by default
      setIsUserLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    toast.error("Authentication is currently disabled.");
    // Mock a user session for demonstration if needed for protected routes
    // For example:
    // setIsUserLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 500));
    // setUser({ id: 'mock-user-id', email });
    // setIsUserLoading(false);
  };

  const signUp = async (
    email: string,
    password: string,
    options?: any
  ) => {
    toast.error("Authentication is currently disabled.");
  };

  const signOut = async () => {
    setIsUserLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setIsUserLoading(false);
    toast.success("You have been signed out.");
  };



  const sendPasswordReset = async (email: string) => {
    toast.error("Password reset is currently disabled.");
  };

  const value: AuthContextType = {
    user,
    isUserLoading,
    signIn,
    signUp,
    signOut,
    sendPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
