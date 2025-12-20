
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// This function can be called on the client side.
// It will return null if the environment variables are not set.
export const createClient = (): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.warn("Supabase credentials are not defined. Please check your .env.local file.");
  }
  
  return null;
};
