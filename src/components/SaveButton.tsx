'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  itemType: 'university' | 'dorm' | 'guide'
  itemId: string
  itemName: string
  className?: string
}

export default function SaveButton({ itemType, itemId, itemName, className = '' }: Props) {
  const supabase = createClient()
  const [saved, setSaved] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase
        .from('saved_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .maybeSingle()
      setSaved(!!data)
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, itemType])

  if (!mounted) return null

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!userId) {
      window.location.href = '/auth/login'
      return
    }
    setLoading(true)
    if (saved) {
      await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
      setSaved(false)
    } else {
      await supabase.from('saved_items').insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId,
        item_name: itemName,
      })
      setSaved(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={saved ? 'Remove from saved' : 'Save'}
      aria-label={saved ? 'Remove from saved' : 'Save'}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
        saved
          ? 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
          : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700'
      } ${loading ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
