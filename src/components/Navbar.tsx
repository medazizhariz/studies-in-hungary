'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { initials } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/dorms', label: 'Dorms' },
  { href: '/universities', label: 'Universities' },
  { href: '/qa', label: 'Q&A' },
  { href: '/guides', label: 'Guides' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Sync dark state from html class (set by inline script before hydration)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-base">🎓</div>
          <div className="leading-tight hidden sm:block">
            <div className="text-xs font-black text-gray-900 dark:text-gray-100">Studies in</div>
            <div className="text-xs font-black text-primary-600">Hungary</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-200">
                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                  {initials(user.user_metadata?.full_name || user.email)}
                </div>
                <span className="hidden sm:inline max-w-24 truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg py-1 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setUserMenuOpen(false)}>Profile</Link>
                  <button onClick={signOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost text-sm">Sign In</Link>
              <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">Sign Up</Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1" />
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1" />
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                pathname.startsWith(href)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
