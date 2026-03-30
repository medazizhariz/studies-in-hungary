'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewForm from '@/components/ReviewForm'

type Props = {
  entityType: 'dorm' | 'university'
  entityId: string
  userId: string | null
}

export default function ReviewFormToggle({ entityType, entityId, userId }: Props) {
  const [open, setOpen] = useState(false)

  if (!userId) {
    return (
      <Link href="/auth/login" className="btn-secondary text-sm">
        Sign in to review
      </Link>
    )
  }

  return (
    <div>
      {!open && (
        <button onClick={() => setOpen(true)} className="btn-primary text-sm">
          + Write a Review
        </button>
      )}
      {open && (
        <div className="mt-4 card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Write a Review</h3>
          <ReviewForm entityType={entityType} entityId={entityId} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
