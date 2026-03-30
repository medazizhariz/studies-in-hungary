-- =============================================
-- Seed Data — run AFTER schema.sql
-- =============================================

-- DORMS
insert into public.dorms (name, city, address, price_min, price_max, description, amenities, images, website) values
(
  'Erasmus Student Village',
  'Budapest',
  'Üllői út 22, 1082 Budapest',
  250, 320,
  'Modern student village near the city center, popular with Erasmus and Stipendium Hungaricum students. Offers single and shared rooms with excellent common areas.',
  array['Wi-Fi', 'Laundry', 'Gym', 'Study Rooms', 'Kitchen', '24/7 Security'],
  array['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  'https://erasmusstudentvillage.com'
),
(
  'UniHouse Debrecen',
  'Debrecen',
  'Kassai út 26, 4028 Debrecen',
  150, 200,
  'Affordable student accommodation close to the University of Debrecen campus. Great value for money with a friendly international community.',
  array['Wi-Fi', 'Laundry', 'Cafeteria', 'Study Rooms', 'Bike Storage'],
  array['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
  null
),
(
  'Campus Towers Pécs',
  'Pécs',
  'Rét u. 2, 7622 Pécs',
  180, 240,
  'Located just a 5-minute walk from the University of Pécs Medical School. Modern facilities with a vibrant international student community.',
  array['Wi-Fi', 'Gym', 'Swimming Pool', 'Laundry', '24/7 Reception', 'Parking'],
  array['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'],
  null
),
(
  'ELTE International Dormitory',
  'Budapest',
  'Ménesi út 11-13, 1118 Budapest',
  200, 280,
  'Official dormitory for ELTE University students. Nestled in the Buda hills with easy access to the city via tram.',
  array['Wi-Fi', 'Library', 'Study Rooms', 'Garden', 'Laundry', 'Kitchen'],
  array['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  'https://elte.hu'
),
(
  'Budapest Student Housing',
  'Budapest',
  'Váci út 88, 1133 Budapest',
  300, 420,
  'Premium student housing in the 13th district, close to metro and tram lines. Private rooms with en-suite bathrooms.',
  array['Wi-Fi', 'Gym', 'Rooftop Terrace', 'Co-working Space', 'Laundry', 'Cleaning Service'],
  array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
  null
);

-- UNIVERSITIES
insert into public.universities (name, city, description, website, programs, languages) values
(
  'Budapest University of Technology and Economics',
  'Budapest',
  'Hungary''s leading technical university founded in 1782. Offers world-class engineering, architecture, and technology programs recognized globally. Strong research focus with industry partnerships.',
  'https://bme.hu',
  array['BSc', 'MSc', 'PhD', 'Architecture', 'Engineering', 'Computer Science'],
  array['English', 'Hungarian']
),
(
  'University of Pécs',
  'Pécs',
  'One of Hungary''s oldest universities, founded in 1367. Particularly renowned for its Medical School which attracts thousands of international students each year.',
  'https://pte.hu',
  array['BSc', 'MSc', 'MD', 'PhD', 'Medicine', 'Dentistry', 'Pharmacy', 'Law'],
  array['English', 'Hungarian', 'German']
),
(
  'University of Debrecen',
  'Debrecen',
  'The largest university in Hungary by student enrollment, offering a wide range of programs. The Medical and Health Science Center is internationally accredited.',
  'https://unideb.hu',
  array['BSc', 'MSc', 'MD', 'PhD', 'Medicine', 'Engineering', 'Business', 'Agriculture'],
  array['English', 'Hungarian']
),
(
  'Eötvös Loránd University (ELTE)',
  'Budapest',
  'Hungary''s flagship research university founded in 1635. Strong programs in humanities, natural sciences, and social sciences. Located in the heart of Budapest.',
  'https://elte.hu',
  array['BSc', 'MSc', 'PhD', 'Law', 'Sciences', 'Humanities', 'Education'],
  array['English', 'Hungarian', 'German', 'French']
),
(
  'Corvinus University of Budapest',
  'Budapest',
  'Premier business and economics university in Central Europe. Highly ranked for business, finance, and international relations programs.',
  'https://corvinus.hu',
  array['BSc', 'MSc', 'MBA', 'PhD', 'Business', 'Finance', 'Economics'],
  array['English', 'Hungarian']
);

-- SCHOLARSHIPS
insert into public.scholarships (name, type, deadline, description, featured, link) values
(
  'Stipendium Hungaricum',
  'Government',
  '2026-01-15',
  'Hungary''s flagship scholarship program for international students. Covers full tuition fees, monthly stipend of €300–€430, free accommodation, and health insurance. Open to students from 70+ partner countries.',
  true,
  'https://stipendiumhungaricum.hu'
),
(
  'Erasmus+ Study Mobility',
  'EU',
  '2026-03-01',
  'EU-funded 3–12 month study mobility grant. Receive €300–€700/month plus travel allowance. Apply through your home institution''s Erasmus office.',
  true,
  'https://erasmus-plus.ec.europa.eu'
),
(
  'Hungarian Diaspora Scholarship',
  'Government',
  '2026-02-15',
  'For students of Hungarian descent living abroad. Covers tuition fees and includes a monthly living allowance. Requires proof of Hungarian heritage.',
  false,
  'https://scholarship.hu'
),
(
  'Central European University Scholarship',
  'University',
  '2026-02-01',
  'Merit-based scholarship for CEU graduate programs in Vienna and Budapest. Covers partial or full tuition.',
  false,
  'https://ceu.edu'
),
(
  'CEEPUS Network Grant',
  'EU',
  '2026-10-31',
  'Central European Exchange Program for University Studies. Mobility grants for students in 13 Central European countries. Apply for 1–10 month exchange.',
  false,
  'https://ceepus.info'
);

-- Q&A Questions (no user_id since these are seed data — use after creating a test user)
-- Guides
insert into public.guides (title, category, body) values
(
  'Hungarian Student Visa: Complete Step-by-Step Guide',
  'Visa Application',
  'Getting a student visa for Hungary requires careful preparation. Here is everything you need to know...'
),
(
  'Opening a Bank Account in Hungary: Best Options for Students',
  'Bank Accounts',
  'As an international student, you will need a Hungarian bank account. OTP Bank and Revolut are the most popular choices...'
),
(
  'First Week in Hungary: Complete Arrival Checklist',
  'Arrival Checklist',
  'Congratulations on arriving in Hungary! Here is your complete checklist for the first week...'
),
(
  'Finding Affordable Housing as an International Student',
  'Housing',
  'Besides university dormitories, there are many options for student housing in Hungary...'
),
(
  'Hungarian Health Insurance: What International Students Need to Know',
  'Insurance',
  'All students studying in Hungary must have health insurance. Here is how it works...'
);
