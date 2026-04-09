'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function approveReview(reviewId: string) {
  const admin = createAdminClient()
  const { error } = await admin
    .from('reviews')
    .update({ status: 'approved' })
    .eq('id', reviewId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

export async function approveAndAddToGallery(reviewId: string, entityId: string, photoUrl: string) {
  const admin = createAdminClient()

  // Approve the review
  const { error: reviewErr } = await admin
    .from('reviews')
    .update({ status: 'approved' })
    .eq('id', reviewId)
  if (reviewErr) throw new Error(reviewErr.message)

  // Append photo to the university's images array
  const { data: uni, error: fetchErr } = await admin
    .from('universities')
    .select('images')
    .eq('id', entityId)
    .single()
  if (!fetchErr && uni) {
    const currentImages: string[] = uni.images ?? []
    if (!currentImages.includes(photoUrl)) {
      await admin
        .from('universities')
        .update({ images: [...currentImages, photoUrl] })
        .eq('id', entityId)
    }
  }

  revalidatePath('/admin/reviews')
  revalidatePath(`/universities/${entityId}`)
}

export async function rejectReview(reviewId: string) {
  const admin = createAdminClient()
  const { error } = await admin
    .from('reviews')
    .delete()
    .eq('id', reviewId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}
