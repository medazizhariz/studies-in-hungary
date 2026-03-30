'use client'

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import type { Metadata } from 'next'

// EmailJS credentials — set these in your .env.local:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

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
          <h1 className="text-3xl font-black text-gray-900">Contact Us</h1>
          <p className="text-gray-500 text-sm mt-1">Have a question or suggestion? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        {success ? (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Thank you for reaching out. We'll get back to you within 1–2 business days.
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '📧', title: 'Email', value: 'studiesinhungary1@gmail.com' },
            { icon: '⏱️', title: 'Response Time', value: '1–2 business days' },
            { icon: '🌍', title: 'Based in', value: 'Budapest, Hungary' },
          ].map((item) => (
            <div key={item.title} className="card p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs text-gray-400 font-medium">{item.title}</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
