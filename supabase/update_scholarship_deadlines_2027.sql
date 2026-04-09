-- Update scholarship deadlines to next year (2027)
-- Run this in your Supabase SQL editor

UPDATE public.scholarships SET deadline = '2027-01-15' WHERE name ILIKE '%Stipendium Hungaricum%';
UPDATE public.scholarships SET deadline = '2027-01-31' WHERE name ILIKE '%Diaspora%';
UPDATE public.scholarships SET deadline = '2026-10-31' WHERE name ILIKE '%CEEPUS%' AND deadline::text ILIKE '%10-%';
UPDATE public.scholarships SET deadline = '2027-06-15' WHERE name ILIKE '%CEEPUS%' AND deadline::text ILIKE '%06-%';

-- Push all remaining 2026 deadlines forward by one year
UPDATE public.scholarships
SET deadline = (deadline + interval '1 year')::date
WHERE deadline IS NOT NULL
  AND deadline < '2027-01-01'
  AND deadline > '2026-01-01';
