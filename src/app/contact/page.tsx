'use client'

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setLoading(true)
    setError('')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setError('Email service is not configured. Please contact us directly at studiesinhungary1@gmail.com')
      setLoading(false)
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setSuccess(true)
      formRef.current.reset()
    } catch {
      setError('Failed to send message. Please try again or email us at studiesinhungary1@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Have a question or suggestion? We&apos;d love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        {success ? (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">Message Sent!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Thank you for reaching out. We&apos;ll get back to you within 1–2 business days.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-primary"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="card p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    className="input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="reply_to"
                    type="email"
                    required
                    className="input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  required
                  className="input"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="input resize-none"
                  placeholder="Write your message here..."
                  maxLength={3000}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base"
              >
                {loading ? 'Sending…' : 'Send Message →'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                You can also email us directly at{' '}
                <a href="mailto:studiesinhungary1@gmail.com" className="text-primary-600 hover:underline">
                  studiesinhungary1@gmail.com
                </a>
              </p>
            </form>
          </div>
        )}

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '📧', title: 'Email', value: 'studiesinhungary1@gmail.com' },
            { icon: '⏱️', title: 'Response Time', value: '1–2 business days' },
            { icon: '🌍', title: 'Based in', value: 'Budapest, Hungary' },
          ].map((item) => (
            <div key={item.title} className="card p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl mb-2 leading-none">{item.icon}</div>
              <p className="text-xs text-gray-400 font-medium">{item.title}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Social media links — centered row */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Find us on</p>
          <div className="flex items-center justify-center gap-5">
            {/* Instagram */}
            <a
              href="https://instagram.com/studiesinhungary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/studiesinhungary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com/@studiesinhungary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://tiktok.com/@studiesinhungary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
