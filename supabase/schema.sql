-- =============================================
-- Studies in Hungary — Supabase Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- =============================================
-- PROFILES (extends auth.users)
-- =============================================
create table public.profiles (
  id           uuid references auth.users on delete cascade primary key,
  username     text unique,
  full_name    text,
  avatar_url   text,
  nationality  text,
  studying_at  text,
  created_at   timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- DORMS
-- =============================================
create table public.dorms (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  city        text not null,
  address     text,
  price_min   int,
  price_max   int,
  description text,
  amenities   text[],
  images      text[],
  website     text,
  created_at  timestamptz default now()
);

alter table public.dorms enable row level security;
create policy "Dorms viewable by everyone" on public.dorms for select using (true);

-- =============================================
-- UNIVERSITIES
-- =============================================
create table public.universities (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  city        text not null,
  description text,
  website     text,
  programs    text[],
  languages   text[],
  logo_url    text,
  created_at  timestamptz default now()
);

alter table public.universities enable row level security;
create policy "Universities viewable by everyone" on public.universities for select using (true);

-- =============================================
-- REVIEWS (polymorphic: dorm or university)
-- =============================================
create table public.reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  entity_type text check (entity_type in ('dorm', 'university')) not null,
  entity_id   uuid not null,
  rating      int check (rating between 1 and 5) not null,
  title       text,
  body        text,
  created_at  timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "Reviews viewable by everyone" on public.reviews for select using (true);
create policy "Authenticated users can insert reviews"
  on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users can update their own reviews"
  on public.reviews for update using (auth.uid() = user_id);
create policy "Users can delete their own reviews"
  on public.reviews for delete using (auth.uid() = user_id);

-- One review per user per entity
create unique index reviews_one_per_user
  on public.reviews(user_id, entity_type, entity_id);

-- =============================================
-- QUESTIONS
-- =============================================
create table public.questions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  title      text not null,
  body       text,
  category   text,
  views      int default 0,
  created_at timestamptz default now()
);

alter table public.questions enable row level security;

create policy "Questions viewable by everyone" on public.questions for select using (true);
create policy "Authenticated users can post questions"
  on public.questions for insert with check (auth.uid() = user_id);
create policy "Users can update their own questions"
  on public.questions for update using (auth.uid() = user_id);

-- =============================================
-- ANSWERS
-- =============================================
create table public.answers (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid references public.questions(id) on delete cascade not null,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  body        text not null,
  is_accepted boolean default false,
  created_at  timestamptz default now()
);

alter table public.answers enable row level security;

create policy "Answers viewable by everyone" on public.answers for select using (true);
create policy "Authenticated users can post answers"
  on public.answers for insert with check (auth.uid() = user_id);
create policy "Users can update their own answers"
  on public.answers for update using (auth.uid() = user_id);
-- Question owner can accept answers
create policy "Question owner can accept answers"
  on public.answers for update
  using (
    auth.uid() = user_id
    or auth.uid() = (select user_id from public.questions where id = question_id)
  );

-- =============================================
-- GUIDES
-- =============================================
create table public.guides (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  category   text,
  body       text,
  author_id  uuid references public.profiles(id),
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.guides enable row level security;
create policy "Guides viewable by everyone" on public.guides for select using (true);

-- =============================================
-- SCHOLARSHIPS
-- =============================================
create table public.scholarships (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        text,
  deadline    date,
  description text,
  featured    boolean default false,
  link        text,
  created_at  timestamptz default now()
);

alter table public.scholarships enable row level security;
create policy "Scholarships viewable by everyone" on public.scholarships for select using (true);
