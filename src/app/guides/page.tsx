'use client'

import { useState, useEffect, useCallback } from 'react'
import { STATIC_GUIDES } from '@/lib/staticData'
import { createClient } from '@/lib/supabase/client'

const CATEGORIES = ['All', ...Array.from(new Set(STATIC_GUIDES.map((g) => g.category)))]

const BANKING_CTA_GUIDE_IDS = ['bank-guide']

function BankingCTA() {
  return (
    <div className="mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div>
        <p className="text-white font-bold text-sm">vafff ff f g zg</p>
        <p className="text-green-100 text-xs mt-0.5">Open your student account in minutes</p>
      </div>
      <a
        href="#"
        className="shrink-0 bg-white text-green-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-green-50 transition-colors"
      >
        Get Started →
      </a>
    </div>
  )
}

function GuideCard({
  guide,
  isOpen,
  onToggle,
  checked,
  onToggleStep,
}: {
  guide: typeof STATIC_GUIDES[0]
  isOpen: boolean
  onToggle: () => void
  checked: Record<string, boolean>
  onToggleStep: (stepId: string) => void
}) {
  const completed = guide.steps.filter((s) => checked[s.id]).length
  const total = guide.steps.length
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="card overflow-hidden h-full">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-xl shrink-0">
            {guide.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge bg-primary-50 text-primary-700 text-xs dark:bg-primary-900/40 dark:text-primary-300">{guide.category}</span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-snug mb-1">{guide.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{guide.description}</p>

            {/* Progress */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium shrink-0">
                {completed}/{total} steps
              </span>
              {completed === total && total > 0 && (
                <span className="text-xs text-green-600 font-bold">✓ Done!</span>
              )}
            </div>
          </div>
          <span className="text-gray-400 text-xs mt-1 shrink-0">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Steps */}
      {isOpen && (
        <div className="border-t border-gray-100 dark:border-gray-700 px-5 pb-5">
          <div className="space-y-3 mt-4">
            {guide.steps.map((step, i) => (
              <label
                key={step.id}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  checked[step.id]
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shrink-0">
                    {checked[step.id] ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={!!checked[step.id]}
                    onChange={() => onToggleStep(step.id)}
                    className="sr-only"
                  />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${checked[step.id] ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {step.label}
                  </p>
                  {step.detail && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">{step.detail}</p>
                  )}
                </div>
              </label>
            ))}
          </div>

          {completed === total && total > 0 && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold rounded-xl px-4 py-3 text-center">
              🎉 Guide completed! You&apos;re all set.
            </div>
          )}

          {/* Banking CTA for bank-related guides */}
          {BANKING_CTA_GUIDE_IDS.includes(guide.id) && <BankingCTA />}
        </div>
      )}
    </div>
  )
}

// progress shape: { [guideId]: { [stepId]: true } }
type Progress = Record<string, Record<string, boolean>>

const LS_KEY = 'guide_progress'

function loadLocalProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function saveLocalProgress(progress: Progress) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(progress))
  } catch {}
}

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openGuideId, setOpenGuideId] = useState<string | null>(null)
  const [progress, setProgress] = useState<Progress>({})
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  // Load progress on mount — localStorage is always the base, Supabase overrides when available
  useEffect(() => {
    const load = async () => {
      // Always start from localStorage so guests and fallback cases work instantly
      const local = loadLocalProgress()
      setProgress(local)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data, error } = await supabase
        .from('guide_progress')
        .select('guide_id, step_id')
        .eq('user_id', user.id)

      if (!error && data && data.length > 0) {
        const prog: Progress = {}
        for (const row of data) {
          if (!prog[row.guide_id]) prog[row.guide_id] = {}
          prog[row.guide_id][row.step_id] = true
        }
        setProgress(prog)
        saveLocalProgress(prog) // keep localStorage in sync
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleStep = useCallback(async (guideId: string, stepId: string) => {
    const isChecked = progress[guideId]?.[stepId] ?? false

    // Optimistic update
    const updated: Progress = {
      ...progress,
      [guideId]: { ...(progress[guideId] ?? {}), [stepId]: !isChecked },
    }
    setProgress(updated)

    // Always save to localStorage (works for guests + fallback for logged-in users)
    saveLocalProgress(updated)

    if (!userId) return

    // Also save to Supabase for cross-device sync
    if (isChecked) {
      await supabase
        .from('guide_progress')
        .delete()
        .eq('user_id', userId)
        .eq('guide_id', guideId)
        .eq('step_id', stepId)
    } else {
      await supabase
        .from('guide_progress')
        .upsert({ user_id: userId, guide_id: guideId, step_id: stepId })
    }
  }, [progress, userId, supabase])

  const filtered = activeCategory === 'All'
    ? STATIC_GUIDES
    : STATIC_GUIDES.filter((g) => g.category === activeCategory)

  const toggleGuide = (id: string) =>
    setOpenGuideId((prev) => (prev === id ? null : id))

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Student Guides</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Step-by-step tutorials to navigate life in Hungary. Check off each step as you go.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === c
                  ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-900/40 dark:border-primary-600 dark:text-primary-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid: expanded cards span full row to prevent adjacent card shifting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((g) => (
            <div
              key={g.id}
              className={openGuideId === g.id ? 'md:col-span-2' : ''}
            >
              <GuideCard
                guide={g}
                isOpen={openGuideId === g.id}
                onToggle={() => toggleGuide(g.id)}
                checked={progress[g.id] ?? {}}
                onToggleStep={(stepId) => toggleStep(g.id, stepId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
