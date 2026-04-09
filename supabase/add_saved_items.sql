-- =============================================
-- SAVED ITEMS
-- =============================================
create table if not exists public.saved_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  item_type   text not null check (item_type in ('university', 'dorm', 'guide')),
  item_id     text not null,
  item_name   text,
  created_at  timestamptz default now() not null,
  unique (user_id, item_type, item_id)
);

alter table public.saved_items enable row level security;

create policy "Users can view their own saved items"
  on public.saved_items for select
  using (auth.uid() = user_id);

create policy "Users can save items"
  on public.saved_items for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved items"
  on public.saved_items for delete
  using (auth.uid() = user_id);
