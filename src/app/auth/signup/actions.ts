'use server'

import { createClient } from '@supabase/supabase-js'

/**
 * Creates a user directly via the Supabase Admin API, bypassing email confirmation
 * and the free-tier email rate limit. Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (never expose this key to the client — it is server-only).
 */
export async function adminCreateUser(
  email: string,
  password: string,
  fullName: string,
): Promise<{ success?: boolean; error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return { error: 'Server configuration missing. Please contact the site administrator.' }
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,          // skip email confirmation entirely
    user_metadata: { full_name: fullName },
  })

  if (error) return { error: error.message }
  return { success: true }
}
