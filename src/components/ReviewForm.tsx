'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StarRating from './StarRating'

type Props = {
  entityType: 'dorm' | 'university'
  entityId: string
  onClose?: () => void
}

type FilePreview = { file: File; url: string }

export default function ReviewForm({ entityType, entityId, onClose }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previews, setPreviews] = useState<FilePreview[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeFile = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError('Please select a rating.'); return }
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('You must be signed in to leave a review.'); setLoading(false); return }

    // Ensure profile exists (may be missing if created via admin path)
    await supabase.from('profiles').upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true })

    const hasMedia = previews.length > 0

    const { error: err } = await supabase.from('reviews').insert({
      user_id: user.id,
      entity_type: entityType,
      entity_id: entityId,
      rating,
      title: title.trim() || null,
      body: body.trim() || null,
      status: hasMedia ? 'pending' : 'approved',
    })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      router.refresh()
      onClose?.()
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating *</label>
        <StarRating rating={rating} size={28} interactive onRate={setRating} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
        <input className="input" placeholder="Summarize your experience" value={title}
          onChange={(e) => setTitle(e.target.value)} maxLength={120} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
        <textarea className="input resize-none h-28" placeholder="Share your experience in detail..."
          value={body} onChange={(e) => setBody(e.target.value)} maxLength={2000} />
      </div>

      {/* Media upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Photos / Videos (optional)</label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="btn-secondary w-full justify-center border-dashed"
        >
          📎 Attach photos or videos
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {previews.map((p, i) => (
              <div key={i} className="relative group">
                {p.file.type.startsWith('video/') ? (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-2xl border border-gray-200">
                    🎬
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.url} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length > 0 && (
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-2">
            ⏳ Reviews with photos/videos require admin approval before publishing.
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2 justify-end">
        {onClose && (
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        )}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>
      </div>
    </form>
  )
}
