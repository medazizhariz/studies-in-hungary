'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Props = { answerId: string; questionId: string }

export default function AcceptAnswer({ answerId, questionId }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const accept = async () => {
    // Unaccept all answers for this question, then accept this one
    await supabase.from('answers').update({ is_accepted: false }).eq('question_id', questionId)
    await supabase.from('answers').update({ is_accepted: true }).eq('id', answerId)
    router.refresh()
  }

  return (
    <button onClick={accept}
      className="text-xs text-green-700 font-semibold hover:underline border border-green-300 px-2.5 py-1 rounded-lg hover:bg-green-50 transition-colors">
      ✓ Accept
    </button>
  )
}
