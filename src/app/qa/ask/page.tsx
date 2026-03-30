'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { QA_CATEGORIES } from '@/lib/utils'
import type { Metadata } from 'next'

export default function AskPage() {
  const router = useRouter()
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }

    const { data, error: err } = await supabase.from('questions').insert({
      user_id: user.id,
      title: title.trim(),
      body: body.trim() || null,
      category: category || null,
    }).select('id').single()

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      router.push(`/qa/${data.id}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <Link href="/qa" className="text-sm text-primary-600 hover:underline mb-6 inline-block">← Back to Q&A</Link>
      <h1 className="text-3xl font-black text-gray-900 mb-6">Ask a Question</h1>

      <form onSubmit={submit} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Question Title *</label>
          <input className="input" placeholder="What do you want to know?"
            value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Details (optional)</label>
          <textarea className="input resize-none h-36"
            placeholder="Provide more context to get better answers..."
            value={body} onChange={(e) => setBody(e.target.value)} maxLength={3000} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {QA_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3 justify-end">
          <Link href="/qa" className="btn-secondary">Cancel</Link>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Posting…' : 'Post Question'}
          </button>
        </div>
      </form>
    </div>
  )
}
