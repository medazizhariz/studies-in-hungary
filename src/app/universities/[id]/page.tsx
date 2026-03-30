import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import ReviewFormToggle from '@/app/dorms/[id]/ReviewFormToggle'
import { STATIC_UNIVERSITIES } from '@/lib/staticData'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('universities').select('name').eq('id', id).single()
  if (data) return { title: data.name }
  const staticUni = STATIC_UNIVERSITIES.find((u) => u.id === id)
  return { title: staticUni?.name ?? 'University' }
}

export default async function UniDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: uni } = await supabase.from('universities').select('*').eq('id', id).single()

  // Check static data if not in DB
  const staticUni = !uni ? STATIC_UNIVERSITIES.find((u) => u.id === id) : null
  if (!uni && !staticUni) notFound()

  const { data: dbReviews } = uni ? await supabase
    .from('reviews')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('entity_type', 'university')
    .eq('entity_id', id)
    .order('created_at', { ascending: false }) : { data: [] }

  const reviews = dbReviews?.length
    ? dbReviews
    : (staticUni?.reviews ?? []).map((r) => ({
        id: r.id, user_id: '', entity_type: 'university' as const, entity_id: id,
        rating: r.rating, title: r.title, body: r.body, created_at: r.date,
        profiles: { username: r.name, full_name: r.name, avatar_url: null },
      }))

  const name = uni?.name ?? staticUni?.name ?? ''
  const city = uni?.city ?? staticUni?.city ?? ''
  const description = uni?.description ?? staticUni?.description ?? null
  const programs = uni?.programs ?? staticUni?.programs ?? []
  const languages = uni?.languages ?? staticUni?.languages ?? []
  const website = uni?.website ?? staticUni?.website ?? null
  const founded = staticUni?.founded
  const faculties = staticUni?.faculties ?? []
  const facultyLinks = staticUni?.facultyLinks ?? []
  const degreeLevels = staticUni?.degree_levels ?? []
  const images = staticUni?.images ?? []

  const avgRating = reviews.length
    ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <Link href="/universities" className="text-sm text-primary-600 hover:underline mb-4 inline-block">← Back to Universities</Link>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className={`grid gap-3 mb-8 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {images.map((src, i) => (
            <div key={i} className={`relative rounded-xl overflow-hidden bg-gray-100 ${images.length === 1 ? 'h-72' : 'h-48'}`}>
              <Image
                src={src}
                alt={`${name} - photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">📍 {city}</p>
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

          {/* Faculties - clickable links when available, plain list otherwise */}
          {(facultyLinks.length > 0 || faculties.length > 0) && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Faculties</h2>
              {facultyLinks.length > 0 ? (
                <ul className="space-y-1">
                  {facultyLinks.map((f) => (
                    <li key={f.name} className="text-sm flex items-start gap-2">
                      <span className="text-primary-400 mt-0.5">•</span>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800 hover:underline"
                      >
                        {f.name} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {faculties.map((f: string) => (
                    <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary-400 mt-0.5">•</span> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {programs.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Programs Offered</h2>
              <div className="flex flex-wrap gap-2">
                {programs.map((p: string) => (
                  <span key={p} className="badge bg-primary-50 text-primary-700 px-3 py-1">{p}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Languages of Instruction</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((l: string) => (
                  <span key={l} className="badge bg-gray-100 text-gray-700 px-3 py-1">{l}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">
                Reviews {reviews.length ? `(${reviews.length})` : ''}
              </h2>
              <ReviewFormToggle entityType="university" entityId={uni?.id ?? id} userId={user?.id ?? null} />
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
            <div>
              <p className="text-xs text-gray-400 mb-0.5">City</p>
              <p className="font-semibold text-sm text-gray-900">{city}</p>
            </div>
            {founded && (
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Founded</p>
                <p className="font-semibold text-sm text-gray-900">{founded}</p>
              </div>
            )}
            {degreeLevels.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Degree Levels</p>
                <div className="flex flex-wrap gap-1">
                  {degreeLevels.map((d: string) => (
                    <span key={d} className="badge bg-purple-50 text-purple-700">{d}</span>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Languages</p>
                <div className="flex flex-wrap gap-1">
                  {languages.map((l: string) => (
                    <span key={l} className="badge bg-gray-100 text-gray-600">{l}</span>
                  ))}
                </div>
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
