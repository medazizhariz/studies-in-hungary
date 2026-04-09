/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable client-side Router Cache for dynamic routes so navigating
    // back to a page always fetches fresh data from the server
    staleTimes: { dynamic: 0 },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.weserv.nl' },
    ],
  },
}

module.exports = nextConfig
