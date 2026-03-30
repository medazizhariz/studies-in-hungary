'use client'

import { useState } from 'react'
import { STATIC_GUIDES } from '@/lib/staticData'

const CATEGORIES = ['All', ...Array.from(new Set(STATIC_GUIDES.map((g) => g.category)))]

function GuideCard({ guide }: { guide: typeof STATIC_GUIDES[0] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [open, setOpen] = useState(false)

  const completed = guide.steps.filter((s) => checked[s.id]).length
  const total = guide.steps.length
  const pct = Math.round((completed / total) * 100)

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-xl shrink-0">
            {guide.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge bg-primary-50 text-primary-700 text-xs">{guide.category}</span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1">{guide.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{guide.description}</p>

            {/* Progress */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
          <span className="text-gray-400 text-xs mt-1 shrink-0">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Steps */}
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5">
          <div className="space-y-3 mt-4">
            {guide.steps.map((step, i) => (
              <label
                key={step.id}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  checked[step.id] ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-500 shrink-0">
                    {checked[step.id] ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={!!checked[step.id]}
                    onChange={() => toggle(step.id)}
                    className="sr-only"
                  />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${checked[step.id] ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {step.label}
                  </p>
                  {step.detail && (
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.detail}</p>
                  )}
                </div>
              </label>
            ))}
          </div>

          {completed === total && total > 0 && (
            <div className="mt-4 bg-green-50 text-green-700 text-sm font-semibold rounded-xl px-4 py-3 text-center">
              🎉 Guide completed! You're all set.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? STATIC_GUIDES
    : STATIC_GUIDES.filter((g) => g.category === activeCategory)

  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Student Guides</h1>
          <p className="text-gray-500 text-sm mt-1">Step-by-step tutorials to navigate life in Hungary. Check off each step as you go.</p>
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
                  ? 'bg-primary-50 border-primary-300 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      </div>
    </div>
  )
}
