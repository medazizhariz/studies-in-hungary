-- =============================================
-- Migration: Fix reviews.entity_id type
-- Run this in your Supabase SQL Editor
-- =============================================
--
-- Why: Static universities/dorms use string IDs (e.g. 'elte', 'bme').
-- The reviews table previously required a UUID for entity_id, causing all
-- reviews on static entity pages to silently fail with a type error.
-- Changing to TEXT supports both UUID (DB entities) and string (static entities).

ALTER TABLE public.reviews ALTER COLUMN entity_id TYPE text;

-- The unique index is automatically rebuilt when the column type changes.
-- If you get an error about the index, drop and recreate it manually:
-- DROP INDEX IF EXISTS reviews_one_per_user;
-- CREATE UNIQUE INDEX reviews_one_per_user ON public.reviews(user_id, entity_type, entity_id);
