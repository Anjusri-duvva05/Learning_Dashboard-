import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase keys are actual credentials or just placeholders
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseUrl !== "" &&
  !supabaseUrl.includes("your-project-ref") &&
  !supabaseUrl.includes("placeholder-project") &&
  supabaseAnonKey &&
  supabaseAnonKey !== "" &&
  !supabaseAnonKey.includes("your-anon-key") &&
  !supabaseAnonKey.includes("placeholder-anon-key")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export function createServerClient() {
  if (!isSupabaseConfigured) {
    return null;
  }
  return createClient(
    supabaseUrl!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
