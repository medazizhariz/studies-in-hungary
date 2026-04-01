'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { adminCreateUser } from './actions'

const EMAIL_RATE_LIMIT_PHRASES = [
  'rate limit',
  'email rate',
  'over_email_send_rate_limit',
  'too many',
  'email limit',
]

function isEmailRateLimitError(message: string) {
  const lower = message.toLowerCase()
  return EMAIL_RATE_LIMIT_PHRASES.some((p) => lower.includes(p))
}

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')

    // 1. Try normal signup (with email confirmation)
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName.trim() } },
    })

    if (!err) {
      // Success — user needs to confirm email
      setDone(true)
      setLoading(false)
      return
    }

    // 2. If we hit the email rate limit, fall back to admin signup (no email sent)
    if (isEmailRateLimitError(err.message) || err.status === 429) {
      const result = await adminCreateUser(email, password, fullName.trim())
      if (result.success) {
        // Auto sign-in since email is already confirmed
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
        if (!signInErr) {
          router.push('/')
          router.refresh()
          return
        }
        // Sign-in failed but user was created — ask them to sign in manually
        setDone(true)
        setLoading(false)
        return
      }
      setError(result.error ?? 'Registration failed. Please try again.')
    } else {
      setError(err.message)
    }

    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">Check your email</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/auth/login" className="btn-primary inline-flex">Go to Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">🎓</div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">Create an account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join the Studies in Hungary community</p>
        </div>

        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input className="input" placeholder="Your name"
              value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="input" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input type="password" className="input" placeholder="Min. 8 characters"
              value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
          <p className="text-center text-xs text-gray-400">
            By signing up you agree to our terms of service.
          </p>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
