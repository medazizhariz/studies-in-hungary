'use client'

import { useState, useTransition } from 'react'
import { approveReview, approveAndAddToGallery, rejectReview } from './actions'
import StarRating from '@/components/StarRating'

type PendingReview = {
  id: string
  entity_type: 'dorm' | 'university'
  entity_id: string
  entity_name: string
  rating: number
  title: string | null
  body: string | null
  media_urls: string[]
  created_at: string
  profiles: { username: string | null; full_name: string | null } | null
}

export default function ReviewModerationCard({ review }: { review: PendingReview }) {
  const [isPending, startTransition] = useTransition()
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (done) return null

  const name = review.profiles?.full_name || review.profiles?.username || 'Anonymous'
  const photos = review.media_urls ?? []

  const handleApprove = () => {
    startTransition(async () => {
      await approveReview(review.id)
      setDone(true)
    })
  }

  const handleApproveWithPhoto = (photoUrl: string) => {
    if (review.entity_type !== 'university') return
    startTransition(async () => {
      await approveAndAddToGallery(review.id, review.entity_id, photoUrl)
      setDone(true)
    })
  }

  const handleReject = () => {
    startTransition(async () => {
      await rejectReview(review.id)
      setDone(true)
    })
  }

  return (
    <div className="card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">
            {review.entity_type === 'university' ? '🏫' : '🏠'} {review.entity_name}
          </p>
          <p className="font-semibold text-sm text-gray-900">{name}</p>
          <StarRating rating={review.rating} size={13} />
        </div>
        <span className="badge bg-amber-50 text-amber-700 text-xs shrink-0">Pending</span>
      </div>

      {/* Review text */}
      {review.title && <p className="font-semibold text-sm text-gray-900">{review.title}</p>}
      {review.body && <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>}

      {/* Photos */}
      {photos.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Attached photos ({photos.length})</p>
          <div className="flex flex-wrap gap-3">
            {photos.map((url, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Review photo ${i + 1}`}
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedPhoto(url)}
                />
                {review.entity_type === 'university' && (
                  <button
                    onClick={() => handleApproveWithPhoto(url)}
                    disabled={isPending}
                    className="absolute bottom-1 left-1 right-1 text-[10px] bg-green-600 text-white rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    Approve + Add to Gallery
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="btn-primary text-sm py-1.5 px-4 disabled:opacity-50"
        >
          {isPending ? 'Processing…' : 'Approve Review'}
        </button>
        <button
          onClick={handleReject}
          disabled={isPending}
          className="btn-secondary text-sm py-1.5 px-4 text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50"
        >
          Reject & Delete
        </button>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
