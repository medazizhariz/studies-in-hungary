-- Fix: change entity_id from uuid to text so slug-based IDs (e.g. "elte", "bme") work
-- Run this in the Supabase SQL Editor

ALTER TABLE public.reviews ALTER COLUMN entity_id TYPE text;
