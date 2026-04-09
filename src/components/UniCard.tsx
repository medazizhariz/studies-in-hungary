'use client'

import Link from 'next/link'
import StarRating from './StarRating'
import SaveButton from './SaveButton'
import { proxyImage } from '@/lib/utils'
import type { University } from '@/types'

type Props = { university: University }

export default function UniCard({ university: u }: Props) {
  return (
    <div className="card hover:-translate-y-1 transition-transform block overflow-hidden relative">
      {/* Save button */}
      <div className="absolute top-2 left-2 z-10">
        <SaveButton itemType="university" itemId={u.id} itemName={u.name} />
      </div>

      <Link href={`/universities/${u.id}`} className="block">
        {/* Image */}
        <div className="relative h-44 bg-gray-100 overflow-hidden">
          {u.image_url ? (
            <img
              src={proxyImage(u.image_url)}
              alt={u.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🎓</div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
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
        </div>
      </Link>
    </div>
  )
}
