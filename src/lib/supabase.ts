
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Re-export createClient to be used in other files
export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
    throw new Error("Supabase URL is not defined. Please check your .env.local file.");
    }

    if (!supabaseAnonKey) {
    throw new Error("Supabase Anon Key is not defined. Please check your .env.local file.");
    }
    
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// For convenience, you can also export a singleton instance
// but be mindful of where you import it to avoid server/client issues.
// This specific instance is what caused the build issue.
// We are leaving it here commented out as a reference.
// export const supabase = createClient();
