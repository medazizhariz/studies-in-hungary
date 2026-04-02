-- =============================================
-- Seed Data — run AFTER schema.sql
-- =============================================

-- UNIVERSITIES
insert into public.universities (id, name, city, description, website, programs, languages) values

-- BUDAPEST
(
  'a0000001-0000-0000-0000-000000000001',
  'Eötvös Loránd University (ELTE)',
  'Budapest',
  'Hungary''s flagship research university founded in 1635. Strong programs in humanities, natural sciences, law, informatics, and social sciences. Located in the heart of Budapest.',
  'https://elte.hu',
  array['BSc', 'MSc', 'PhD', 'Law', 'Sciences', 'Humanities', 'Education'],
  array['English', 'Hungarian', 'German', 'French']
),
(
  'a0000001-0000-0000-0000-000000000002',
  'Budapest University of Technology and Economics (BME)',
  'Budapest',
  'Hungary''s leading technical university founded in 1782. Offers world-class engineering, architecture, and technology programs recognized globally.',
  'https://bme.hu',
  array['BSc', 'MSc', 'PhD', 'Architecture', 'Engineering', 'Computer Science'],
  array['English', 'Hungarian']
),
(
  'a0000001-0000-0000-0000-000000000003',
  'Corvinus University of Budapest',
  'Budapest',
  'Premier business and economics university in Central Europe. Highly ranked for business, finance, and international relations programs.',
  'https://corvinus.hu',
  array['BSc', 'MSc', 'MBA', 'PhD', 'Business', 'Finance', 'Economics'],
  array['English', 'Hungarian']
),
(
  'a0000001-0000-0000-0000-000000000004',
  'Semmelweis University',
  'Budapest',
  'Founded in 1769, Hungary''s oldest medical university. Internationally renowned for English-language medicine, dentistry, and pharmacy programs attracting students from 70+ countries.',
  'https://semmelweis.hu',
  array['MD', 'Dentistry', 'Pharmacy', 'Physiotherapy', 'PhD'],
  array['English', 'Hungarian', 'German']
),
(
  'a0000001-0000-0000-0000-000000000005',
  'Central European University (CEU)',
  'Budapest',
  'US-accredited private research university founded in 1991. Known for exceptional graduate programs in social sciences, humanities, and public policy with students from 100+ countries.',
  'https://ceu.edu',
  array['MA', 'MSc', 'PhD', 'Political Science', 'Economics', 'History', 'Public Policy'],
  array['English']
),
(
  'a0000001-0000-0000-0000-000000000006',
  'Óbuda University',
  'Budapest',
  'Leading technology and engineering university with roots dating to 1879. Excels in applied sciences, IT, and engineering with strong industry ties and high graduate employment rates.',
  'https://uni-obuda.hu',
  array['BSc', 'MSc', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Science', 'Robotics'],
  array['Hungarian', 'English']
),
(
  'a0000001-0000-0000-0000-000000000007',
  'Budapest Metropolitan University (METU)',
  'Budapest',
  'Hungary''s leading private university specializing in creative industries, tourism, business, and communication. Known for practical, industry-focused programs.',
  'https://metropolitan.hu',
  array['BSc', 'MSc', 'Design', 'Tourism Management', 'Business Administration', 'Communication'],
  array['Hungarian', 'English']
),
(
  'a0000001-0000-0000-0000-000000000008',
  'Pázmány Péter Catholic University (PPKE)',
  'Budapest',
  'Hungary''s leading Catholic university co-founded in 1635. Excels in theology, law, humanities, and information technology with a strong emphasis on ethical education.',
  'https://ppke.hu',
  array['BSc', 'MSc', 'PhD', 'Law', 'Information Technology', 'Theology', 'Psychology'],
  array['Hungarian', 'English']
),
(
  'a0000001-0000-0000-0000-000000000009',
  'University of Veterinary Medicine Budapest',
  'Budapest',
  'One of the oldest veterinary schools in the world, founded in 1787. Offers a prestigious English-language Doctor of Veterinary Medicine program.',
  'https://univet.hu',
  array['DVM', 'Veterinary Nursing', 'Animal Science'],
  array['Hungarian', 'English']
),
(
  'a0000001-0000-0000-0000-000000000010',
  'Liszt Ferenc Academy of Music',
  'Budapest',
  'Founded in 1875 by Franz Liszt himself, one of the world''s most prestigious conservatories. Its stunning Art Nouveau building hosts programs taught by world-class musicians.',
  'https://lfze.hu',
  array['Piano', 'Composition', 'Conducting', 'Opera', 'Music Theory', 'Orchestral Instruments'],
  array['Hungarian', 'English']
),

-- DEBRECEN
(
  'a0000002-0000-0000-0000-000000000001',
  'University of Debrecen',
  'Debrecen',
  'The largest university in Hungary by student enrollment, offering a wide range of programs. The Medical and Health Science Center is internationally accredited.',
  'https://unideb.hu',
  array['BSc', 'MSc', 'MD', 'PhD', 'Medicine', 'Engineering', 'Business', 'Agriculture'],
  array['English', 'Hungarian']
),
(
  'a0000002-0000-0000-0000-000000000002',
  'Debrecen Reformed Theological University',
  'Debrecen',
  'One of Hungary''s oldest institutions of higher education, founded in the 16th century. Offers theology, social work, and religious education programs in a historic setting.',
  'https://drhe.hu',
  array['Theology', 'Social Work', 'Religious Education', 'PhD'],
  array['Hungarian', 'English']
),
(
  'a0000002-0000-0000-0000-000000000003',
  'Hungarian Dance Academy — Debrecen Campus',
  'Debrecen',
  'The regional campus of Hungary''s premier dance academy, offering classical ballet, contemporary dance, and folk dance programs in partnership with the University of Debrecen.',
  'https://mte.eu',
  array['Classical Ballet', 'Contemporary Dance', 'Folk Dance', 'Dance Pedagogy'],
  array['Hungarian', 'English']
),

-- PÉCS
(
  'a0000003-0000-0000-0000-000000000001',
  'University of Pécs',
  'Pécs',
  'One of Hungary''s oldest universities, founded in 1367. Particularly renowned for its Medical School which attracts thousands of international students each year.',
  'https://pte.hu',
  array['BSc', 'MSc', 'MD', 'PhD', 'Medicine', 'Dentistry', 'Pharmacy', 'Law'],
  array['English', 'Hungarian', 'German']
),
(
  'a0000003-0000-0000-0000-000000000002',
  'Pécsi Püspöki Hittudományi Főiskola (Pécs Diocesan Seminary)',
  'Pécs',
  'Historic Catholic seminary and theological institution in Pécs, offering theology and religious studies programs with a deep connection to the city''s Catholic heritage.',
  'https://pphf.hu',
  array['Theology', 'Religious Studies', 'Philosophy'],
  array['Hungarian']
),

-- SZEGED
(
  'a0000004-0000-0000-0000-000000000001',
  'University of Szeged',
  'Szeged',
  'One of Hungary''s oldest and most prestigious universities, consistently ranked among the top universities in Central Europe. Known for natural sciences, medicine, law, and humanities.',
  'https://u-szeged.hu/english',
  array['BSc', 'MSc', 'MD', 'PhD', 'Medicine', 'Computer Science', 'Biology', 'Chemistry', 'Law'],
  array['Hungarian', 'English']
),
(
  'a0000004-0000-0000-0000-000000000002',
  'Gál Ferenc University',
  'Szeged',
  'A Catholic higher education institution in Szeged with strong roots in agricultural sciences and theology. Offers programs in agriculture, economy, pedagogy, and social work.',
  'https://gfu.hu',
  array['Agriculture', 'Economics', 'Pedagogy', 'Social Work', 'Theology'],
  array['Hungarian']
),

-- MISKOLC
(
  'a0000005-0000-0000-0000-000000000001',
  'University of Miskolc',
  'Miskolc',
  'Traces its roots to a 1735 mining academy. Comprehensive technical and humanities university known for engineering, materials science, law, and economics at very affordable prices.',
  'https://uni-miskolc.hu/en',
  array['BSc', 'MSc', 'PhD', 'Mechanical Engineering', 'Computer Science', 'Materials Science', 'Law', 'Economics'],
  array['Hungarian', 'English']
),
(
  'a0000005-0000-0000-0000-000000000002',
  'Miskolci Egyetem — Bartók Béla Zeneművészeti Intézet',
  'Miskolc',
  'The music conservatory of the University of Miskolc, offering music performance, composition, and music teacher training programs. Named after the celebrated Hungarian composer Béla Bartók.',
  'https://uni-miskolc.hu',
  array['Music Performance', 'Composition', 'Music Teacher Training'],
  array['Hungarian']
),

-- GYŐR
(
  'a0000006-0000-0000-0000-000000000001',
  'Széchenyi István University',
  'Győr',
  'Hungary''s leading technical university outside Budapest, with strong partnerships with Audi Hungária and major manufacturers. Cutting-edge engineering, business, and IT programs.',
  'https://sze.hu/en',
  array['BSc', 'MSc', 'PhD', 'Mechanical Engineering', 'Electrical Engineering', 'Computer Science', 'Business'],
  array['Hungarian', 'English', 'German']
),
(
  'a0000006-0000-0000-0000-000000000002',
  'Győr-Moson-Sopron County Esterházy Károly Catholic University',
  'Győr',
  'A Catholic university with campuses across western Hungary, offering programs in theology, pedagogy, business, and social sciences with a strong focus on community and ethical values.',
  'https://uni-eszterhazy.hu',
  array['Theology', 'Pedagogy', 'Business Administration', 'Social Sciences'],
  array['Hungarian']
),

-- SOPRON
(
  'a0000007-0000-0000-0000-000000000001',
  'University of Sopron',
  'Sopron',
  'Located near the Austrian border, renowned for forestry, wood sciences, and geomatics. Unique specialized programs in a picturesque medieval city with easy access to Vienna.',
  'https://uni-sopron.hu/en',
  array['BSc', 'MSc', 'PhD', 'Forestry', 'Wood Technology', 'Geomatics', 'Pedagogy', 'Economics'],
  array['Hungarian', 'English', 'German']
),
(
  'a0000007-0000-0000-0000-000000000002',
  'Soproni Egyetem — Lámfalussy Sándor Institute',
  'Sopron',
  'The economics and finance faculty of the University of Sopron, offering banking, finance, and economics programs. Named after the distinguished Hungarian economist Alexandre Lamfalussy.',
  'https://uni-sopron.hu/en',
  array['Finance', 'Banking', 'Economics', 'Business Administration'],
  array['Hungarian', 'English']
);

-- DORMS
insert into public.dorms (name, city, address, price_min, price_max, description, amenities, images, website, university_id) values
(
  'Erasmus Student Village',
  'Budapest',
  'Üllői út 22, 1082 Budapest',
  250, 320,
  'Modern student village near the city center, popular with Erasmus and Stipendium Hungaricum students. Offers single and shared rooms with excellent common areas.',
  array['Wi-Fi', 'Laundry', 'Gym', 'Study Rooms', 'Kitchen', '24/7 Security'],
  array['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  'https://erasmusstudentvillage.com',
  null
),
(
  'UniHouse Debrecen',
  'Debrecen',
  'Kassai út 26, 4028 Debrecen',
  150, 200,
  'Affordable student accommodation close to the University of Debrecen campus. Great value for money with a friendly international community.',
  array['Wi-Fi', 'Laundry', 'Cafeteria', 'Study Rooms', 'Bike Storage'],
  array['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
  null,
  'a0000002-0000-0000-0000-000000000001'
),
(
  'Campus Towers Pécs',
  'Pécs',
  'Rét u. 2, 7622 Pécs',
  180, 240,
  'Located just a 5-minute walk from the University of Pécs Medical School. Modern facilities with a vibrant international student community.',
  array['Wi-Fi', 'Gym', 'Swimming Pool', 'Laundry', '24/7 Reception', 'Parking'],
  array['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'],
  null,
  'a0000003-0000-0000-0000-000000000001'
),
(
  'ELTE International Dormitory',
  'Budapest',
  'Ménesi út 11-13, 1118 Budapest',
  200, 280,
  'Official dormitory for ELTE University students. Nestled in the Buda hills with easy access to the city via tram.',
  array['Wi-Fi', 'Library', 'Study Rooms', 'Garden', 'Laundry', 'Kitchen'],
  array['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  'https://elte.hu',
  'a0000001-0000-0000-0000-000000000001'
),
(
  'Budapest Student Housing',
  'Budapest',
  'Váci út 88, 1133 Budapest',
  300, 420,
  'Premium student housing in the 13th district, close to metro and tram lines. Private rooms with en-suite bathrooms.',
  array['Wi-Fi', 'Gym', 'Rooftop Terrace', 'Co-working Space', 'Laundry', 'Cleaning Service'],
  array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
  null,
  null
),
(
  'BME Schönherz Dormitory',
  'Budapest',
  'Irinyi József utca 42, 1117 Budapest',
  110, 170,
  'One of the most well-known and lively dormitories in Budapest, affiliated with BME. Famous for active student clubs, cultural events, and a vibrant community life.',
  array['Wi-Fi', 'Gym', 'Restaurant', 'Common Room', 'Study Room', 'Laundry', 'Music Room'],
  array['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  null,
  'a0000001-0000-0000-0000-000000000002'
),
(
  'Corvinus Dormitory',
  'Budapest',
  'Villányi út 11-13, 1114 Budapest',
  190, 260,
  'University-affiliated housing for Corvinus students, conveniently located near the main campus on the Danube embankment.',
  array['Wi-Fi', 'Study Rooms', 'Laundry', 'Kitchen', 'Bicycle Storage'],
  array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
  null,
  'a0000001-0000-0000-0000-000000000003'
),
(
  'Semmelweis Medical Dormitory',
  'Budapest',
  'Nagyvárad tér 4, 1089 Budapest',
  180, 250,
  'Student residence specifically catering to medical students of Semmelweis University, located next to the main medical campus.',
  array['Wi-Fi', 'Study Rooms', 'Laundry', 'Cafeteria', '24/7 Security', 'Kitchen'],
  array['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  null,
  'a0000001-0000-0000-0000-000000000004'
),
(
  'Debrecen Medical Student House',
  'Debrecen',
  'Nagyerdei krt. 94, 4032 Debrecen',
  140, 190,
  'Student residence adjacent to the University of Debrecen Medical Campus. Popular with international medical students for its proximity to the faculty buildings.',
  array['Wi-Fi', 'Laundry', 'Study Rooms', 'Kitchen', 'Gym'],
  array['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
  null,
  'a0000002-0000-0000-0000-000000000001'
),
(
  'Pécs City Student Residence',
  'Pécs',
  'Szigeti út 12, 7624 Pécs',
  160, 220,
  'Centrally located student residence in Pécs, easily accessible to all university faculties. Modern rooms with good common facilities.',
  array['Wi-Fi', 'Laundry', 'Study Rooms', 'Cafeteria', 'Parking'],
  array['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'],
  null,
  null
),
(
  'Szeged University Dormitory',
  'Szeged',
  'Tisza Lajos krt. 103, 6722 Szeged',
  130, 180,
  'Central dormitory of the University of Szeged located on the main boulevard. Offers comfortable rooms at affordable prices in a lively student city.',
  array['Wi-Fi', 'Laundry', 'Cafeteria', 'Study Rooms', 'Common Room'],
  array['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  null,
  'a0000004-0000-0000-0000-000000000001'
),
(
  'Szeged International Student House',
  'Szeged',
  'Petőfi Sándor sgt. 30-34, 6722 Szeged',
  140, 200,
  'Modern accommodation dedicated to international students at the University of Szeged. Excellent support services and a welcoming multicultural community.',
  array['Wi-Fi', 'Gym', 'Study Rooms', 'Laundry', 'Kitchen', '24/7 Security'],
  array['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
  null,
  'a0000004-0000-0000-0000-000000000001'
),
(
  'Miskolc Campus Residence',
  'Miskolc',
  'Egyetemváros, 3515 Miskolc',
  100, 150,
  'On-campus dormitory at the University of Miskolc. One of the most affordable student accommodations in Hungary, set within a green university campus.',
  array['Wi-Fi', 'Laundry', 'Canteen', 'Study Rooms', 'Sports Facilities'],
  array['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  null,
  'a0000005-0000-0000-0000-000000000001'
),
(
  'Győr SZE Student Village',
  'Győr',
  'Egyetem tér 1, 9026 Győr',
  140, 200,
  'Modern student village on the Széchenyi István University campus. Well-equipped facilities with strong connections to the Audi industrial partners nearby.',
  array['Wi-Fi', 'Laundry', 'Cafeteria', 'Gym', 'Study Rooms', 'Bicycle Storage'],
  array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
  null,
  'a0000006-0000-0000-0000-000000000001'
),
(
  'Sopron Forestry Dormitory',
  'Sopron',
  'Bajcsy-Zsilinszky utca 4, 9400 Sopron',
  110, 160,
  'Traditional dormitory affiliated with the University of Sopron''s Forestry Faculty. Located near the historic city center with easy access to forests for fieldwork.',
  array['Wi-Fi', 'Laundry', 'Study Rooms', 'Kitchen', 'Bicycle Storage'],
  array['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  null,
  'a0000007-0000-0000-0000-000000000001'
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
