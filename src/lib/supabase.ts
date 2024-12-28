import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = "https://pylogiruyrhrjbvowlaq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bG9naXJ1eXJocmpidm93bGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTI4MDAsImV4cCI6MjAyNTQyODgwMH0.ZpDVR9eN-j_nFMKFBpFB6QTDvYZtVFrXXRHxFJKEeXg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
