export const revalidate = 3600 // revalidate every hour

import { createClient } from '@/lib/supabase/server'
import { formatDeadline } from '@/lib/utils'
import { STATIC_SCHOLARSHIPS } from '@/lib/staticData'
import type { Scholarship } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Scholarships' }

const TYPE_COLORS: Record<string, string> = {
  Government: 'bg-green-100 text-green-800',
  EU: 'bg-blue-100 text-blue-800',
  University: 'bg-purple-100 text-purple-800',
  Regional: 'bg-amber-100 text-amber-800',
}

export default async function ScholarshipsPage() {
  const supabase = await createClient()
  const { data: dbScholarships } = await supabase
    .from('scholarships')
    .select('*')
    .order('featured', { ascending: false })
    .order('deadline', { ascending: true })

  // Fall back to static data if DB is empty
  const scholarships: Array<Scholarship | typeof STATIC_SCHOLARSHIPS[0]> =
    dbScholarships?.length ? dbScholarships : STATIC_SCHOLARSHIPS

  const featured = scholarships.filter((s) => s.featured)
  const others = scholarships.filter((s) => !s.featured)

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Scholarships</h1>
          <p className="text-gray-500 text-sm mt-1">Funding opportunities for international students in Hungary.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-10">
        {featured.length > 0 && (
          <div>
            <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
              <span className="text-yellow-500">⭐</span> Featured Scholarships
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map((s) => (
                <div key={s.id}
                  className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-base text-gray-900">{s.name}</h3>
                    {s.type && (
                      <span className={`badge ${TYPE_COLORS[s.type] ?? 'bg-gray-100 text-gray-700'}`}>{s.type}</span>
                    )}
                  </div>
                  {s.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.description}</p>
                  )}
                  {'coverage' in s && s.coverage && (
                    <p className="text-xs text-green-700 font-medium mb-3">✓ {s.coverage}</p>
                  )}
                  {'eligibility' in s && s.eligibility && (
                    <p className="text-xs text-gray-500 mb-3">👤 {s.eligibility}</p>
                  )}
                  <div className="flex items-center justify-between">
                    {s.deadline && (
                      <span className="text-xs text-gray-500">
                        📅 Deadline: <span className="font-semibold text-gray-700">{s.deadline}</span>
                      </span>
                    )}
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-primary-600 font-semibold hover:underline">
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Other Scholarships</h2>
            <div className="space-y-3">
              {others.map((s) => (
                <div key={s.id} className="card p-5">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-sm text-gray-900">{s.name}</h3>
                        {s.type && (
                          <span className={`badge ${TYPE_COLORS[s.type] ?? 'bg-gray-100 text-gray-700'}`}>{s.type}</span>
                        )}
                      </div>
                      {s.description && (
                        <p className="text-xs text-gray-500 leading-relaxed mb-2">{s.description}</p>
                      )}
                      {'coverage' in s && s.coverage && (
                        <p className="text-xs text-green-700 font-medium">✓ {s.coverage}</p>
                      )}
                      {'eligibility' in s && s.eligibility && (
                        <p className="text-xs text-gray-400 mt-1">👤 {s.eligibility}</p>
                      )}
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                      {s.deadline && (
                        <div className="sm:text-right">
                          <p className="text-xs text-gray-400">Deadline</p>
                          <p className="text-sm font-semibold text-gray-700">{s.deadline}</p>
                        </div>
                      )}
                      {s.link && (
                        <a href={s.link} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-primary-600 font-semibold hover:underline whitespace-nowrap">
                          Apply →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scholarships.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🏆</div>
            <p className="font-medium">No scholarships listed yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
