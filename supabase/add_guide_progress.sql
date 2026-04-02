-- =============================================
-- Guide Progress — run this in Supabase SQL Editor
-- Persists per-user, per-guide step completions
-- =============================================

create table if not exists public.guide_progress (
  user_id    uuid references public.profiles(id) on delete cascade not null,
  guide_id   text not null,
  step_id    text not null,
  updated_at timestamptz default now(),
  primary key (user_id, guide_id, step_id)
);

alter table public.guide_progress enable row level security;

create policy "Users can view their own progress"
  on public.guide_progress for select using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.guide_progress for insert with check (auth.uid() = user_id);

create policy "Users can delete their own progress"
  on public.guide_progress for delete using (auth.uid() = user_id);
