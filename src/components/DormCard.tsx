import Link from 'next/link'
import Image from 'next/image'
import StarRating from './StarRating'
import type { Dorm } from '@/types'

type Props = { dorm: Dorm }

const PLACEHOLDER = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70'

export default function DormCard({ dorm }: Props) {
  const img = dorm.images?.[0] ?? PLACEHOLDER

  return (
    <Link href={`/dorms/${dorm.id}`}
      className="card overflow-hidden hover:-translate-y-1 transition-transform block">
      <div className="relative h-44 bg-gray-100">
        <Image src={img} alt={dorm.name} fill className="object-cover" sizes="400px" />
        <div className="absolute top-2 right-2 bg-white/95 rounded-full px-2.5 py-0.5 text-xs font-bold text-primary-700">
          {dorm.price_min && dorm.price_max
            ? `€${dorm.price_min}–€${dorm.price_max}/mo`
            : dorm.price_min
            ? `from €${dorm.price_min}/mo`
            : 'Price TBD'}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">📍 {dorm.city}</p>
        <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug">{dorm.name}</h3>
        {dorm.affiliatedUniversityName && (
          <p className="text-xs text-primary-600 mb-2 flex items-center gap-1">
            <span>🎓</span>
            <span>{dorm.affiliatedUniversityName}</span>
          </p>
        )}
        <div className="flex items-center gap-1.5">
          <StarRating rating={dorm.avg_rating} size={12} />
          <span className="text-xs text-gray-500">
            {dorm.avg_rating ? dorm.avg_rating.toFixed(1) : 'No ratings'}
            {dorm.review_count ? ` (${dorm.review_count})` : ''}
          </span>
        </div>
      </div>
    </Link>
  )
}
