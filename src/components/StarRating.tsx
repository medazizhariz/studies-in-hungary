'use client'

type Props = {
  rating: number | null | undefined
  size?: number
  interactive?: boolean
  onRate?: (rating: number) => void
}

export default function StarRating({ rating, size = 14, interactive = false, onRate }: Props) {
  const filled = Math.round(rating ?? 0)

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(star)}
          className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
          style={{ fontSize: size }}
        >
          <span style={{ color: star <= filled ? '#f59e0b' : '#d1d5db' }}>★</span>
        </button>
      ))}
    </div>
  )
}
