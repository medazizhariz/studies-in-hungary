import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Question } from '@/types'

const CAT_COLORS: Record<string, string> = {
  Scholarships: 'bg-amber-100 text-amber-800',
  'Banking & Finance': 'bg-green-100 text-green-800',
  'Daily Life': 'bg-gray-100 text-gray-700',
  'Language & Culture': 'bg-purple-100 text-purple-800',
  Housing: 'bg-blue-100 text-blue-800',
  'Visa & Immigration': 'bg-red-100 text-red-800',
  Academic: 'bg-indigo-100 text-indigo-800',
  'Health & Insurance': 'bg-pink-100 text-pink-800',
}

type Props = { question: Question }

export default function QuestionCard({ question: q }: Props) {
  const catColor = q.category ? (CAT_COLORS[q.category] ?? 'bg-gray-100 text-gray-700') : 'bg-gray-100 text-gray-700'

  return (
    <Link href={`/qa/${q.id}`}
      className="card p-4 hover:-translate-y-0.5 transition-transform block">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-sm text-gray-900 leading-snug flex-1">{q.title}</h3>
        {q.category && (
          <span className={`badge shrink-0 ${catColor}`}>{q.category}</span>
        )}
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>👁 {q.views}</span>
        <span>💬 {q.answer_count ?? 0} answer{q.answer_count !== 1 ? 's' : ''}</span>
        {(q.answer_count ?? 0) === 0 && (
          <span className="badge bg-amber-100 text-amber-800">Unanswered</span>
        )}
        <span className="ml-auto">{formatDate(q.created_at)}</span>
      </div>
    </Link>
  )
}
