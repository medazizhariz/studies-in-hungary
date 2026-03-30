import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from './ProfileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Profile' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, dorms(name), universities(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: questions } = await supabase
    .from('questions')
    .select('id, title, created_at, answers(id)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8">My Profile</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ProfileForm profile={profile} userId={user.id} email={user.email ?? ''} />
        </div>

        <div className="space-y-6">
          {/* My Reviews */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">My Reviews ({reviews?.length ?? 0})</h2>
            {!reviews?.length ? (
              <p className="text-sm text-gray-400">You haven&apos;t written any reviews yet.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((r: any) => (
                  <div key={r.id} className="text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-700">
                      {r.entity_type === 'dorm' ? r.dorms?.name : r.universities?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)} · {r.entity_type}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Questions */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">My Questions ({questions?.length ?? 0})</h2>
            {!questions?.length ? (
              <p className="text-sm text-gray-400">You haven&apos;t asked any questions yet.</p>
            ) : (
              <div className="space-y-3">
                {questions.map((q: any) => (
                  <a key={q.id} href={`/qa/${q.id}`}
                    className="block text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0 hover:text-primary-700">
                    <p className="font-medium text-gray-700 leading-snug">{q.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {q.answers?.length ?? 0} answer{q.answers?.length !== 1 ? 's' : ''}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
