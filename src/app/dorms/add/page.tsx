'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CITIES } from '@/lib/utils'
import type { Metadata } from 'next'

export default function AddDormPage() {
  const router = useRouter()
  const supabase = createClient()

  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    city: 'Budapest',
    address: '',
    price_min: '',
    price_max: '',
    description: '',
    website: '',
    rating: '3',
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login?next=/dorms/add')
      } else {
        setUserId(data.user.id)
      }
    })
  }, [])

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) { router.push('/auth/login?next=/dorms/add'); return }
    setLoading(true)
    setError('')

    let imageUrl: string | null = null

    // Upload image if provided
    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `dorm-images/${Date.now()}.${ext}`
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('dorms')
        .upload(path, imageFile, { upsert: false })

      if (uploadErr) {
        // Non-fatal: continue without image
        console.warn('Image upload failed:', uploadErr.message)
      } else {
        const { data: urlData } = supabase.storage.from('dorms').getPublicUrl(path)
        imageUrl = urlData.publicUrl
      }
    }

    const { data: dormData, error: dormErr } = await supabase
      .from('dorms')
      .insert({
        name: form.name.trim(),
        city: form.city,
        address: form.address.trim() || null,
        price_min: form.price_min ? Number(form.price_min) : null,
        price_max: form.price_max ? Number(form.price_max) : null,
        description: form.description.trim() || null,
        website: form.website.trim() || null,
        images: imageUrl ? [imageUrl] : [],
      })
      .select('id')
      .single()

    if (dormErr) {
      setError(dormErr.message)
      setLoading(false)
      return
    }

    // Submit initial rating as a review
    if (dormData?.id && form.rating) {
      await supabase.from('reviews').insert({
        user_id: userId,
        entity_type: 'dorm',
        entity_id: dormData.id,
        rating: Number(form.rating),
        title: 'Initial rating',
        body: null,
      })
    }

    setSuccess(true)
    setTimeout(() => router.push(dormData?.id ? `/dorms/${dormData.id}` : '/dorms'), 1500)
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🏠</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Dorm added!</h2>
          <p className="text-sm text-gray-500">Redirecting you to the dorm page…</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Add a Dorm</h1>
          <p className="text-gray-500 text-sm mt-1">Share a student dorm with the community.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={submit} className="card p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dorm Name <span className="text-red-500">*</span></label>
            <input name="name" className="input" placeholder="e.g. Universitas Dormitory"
              value={form.name} onChange={handleField} required />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
            <select name="city" className="input" value={form.city} onChange={handleField} required>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <input name="address" className="input" placeholder="e.g. Ifjúság útja 8, Budapest 1117"
              value={form.address} onChange={handleField} />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price (€/mo)</label>
              <input name="price_min" type="number" min="0" className="input"
                placeholder="e.g. 100" value={form.price_min} onChange={handleField} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Max Price (€/mo)</label>
              <input name="price_max" type="number" min="0" className="input"
                placeholder="e.g. 200" value={form.price_max} onChange={handleField} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea name="description" rows={4} className="input resize-none"
              placeholder="Describe the dorm — location, atmosphere, facilities…"
              value={form.description} onChange={handleField} required />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Website</label>
            <input name="website" type="url" className="input"
              placeholder="https://example.com"
              value={form.website} onChange={handleField} />
          </div>

          {/* Initial Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, rating: String(n) }))}
                  className={`text-2xl transition-transform hover:scale-110 ${Number(form.rating) >= n ? 'text-amber-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-1">{form.rating}/5</span>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Photo</label>
            <input type="file" accept="image/*" onChange={handleImage}
              className="block text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer" />
            {imagePreview && (
              <div className="mt-3 relative h-40 w-full rounded-xl overflow-hidden bg-gray-100">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={loading} className="btn-primary px-6 py-2.5">
              {loading ? 'Submitting…' : 'Submit Dorm'}
            </button>
            <Link href="/dorms" className="btn-secondary px-5 py-2.5">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
