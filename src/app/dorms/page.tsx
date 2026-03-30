export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import DormCard from '@/components/DormCard'
import { CITIES } from '@/lib/utils'
import { STATIC_DORMS } from '@/lib/staticData'
import type { Dorm } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Student Dorms' }

type Props = { searchParams: Promise<{ city?: string; q?: string }> }

export default async function DormsPage({ searchParams }: Props) {
  const { city, q } = await searchParams
  const supabase = await createClient()
  let query = supabase.from('dorms').select('*, reviews(rating)').order('created_at', { ascending: false })

  if (city) query = query.eq('city', city)
  if (q) query = query.ilike('name', `%${q}%`)

  const { data } = await query

  let dorms: Dorm[] = data?.length
    ? (data ?? []).map(({ reviews, ...d }: any) => ({
        ...d,
        avg_rating: reviews.length ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length : null,
        review_count: reviews.length,
      }))
    : STATIC_DORMS.map((d) => ({
        id: d.id, name: d.name, city: d.city, address: d.address,
        price_min: d.price_min, price_max: d.price_max, description: d.description,
        amenities: d.amenities, images: d.images, website: d.website,
        created_at: '', avg_rating: d.avg_rating, review_count: d.review_count,
      }))

  // Apply client-side filters for static data
  if (city) dorms = dorms.filter((d) => d.city === city)
  if (q) dorms = dorms.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="page-header">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Student Dorms</h1>
          <p className="text-gray-500 text-sm mt-1">Real reviews from international students across Hungary.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <form method="GET" className="flex gap-3 flex-wrap mb-6">
          <input name="q" defaultValue={q}
            placeholder="Search dorms…"
            className="input flex-1 min-w-40" />
          <select name="city" defaultValue={city ?? ''}
            className="input w-40">
            <option value="">All cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary px-5">Search</button>
          {(city || q) && (
            <a href="/dorms" className="btn-secondary">Clear</a>
          )}
        </form>

        <p className="text-xs text-gray-400 mb-5">{dorms.length} result{dorms.length !== 1 ? 's' : ''} found</p>

        {dorms.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🏠</div>
            <p className="font-medium">No dorms found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dorms.map((d) => <DormCard key={d.id} dorm={d} />)}
          </div>
        )}
      </div>
    </div>
  )
}
