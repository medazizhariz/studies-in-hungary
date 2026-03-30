import Link from 'next/link'
import StarRating from './StarRating'
import type { University } from '@/types'

type Props = { university: University }

export default function UniCard({ university: u }: Props) {
  return (
    <Link href={`/universities/${u.id}`}
      className="card p-5 hover:-translate-y-1 transition-transform block">
      <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug">{u.name}</h3>
      <p className="text-xs text-gray-400 mb-3">📍 {u.city}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {u.languages?.map((lang) => (
          <span key={lang} className="badge bg-gray-100 text-gray-600">{lang}</span>
        ))}
        {u.programs?.slice(0, 3).map((p) => (
          <span key={p} className="badge bg-primary-50 text-primary-700">{p}</span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <StarRating rating={u.avg_rating} size={12} />
        <span className="text-xs text-gray-500">
          {u.avg_rating ? u.avg_rating.toFixed(1) : 'No ratings'}
          {u.review_count ? ` (${u.review_count})` : ''}
        </span>
      </div>
    </Link>
  )
}
