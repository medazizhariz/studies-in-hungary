export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import ReviewFormToggle from './ReviewFormToggle'
import PhotoGallery from '@/components/PhotoGallery'
import { STATIC_DORMS, STATIC_UNIVERSITIES } from '@/lib/staticData'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('dorms').select('name').eq('id', id).single()
  if (data) return { title: data.name }
  const staticDorm = STATIC_DORMS.find((d) => d.id === id)
  return { title: staticDorm?.name ?? 'Dorm' }
}

export default async function DormDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: dorm } = await supabase.from('dorms').select('*').eq('id', id).single()

  const staticDorm = !dorm ? STATIC_DORMS.find((d) => d.id === id) : null
  if (!dorm && !staticDorm) notFound()

  const { data: dbReviews } = await supabase
    .from('reviews')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('entity_type', 'dorm')
    .eq('entity_id', id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  // Check if the current user already submitted a review
  let userHasReview = false
  if (user) {
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', user.id)
      .eq('entity_type', 'dorm')
      .eq('entity_id', id)
      .maybeSingle()
    userHasReview = !!existing
  }

  const staticReviews = (staticDorm?.reviews ?? []).map((r) => ({
    id: r.id, user_id: '', entity_type: 'dorm' as const, entity_id: id,
    rating: r.rating, title: r.title, body: r.body, created_at: r.date,
    profiles: { username: r.name, full_name: r.name, avatar_url: null },
  }))
  const dbReviewIds = new Set((dbReviews ?? []).map((r: any) => r.id))
  const reviews = [
    ...(dbReviews ?? []),
    ...staticReviews.filter((r) => !dbReviewIds.has(r.id)),
  ]

  const name = dorm?.name ?? staticDorm?.name ?? ''
  const city = dorm?.city ?? staticDorm?.city ?? ''
  const address = dorm?.address ?? staticDorm?.address ?? null
  const description = dorm?.description ?? staticDorm?.description ?? null
  const amenities = dorm?.amenities ?? staticDorm?.amenities ?? []
  const images = dorm?.images ?? staticDorm?.images ?? []
  const website = dorm?.website ?? staticDorm?.website ?? null
  const price_min = dorm?.price_min ?? staticDorm?.price_min ?? null
  const price_max = dorm?.price_max ?? staticDorm?.price_max ?? null
  const distance = staticDorm?.distance ?? null
  const imageCaptions = staticDorm?.imageCaptions ?? []
  const affiliatedUniversityId = staticDorm?.affiliatedUniversity ?? null
  const affiliatedUniversity = affiliatedUniversityId
    ? STATIC_UNIVERSITIES.find((u) => u.id === affiliatedUniversityId) ?? null
    : null

  const avgRating = reviews.length
    ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length
    : null

  const PLACEHOLDER = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'
  const galleryImages = images.length > 0 ? images : [PLACEHOLDER]

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <Link href="/dorms" className="text-sm text-primary-600 hover:underline mb-4 inline-block">← Back to Dorms</Link>

      {/* Image Gallery */}
      <PhotoGallery images={galleryImages} captions={imageCaptions} name={name} />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">📍 {city}{address ? `, ${address}` : ''}</p>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{name}</h1>
            {avgRating && (
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} size={18} />
                <span className="font-bold text-gray-700">{avgRating.toFixed(1)}</span>
                <span className="text-sm text-gray-400">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
            )}
          </div>

          {description && (
            <div>
              <h2 className="font-bold text-gray-900 mb-2">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          )}

          {distance && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-xl px-4 py-2.5">
              <span>🚶</span>
              <span><strong>Distance:</strong> {distance}</span>
            </div>
          )}

          {amenities?.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((a: string) => (
                  <span key={a} className="badge bg-primary-50 text-primary-700 text-xs px-3 py-1">{a}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">
                Reviews {reviews.length ? `(${reviews.length})` : ''}
              </h2>
              <ReviewFormToggle entityType="dorm" entityId={dorm?.id ?? id} userId={user?.id ?? null} hasReviewed={userHasReview} />
            </div>
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r: any) => <ReviewCard key={r.id} review={r} />)}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 space-y-3">
            <h3 className="font-bold text-gray-900">Quick Info</h3>
            {affiliatedUniversity && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Affiliated University</p>
                <Link
                  href={`/universities/${affiliatedUniversity.id}`}
                  className="flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900 hover:underline"
                >
                  <span>🎓</span>
                  <span>{affiliatedUniversity.name}</span>
                  <span className="text-xs text-primary-400">↗</span>
                </Link>
              </div>
            )}
            {(price_min || price_max) && (
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Monthly Price</p>
                <p className="font-bold text-primary-700">
                  {price_min && price_max
                    ? `€${price_min} – €${price_max}`
                    : price_min
                    ? `from €${price_min}`
                    : `up to €${price_max}`}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 mb-0.5">City</p>
              <p className="font-semibold text-sm text-gray-900">{city}</p>
            </div>
            {address && (
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Address</p>
                <p className="text-sm text-gray-600">{address}</p>
              </div>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-2">
                Visit Website ↗
              </a>
            )}
          </div>

          {avgRating && (
            <div className="card p-5 text-center">
              <div className="text-4xl font-black text-gray-900 mb-1">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size={18} />
              <p className="text-xs text-gray-400 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
