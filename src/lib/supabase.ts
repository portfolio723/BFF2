
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let supabaseClient: any = null;

// Re-export createClient to be used in other files
export const createClient = () => {
    if (supabaseClient) {
        return supabaseClient;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
    throw new Error("Supabase URL is not defined. Please check your .env.local file.");
    }

    if (!supabaseAnonKey) {
    throw new Error("Supabase Anon Key is not defined. Please check your .env.local file.");
    }
    
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
}
