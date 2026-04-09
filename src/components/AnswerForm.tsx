'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Props = { questionId: string; userId: string }

export default function AnswerForm({ questionId, userId }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) { setError('Answer cannot be empty.'); return }
    setLoading(true)
    setError('')

    // Ensure profile exists (may be missing if created via admin path)
    await supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true })

    const { error: err } = await supabase.from('answers').insert({
      question_id: questionId,
      user_id: userId,
      body: body.trim(),
    })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      setBody('')
      router.refresh()
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <textarea
        className="input resize-none h-32"
        placeholder="Write a detailed answer to help other students..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={3000}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Posting…' : 'Post Answer'}
        </button>
      </div>
    </form>
  )
}
