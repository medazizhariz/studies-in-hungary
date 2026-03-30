import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: { default: 'Studies in Hungary', template: '%s | Studies in Hungary' },
  description:
    'Crowdsourced reviews, real student answers, and scholarship guides for international students in Hungary.',
  openGraph: {
    title: 'Studies in Hungary',
    description: 'Find your perfect study experience in Hungary.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
