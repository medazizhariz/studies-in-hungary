'use client'

import { useState } from 'react'
import ReportButton from './ReportButton'
import type { StaticQA } from '@/lib/staticData'
import { MOCK_QA_AUTHORS } from '@/lib/staticData'

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

const BANKING_CATEGORIES = ['Banking & Finance']

function BankingCTA() {
  return (
    <div className="mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div>
        <p className="text-white font-bold text-sm">vafff ff f g zg</p>
        <p className="text-green-100 text-xs mt-0.5">Open your student bank account in minutes</p>
      </div>
      <a
        href="#"
        className="shrink-0 bg-white text-green-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-green-50 transition-colors whitespace-nowrap"
      >
        Get Started →
      </a>
    </div>
  )
}

function AuthorAvatar({ author, size = 'sm' }: { author: { name: string; avatar: string }; size?: 'sm' | 'xs' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-6 h-6'
  const text = size === 'sm' ? 'text-xs' : 'text-[10px]'
  return (
    <div className={`${dim} rounded-full overflow-hidden bg-primary-100 flex items-center justify-center shrink-0`}>
      <img
        src={author.avatar}
        alt={author.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          target.parentElement!.innerHTML = `<span class="${text} font-bold text-primary-600">${author.name[0]}</span>`
        }}
      />
    </div>
  )
}

type Props = { questions: StaticQA[] }

type FilterMode = 'all' | 'answered' | 'unanswered'

export default function QAAccordion({ questions }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(questions.map((q) => [q.id, q.upvotes]))
  )
  const [voted, setVoted] = useState<Record<string, 'up' | 'down' | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  )
  const [replyOpen, setReplyOpen] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [localReplies, setLocalReplies] = useState<Record<string, Array<{ id: string; author: { name: string; avatar: string }; body: string; date: string; upvotes: number }>>>({})
  const [filter, setFilter] = useState<FilterMode>('all')

  const vote = (id: string, dir: 'up' | 'down') => {
    setVotes((prev) => {
      const current = voted[id]
      if (current === dir) {
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

  const submitReply = (questionId: string) => {
    if (!replyText.trim()) return
    const author = MOCK_QA_AUTHORS[Math.floor(Math.random() * MOCK_QA_AUTHORS.length)]
    const newReply = {
      id: `local-${Date.now()}`,
      author,
      body: replyText.trim(),
      date: new Date().toISOString().slice(0, 10),
      upvotes: 0,
    }
    setLocalReplies((prev) => ({
      ...prev,
      [questionId]: [...(prev[questionId] ?? []), newReply],
    }))
    setReplyText('')
    setReplyOpen(null)
  }

  const filtered = questions.filter((q) => {
    if (filter === 'answered') return q.answer
    if (filter === 'unanswered') return !q.answer
    return true
  })

  return (
    <div className="space-y-3">
      {/* Filter toggle */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(['all', 'answered', 'unanswered'] as FilterMode[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === f
                ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-900/40 dark:border-primary-600 dark:text-primary-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {f === 'all' ? 'All' : f === 'answered' ? '✅ Answered' : '❓ Unanswered'}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">
          {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <div className="text-3xl mb-2">{filter === 'unanswered' ? '🎉' : '❓'}</div>
          <p className="text-sm font-medium">
            {filter === 'unanswered' ? 'All questions have been answered!' : 'No questions found.'}
          </p>
        </div>
      )}

      {filtered.map((q, qi) => {
        const isOpen = expanded === q.id
        const catColor = CAT_COLORS[q.category] ?? 'bg-gray-100 text-gray-700'
        const userVote = voted[q.id]
        const author = q.author ?? MOCK_QA_AUTHORS[qi % MOCK_QA_AUTHORS.length]
        const staticReplies = q.replies ?? []
        const addedReplies = localReplies[q.id] ?? []
        const allReplies = [...staticReplies, ...addedReplies]
        const isAnswered = !!q.answer

        return (
          <div key={q.id} className="card overflow-hidden">
            {/* Question row */}
            <button
              onClick={() => setExpanded(isOpen ? null : q.id)}
              className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <AuthorAvatar author={author} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5 font-medium">{author.name} · {q.date}</p>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-snug">{q.title}</h3>
                    {q.body && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{q.body}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge ${catColor}`}>{q.category}</span>
                  {isAnswered
                    ? <span className="text-green-500 text-xs font-bold">✓</span>
                    : <span className="text-amber-400 text-xs font-bold">?</span>
                  }
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 ml-10">
                <span>👁 {q.views} views</span>
                {isAnswered
                  ? <span className="text-green-600 font-medium">✅ {1 + allReplies.length} answer{allReplies.length !== 0 ? 's' : ''}</span>
                  : <span className="text-amber-500 font-medium">❓ Unanswered</span>
                }
              </div>
            </button>

            {/* Answer + replies */}
            {isOpen && (
              <div className="border-t border-gray-100 dark:border-gray-700 bg-green-50/40 dark:bg-green-900/10 px-4 pb-4 pt-4">
                {isAnswered ? (
                  <>
                    <div className="flex items-center gap-1.5 text-green-700 dark:text-green-400 text-xs font-bold mb-2">
                      ✓ Best Answer
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-4">{q.answer}</p>

                    {/* Banking CTA */}
                    {BANKING_CATEGORIES.includes(q.category) && <BankingCTA />}

                    <div className="flex items-center gap-3 flex-wrap mt-4">
                      <button
                        onClick={() => vote(q.id, 'up')}
                        className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                          userVote === 'up'
                            ? 'bg-green-100 border-green-300 text-green-700'
                            : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-green-50 hover:border-green-200 hover:text-green-700'
                        }`}
                      >
                        ▲ Helpful ({votes[q.id]})
                      </button>
                      <button
                        onClick={() => vote(q.id, 'down')}
                        className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                          userVote === 'down'
                            ? 'bg-red-100 border-red-300 text-red-700'
                            : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-700'
                        }`}
                      >
                        ▼ Not helpful
                      </button>
                      <div className="ml-auto"><ReportButton /></div>
                    </div>
                  </>
                ) : (
                  <div className="py-2 text-center">
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">No answer yet</p>
                    <p className="text-xs text-gray-400">Be the first to help this student!</p>
                  </div>
                )}

                {/* Existing replies */}
                {allReplies.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                      {allReplies.length} Repl{allReplies.length !== 1 ? 'ies' : 'y'}
                    </p>
                    {allReplies.map((r) => (
                      <div key={r.id} className="flex gap-2.5">
                        <AuthorAvatar author={r.author} size="xs" />
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{r.author.name}</span>
                            <span className="text-xs text-gray-400">{r.date}</span>
                            <span className="ml-auto text-xs text-gray-400">▲ {r.upvotes}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{r.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply button + form */}
                <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  {replyOpen === q.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply or answer..."
                        rows={3}
                        className="input resize-none text-sm"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => { setReplyOpen(null); setReplyText('') }}
                          className="btn-secondary text-xs px-3 py-1.5"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => submitReply(q.id)}
                          disabled={!replyText.trim()}
                          className="btn-primary text-xs px-3 py-1.5"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyOpen(q.id)}
                      className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold flex items-center gap-1"
                    >
                      💬 {isAnswered ? 'Add a reply' : 'Answer this question'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
