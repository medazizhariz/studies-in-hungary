export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AnswerForm from '@/components/AnswerForm'
import ReportButton from '@/components/ReportButton'
import AcceptAnswer from './AcceptAnswer'
import { formatDate, initials } from '@/lib/utils'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('questions').select('title').eq('id', id).single()
  return { title: data?.title ?? 'Question' }
}

export default async function QuestionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: question } = await supabase
    .from('questions')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('id', id)
    .single()

  if (!question) notFound()

  supabase.from('questions').update({ views: question.views + 1 }).eq('id', id).then(() => {})

  const { data: answers } = await supabase
    .from('answers')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('question_id', id)
    .order('is_accepted', { ascending: false })
    .order('created_at', { ascending: true })

  const askerName = question.profiles?.full_name || question.profiles?.username || 'Anonymous'

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <Link href="/qa" className="text-sm text-primary-600 hover:underline mb-6 inline-block">← Back to Q&A</Link>

      <div className="card p-6 mb-6">
        {question.category && (
          <span className="badge bg-amber-100 text-amber-800 mb-3 inline-block">{question.category}</span>
        )}
        <h1 className="text-2xl font-black text-gray-900 mb-3 leading-snug">{question.title}</h1>
        {question.body && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{question.body}</p>
        )}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
              {initials(askerName)}
            </div>
            <span className="font-medium text-gray-600">{askerName}</span>
            <span>·</span>
            <span>{formatDate(question.created_at)}</span>
            <span>·</span>
            <span>👁 {question.views} views</span>
          </div>
          <ReportButton />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-4">
          {answers?.length ?? 0} Answer{answers?.length !== 1 ? 's' : ''}
        </h2>
        {answers?.length === 0 && (
          <p className="text-sm text-gray-400 mb-6">No answers yet. Be the first to help!</p>
        )}
        <div className="space-y-4">
          {answers?.map((a) => {
            const name = a.profiles?.full_name || a.profiles?.username || 'Anonymous'
            return (
              <div key={a.id} className={`card p-5 ${a.is_accepted ? 'ring-2 ring-green-400' : ''}`}>
                {a.is_accepted && (
                  <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold mb-3">
                    ✓ Accepted Answer
                  </div>
                )}
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{a.body}</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                      {initials(name)}
                    </div>
                    <span className="font-medium text-gray-600">{name}</span>
                    <span>·</span>
                    <span>{formatDate(a.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {user?.id === question.user_id && !a.is_accepted && (
                      <AcceptAnswer answerId={a.id} questionId={id} />
                    )}
                    <ReportButton />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {(() => {
        const isOwnQuestion = user?.id === question.user_id
        const hasAnswered = answers?.some((a) => a.user_id === user?.id) ?? false

        if (!user) {
          return (
            <div className="card p-5 text-center text-sm text-gray-500">
              <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link> to post an answer.
            </div>
          )
        }
        if (isOwnQuestion) {
          return (
            <div className="card p-5 text-center text-sm text-gray-500">
              You cannot answer your own question.
            </div>
          )
        }
        if (hasAnswered) {
          return (
            <div className="card p-5 text-center text-sm text-gray-500">
              You have already answered this question.
            </div>
          )
        }
        return (
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-4">Your Answer</h3>
            <AnswerForm questionId={id} userId={user.id} />
          </div>
        )
      })()}
    </div>
  )
}
