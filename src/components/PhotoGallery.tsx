'use client'

import { useState, useEffect, useCallback } from 'react'
import { proxyImage } from '@/lib/utils'

interface PhotoGalleryProps {
  images: string[]
  captions?: string[]
  name: string
}

export default function PhotoGallery({ images, captions = [], name }: PhotoGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : i > 0 ? i - 1 : images.length - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : i < images.length - 1 ? i + 1 : 0))
  }, [images.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIdx, closeLightbox, goPrev, goNext])

  if (images.length === 0) return null

  const gridCols =
    images.length === 1
      ? 'grid-cols-1'
      : images.length === 2
      ? 'grid-cols-2'
      : images.length === 3
      ? 'grid-cols-3'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'

  const heightClass = images.length === 1 ? 'h-72' : 'h-48'

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={`grid ${gridCols} gap-3 mb-8`}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className={`relative group rounded-xl overflow-hidden bg-gray-100 ${heightClass} w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label={`View ${captions[i] ?? `photo ${i + 1}`} fullscreen`}
          >
            <img
              src={proxyImage(src)}
              alt={captions[i] ?? `${name} - photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Caption overlay */}
            {captions[i] && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 pt-6 pb-2">
                <p className="text-white text-xs font-medium leading-snug">{captions[i]}</p>
              </div>
            )}
            {/* Zoom hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-2"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main image container */}
          <div
            className="relative w-full max-w-5xl px-16 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={proxyImage(images[lightboxIdx])}
              alt={captions[lightboxIdx] ?? `${name} - photo ${lightboxIdx + 1}`}
              className="w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Caption */}
            {captions[lightboxIdx] && (
              <p className="text-white text-sm font-medium text-center mt-4 max-w-2xl">
                {captions[lightboxIdx]}
              </p>
            )}

            {/* Counter */}
            <p className="text-gray-400 text-xs text-center mt-2">
              {lightboxIdx + 1} / {images.length}
            </p>
          </div>

          {/* Thumbnail strip */}
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
                  <img
                    src={proxyImage(src)}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Previous photo"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
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
