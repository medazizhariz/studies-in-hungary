/** Proxies Wikipedia images through weserv.nl to bypass hotlink restrictions */
export function proxyImage(url: string): string {
  if (url.includes('upload.wikimedia.org')) {
    const clean = url.replace(/^https?:\/\//, '')
    return `https://images.weserv.nl/?url=${clean}&w=800&output=jpg`
  }
  return url
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDeadline(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'Closed'
  if (diffDays === 0) return 'Today'
  if (diffDays <= 7) return `${diffDays}d left`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}w left`
  return formatDate(dateStr)
}

export function initials(name: string | null | undefined) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const CITIES = ['Budapest', 'Debrecen', 'Pécs', 'Miskolc', 'Győr', 'Szeged']

export const QA_CATEGORIES = [
  'Scholarships',
  'Banking & Finance',
  'Daily Life',
  'Language & Culture',
  'Housing',
  'Visa & Immigration',
  'Academic',
  'Health & Insurance',
]

export const GUIDE_CATEGORIES = [
  'Visa Application',
  'Bank Accounts',
  'Arrival Checklist',
  'Insurance',
  'Transport',
  'Culture',
]
