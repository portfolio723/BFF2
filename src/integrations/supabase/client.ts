import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase URL or anonymous key is missing. Supabase client could not be initialized.");
  // Provide a mock client to avoid crashes
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      delete: async () => ({ data: [], error: null }),
    }),
    auth: {
        signInWithOtp: async () => ({ data: { user: null, session: null}, error: new Error('Supabase not configured') }),
        verifyOtp: async () => ({ data: { user: null, session: null}, error: new Error('Supabase not configured') }),
        signUp: async () => ({ data: { user: null, session: null}, error: new Error('Supabase not configured') }),
        signInWithPassword: async () => ({ data: { user: null, session: null}, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: async () => ({ data: { session: null }, error: null }),
    },
  } as any;
}


export { supabase };
