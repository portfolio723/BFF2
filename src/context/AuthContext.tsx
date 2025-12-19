
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase';
import type { AuthChangeEvent, Session, User, SupabaseClient, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, options?: SignUpWithPasswordCredentials['options']) => Promise<any>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  // Use a ref to hold the client instance to avoid re-creating it on every render.
  const supabaseRef = React.useRef<SupabaseClient | null>(null);

  // Lazily get the Supabase client
  const getSupabase = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    return supabaseRef.current;
  };

  useEffect(() => {
    const supabase = getSupabase();
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setIsUserLoading(false);
    }
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setIsUserLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, options?: SignUpWithPasswordCredentials['options']) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({ email, password, options });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const sendPasswordReset = async (email: string) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
        signUp,
        signOut,
        sendPasswordReset,
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
