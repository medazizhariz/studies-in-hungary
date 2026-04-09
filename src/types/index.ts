export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  nationality: string | null
  studying_at: string | null
  created_at: string
}

export type Dorm = {
  id: string
  name: string
  city: string
  address: string | null
  price_min: number | null
  price_max: number | null
  description: string | null
  amenities: string[] | null
  images: string[] | null
  website: string | null
  university_id?: string | null
  created_at: string
  avg_rating?: number | null
  review_count?: number | null
  affiliatedUniversity?: string | null
  affiliatedUniversityName?: string | null
}

export type University = {
  id: string
  name: string
  city: string
  description: string | null
  website: string | null
  programs: string[] | null
  languages: string[] | null
  logo_url: string | null
  image_url?: string | null
  created_at: string
  avg_rating?: number | null
  review_count?: number | null
}

export type Review = {
  id: string
  user_id: string
  entity_type: 'dorm' | 'university'
  entity_id: string
  rating: number
  title: string | null
  body: string | null
  status: 'pending' | 'approved'
  media_urls: string[]
  created_at: string
  profiles?: Pick<Profile, 'username' | 'avatar_url' | 'full_name'>
}

export type Question = {
  id: string
  user_id: string
  title: string
  body: string | null
  category: string | null
  views: number
  created_at: string
  profiles?: Pick<Profile, 'username' | 'avatar_url' | 'full_name'>
  answer_count?: number
}

export type Answer = {
  id: string
  question_id: string
  user_id: string
  body: string
  is_accepted: boolean
  created_at: string
  profiles?: Pick<Profile, 'username' | 'avatar_url' | 'full_name'>
}

export type Guide = {
  id: string
  title: string
  category: string | null
  body: string | null
  author_id: string | null
  updated_at: string
  created_at: string
}

export type Scholarship = {
  id: string
  name: string
  type: string | null
  deadline: string | null
  description: string | null
  featured: boolean
  link: string | null
  created_at: string
}
