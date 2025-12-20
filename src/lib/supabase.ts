
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// This approach ensures the client is a singleton and created only once.
let supabaseClient: SupabaseClient | null = null;

const getSupabase = () => {
  if (supabaseClient) {
    return supabaseClient;
  }
  
  // Only create a new client if one doesn't exist and we are on the client-side.
  if (typeof window !== 'undefined') {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
      return supabaseClient;
    }
  }

  // Return null if on the server or if keys are missing.
  // The application should handle this gracefully.
  return null;
};

export const createClient = getSupabase;
