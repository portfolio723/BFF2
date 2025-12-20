
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null;

// Re-export createClient to be used in other files
export const createClient = (): SupabaseClient | null => {
    // Only run this logic on the client-side
    if (typeof window === 'undefined') {
        return null;
    }
    
    if (supabaseClient) {
        return supabaseClient;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // This log will now only appear in the browser console, not during the build
        return null;
    }
    
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
}
