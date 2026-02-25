import { createClient } from "@supabase/supabase-js";

// Admin client bypasses RLS — only use on server-side (API routes, webhooks)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
