-- ============================================================
-- Run this in the Supabase SQL Editor if reviews/answers
-- are not persisting or not showing after page refresh.
-- It is safe to run multiple times (uses IF NOT EXISTS / OR REPLACE).
-- ============================================================

-- 1. Fix entity_id type so string slugs like 'elte', 'bme' work
ALTER TABLE public.reviews ALTER COLUMN entity_id TYPE text;

-- 2. Ensure public SELECT policies exist on all content tables
--    (DROP first to avoid "already exists" errors on re-run)

-- reviews
DROP POLICY IF EXISTS "Reviews viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews viewable by everyone"
  ON public.reviews FOR SELECT USING (true);

-- answers
DROP POLICY IF EXISTS "Answers viewable by everyone" ON public.answers;
CREATE POLICY "Answers viewable by everyone"
  ON public.answers FOR SELECT USING (true);

-- questions
DROP POLICY IF EXISTS "Questions viewable by everyone" ON public.questions;
CREATE POLICY "Questions viewable by everyone"
  ON public.questions FOR SELECT USING (true);

-- profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);
