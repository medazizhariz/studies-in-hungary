'use client'

import { useState } from 'react'
import ReportButton from './ReportButton'
import type { StaticQA } from '@/lib/staticData'

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

type Props = { questions: StaticQA[] }

export default function QAAccordion({ questions }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(questions.map((q) => [q.id, q.upvotes]))
  )
  const [voted, setVoted] = useState<Record<string, 'up' | 'down' | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  )

  const vote = (id: string, dir: 'up' | 'down') => {
    setVotes((prev) => {
      const current = voted[id]
      if (current === dir) {
        // undo vote
        setVoted((v) => ({ ...v, [id]: null }))
        return { ...prev, [id]: prev[id] + (dir === 'up' ? -1 : 1) }
      }
      const delta = dir === 'up'
        ? (current === 'down' ? 2 : 1)
        : (current === 'up' ? -2 : -1)
      setVoted((v) => ({ ...v, [id]: dir }))
      return { ...prev, [id]: prev[id] + delta }
    })
  }

  return (
    <div className="space-y-3">
      {questions.map((q) => {
        const isOpen = expanded === q.id
        const catColor = CAT_COLORS[q.category] ?? 'bg-gray-100 text-gray-700'
        const userVote = voted[q.id]

        return (
          <div key={q.id} className="card overflow-hidden">
            {/* Question row */}
            <button
              onClick={() => setExpanded(isOpen ? null : q.id)}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-sm text-gray-900 leading-snug flex-1">{q.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge ${catColor}`}>{q.category}</span>
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>👁 {q.views} views</span>
                <span>✅ 1 answer</span>
              </div>
            </button>

            {/* Answer + actions */}
            {isOpen && (
              <div className="border-t border-gray-100 bg-green-50/40 px-4 pb-4 pt-4">
                <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold mb-2">
                  ✓ Answer
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">{q.answer}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Upvote */}
                  <button
                    onClick={() => vote(q.id, 'up')}
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                      userVote === 'up'
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-200 hover:text-green-700'
                    }`}
                  >
                    ▲ Helpful ({votes[q.id]})
                  </button>
                  {/* Downvote */}
                  <button
                    onClick={() => vote(q.id, 'down')}
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                      userVote === 'down'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-700'
                    }`}
                  >
                    ▼ Not helpful
                  </button>
                  <div className="ml-auto">
                    <ReportButton />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
