'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'

type Props = { profile: Profile | null; userId: string; email: string }

export default function ProfileForm({ profile, userId, email }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [username, setUsername] = useState(profile?.username ?? '')
  const [nationality, setNationality] = useState(profile?.nationality ?? '')
  const [studyingAt, setStudyingAt] = useState(profile?.studying_at ?? '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const { error: err } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: fullName.trim() || null,
      username: username.trim() || null,
      nationality: nationality.trim() || null,
      studying_at: studyingAt.trim() || null,
    })

    if (err) {
      setError(err.message)
    } else {
      setMessage('Profile saved!')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={save} className="card p-6 space-y-4">
      <h2 className="font-bold text-gray-900">Account Details</h2>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
        <p className="text-sm text-gray-700 font-medium">{email}</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
        <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@username" maxLength={32} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
        <input className="input" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="e.g. Nigerian, Indian" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Studying at</label>
        <input className="input" value={studyingAt} onChange={(e) => setStudyingAt(e.target.value)} placeholder="e.g. University of Pécs" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  )
}
