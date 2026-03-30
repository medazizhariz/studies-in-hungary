import StarRating from './StarRating'
import ReportButton from './ReportButton'
import { formatDate, initials } from '@/lib/utils'
import type { Review } from '@/types'

type Props = { review: Review }

export default function ReviewCard({ review }: Props) {
  const name = review.profiles?.full_name || review.profiles?.username || 'Anonymous'

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0">
          {initials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-sm text-gray-900 truncate">{name}</span>
            <span className="text-xs text-gray-400 shrink-0">{formatDate(review.created_at)}</span>
          </div>
          <StarRating rating={review.rating} size={13} />
        </div>
      </div>
      {review.title && (
        <p className="font-semibold text-sm text-gray-900 mb-1">{review.title}</p>
      )}
      {review.body && (
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.body}</p>
      )}
      <div className="flex justify-end">
        <ReportButton />
      </div>
    </div>
  )
}
