// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// ✅ Create Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export the initialized client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
