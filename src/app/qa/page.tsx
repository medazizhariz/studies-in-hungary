export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import QAAccordion from '@/components/QAAccordion'
import { QA_CATEGORIES } from '@/lib/utils'
import { STATIC_QA } from '@/lib/staticData'
import type { Question } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Community Q&A' }

type Props = { searchParams: Promise<{ cat?: string; q?: string }> }

export default async function QAPage({ searchParams }: Props) {
  const { cat, q } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let query = supabase
    .from('questions')
    .select('*, profiles(username, full_name), answers(id)')
    .order('created_at', { ascending: false })

  if (cat) query = query.eq('category', cat)
  if (q) query = query.ilike('title', `%${q}%`)

  const { data } = await query

  const dbQuestions: Question[] = (data ?? []).map(({ answers, ...question }: any) => ({
    ...question,
    answer_count: answers.length,
  }))

  // Split into unanswered and answered
  const unansweredQuestions = dbQuestions.filter((q) => (q.answer_count ?? 0) === 0)
  const answeredQuestions = dbQuestions.filter((q) => (q.answer_count ?? 0) > 0)

  // Filter static Q&A
  let staticQuestions = STATIC_QA
  if (cat) staticQuestions = staticQuestions.filter((sq) => sq.category === cat)
  if (q) staticQuestions = staticQuestions.filter((sq) => sq.title.toLowerCase().includes(q.toLowerCase()))

  const hasDbData = dbQuestions.length > 0

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Community Q&A</h1>
            <p className="text-gray-500 text-sm mt-1">Ask anything about studying in Hungary.</p>
          </div>
          {user ? (
            <Link href="/qa/ask" className="btn-primary">+ Ask a Question</Link>
          ) : (
            <Link href="/auth/login" className="btn-primary">Sign in to Ask</Link>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <form method="GET" className="flex gap-3 flex-wrap mb-6">
          <input name="q" defaultValue={q} placeholder="Search questions…" className="input flex-1 min-w-40" />
          <select name="cat" defaultValue={cat ?? ''} className="input w-44">
            <option value="">All categories</option>
            {QA_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary px-5">Search</button>
          {(cat || q) && (
            <a href="/qa" className="btn-secondary">Clear</a>
          )}
        </form>

        {/* Community questions from DB */}
        {hasDbData && (
          <>
            {/* Unanswered section */}
            {unansweredQuestions.length > 0 && (
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <span className="badge bg-amber-100 text-amber-800">Unanswered</span>
                  <span>{unansweredQuestions.length} question{unansweredQuestions.length !== 1 ? 's' : ''} waiting for answers</span>
                </h2>
                <div className="space-y-3">
                  {unansweredQuestions.map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
                </div>
              </div>
            )}

            {/* Answered section */}
            {answeredQuestions.length > 0 && (
              <div className="mb-10">
                <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <span className="badge bg-green-100 text-green-800">Answered</span>
                  <span>{answeredQuestions.length} answered question{answeredQuestions.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="space-y-3">
                  {answeredQuestions.map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Static FAQ */}
        {staticQuestions.length > 0 && (
          <div>
            {hasDbData && (
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <span className="badge bg-amber-100 text-amber-800">FAQ</span>
                Frequently Asked Questions
              </h2>
            )}
            {!hasDbData && (
              <p className="text-xs text-gray-400 mb-5">{staticQuestions.length} question{staticQuestions.length !== 1 ? 's' : ''}</p>
            )}
            <QAAccordion questions={staticQuestions} />
          </div>
        )}

        {!hasDbData && staticQuestions.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">❓</div>
            <p className="font-medium">No questions found</p>
          </div>
        )}
      </div>
    </div>
  )
}
