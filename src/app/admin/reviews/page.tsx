export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import ReviewModerationCard from './ReviewModerationCard'

export default async function AdminReviewsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const admin = createAdminClient()

  // Fetch all pending reviews that have media
  const { data: reviews, error } = await admin
    .from('reviews')
    .select('*, profiles(username, full_name)')
    .eq('status', 'pending')
    .not('media_urls', 'is', null)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-600">Error loading reviews: {error.message}</p>
        <p className="text-sm text-gray-400 mt-1">Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env.local</p>
      </div>
    )
  }

  // Fetch university names for pending reviews
  const uniIds = reviews?.filter(r => r.entity_type === 'university').map(r => r.entity_id) ?? []
  const dormIds = reviews?.filter(r => r.entity_type === 'dorm').map(r => r.entity_id) ?? []

  const [{ data: unis }, { data: dorms }] = await Promise.all([
    uniIds.length ? admin.from('universities').select('id, name').in('id', uniIds) : { data: [] },
    dormIds.length ? admin.from('dorms').select('id, name').in('id', dormIds) : { data: [] },
  ])

  const nameMap: Record<string, string> = {}
  unis?.forEach((u) => { nameMap[u.id] = u.name })
  dorms?.forEach((d) => { nameMap[d.id] = d.name })

  const pending = (reviews ?? []).map((r) => ({
    ...r,
    media_urls: r.media_urls ?? [],
    entity_name: nameMap[r.entity_id] ?? r.entity_id,
  }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-1">Review Moderation</h1>
      <p className="text-sm text-gray-500 mb-6">
        {pending.length} pending review{pending.length !== 1 ? 's' : ''} with photos
      </p>

      {pending.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-2">✅</p>
          <p className="text-gray-500">All caught up — no pending reviews.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((review) => (
            <ReviewModerationCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}
