export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DormCard from '@/components/DormCard'
import UniCard from '@/components/UniCard'
import type { Dorm, University } from '@/types'
import { STATIC_DORMS, STATIC_UNIVERSITIES } from '@/lib/staticData'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: dorms }, { data: unis }] = await Promise.all([
    supabase.from('dorms').select('*, reviews(rating)').limit(3),
    supabase.from('universities').select('*, reviews(rating)').limit(3),
  ])

  const enrichDorms = (dorms: (Dorm & { reviews: { rating: number }[] })[]): Dorm[] =>
    dorms.map(({ reviews, ...d }) => ({
      ...d,
      avg_rating: reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null,
      review_count: reviews.length,
    }))

  const enrichUnis = (unis: (University & { reviews: { rating: number }[] })[]): University[] =>
    unis.map(({ reviews, ...u }) => ({
      ...u,
      avg_rating: reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null,
      review_count: reviews.length,
    }))

  const featuredDorms: Dorm[] = dorms?.length
    ? enrichDorms(dorms as any)
    : STATIC_DORMS.slice(0, 3).map((d) => ({
        id: d.id, name: d.name, city: d.city, address: d.address,
        price_min: d.price_min, price_max: d.price_max, description: d.description,
        amenities: d.amenities, images: d.images, website: d.website,
        created_at: d.reviews[0]?.date ?? '', avg_rating: d.avg_rating, review_count: d.review_count,
      }))

  const featuredUnis: University[] = unis?.length
    ? enrichUnis(unis as any)
    : STATIC_UNIVERSITIES.slice(0, 3).map((u) => ({
        id: u.id, name: u.name, city: u.city, description: u.description,
        website: u.website, programs: u.programs, languages: u.languages,
        logo_url: u.logo_url, created_at: '', avg_rating: u.avg_rating, review_count: u.review_count,
      }))

  const stats = [
    { icon: '🏠', value: '50+', label: 'Dorms Listed' },
    { icon: '🎓', value: '30+', label: 'Universities' },
    { icon: '👤', value: '2K+', label: 'Students' },
    { icon: '💬', value: '500+', label: 'Q&A Answers' },
  ]

  const features = [
    { href: '/dorms', icon: '🏠', color: 'bg-blue-50', title: 'Student Dorms', desc: 'Real reviews' },
    { href: '/universities', icon: '🎓', color: 'bg-purple-50', title: 'Universities', desc: 'Find programs' },
    { href: '/qa', icon: '❓', color: 'bg-green-50', title: 'Q&A Forum', desc: 'Ask students' },
    { href: '/guides', icon: '📖', color: 'bg-amber-50', title: 'Guides', desc: 'Visa & tips' },
    { href: '/scholarships', icon: '🏆', color: 'bg-red-50', title: 'Scholarships', desc: 'SH & Erasmus' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            🇭🇺 Your guide to studying in Hungary
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 max-w-xl">
            Find Your <span className="text-yellow-300">Perfect</span><br />Study Experience
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed mb-8">
            Crowdsourced reviews, real student answers, and scholarship guides for international students in Hungary.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/dorms" className="btn-primary bg-white !text-primary-700 hover:bg-gray-50 shadow-lg px-6 py-3 text-base">
              Browse Dorms →
            </Link>
            <Link href="/scholarships" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-base">
              Find Scholarships
            </Link>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 40" fill="none">
          <path d="M0 40L1440 40L1440 12C1200 40 720 0 0 24L0 40Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-px">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className={`px-6 py-5 flex items-center gap-4 ${i < 3 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}>
              <div className="p-2 bg-primary-50 rounded-xl text-xl">{s.icon}</div>
              <div>
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              🇭🇺 About Us
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">About Studies in Hungary</h2>
            <p className="text-gray-600 leading-relaxed text-base mb-8">
              Studies in Hungary is a community-driven platform built by students, for students. We solve the critical
              information gap that international students face when choosing where to study and live in Hungary. Our
              platform provides authentic peer reviews, step-by-step guidance, and a supportive community to help you
              navigate every step of your Hungarian education journey — from choosing a university to opening your
              first bank account.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '14+', label: 'Universities Listed', icon: '🎓' },
                { value: '50+', label: 'Dorms Reviewed', icon: '🏠' },
                { value: '1,000+', label: 'Questions Answered', icon: '💬' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-black text-primary-700">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <h2 className="section-title mb-5">Everything You Need</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {features.map((f) => (
            <Link key={f.href} href={f.href}
              className={`${f.color} rounded-2xl p-5 hover:-translate-y-1 transition-transform cursor-pointer`}>
              <div className="text-2xl">{f.icon}</div>
              <div className="font-bold text-sm text-gray-900 mt-3 mb-1">{f.title}</div>
              <div className="text-xs text-gray-500">{f.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Dorms */}
      <section className="bg-gray-50 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="section-title">Featured Dorms</h2>
            <Link href="/dorms" className="text-sm text-primary-600 font-semibold hover:underline">All dorms →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredDorms.map((d) => <DormCard key={d.id} dorm={d} />)}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-5">
          <h2 className="section-title">Top Universities</h2>
          <Link href="/universities" className="text-sm text-primary-600 font-semibold hover:underline">All universities →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredUnis.map((u) => <UniCard key={u.id} university={u} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-3xl p-10 text-center text-white">
          <div className="text-4xl mb-4">⭐</div>
          <h2 className="text-2xl font-black mb-2">Studied in Hungary?</h2>
          <p className="text-blue-100 mb-6 max-w-sm mx-auto">
            Share your experience and help the next generation of international students.
          </p>
          <Link href="/dorms" className="btn-primary bg-white !text-primary-700 hover:bg-gray-50 px-6 py-3 text-base shadow-lg">
            Write a Review →
          </Link>
        </div>
      </section>
    </div>
  )
}
