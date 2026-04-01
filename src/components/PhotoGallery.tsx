'use client'

import { useState, useEffect, useCallback } from 'react'
import { proxyImage } from '@/lib/utils'

interface PhotoGalleryProps {
  images: string[]
  captions?: string[]
  name: string
}

export default function PhotoGallery({ images, captions = [], name }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])

  const goPrev = useCallback(() =>
    setCurrent((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length])

  const goNext = useCallback(() =>
    setCurrent((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length])

  const lbPrev = useCallback(() =>
    setLightboxIdx((i) => (i === null ? null : i > 0 ? i - 1 : images.length - 1)), [images.length])

  const lbNext = useCallback(() =>
    setLightboxIdx((i) => (i === null ? null : i < images.length - 1 ? i + 1 : 0)), [images.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') lbPrev()
      if (e.key === 'ArrowRight') lbNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIdx, closeLightbox, lbPrev, lbNext])

  if (images.length === 0) return null

  return (
    <>
      {/* ── Carousel ── */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 group" style={{ aspectRatio: '16/9', maxHeight: 420 }}>
        {/* Main image */}
        <button
          onClick={() => setLightboxIdx(current)}
          className="w-full h-full focus:outline-none cursor-zoom-in"
          aria-label={`View ${captions[current] ?? `photo ${current + 1}`} fullscreen`}
        >
          <img
            src={proxyImage(images[current])}
            alt={captions[current] ?? `${name} - photo ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </button>

        {/* Caption overlay */}
        {captions[current] && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-8 pb-4 pointer-events-none">
            <p className="text-white text-sm font-medium leading-snug">{captions[current]}</p>
          </div>
        )}

        {/* Counter badge */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
          {current + 1} / {images.length}
        </div>

        {/* Prev / Next arrows — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-2 h-2 rounded-full transition-all pointer-events-auto ${
                  i === current ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                i === current
                  ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
              aria-label={`Select photo ${i + 1}`}
            >
              <img
                src={proxyImage(src)}
                alt={captions[i] ?? `${name} - thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-2"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-5xl px-16 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={proxyImage(images[lightboxIdx])}
              alt={captions[lightboxIdx] ?? `${name} - photo ${lightboxIdx + 1}`}
              className="w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
            />
            {captions[lightboxIdx] && (
              <p className="text-white text-sm font-medium text-center mt-4 max-w-2xl">{captions[lightboxIdx]}</p>
            )}
            <p className="text-gray-400 text-xs text-center mt-2">{lightboxIdx + 1} / {images.length}</p>
          </div>

          {images.length > 1 && (
            <div
              className="flex gap-2 mt-4 px-4 overflow-x-auto max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                    i === lightboxIdx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={proxyImage(src)} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Previous photo"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lbNext() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Next photo"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
