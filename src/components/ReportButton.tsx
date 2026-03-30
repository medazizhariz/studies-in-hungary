'use client'

import { useState, useRef, useEffect } from 'react'

const REPORT_REASONS = [
  'Spam',
  'Fake review',
  'Inappropriate content',
  'Outdated information',
]

export default function ReportButton() {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleReport = () => {
    setOpen(false)
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 4000)
  }

  if (confirmed) {
    return (
      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
        ✓ Thank you for your report. Our team will review this.
      </span>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
        title="Report this content"
      >
        🚩 Report
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
          <p className="text-xs text-gray-400 px-3 py-1.5 font-medium border-b border-gray-100">Report reason</p>
          {REPORT_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={handleReport}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              {reason}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
