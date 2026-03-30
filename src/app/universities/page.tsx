export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import UniCard from '@/components/UniCard'
import { CITIES } from '@/lib/utils'
import { STATIC_UNIVERSITIES } from '@/lib/staticData'
import type { University } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Universities' }

type Props = { searchParams: Promise<{ city?: string; q?: string; lang?: string }> }

export default async function UniversitiesPage({ searchParams }: Props) {
  const { city, q, lang } = await searchParams
  const supabase = await createClient()
  let query = supabase.from('universities').select('*, reviews(rating)').order('name')

  if (city) query = query.eq('city', city)
  if (q) query = query.ilike('name', `%${q}%`)

  const { data } = await query

  let unis: University[] = data?.length
    ? (data ?? []).map(({ reviews, ...u }: any) => ({
        ...u,
        avg_rating: reviews.length ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length : null,
        review_count: reviews.length,
      }))
    : STATIC_UNIVERSITIES.map((u) => ({
        id: u.id, name: u.name, city: u.city, description: u.description,
        website: u.website, programs: u.programs, languages: u.languages,
        logo_url: u.logo_url, created_at: '',
        avg_rating: u.avg_rating, review_count: u.review_count,
      }))

  // Apply client-side filters for static data
  if (city) unis = unis.filter((u) => u.city === city)
  if (q) unis = unis.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()))
  if (lang) unis = unis.filter((u) => u.languages?.includes(lang))

  return (
    <div>
      <div className="page-header">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Universities in Hungary</h1>
          <p className="text-gray-500 text-sm mt-1">Compare programs, languages, and student experiences.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <form method="GET" className="flex gap-3 flex-wrap mb-6">
          <input name="q" defaultValue={q} placeholder="Search universities…" className="input flex-1 min-w-40" />
          <select name="city" defaultValue={city ?? ''} className="input w-40">
            <option value="">All cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="lang" defaultValue={lang ?? ''} className="input w-40">
            <option value="">All languages</option>
            {['English', 'Hungarian', 'German', 'French'].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <button type="submit" className="btn-primary px-5">Search</button>
          {(city || q || lang) && (
            <a href="/universities" className="btn-secondary">Clear</a>
          )}
        </form>

        <p className="text-xs text-gray-400 mb-5">{unis.length} result{unis.length !== 1 ? 's' : ''} found</p>

        {unis.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🎓</div>
            <p className="font-medium">No universities found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {unis.map((u) => <UniCard key={u.id} university={u} />)}
          </div>
        )}
      </div>
    </div>
  )
}
