
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This function can be called on both the client and server side.
// On the server, it will use the service role key.
// On the client, it will use the anonymous key.
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Supabase credentials are not defined. Please check your .env.local file.");
    }
    // Return a dummy client or handle this case as you see fit
    // For now, we'll throw an error if it's not configured.
    throw new Error("Supabase URL or anonymous key is missing.");
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
