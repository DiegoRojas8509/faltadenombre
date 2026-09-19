import { createClient } from "@supabase/supabase-js";

// Cliente de servidor. Usa la secret key (sb_secret_…), que salta el RLS,
// así que NUNCA debe importarse desde un componente con "use client".
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY en .env.local",
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
