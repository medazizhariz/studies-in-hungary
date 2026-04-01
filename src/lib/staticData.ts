// ─── Static fallback data (shown when Supabase is not yet seeded) ────────────

export type StaticReview = {
  id: string
  name: string
  rating: number
  title: string
  body: string
  date: string
}

export type FacultyLink = { name: string; url: string }

export type StaticUniversity = {
  id: string
  name: string
  abbreviation: string
  city: string
  founded: number
  description: string
  faculties: string[]
  facultyLinks: FacultyLink[]
  programs: string[]
  degree_levels: string[]
  languages: string[]
  website: string
  logo_url: string | null
  images: string[]
  imageCaptions?: string[]
  avg_rating: number
  review_count: number
  reviews: StaticReview[]
}

export type StaticScholarship = {
  id: string
  name: string
  type: 'Government' | 'EU' | 'University' | 'Regional'
  description: string
  coverage: string
  eligibility: string
  deadline: string
  featured: boolean
  link: string
}

export type StaticDorm = {
  id: string
  name: string
  city: string
  address: string
  price_min: number
  price_max: number
  description: string
  distance: string
  amenities: string[]
  images: string[]
  imageCaptions?: string[]
  affiliatedUniversity?: string
  website: string | null
  avg_rating: number
  review_count: number
  reviews: StaticReview[]
}

export type StaticQA = {
  id: string
  title: string
  body: string
  category: string
  views: number
  upvotes: number
  answer: string
  date: string
}

export type StaticGuideStep = {
  id: string
  label: string
  detail?: string
}

export type StaticGuide = {
  id: string
  title: string
  category: string
  icon: string
  description: string
  steps: StaticGuideStep[]
}

// ─── UNIVERSITIES ─────────────────────────────────────────────────────────────

export const STATIC_UNIVERSITIES: StaticUniversity[] = [
  {
    id: 'elte',
    name: 'Eötvös Loránd University',
    abbreviation: 'ELTE',
    city: 'Budapest',
    founded: 1635,
    description: "Founded in 1635, ELTE is Hungary's largest and most prestigious university with over 30,000 students. It offers world-class programs across humanities, sciences, law, informatics, and social sciences, and is consistently ranked among the top universities in Central Europe.",
    faculties: ['Faculty of Law', 'Faculty of Science', 'Faculty of Humanities', 'Faculty of Informatics', 'Faculty of Pedagogy and Psychology', 'Faculty of Social Sciences', 'Faculty of Education and Psychology'],
    programs: ['Law', 'Computer Science', 'Biology', 'Physics', 'Psychology', 'Sociology', 'History', 'English Studies'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://www.elte.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Egyetemi_K%C3%B6nyvt%C3%A1r1.JPG/800px-Egyetemi_K%C3%B6nyvt%C3%A1r1.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Egyetemi_K%C3%B6nyvt%C3%A1r2.JPG/800px-Egyetemi_K%C3%B6nyvt%C3%A1r2.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Egyetemi_K%C3%B6nyvt%C3%A1r3.JPG/800px-Egyetemi_K%C3%B6nyvt%C3%A1r3.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/ELTE_Lágymányos_campus.jpg/800px-ELTE_Lágymányos_campus.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Elte_btkepulet.jpg/800px-Elte_btkepulet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ELTE_IK_Pazm%C3%A1ny_P%C3%A9ter_s%C3%A9t%C3%A1ny.jpg/800px-ELTE_IK_Pazm%C3%A1ny_P%C3%A9ter_s%C3%A9t%C3%A1ny.jpg',
    ],
    imageCaptions: [
      'University Library — Faculty of Law & Humanities',
      'University Library — Historic Exterior',
      'University Library — Reading Room Interior',
      'Lágymányos Campus — Faculty of Science & Informatics',
      'Faculty of Humanities (BTK) Building',
      'Faculty of Informatics — Pázmány Péter sétány',
    ],
    facultyLinks: [
      { name: 'Faculty of Law', url: 'https://ajk.elte.hu' },
      { name: 'Faculty of Science', url: 'https://ttk.elte.hu' },
      { name: 'Faculty of Humanities', url: 'https://btk.elte.hu' },
      { name: 'Faculty of Informatics', url: 'https://inf.elte.hu' },
      { name: 'Faculty of Pedagogy and Psychology', url: 'https://ppk.elte.hu' },
      { name: 'Faculty of Social Sciences', url: 'https://tatk.elte.hu' },
      { name: 'Faculty of Education and Psychology', url: 'https://ppk.elte.hu' },
    ],
    avg_rating: 4.6,
    review_count: 3,
    reviews: [
      { id: 'er1', name: 'Maria S.', rating: 5, title: 'World-class education', body: 'ELTE has been an incredible experience. The Faculty of Science is top-notch and the city makes it all the better. Research opportunities are abundant.', date: '2024-09-15' },
      { id: 'er2', name: 'Ahmed K.', rating: 4, title: 'Great programs, bureaucracy can be slow', body: 'The quality of education is excellent but administrative processes take time. The campus is beautiful and Budapest is a great student city.', date: '2024-07-22' },
      { id: 'er3', name: 'Julia P.', rating: 5, title: 'Best decision of my life', body: 'Studying Law at ELTE has been amazing. The professors are experienced practitioners and the international student community is very welcoming.', date: '2024-03-10' },
    ],
  },
  {
    id: 'bme',
    name: 'Budapest University of Technology and Economics',
    abbreviation: 'BME',
    city: 'Budapest',
    founded: 1782,
    description: "Established in 1782, BME is one of the oldest technical universities in Europe and Hungary's most prestigious engineering institution. It offers cutting-edge programs in engineering, architecture, and natural sciences, producing world-class graduates sought after by top employers globally.",
    faculties: ['Faculty of Civil Engineering', 'Faculty of Mechanical Engineering', 'Faculty of Electrical Engineering', 'Faculty of Architecture', 'Faculty of Chemical Technology', 'Faculty of Economic and Social Sciences', 'Faculty of Transportation Engineering'],
    programs: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Architecture', 'Chemical Engineering', 'Computer Engineering', 'Finance'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://www.bme.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/BME_K_building.png/800px-BME_K_building.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/BME_f%C5%91bej%C3%A1rat.jpg/800px-BME_f%C5%91bej%C3%A1rat.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Panorama_BME.jpg/800px-Panorama_BME.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/BME_E_epulet.jpg/800px-BME_E_epulet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/BME_Lagymanyos_campus.jpg/800px-BME_Lagymanyos_campus.jpg',
    ],
    imageCaptions: [
      'Faculty of Electrical Engineering (K Building)',
      'Main Entrance — Central Building',
      'Campus Panoramic View from the Danube',
      'Faculty of Civil Engineering (E Building)',
      'Lágymányos Campus — Riverside',
    ],
    facultyLinks: [
      { name: 'Faculty of Civil Engineering', url: 'https://www.emk.bme.hu' },
      { name: 'Faculty of Mechanical Engineering', url: 'https://www.gpk.bme.hu' },
      { name: 'Faculty of Electrical Engineering', url: 'https://www.vik.bme.hu' },
      { name: 'Faculty of Architecture', url: 'https://www.epk.bme.hu' },
      { name: 'Faculty of Chemical Technology', url: 'https://www.vbk.bme.hu' },
      { name: 'Faculty of Economic and Social Sciences', url: 'https://www.gtk.bme.hu' },
      { name: 'Faculty of Transportation Engineering', url: 'https://www.kjk.bme.hu' },
    ],
    avg_rating: 4.4,
    review_count: 3,
    reviews: [
      { id: 'er4', name: 'Luca T.', rating: 5, title: 'Rigorous but rewarding', body: 'BME is not easy but the quality of education is outstanding. My Computer Engineering degree is recognized worldwide. The campus facilities are excellent.', date: '2024-11-01' },
      { id: 'er5', name: 'Omar A.', rating: 4, title: 'Strong engineering tradition', body: 'Great reputation globally. The workload is heavy but professors are supportive. Budapest makes student life very enjoyable between exam periods.', date: '2024-08-18' },
      { id: 'er6', name: 'Sophie M.', rating: 4, title: 'Architecture degree worth every penny', body: 'The Faculty of Architecture has a perfect studio culture and inspiring professors. Budapest itself is a living museum of architecture.', date: '2024-05-30' },
    ],
  },
  {
    id: 'corvinus',
    name: 'Corvinus University of Budapest',
    abbreviation: 'Corvinus',
    city: 'Budapest',
    founded: 1948,
    description: "Corvinus is Hungary's leading institution for business, economics, and social sciences. Its downtown Budapest campus and strong industry connections make it the top choice for students pursuing careers in business, finance, and international relations.",
    faculties: ['Faculty of Economics', 'Faculty of Business Administration', 'Faculty of Social Sciences and International Relations'],
    programs: ['Economics', 'Business Administration', 'Finance', 'International Relations', 'Marketing', 'Political Science', 'Sociology'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://www.uni-corvinus.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Face_of_Corvinus_University_at_Night.JPG/800px-Face_of_Corvinus_University_at_Night.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Corvinus_foepulet.jpg/800px-Corvinus_foepulet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Budapesti_Corvinus_Egyetem_%C3%BAj_%C3%A9p%C3%BClete_corrected%26cropped.jpg/800px-Budapesti_Corvinus_Egyetem_%C3%BAj_%C3%A9p%C3%BClete_corrected%26cropped.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Corvinus_University_Fovam_ter.jpg/800px-Corvinus_University_Fovam_ter.jpg',
    ],
    imageCaptions: [
      'Main Building at Night — Fővám tér',
      'Main Building Facade — Faculty of Economics',
      'Faculty of Business Administration — New Building',
      'Historic Main Building — Fővám tér Campus',
    ],
    facultyLinks: [
      { name: 'Faculty of Economics', url: 'https://www.uni-corvinus.hu/en/faculties-and-institutes/faculty-of-economics/' },
      { name: 'Faculty of Business Administration', url: 'https://www.uni-corvinus.hu/en/faculties-and-institutes/faculty-of-business-administration/' },
      { name: 'Faculty of Social Sciences and International Relations', url: 'https://www.uni-corvinus.hu/en/faculties-and-institutes/faculty-of-social-sciences-and-international-relations/' },
    ],
    avg_rating: 4.3,
    review_count: 3,
    reviews: [
      { id: 'er7', name: 'Elena V.', rating: 5, title: 'Best business school in Central Europe', body: 'Corvinus has a fantastic reputation in business. Great alumni network, regular industry events, and the campus is stunning. Finance program is excellent.', date: '2024-10-12' },
      { id: 'er8', name: 'David L.', rating: 4, title: 'Strong academic reputation', body: 'The MSc in International Business has been very practical. Lots of case studies and real business projects. Location in Budapest is a huge plus.', date: '2024-06-05' },
      { id: 'er9', name: 'Fatima B.', rating: 4, title: 'Great for networking', body: 'The alumni network is strong and professors often bring in industry guests. International student community is very active here.', date: '2024-02-28' },
    ],
  },
  {
    id: 'semmelweis',
    name: 'Semmelweis University',
    abbreviation: 'SE',
    city: 'Budapest',
    founded: 1769,
    description: "Semmelweis University, founded in 1769, is the oldest medical university in Hungary and one of the top medical schools in Central Europe. Renowned for its English-language medical programs, it attracts thousands of international students annually from over 70 countries.",
    faculties: ['Faculty of Medicine', 'Faculty of Dentistry', 'Faculty of Pharmacy', 'Faculty of Health Sciences'],
    programs: ['General Medicine', 'Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing', 'Public Health'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English', 'German'],
    website: 'https://semmelweis.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Nagyvarad_ter_uvegfal.jpg/800px-Nagyvarad_ter_uvegfal.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Basic_medical_science_center_aula%2C_Semmelweis_University%2C_Budapest.jpg/800px-Basic_medical_science_center_aula%2C_Semmelweis_University%2C_Budapest.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fogorvostudom%C3%A1nyi_Oktat%C3%A1si_Centrum.jpg/800px-Fogorvostudom%C3%A1nyi_Oktat%C3%A1si_Centrum.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Semmelweis_University_Budapest_Hungary.jpg/800px-Semmelweis_University_Budapest_Hungary.jpg',
    ],
    imageCaptions: [
      'Faculty of Medicine — Nagyvárad tér Campus (Glass Facade)',
      'Faculty of Medicine — Basic Medical Science Center Atrium',
      'Faculty of Dentistry — Educational & Clinical Center',
      'Semmelweis University — Historic Main Building',
    ],
    facultyLinks: [
      { name: 'Faculty of Medicine', url: 'https://semmelweis.hu/en/faculties/faculty-of-medicine/' },
      { name: 'Faculty of Dentistry', url: 'https://semmelweis.hu/en/faculties/faculty-of-dentistry/' },
      { name: 'Faculty of Pharmacy', url: 'https://semmelweis.hu/en/faculties/faculty-of-pharmacy/' },
      { name: 'Faculty of Health Sciences', url: 'https://semmelweis.hu/en/faculties/faculty-of-health-sciences/' },
    ],
    avg_rating: 4.7,
    review_count: 3,
    reviews: [
      { id: 'er10', name: 'Aryan P.', rating: 5, title: 'Top medical school in Europe', body: 'The English-language medicine program at Semmelweis is internationally recognized. Clinical training is excellent and Budapest is perfect for medical students.', date: '2024-09-20' },
      { id: 'er11', name: 'Nadia H.', rating: 5, title: 'Intense but incredibly rewarding', body: 'Medical school is tough everywhere but Semmelweis really prepares you well. The hospital training facilities are modern and professors are genuinely helpful.', date: '2024-07-14' },
      { id: 'er12', name: 'Carlos M.', rating: 4, title: 'Excellent for international students', body: 'Coming from abroad, the university provides great support. The English program is well organized and the diploma is recognized across Europe and beyond.', date: '2024-04-03' },
    ],
  },
  {
    id: 'ceu',
    name: 'Central European University',
    abbreviation: 'CEU',
    city: 'Budapest',
    founded: 1991,
    description: "CEU is a US-accredited private research university founded in 1991. Known for exceptional graduate programs in social sciences, humanities, and public policy, CEU attracts students from over 100 countries and is consistently ranked among Europe's top research universities.",
    faculties: ['Department of Economics', 'Department of Political Science', 'Department of Sociology', 'Department of History', 'School of Public Policy', 'Legal Studies'],
    programs: ['Economics', 'Political Science', 'International Relations', 'Gender Studies', 'History', 'Philosophy', 'Environmental Sciences'],
    degree_levels: ['Master', 'PhD'],
    languages: ['English'],
    website: 'https://www.ceu.edu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/N%C3%A1dor_Street_9%2C_CEU_building.jpg/800px-N%C3%A1dor_Street_9%2C_CEU_building.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Central_European_University._-_Frankel_Le%C3%B3_Street%2C_2016_Budapest.jpg/800px-Central_European_University._-_Frankel_Le%C3%B3_Street%2C_2016_Budapest.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/K%C3%B6z%C3%A9p-eur%C3%B3pai_Egyetem%2C_Oktober_6._utca%2C_2017_Lip%C3%B3tv%C3%A1ros.jpg/800px-K%C3%B6z%C3%A9p-eur%C3%B3pai_Egyetem%2C_Oktober_6._utca%2C_2017_Lip%C3%B3tv%C3%A1ros.jpg',
    ],
    imageCaptions: [
      'Nádor Street 9 — School of Public Policy & Departments',
      'Frankel Leó Street Campus — Graduate Buildings',
      'October 6 Street Campus — Central Library & Classrooms',
    ],
    facultyLinks: [
      { name: 'Department of Economics', url: 'https://economics.ceu.edu' },
      { name: 'Department of Political Science', url: 'https://politicalscience.ceu.edu' },
      { name: 'Department of Sociology', url: 'https://sociology.ceu.edu' },
      { name: 'Department of History', url: 'https://history.ceu.edu' },
      { name: 'School of Public Policy', url: 'https://spp.ceu.edu' },
      { name: 'Legal Studies', url: 'https://legal.ceu.edu' },
    ],
    avg_rating: 4.8,
    review_count: 3,
    reviews: [
      { id: 'er13', name: 'Simone A.', rating: 5, title: 'World-class research environment', body: 'CEU is unlike any other university. The intellectual environment is stimulating, professors are globally recognized scholars, and the international community is extraordinary.', date: '2024-11-08' },
      { id: 'er14', name: 'Kwame O.', rating: 5, title: 'Changed my worldview', body: "The MA in International Relations is rigorous and thought-provoking. You're surrounded by brilliant people from all over the world. Best decision I ever made.", date: '2024-08-25' },
      { id: 'er15', name: 'Priya R.', rating: 4, title: 'Exceptional but intense', body: 'CEU is academically intense but the quality of teaching is unmatched. The library and research resources are excellent. Cost of living in Budapest is very manageable.', date: '2024-05-17' },
    ],
  },
  {
    id: 'metu',
    name: 'Budapest Metropolitan University',
    abbreviation: 'METU',
    city: 'Budapest',
    founded: 2000,
    description: "Budapest Metropolitan University (METU) is one of Hungary's leading private universities, specializing in creative industries, tourism, business, and communication. Known for its practical, industry-focused approach and strong English-language programs.",
    faculties: ['Faculty of Arts, Design and Architecture', 'Faculty of Business', 'Faculty of Tourism and Hospitality', 'Faculty of Communication'],
    programs: ['Design', 'Architecture', 'Business Administration', 'Tourism Management', 'Media Studies', 'Communication'],
    degree_levels: ['Bachelor', 'Master'],
    languages: ['Hungarian', 'English'],
    website: 'https://metropolitan.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Budapestikomm1.jpg/800px-Budapestikomm1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Budapest_Metropolitan_University_campus.jpg/800px-Budapest_Metropolitan_University_campus.jpg',
    ],
    imageCaptions: [
      'Faculty of Arts, Design and Architecture — Main Building',
      'Budapest Metropolitan University — Campus Exterior',
    ],
    facultyLinks: [
      { name: 'Faculty of Arts, Design and Architecture', url: 'https://metropolitan.hu/en/courses/arts-design-architecture/' },
      { name: 'Faculty of Business', url: 'https://metropolitan.hu/en/courses/business-management/' },
      { name: 'Faculty of Tourism and Hospitality', url: 'https://metropolitan.hu/en/courses/tourism-hospitality/' },
      { name: 'Faculty of Communication', url: 'https://metropolitan.hu/en/courses/communication-media/' },
    ],
    avg_rating: 3.7,
    review_count: 3,
    reviews: [
      { id: 'er16', name: 'Ines C.', rating: 4, title: 'Great for creative fields', body: 'The Design program is very practical and industry-connected. Professors are working professionals which adds a lot of value. Modern campus facilities too.', date: '2024-09-05' },
      { id: 'er17', name: 'Tomás R.', rating: 4, title: 'Tourism program is excellent', body: 'Learning Tourism Management in Budapest is perfect — the city itself is a living classroom. Great internship opportunities through university connections.', date: '2024-06-22' },
      { id: 'er18', name: 'Aisha K.', rating: 3, title: 'Good but admin could improve', body: 'The academic quality is solid and teachers are engaging. Administrative processes could be smoother but overall a good choice for business and creative studies.', date: '2024-03-18' },
    ],
  },
  {
    id: 'obuda',
    name: 'Óbuda University',
    abbreviation: 'ÓU',
    city: 'Budapest',
    founded: 1879,
    description: "Óbuda University is a leading technology and engineering university with roots dating to 1879. It excels in applied sciences, IT, and engineering education, with strong ties to industry partners. A practical, hands-on alternative known for smaller class sizes and high employment rates.",
    faculties: ['Kandó Kálmán Faculty of Electrical Engineering', 'Bánki Donát Faculty of Mechanical Engineering', 'John von Neumann Faculty of Informatics', 'Alba Regia Technical Faculty'],
    programs: ['Electrical Engineering', 'Mechanical Engineering', 'Computer Science', 'Informatics', 'Robotics', 'Business Informatics'],
    degree_levels: ['Bachelor', 'Master'],
    languages: ['Hungarian', 'English'],
    website: 'https://uni-obuda.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Doberd%C3%B3_Stra%C3%9Fe%2C_OE%2C_2025_Budapest.jpg/800px-Doberd%C3%B3_Stra%C3%9Fe%2C_OE%2C_2025_Budapest.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Kir%C3%A1lyok_Stra%C3%9Fe_33%2C_2025_Csillaghegy.jpg/800px-Kir%C3%A1lyok_Stra%C3%9Fe_33%2C_2025_Csillaghegy.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/07/M%C3%81V_V43_loco_in_the_Uni_garden_and_traffic_control_along_tram_tracks%2C_2018_%C3%93buda-B%C3%A9k%C3%A1smegyer.jpg',
    ],
    imageCaptions: [
      'Kandó Kálmán Faculty of Electrical Engineering — Main Building',
      'Bánki Donát Faculty of Mechanical Engineering — Csillaghegy Campus',
      'University Garden — Óbuda Campus',
    ],
    facultyLinks: [
      { name: 'Kandó Kálmán Faculty of Electrical Engineering', url: 'https://kando.uni-obuda.hu' },
      { name: 'Bánki Donát Faculty of Mechanical Engineering', url: 'https://banki.uni-obuda.hu' },
      { name: 'John von Neumann Faculty of Informatics', url: 'https://nik.uni-obuda.hu' },
      { name: 'Alba Regia Technical Faculty', url: 'https://arek.uni-obuda.hu' },
    ],
    avg_rating: 3.7,
    review_count: 3,
    reviews: [
      { id: 'er19', name: 'Peter B.', rating: 4, title: 'Hands-on engineering education', body: 'Óbuda provides very practical engineering education. Labs are well-equipped and you get real industry exposure. Great for robotics and automation.', date: '2024-10-30' },
      { id: 'er20', name: 'Jana H.', rating: 4, title: 'Good IT programs', body: 'The Informatics faculty is strong and professors have real industry experience. Smaller class sizes mean more attention from teachers.', date: '2024-07-09' },
      { id: 'er21', name: 'Mikael S.', rating: 3, title: 'Decent but underrated', body: 'Often overshadowed by BME but Óbuda has solid programs, especially in applied engineering. The campus is accessible by public transit.', date: '2024-04-20' },
    ],
  },
  {
    id: 'vetmed',
    name: 'University of Veterinary Medicine Budapest',
    abbreviation: 'ÁTE',
    city: 'Budapest',
    founded: 1787,
    description: "Founded in 1787, the University of Veterinary Medicine Budapest is one of the oldest veterinary schools in the world. It offers a prestigious 5.5-year Doctor of Veterinary Medicine program taught in English, attracting students from across the globe.",
    faculties: ['Faculty of Veterinary Science'],
    programs: ['Doctor of Veterinary Medicine', 'Veterinary Nursing', 'Animal Science'],
    degree_levels: ['Bachelor', 'Professional Doctorate'],
    languages: ['Hungarian', 'English'],
    website: 'https://univet.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Department_of_Pharmacology_and_Toxicology%2C_UVS_S_Bldg.%2C_2016_Erzs%C3%A9betv%C3%A1ros.jpg/800px-Department_of_Pharmacology_and_Toxicology%2C_UVS_S_Bldg.%2C_2016_Erzs%C3%A9betv%C3%A1ros.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Dembinszky_Stra%C3%9Fe_Uni%2C_Treppe%2C_2022_Erzs%C3%A9betv%C3%A1ros.jpg/800px-Dembinszky_Stra%C3%9Fe_Uni%2C_Treppe%2C_2022_Erzs%C3%A9betv%C3%A1ros.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/University_of_Veterinary_Medicine_Budapest_Hungary.jpg/800px-University_of_Veterinary_Medicine_Budapest_Hungary.jpg',
    ],
    imageCaptions: [
      'Faculty of Veterinary Science — Department of Pharmacology & Toxicology',
      'Faculty of Veterinary Science — Historic Staircase Hall',
      'University of Veterinary Medicine — Campus Exterior',
    ],
    facultyLinks: [
      { name: 'Faculty of Veterinary Science', url: 'https://univet.hu/en/university/faculties/' },
    ],
    avg_rating: 4.7,
    review_count: 3,
    reviews: [
      { id: 'er22', name: 'Emma L.', rating: 5, title: 'Outstanding vet school', body: 'The English-language DVM program is exceptional. Clinical training with real animals starts early. The university has modern veterinary hospitals for practice.', date: '2024-08-12' },
      { id: 'er23', name: 'Marcus J.', rating: 5, title: 'Globally recognized diploma', body: 'The DVM from Budapest is recognized in the EU, USA, Canada and many other countries. Professors are leading experts and the community is very international.', date: '2024-05-28' },
      { id: 'er24', name: 'Ananya G.', rating: 4, title: 'Intensive but worth it', body: 'Veterinary medicine here is very demanding but the quality is unmatched. International student support is very good.', date: '2024-02-14' },
    ],
  },
  {
    id: 'finearts',
    name: 'Hungarian University of Fine Arts',
    abbreviation: 'MKE',
    city: 'Budapest',
    founded: 1871,
    description: "Founded in 1871, the Hungarian University of Fine Arts (MKE) is Hungary's premier fine arts institution. Located in a stunning historic building in central Budapest, it offers programs in painting, sculpture, graphic arts, photography, and intermedia.",
    faculties: ['Department of Painting', 'Department of Sculpture', 'Department of Graphic Arts', 'Department of Art Theory', 'Department of Art Education'],
    programs: ['Painting', 'Sculpture', 'Graphic Art', 'Photography', 'Intermedia', 'Art Theory'],
    degree_levels: ['Bachelor', 'Master'],
    languages: ['Hungarian', 'English'],
    website: 'https://mke.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Magyar_K%C3%A9pz%C5%91m%C5%B1v%C3%A9szeti_Egyetem.JPG/800px-Magyar_K%C3%A9pz%C5%91m%C5%B1v%C3%A9szeti_Egyetem.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/K%C3%A9pz%C5%91m%C5%B1v%C3%A9szeti_F%C5%91iskola_%28715._sz%C3%A1m%C3%BA_m%C5%B1eml%C3%A9k%29_2.jpg/800px-K%C3%A9pz%C5%91m%C5%B1v%C3%A9szeti_F%C5%91iskola_%28715._sz%C3%A1m%C3%BA_m%C5%B1eml%C3%A9k%29_2.jpg',
    ],
    imageCaptions: [
      'Hungarian University of Fine Arts — Historic Building Facade',
      'Fine Arts University — Building Architectural Detail',
    ],
    facultyLinks: [
      { name: 'Department of Painting', url: 'https://mke.hu/intezetek/festeszeti-intezet/' },
      { name: 'Department of Sculpture', url: 'https://mke.hu/intezetek/szobraszati-intezet/' },
      { name: 'Department of Graphic Arts', url: 'https://mke.hu/intezetek/grafika-intezet/' },
      { name: 'Department of Art Theory', url: 'https://mke.hu/intezetek/elmelet/' },
      { name: 'Department of Art Education', url: 'https://mke.hu/intezetek/vizualisnevelesi-intezet/' },
    ],
    avg_rating: 4.7,
    review_count: 3,
    reviews: [
      { id: 'er25', name: 'Valentina R.', rating: 5, title: 'A dream come true for artists', body: "Studying fine arts in Budapest is magical. The historic building, the city's art scene, and the freedom to experiment make MKE special. Professors are internationally exhibited artists.", date: '2024-09-28' },
      { id: 'er26', name: 'Benjamin K.', rating: 4, title: 'Small but excellent', body: 'MKE is a small institution which means personal attention from professors. The studio facilities are good and you\'re surrounded by talented peers.', date: '2024-06-15' },
      { id: 'er27', name: 'Nora F.', rating: 5, title: 'Best decision for my art career', body: "The Painting program pushes you in ways you don't expect. Budapest's vibrant art scene complements everything you learn inside the studio beautifully.", date: '2024-03-07' },
    ],
  },
  {
    id: 'liszt',
    name: 'Liszt Ferenc Academy of Music',
    abbreviation: 'LFZE',
    city: 'Budapest',
    founded: 1875,
    description: "Founded in 1875 by Franz Liszt himself, the Liszt Academy is one of the most prestigious conservatories in the world. Its stunning Art Nouveau building in central Budapest hosts exceptional programs taught by world-class musicians and attracts top talent from across the globe.",
    faculties: ['Department of Piano', 'Department of Strings', 'Department of Wind and Percussion', 'Department of Voice', 'Department of Composition', 'Department of Music Theory'],
    programs: ['Piano Performance', 'Orchestral Instruments', 'Composition', 'Conducting', 'Opera Singing', 'Music Theory', 'Music Pedagogy'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://lfze.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Liszt_Ferenc_Zenem%C5%B1v%C3%A9szeti_Egyetem_2013-ban_fel%C3%BAj%C3%ADtott_homlokzata.JPG/800px-Liszt_Ferenc_Zenem%C5%B1v%C3%A9szeti_Egyetem_2013-ban_fel%C3%BAj%C3%ADtott_homlokzata.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Liszt_Ferenc_Zenem%C5%B1v%C3%A9szeti_Egyetem_2013-ban_fel%C3%BAj%C3%ADtott_nagyterem.JPG/800px-Liszt_Ferenc_Zenem%C5%B1v%C3%A9szeti_Egyetem_2013-ban_fel%C3%BAj%C3%ADtott_nagyterem.JPG',
    ],
    imageCaptions: [
      'Art Nouveau Main Facade — Liszt Ferenc tér',
      'Grand Concert Hall — Interior (Nagyterem)',
    ],
    facultyLinks: [
      { name: 'Department of Piano', url: 'https://lfze.hu/tanszekek/zongora-tanszek' },
      { name: 'Department of Strings', url: 'https://lfze.hu/tanszekek/vonos-tanszek' },
      { name: 'Department of Wind and Percussion', url: 'https://lfze.hu/tanszekek/fuvos-utoes-tanszek' },
      { name: 'Department of Voice', url: 'https://lfze.hu/tanszekek/enekes-tanszek' },
      { name: 'Department of Composition', url: 'https://lfze.hu/tanszekek/kompozicio-tanszek' },
      { name: 'Department of Music Theory', url: 'https://lfze.hu/tanszekek/zeneelmeleti-tanszek' },
    ],
    avg_rating: 4.8,
    review_count: 3,
    reviews: [
      { id: 'er28', name: 'Elena B.', rating: 5, title: 'The best conservatory in the world', body: 'Training at the Liszt Academy is an incredible honor. The level of teaching is extraordinary and the building itself is one of the most beautiful in Budapest.', date: '2024-10-05' },
      { id: 'er29', name: 'Roberto C.', rating: 5, title: 'World-class conservatory', body: 'The faculty are all internationally performing musicians. You learn alongside incredibly talented students from all over the world.', date: '2024-07-30' },
      { id: 'er30', name: 'Soo-Jin P.', rating: 4, title: 'Demanding but exceptional', body: 'Practice rooms are always busy and competition is fierce, but the quality of teaching is worth it. Budapest is a great city for classical music lovers.', date: '2024-04-12' },
    ],
  },
  {
    id: 'szfe',
    name: 'University of Theatre and Film Arts',
    abbreviation: 'SZFE',
    city: 'Budapest',
    founded: 1865,
    description: "Established in 1865, SZFE is Hungary's leading institution for theatre and film studies. Known for producing internationally acclaimed directors, actors, and cinematographers, it offers elite training in a highly competitive and creative environment.",
    faculties: ['Department of Directing', 'Department of Acting', 'Department of Cinematography', 'Department of Dramaturgy', 'Department of Production Design'],
    programs: ['Film Directing', 'Theatre Directing', 'Acting', 'Cinematography', 'Dramaturgy', 'Production Design', 'Screenwriting'],
    degree_levels: ['Bachelor', 'Master'],
    languages: ['Hungarian', 'English'],
    website: 'https://szfe.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6d/Szinhaz-es-Filmmuv-Egy_Rakoczi-ut-21_0313-1000.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SZFE_belso.jpg/800px-SZFE_belso.jpg',
    ],
    imageCaptions: [
      'University of Theatre and Film Arts — Main Building (Rákóczi út)',
      'SZFE — Interior Corridor & Department of Acting',
    ],
    facultyLinks: [
      { name: 'Department of Directing', url: 'https://szfe.hu/kepzesek/rendezo/' },
      { name: 'Department of Acting', url: 'https://szfe.hu/kepzesek/szineszet/' },
      { name: 'Department of Cinematography', url: 'https://szfe.hu/kepzesek/operator/' },
      { name: 'Department of Dramaturgy', url: 'https://szfe.hu/kepzesek/dramaturgia/' },
      { name: 'Department of Production Design', url: 'https://szfe.hu/kepzesek/produkciostervezes/' },
    ],
    avg_rating: 4.3,
    review_count: 3,
    reviews: [
      { id: 'er31', name: 'Miklos V.', rating: 5, title: 'Legendary film school', body: 'SZFE has produced some of the world\'s best filmmakers. The hands-on approach to filmmaking and the tight-knit student community make it an unforgettable experience.', date: '2024-09-10' },
      { id: 'er32', name: 'Anna S.', rating: 4, title: 'Challenging but creatively fulfilling', body: 'Acting here is intense. You\'re pushed to your limits which ultimately makes you much better. The professors are working professionals.', date: '2024-06-28' },
      { id: 'er33', name: 'James W.', rating: 4, title: 'Great for aspiring directors', body: 'The Directing program is world-renowned. You make real short films and have them screened publicly from year one.', date: '2024-03-22' },
    ],
  },
  {
    id: 'ibs',
    name: 'IBS International Business School Budapest',
    abbreviation: 'IBS',
    city: 'Budapest',
    founded: 1991,
    description: "IBS Budapest is an internationally accredited business school offering fully English-language programs. As part of the Corvinus University network, it provides a strong international learning environment with students from over 70 countries and excellent career support.",
    faculties: ['School of Business', 'School of Finance', 'School of Management'],
    programs: ['International Business', 'Finance', 'Marketing Management', 'Human Resource Management', 'Economics', 'Accounting'],
    degree_levels: ['Bachelor', 'Master'],
    languages: ['English'],
    website: 'https://ibs-b.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/IBS_International_Business_School_Budapest_campus_main_building.jpg/800px-IBS_International_Business_School_Budapest_campus_main_building.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/IBS_International_Business_School_Budapest_campus.jpg/800px-IBS_International_Business_School_Budapest_campus.jpg',
    ],
    imageCaptions: [
      'IBS Campus — School of Business & Finance Main Building',
      'IBS Campus — School of Management & Courtyard',
    ],
    facultyLinks: [
      { name: 'School of Business', url: 'https://ibs-b.hu/en/undergraduate-programmes/' },
      { name: 'School of Finance', url: 'https://ibs-b.hu/en/undergraduate-programmes/' },
      { name: 'School of Management', url: 'https://ibs-b.hu/en/postgraduate-programmes/' },
    ],
    avg_rating: 3.7,
    review_count: 3,
    reviews: [
      { id: 'er34', name: 'Layla M.', rating: 4, title: 'Truly international atmosphere', body: 'IBS feels like a mini United Nations. Learning business in such a diverse environment is incredibly valuable. The English-only environment helps immensely.', date: '2024-10-18' },
      { id: 'er35', name: 'Tom H.', rating: 4, title: 'Great choice for international students', body: 'The support for international students here is excellent. Career services are active and Budapest is a great base for travelling Europe during breaks.', date: '2024-07-03' },
      { id: 'er36', name: 'Yuki T.', rating: 3, title: 'Good school, smaller community', body: 'Solid programs and helpful faculty. The smaller size can feel limiting sometimes but it also means everyone knows each other.', date: '2024-04-25' },
    ],
  },
  {
    id: 'pazmany',
    name: 'Pázmány Péter Catholic University',
    abbreviation: 'PPKE',
    city: 'Budapest',
    founded: 1635,
    description: "Co-founded in 1635, Pázmány Péter Catholic University is Hungary's leading Catholic university. It excels in theology, law, humanities, and information technology, combining a rich academic tradition with modern programs and a strong emphasis on ethical education.",
    faculties: ['Faculty of Law and Political Sciences', 'Faculty of Humanities', 'Faculty of Information Technology', 'Faculty of Economics and Social Sciences', 'Faculty of Theology'],
    programs: ['Law', 'Information Technology', 'Economics', 'History', 'Philosophy', 'Theology', 'Psychology'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://ppke.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Piliscsaba_Stephaneum_d%C3%A9li_oldal.JPG/800px-Piliscsaba_Stephaneum_d%C3%A9li_oldal.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/PPKE_BTK_Piliscsaba.jpg/800px-PPKE_BTK_Piliscsaba.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Pazmany_Peter_Catholic_University_Budapest.jpg/800px-Pazmany_Peter_Catholic_University_Budapest.jpg',
    ],
    imageCaptions: [
      'Stephaneum Building — Faculty of Humanities (Piliscsaba)',
      'Faculty of Humanities — Campus Buildings',
      'Faculty of Law & Faculty of Information Technology — Budapest Campus',
    ],
    facultyLinks: [
      { name: 'Faculty of Law and Political Sciences', url: 'https://jak.ppke.hu' },
      { name: 'Faculty of Humanities', url: 'https://btk.ppke.hu' },
      { name: 'Faculty of Information Technology', url: 'https://itk.ppke.hu' },
      { name: 'Faculty of Economics and Social Sciences', url: 'https://gtk.ppke.hu' },
      { name: 'Faculty of Theology', url: 'https://hittudomanyi.ppke.hu' },
    ],
    avg_rating: 4.0,
    review_count: 3,
    reviews: [
      { id: 'er37', name: 'Isabella F.', rating: 4, title: 'Traditional university with modern outlook', body: 'PPKE offers a wonderful mix of traditional values and modern education. The Law faculty is highly respected and library resources are excellent.', date: '2024-09-01' },
      { id: 'er38', name: 'Daniel K.', rating: 4, title: 'Strong IT program', body: 'The Faculty of Information Technology is one of the best in Hungary. Small class sizes and dedicated professors. Great Erasmus opportunities.', date: '2024-06-10' },
      { id: 'er39', name: 'Sofia R.', rating: 4, title: 'Warm community atmosphere', body: 'PPKE has a close-knit community feel despite being a full research university. Very supportive for international students.', date: '2024-02-20' },
    ],
  },
  {
    id: 'nups',
    name: 'National University of Public Service',
    abbreviation: 'NKE',
    city: 'Budapest',
    founded: 2012,
    description: "The National University of Public Service (NKE) was established in 2012 by merging several specialized institutions. It provides education for future civil servants, law enforcement officers, and military professionals, with unique programs not found elsewhere in Hungary.",
    faculties: ['Faculty of Public Administration', 'Faculty of Law Enforcement', 'Faculty of Military Sciences', 'Faculty of International and European Studies'],
    programs: ['Public Administration', 'Law Enforcement', 'Military Science', 'International Studies', 'Homeland Security', 'Criminology'],
    degree_levels: ['Bachelor', 'Master', 'PhD'],
    languages: ['Hungarian', 'English'],
    website: 'https://uni-nke.hu',
    logo_url: null,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ludovika_frontispiece.jpg/800px-Ludovika_frontispiece.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ludovika_Academy_Budapest_2.jpg/800px-Ludovika_Academy_Budapest_2.jpg',
    ],
    imageCaptions: [
      'Ludovika Main Building — Faculty of Military Sciences & Public Administration',
      'Ludovika Campus — Historic Neoclassical Architecture',
    ],
    facultyLinks: [
      { name: 'Faculty of Public Administration', url: 'https://uni-nke.hu/en/faculties/faculty-of-public-administration' },
      { name: 'Faculty of Law Enforcement', url: 'https://uni-nke.hu/en/faculties/faculty-of-law-enforcement' },
      { name: 'Faculty of Military Sciences', url: 'https://uni-nke.hu/en/faculties/faculty-of-military-sciences' },
      { name: 'Faculty of International and European Studies', url: 'https://uni-nke.hu/en/faculties/faculty-of-international-and-european-studies' },
    ],
    avg_rating: 3.7,
    review_count: 3,
    reviews: [
      { id: 'er40', name: 'Viktor B.', rating: 4, title: 'Unique and respected institution', body: 'NKE offers programs you simply cannot find anywhere else in Hungary. Public administration and law enforcement degrees are highly respected by employers in the public sector.', date: '2024-10-22' },
      { id: 'er41', name: 'Hana Z.', rating: 3, title: 'Specialized but limited', body: 'Good for those pursuing careers in public service or law enforcement. Not for everyone, but if you want to work in government or defense, this is the place.', date: '2024-07-17' },
      { id: 'er42', name: 'Alex O.', rating: 4, title: 'Strong military science program', body: 'The Military Science faculty is well-resourced and professors have real field experience. English programs are growing.', date: '2024-04-08' },
    ],
  },
]

// ─── DORMS ────────────────────────────────────────────────────────────────────

export const STATIC_DORMS: StaticDorm[] = [
  {
    id: 'universitas',
    name: 'Universitas Dormitory',
    city: 'Budapest',
    address: 'Ifjúság útja 8, Budapest, 1117 (District XI)',
    price_min: 120,
    price_max: 180,
    description: "One of the largest student dormitories in Budapest, Universitas accommodates over 1,200 students and offers a vibrant residential community. Located in District XI, it is close to both ELTE and BME campuses and well-connected to the city center.",
    distance: '10 min walk to BME, 15 min to ELTE',
    amenities: ['WiFi', 'Laundry', 'Kitchen', 'Study Room', 'Gym', '24h Security', 'Canteen'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    ],
    imageCaptions: ['Universitas Dormitory — Main Building', 'Study Room & Common Area', 'Typical Student Room'],
    affiliatedUniversity: 'bme',
    website: null,
    avg_rating: 3.8,
    review_count: 3,
    reviews: [
      { id: 'dr1', name: 'Lucas F.', rating: 4, title: 'Great value for money', body: 'The rooms are basic but clean and well-maintained. The study rooms are always available and the canteen food is decent. Good location near BME.', date: '2024-10-05' },
      { id: 'dr2', name: 'Sara K.', rating: 3, title: 'Decent but crowded', body: 'Very big dormitory which means it can feel impersonal. The gym is a nice bonus. Washing machines are sometimes in high demand in the evenings.', date: '2024-07-20' },
      { id: 'dr3', name: 'Mihail P.', rating: 4, title: 'Best option near BME', body: 'For the price you pay, Universitas is excellent. Fast WiFi, clean common areas, and a great community of students. The canteen saves a lot of cooking time.', date: '2024-04-12' },
    ],
  },
  {
    id: 'vasarhelyi',
    name: 'Vásárhelyi Pál Dormitory',
    city: 'Budapest',
    address: 'Bertalan Lajos utca 2, Budapest, 1111 (District XI)',
    price_min: 100,
    price_max: 160,
    description: "Vásárhelyi Pál Dormitory is a BME-affiliated dorm located steps from the main campus. Affordable and functional, it is a popular choice for engineering and architecture students who need to be close to their faculty buildings.",
    distance: '5 min walk to BME main campus',
    amenities: ['WiFi', 'Kitchen', 'Laundry', 'Study Room', 'Bicycle Storage'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Krusp%C3%A9rstrasse_2%2C_NO%2C_2024_L%C3%A1gym%C3%A1nyos.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Krusp%C3%A9rstrasse_2%2C_NW%2C_2024_L%C3%A1gym%C3%A1nyos.jpg',
    ],
    imageCaptions: ['Vásárhelyi Pál Dormitory — Northeast Facade (2024)', 'Vásárhelyi Pál Dormitory — Northwest View (2024)'],
    affiliatedUniversity: 'bme',
    website: null,
    avg_rating: 4.0,
    review_count: 3,
    reviews: [
      { id: 'dr4', name: 'Andrei M.', rating: 4, title: 'Perfect for BME students', body: "You literally walk 5 minutes to lectures. The rooms are small but efficient. Study rooms are quiet and well-lit. Can't beat the location for BME.", date: '2024-11-02' },
      { id: 'dr5', name: 'Klara B.', rating: 4, title: 'Good value, great location', body: 'Affordable and very close to campus. The kitchen facilities are shared but well-maintained. Would recommend for first-year BME students especially.', date: '2024-08-15' },
      { id: 'dr6', name: 'Tom S.', rating: 4, title: 'Functional and affordable', body: 'No frills but everything you need is here. Quiet study environment which is important during exams. The bicycle storage is very useful.', date: '2024-05-22' },
    ],
  },
  {
    id: 'schonherz',
    name: 'Schönherz Zoltán Dormitory',
    city: 'Budapest',
    address: 'Irinyi József utca 42, Budapest, 1117 (District XI)',
    price_min: 110,
    price_max: 170,
    description: "Schönherz is one of the most well-known and lively dormitories in Budapest, affiliated with BME. Famous for its active student clubs, cultural events, and the iconic annual Gólyabál festival. It offers a vibrant community life alongside comfortable accommodation.",
    distance: '5 min walk to BME',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Common Room', 'Study Room', 'Laundry', 'Music Room', 'Table Tennis'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/Sch%C3%B6nherz_Zolt%C3%A1n_Koll%C3%A9gium.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a2/Zolt%C3%A1n_Sch%C3%B6nherz_student_hostel_and_its_area_from_L%C3%A1gym%C3%A1nyos_Bay_Park%2C_2016_%C3%9Ajbuda.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Student_hostel_named_after_Zolt%C3%A1n_Sch%C3%B6nherz%2C_worm%27s-eye%2C_L%C3%A1gym%C3%A1nyos%2C_2016_%C3%9Ajbuda.jpg',
    ],
    imageCaptions: ['Schönherz Dormitory — Main Building Exterior', 'Campus View from Lágymányos Bay Park', 'Street-Level View — Irinyi József utca'],
    affiliatedUniversity: 'bme',
    website: null,
    avg_rating: 4.5,
    review_count: 3,
    reviews: [
      { id: 'dr7', name: 'Bence V.', rating: 5, title: 'Best dorm experience in Budapest', body: 'Schönherz is not just a place to sleep — it\'s a community. The clubs, events, and the restaurant make it amazing. The gym is well-equipped too. Highly recommend.', date: '2024-10-18' },
      { id: 'dr8', name: 'Petra O.', rating: 4, title: 'Lively and well-equipped', body: 'The common rooms are always buzzing with activity. Great study room for exam periods. It can be noisy during events but that\'s part of the charm.', date: '2024-07-08' },
      { id: 'dr9', name: 'Raj N.', rating: 5, title: 'Best social scene of any dorm', body: 'Schönherz has the most active student life of any dorm I\'ve seen. The music room was my favorite spot. Very international community here.', date: '2024-03-30' },
    ],
  },
  {
    id: 'jedlik',
    name: 'Jedlik Ányos Dormitory',
    city: 'Budapest',
    address: 'Bercsényi utca 28-30, Budapest, 1117 (District XI)',
    price_min: 90,
    price_max: 140,
    description: "Jedlik Ányos Dormitory is one of the most affordable student residences in Budapest. Located in the student-heavy District XI, it offers basic but comfortable accommodation with all essential amenities. Ideal for students on a tight budget.",
    distance: '10 min walk to BME and ELTE',
    amenities: ['WiFi', 'Kitchen', 'Laundry', 'Common Room'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Bercs%C3%A9nyi_Stra%C3%9Fe_28-30.%2C_Mitte%2C_2025_L%C3%A1gym%C3%A1nyos.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/77/Bercs%C3%A9nyi_student_hostel_portal%2C_L%C3%A1gym%C3%A1nyos%2C_2016_%C3%9Ajbuda.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e0/Bercs%C3%A9nyi_Stra%C3%9Fe_28-30%2C_Garten%2C_2025_L%C3%A1gym%C3%A1nyos.jpg',
    ],
    imageCaptions: ['Jedlik Ányos Dormitory — Building Exterior (2025)', 'Entrance Portal — Bercsényi utca', 'Garden Area'],
    affiliatedUniversity: 'bme',
    website: null,
    avg_rating: 3.3,
    review_count: 3,
    reviews: [
      { id: 'dr10', name: 'Eva L.', rating: 3, title: 'Affordable but basic', body: 'The price is the best thing about Jedlik. Rooms are simple and functional. Not the most modern building but it gets the job done for budget-conscious students.', date: '2024-09-22' },
      { id: 'dr11', name: 'Gabor T.', rating: 3, title: 'Good price, older building', body: 'For the cost it\'s fine. The building is older and not everything is in perfect condition but staff are responsive to issues. Great for saving money.', date: '2024-06-14' },
      { id: 'dr12', name: 'Maria D.', rating: 4, title: 'Quiet and cheap', body: 'Jedlik is quieter than the bigger dorms which I appreciated during exam season. The kitchen facilities are shared but adequate. Central location in District XI.', date: '2024-02-05' },
    ],
  },
  {
    id: 'martos',
    name: 'Martos Flóra Dormitory',
    city: 'Budapest',
    address: 'Stoczek utca 5-7, Budapest, 1111 (District XI)',
    price_min: 100,
    price_max: 150,
    description: "Martos Flóra Dormitory, affiliated with BME, offers comfortable accommodation for female and mixed-gender students. Known for its quiet and secure environment, it is a popular choice for students who prefer a more relaxed residential setting.",
    distance: '5 min walk to BME',
    amenities: ['WiFi', 'Study Room', 'Kitchen', 'Laundry', '24h Security', 'Common Room'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    imageCaptions: ['Martos Flóra Dormitory — Building Exterior', 'Study Room', 'Student Room Interior'],
    affiliatedUniversity: 'bme',
    website: null,
    avg_rating: 4.2,
    review_count: 3,
    reviews: [
      { id: 'dr13', name: 'Anna S.', rating: 4, title: 'Safe and quiet', body: 'Martos is great for students who want a calmer environment. Very secure with 24h reception. Rooms are tidy and well-maintained. Very close to BME.', date: '2024-10-28' },
      { id: 'dr14', name: 'Zoe H.', rating: 5, title: 'Loved living here', body: 'The community at Martos is really nice. Clean facilities and responsive management. The study rooms are excellent for exam preparation.', date: '2024-08-02' },
      { id: 'dr15', name: 'Nina P.', rating: 4, title: 'Good all-round dormitory', body: 'Solid choice for BME students. The location is excellent, the rooms are decent size, and the laundry room has plenty of machines.', date: '2024-05-10' },
    ],
  },
  {
    id: 'golya',
    name: 'ELTE Gólyavár Dormitory',
    city: 'Budapest',
    address: 'Ifjúság útja 8, Budapest, 1117 (District XI)',
    price_min: 120,
    price_max: 180,
    description: "ELTE Gólyavár is a modern dormitory operated by Eötvös Loránd University. It combines comfortable accommodation with excellent study facilities, catering primarily to ELTE students but open to all university students in Budapest.",
    distance: '5 min walk to ELTE campus, 15 min to city center',
    amenities: ['WiFi', 'Study Room', 'Kitchen', 'Laundry', 'Common Room', 'Library Access'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/%27G%C3%B3lyav%C3%A1r%27_Geb%C3%A4ude%2C_2022_J%C3%B3zsefv%C3%A1ros.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Budapest%2C_ELTE%2C_Trefort-kert%2C_G%C3%B3lyav%C3%A1r.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/ELTE_Hauptgeb%C3%A4ude_und_G%C3%B3lyav%C3%A1r%2C_2022_J%C3%B3zsefv%C3%A1ros.jpg',
    ],
    imageCaptions: ['ELTE Gólyavár — Building Exterior (2022)', 'Gólyavár in the ELTE Trefort Garden Campus', 'ELTE Main Building & Gólyavár (2022)'],
    affiliatedUniversity: 'elte',
    website: 'https://www.elte.hu',
    avg_rating: 4.0,
    review_count: 3,
    reviews: [
      { id: 'dr16', name: 'Csaba F.', rating: 4, title: 'Great for ELTE students', body: 'Being affiliated with ELTE means you get priority on resources. The study rooms are excellent and the WiFi is fast. Good community of students.', date: '2024-11-05' },
      { id: 'dr17', name: 'Laura M.', rating: 4, title: 'Clean and well-run', body: 'ELTE Gólyavár is well-managed with responsive staff. Rooms are a decent size and the common areas are always clean. Library access is a great perk.', date: '2024-07-25' },
      { id: 'dr18', name: 'Paul D.', rating: 4, title: 'Solid choice for ELTE students', body: 'Perfect location for ELTE. The dorm has a good academic atmosphere which helps with motivation. Kitchen facilities are shared but well-kept.', date: '2024-04-01' },
    ],
  },
  {
    id: 'semmelweis-dorm',
    name: 'Semmelweis University Dormitory',
    city: 'Budapest',
    address: 'Üllői út 26, Budapest, 1085 (District VIII)',
    price_min: 130,
    price_max: 200,
    description: "The Semmelweis University Dormitory provides accommodation primarily for medical, dental, and pharmacy students. Located near the main Semmelweis campus and several university hospitals, it is an ideal base for students who need quick access to clinical training.",
    distance: '5 min walk to Semmelweis University main campus',
    amenities: ['WiFi', 'Study Room', 'Kitchen', 'Laundry', '24h Security', 'Common Room'],
    images: [
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    ],
    imageCaptions: ['Semmelweis University Dormitory — Exterior', 'Student Room', 'Study & Common Room'],
    affiliatedUniversity: 'semmelweis',
    website: 'https://semmelweis.hu',
    avg_rating: 4.0,
    review_count: 3,
    reviews: [
      { id: 'dr19', name: 'Tariq A.', rating: 4, title: 'Ideal for medical students', body: 'Being so close to the hospitals and campus makes morning shifts so much easier. Clean rooms and good security. A bit pricier but worth it for med students.', date: '2024-10-15' },
      { id: 'dr20', name: 'Beatrice N.', rating: 4, title: 'Well-located for Semmelweis', body: 'The dorm is well-organized and the study rooms are great for those long nights before clinical exams. The management is responsive to issues.', date: '2024-07-30' },
      { id: 'dr21', name: 'Sven L.', rating: 4, title: 'Good community atmosphere', body: 'Living with fellow medical students creates a great support system. The dorm is clean, secure, and well-connected to the rest of Budapest by tram.', date: '2024-04-18' },
    ],
  },
  {
    id: 'aquarium',
    name: 'Aquarium Dormitory',
    city: 'Budapest',
    address: 'Keleti Károly utca 37, Budapest, 1024 (District II)',
    price_min: 150,
    price_max: 220,
    description: "Aquarium Dormitory is a modern student residence in the quieter Buda side of the city (District II). With excellent transport links and modern facilities including a gym and spacious common rooms, it attracts students from multiple universities.",
    distance: '20 min by tram to city center, bus connections to most universities',
    amenities: ['WiFi', 'Gym', 'Common Room', 'Study Room', 'Laundry', 'Bike Storage', 'Rooftop Terrace'],
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    ],
    imageCaptions: ['Aquarium Dormitory — Modern Exterior', 'Gym & Recreation Area', 'Rooftop Terrace'],
    website: null,
    avg_rating: 4.3,
    review_count: 3,
    reviews: [
      { id: 'dr22', name: 'Hugo F.', rating: 4, title: 'Modern and comfortable', body: 'Aquarium is one of the more modern dorms in Budapest. The gym is properly equipped, the rooms are spacious, and the rooftop terrace is brilliant in summer.', date: '2024-09-08' },
      { id: 'dr23', name: 'Martina Z.', rating: 5, title: 'Best facilities of any dorm', body: 'If you want modern facilities this is the place. The common rooms are great for socializing and the WiFi is excellent everywhere. Worth the slightly higher price.', date: '2024-06-20' },
      { id: 'dr24', name: 'James R.', rating: 4, title: 'Great but slightly far from Pest', body: 'Being on the Buda side means slightly more commuting but the tram connections are good. The building itself is modern and very well-maintained.', date: '2024-03-14' },
    ],
  },
  {
    id: 'zeppelin',
    name: 'Zeppelin Hostel & Student Residence',
    city: 'Budapest',
    address: 'Magyar utca 46, Budapest, 1053 (District V)',
    price_min: 200,
    price_max: 350,
    description: "Zeppelin is a hybrid hostel and student residence in the heart of Budapest's city center (District V). While pricier than traditional university dorms, it offers a vibrant social atmosphere, 24h reception, and unbeatable central location for exploring the city.",
    distance: 'Central location — 20 min by metro to most university campuses',
    amenities: ['WiFi', 'Common Room', 'Bar', '24h Reception', 'Luggage Storage', 'City Center Location'],
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    ],
    imageCaptions: ['Zeppelin Student Residence — City Center Location', 'Common Room & Bar Area'],
    website: null,
    avg_rating: 3.8,
    review_count: 3,
    reviews: [
      { id: 'dr25', name: 'Alexis C.', rating: 4, title: 'Amazing location, fun atmosphere', body: 'You cannot beat the location. Walking distance from everything in the city center. Great for students who want to experience Budapest nightlife. Pricier but worth it.', date: '2024-10-25' },
      { id: 'dr26', name: 'Francesca B.', rating: 4, title: 'Social and central', body: 'The common room is lively and you meet interesting people from all over the world. Better for short stays or students who really want city center living.', date: '2024-07-12' },
      { id: 'dr27', name: 'Karl H.', rating: 3, title: 'Fun but can be noisy', body: 'Great atmosphere and excellent location but it can get noisy at night. Not ideal if you have early morning lectures. The bar downstairs is a double-edged sword.', date: '2024-04-05' },
    ],
  },
  {
    id: 'pannon',
    name: 'Pannon Dormitory',
    city: 'Budapest',
    address: 'Alkotás utca 53, Budapest, 1123 (District XII)',
    price_min: 110,
    price_max: 160,
    description: "Pannon Dormitory is located in the residential District XII of Budapest, offering a peaceful and green surroundings combined with comfortable student accommodation. It has good transport connections and is popular among students from multiple universities.",
    distance: '15 min by bus to BME, 25 min to city center',
    amenities: ['WiFi', 'Study Room', 'Kitchen', 'Laundry', 'Garden', 'Common Room'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    ],
    imageCaptions: ['Pannon Dormitory — Exterior in District XII', 'Garden & Common Areas'],
    website: null,
    avg_rating: 3.8,
    review_count: 3,
    reviews: [
      { id: 'dr28', name: 'Noemie L.', rating: 4, title: 'Peaceful and affordable', body: 'Pannon is great if you want a quieter area. The garden is lovely in spring and summer. Good transport links mean getting to university is no problem.', date: '2024-11-01' },
      { id: 'dr29', name: 'Stefan B.', rating: 4, title: 'Good value in a nice area', body: 'District XII is a beautiful, hilly part of Budapest. The dorm is well-priced and the rooms are comfortable. A bit further from city center but tram connections are good.', date: '2024-08-10' },
      { id: 'dr30', name: 'Leila A.', rating: 3, title: 'Decent but slightly isolated', body: 'Nice surroundings and clean facilities but feels a bit cut off from the student buzz compared to dorms in District XI. Transport can be slow during rush hour.', date: '2024-05-03' },
    ],
  },
  {
    id: 'marton-aron',
    name: 'Márton Áron Dormitory',
    city: 'Budapest',
    address: 'Ménesi út 11-13, Budapest, 1118 (District XI)',
    price_min: 110,
    price_max: 170,
    description: "Márton Áron Dormitory is one of Budapest's most beloved student residences, primarily affiliated with Eötvös Loránd University (ELTE). Located in the leafy District XI near the Lágymányos campus, it is named after Márton Áron, the Bishop of Transylvania. The dorm is renowned for its strong community culture, regular cultural events, and active student self-governance.",
    distance: '5 min walk to ELTE Lágymányos campus (Faculty of Science & Informatics)',
    amenities: ['WiFi', 'Study Room', 'Kitchen', 'Laundry', 'Common Room', 'Cultural Events', 'Sports Room', '24h Security', 'Library Access'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/M%C3%A1rton_%C3%81ron_Koll%C3%A9gium%2C_M%C3%A9nesi_%C3%BAt_11-13%2C_2018_Lágymányos.jpg/800px-M%C3%A1rton_%C3%81ron_Koll%C3%A9gium%2C_M%C3%A9nesi_%C3%BAt_11-13%2C_2018_Lágymányos.jpg',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    imageCaptions: [
      'Márton Áron Dormitory — Main Building, Ménesi út (District XI)',
      'Common Room & Study Area',
      'Student Room Interior',
    ],
    affiliatedUniversity: 'elte',
    website: null,
    avg_rating: 4.4,
    review_count: 3,
    reviews: [
      { id: 'dr31', name: 'Katalin V.', rating: 5, title: 'The heart of ELTE student life', body: 'Márton Áron is more than a dorm — it\'s a community. The cultural events, the study rooms, and the people make it truly special. Being close to the Lágymányos campus is a huge plus.', date: '2024-10-20' },
      { id: 'dr32', name: 'Ibrahim A.', rating: 4, title: 'Great location for ELTE students', body: 'Five minutes to the Faculty of Science and ten to the city center by tram. The rooms are comfortable and the common areas are always lively. The student self-governance is very active.', date: '2024-07-15' },
      { id: 'dr33', name: 'Sophie L.', rating: 4, title: 'Strong community feel', body: 'Márton Áron has a special atmosphere unlike any other dorm I\'ve visited. The cultural programs organized by students are excellent. Slightly older building but well-maintained.', date: '2024-04-08' },
    ],
  },
]

// ─── Q&A ──────────────────────────────────────────────────────────────────────

export const STATIC_QA: StaticQA[] = [
  // HOUSING
  {
    id: 'qa1',
    title: 'What is the average cost of student dormitories in Budapest?',
    body: '',
    category: 'Housing',
    views: 723,
    upvotes: 48,
    answer: "University dormitories (kollégiumi szoba) in Budapest typically range from €90 to €220 per month depending on the university and room type. BME-affiliated dorms like Vásárhelyi and Jedlik are on the cheaper end (€90–€140/month), while modern or private residences like Aquarium or Zeppelin can reach €200–€350/month. State university dorms are heavily subsidized for enrolled students and are almost always the most affordable option. Apply early as spots fill up quickly, especially for international students.",
    date: '2024-09-01',
  },
  {
    id: 'qa2',
    title: 'Is it safe to rent a private apartment as a foreign student in Budapest?',
    body: '',
    category: 'Housing',
    views: 456,
    upvotes: 31,
    answer: "Yes, renting privately in Budapest is generally safe for foreign students, but use reputable platforms like Albérlet.hu, Ingatlan.com, or Facebook groups like 'Flat/Room for Rent Budapest'. Always sign a proper rental contract (bérleti szerződés) and have it notarized or at least witnessed. Never pay more than 1–2 months deposit without a signed contract. Avoid wire-transferring money to people you haven't met. Scams exist but are rare on the main platforms. Average private rent for a room in a shared flat is €250–€450/month in central Budapest.",
    date: '2024-08-20',
  },
  {
    id: 'qa3',
    title: 'How early should I apply for a university dormitory?',
    body: '',
    category: 'Housing',
    views: 312,
    upvotes: 22,
    answer: "You should apply as early as possible — ideally as soon as you receive your university acceptance letter. Most Hungarian universities open dorm applications in May–June for the September semester. Deadlines are often in June or July. International students are generally given priority in many dorm allocation systems, but spaces are still limited. Contact your university's international office or student services immediately after admission to ask about dormitory applications. Waiting until August is usually too late.",
    date: '2024-07-15',
  },

  // VISA
  {
    id: 'qa4',
    title: 'How do I apply for a Hungarian student visa (D-type)?',
    body: '',
    category: 'Visa & Immigration',
    views: 687,
    upvotes: 55,
    answer: "Non-EU students need a Type D national visa to study in Hungary for more than 90 days. Here's the process: 1) Get your university acceptance letter. 2) Gather documents: valid passport, acceptance letter, proof of accommodation, proof of financial means (bank statements showing at least €500/month), health insurance, and passport photos. 3) Book an appointment at your nearest Hungarian embassy or consulate. 4) Submit your application at least 6–8 weeks before your intended arrival. 5) Pay the visa fee (approx. €60–€100). Once you arrive in Hungary, you must apply for a residence permit within 30 days at the local immigration office.",
    date: '2024-09-10',
  },
  {
    id: 'qa5',
    title: 'Can I extend my student residence permit in Hungary?',
    body: '',
    category: 'Visa & Immigration',
    views: 289,
    upvotes: 19,
    answer: "Yes, you can extend your residence permit as long as you remain an active student enrolled at a Hungarian university. You must apply for extension at the National Directorate-General for Aliens Policing (Bevándorlási és Menekültügyi Hivatal — BÁH) at least 30 days before your current permit expires. You'll need: valid passport, proof of continuing enrollment (active student status certificate from your university), proof of accommodation, proof of financial means, and health insurance. Extensions are typically granted for the duration of your studies. Always keep your contact details updated with the immigration office.",
    date: '2024-07-28',
  },
  {
    id: 'qa6',
    title: 'Do I need a visa if I am an EU citizen studying in Hungary?',
    body: '',
    category: 'Visa & Immigration',
    views: 445,
    upvotes: 38,
    answer: "No, EU/EEA citizens do not need a visa or residence permit to study in Hungary. As an EU citizen, you have the right of free movement within the EU. However, if you plan to stay for more than 90 days (which you will for a full degree), you should register with the local authorities within 90 days of arrival. You'll receive a registration certificate (EU regisztrációs igazolás) which confirms your right of residence. Bring your national ID card or passport. This process is free and takes about 30 minutes at your local Government Office (Kormányablak).",
    date: '2024-08-05',
  },

  // STUDENT LIFE
  {
    id: 'qa7',
    title: 'Can international students work part-time in Hungary?',
    body: '',
    category: 'Daily Life',
    views: 521,
    upvotes: 41,
    answer: "EU/EEA students can work without any restrictions in Hungary. Non-EU students on a student residence permit can work up to 24 hours per week during the academic year and full-time during official university holidays. You'll need a Hungarian tax number (adóazonosító jel) from the tax authority (NAV) before starting work. Popular student jobs include teaching English, hospitality, retail, and internships. The minimum wage in Hungary is around 266,800 HUF/month (~€680). Many universities also offer paid research assistant positions for graduate students.",
    date: '2024-09-18',
  },
  {
    id: 'qa8',
    title: 'Do I need to speak Hungarian to study in Budapest?',
    body: '',
    category: 'Daily Life',
    views: 634,
    upvotes: 52,
    answer: "Not at all if you're enrolled in an English-language program. Almost all major universities in Budapest (Semmelweis, CEU, BME, ELTE, Corvinus, etc.) offer programs fully taught in English. For daily life, Hungarian is helpful but not essential — many locals in Budapest, especially younger generations and service industry workers, speak English. However, learning a few basic Hungarian phrases is appreciated and helps with administrative tasks. Some government offices may require a Hungarian speaker for complex immigration matters, so your university's international office can help as an intermediary.",
    date: '2024-08-12',
  },
  {
    id: 'qa9',
    title: 'How do I get a student ID card (Diákigazolvány) in Hungary?',
    body: '',
    category: 'Daily Life',
    views: 178,
    upvotes: 14,
    answer: "The Diákigazolvány (Student ID) gives you significant discounts on public transport (50% off), museums, cinemas, and more. To get one: 1) Register at your university and get your student status confirmed. 2) Apply through the Neptun academic system (most Hungarian universities use this). 3) Submit your application online with a passport photo. 4) Pay the fee of 800 HUF (approx. €2). 5) Wait 2–3 weeks for production. 6) Pick up your card at your university's student services office. Note: The card is valid only for the duration of your active student status and must be renewed each semester.",
    date: '2024-06-30',
  },
  {
    id: 'qa10',
    title: 'What is the cost of living in Budapest for a student?',
    body: '',
    category: 'Daily Life',
    views: 801,
    upvotes: 67,
    answer: "Budapest is one of the most affordable capital cities in the EU for students. Typical monthly budget: Accommodation (dorm): €100–€200 | Private room: €250–€450. Food: €150–€250 if cooking at home; eating out regularly costs €200–€350. Transport: A monthly student pass (BKK) is about €10 with a Diákigazolvány. Entertainment/social: €50–€150. Total: approximately €400–€700/month depending on lifestyle. The Stipendium Hungaricum and other scholarships often cover tuition and provide a monthly stipend of around 40,000–130,000 HUF (~€100–€330) to help with living costs.",
    date: '2024-10-01',
  },

  // BANKING
  {
    id: 'qa11',
    title: 'Which bank is best for international students in Hungary?',
    body: '',
    category: 'Banking & Finance',
    views: 398,
    upvotes: 29,
    answer: "The most popular banks for international students in Budapest are: **OTP Bank** — Hungary's largest bank, has English-speaking staff at major branches, widely available ATMs. **K&H Bank** — Good student accounts with low/no fees, good online banking. **Erste Bank** — International bank with good English support, popular with expats. **Raiffeisen Bank** — Another international option with decent English service. Most banks require a Hungarian address (lakcímkártya) to open an account. OTP and K&H are often recommended for ease of account opening. Avoid banks with high monthly maintenance fees. Revolut and Wise are also widely used by students for low-cost international transfers.",
    date: '2024-09-25',
  },
  {
    id: 'qa12',
    title: 'How do I open a bank account as a foreign student in Hungary?',
    body: '',
    category: 'Banking & Finance',
    views: 567,
    upvotes: 44,
    answer: "To open a bank account in Hungary you'll need: 1) Valid passport or national ID. 2) Hungarian address card (lakcímkártya) — you must register your address first. 3) Student enrollment certificate from your university (in some cases). Steps: Visit a branch of your chosen bank (OTP, K&H, Erste, or Raiffeisen). Ask for a student account (diákszámla) to get reduced fees. Fill in the application form — some banks have English versions. Receive your debit card by post within 5–10 business days. Activate online banking. Note: Some banks now offer online account opening. Without a Hungarian address card, you may be able to open a limited account with just your passport at some banks.",
    date: '2024-08-30',
  },

  // SCHOLARSHIPS
  {
    id: 'qa13',
    title: 'How do I apply for the Stipendium Hungaricum scholarship?',
    body: '',
    category: 'Scholarships',
    views: 742,
    upvotes: 61,
    answer: "The Stipendium Hungaricum is Hungary's flagship international scholarship covering tuition fees, accommodation, and a monthly stipend. To apply: 1) Check if your country participates at stipendiumhungaricum.hu — over 70 countries are eligible. 2) Contact your home country's sending organization (Ministry of Education or equivalent). 3) Applications are made through your home country's nominating authority, not directly to Hungary. 4) Prepare documents: motivation letter, academic transcripts, language certificate (usually B2 in English), recommendation letters, passport copy. 5) Submit your application through the Stipendium Hungaricum online portal (usually open October–January). 6) Selected candidates are then invited to apply to specific Hungarian universities. The scholarship covers full tuition, dormitory accommodation, and a monthly stipend of 40,000–130,000 HUF.",
    date: '2024-10-08',
  },
  {
    id: 'qa14',
    title: 'What are the eligibility requirements for the Hungarian Diaspora Scholarship?',
    body: '',
    category: 'Scholarships',
    views: 223,
    upvotes: 17,
    answer: "The Hungarian Diaspora Scholarship is for students of Hungarian origin living outside Hungary. Eligibility requirements: 1) You must be of Hungarian origin (Hungarian ancestry, Hungarian community membership, or Hungarian cultural ties). 2) You must be a citizen of a non-EU/EEA country (some programs accept EU citizens of Hungarian origin). 3) You must apply for admission to a Hungarian higher education institution. 4) You must have Hungarian language skills or commitment to learn Hungarian. The scholarship covers tuition fees and provides accommodation support. Applications are made through the Balassi Institute and Hungarian embassies. The program is separate from Stipendium Hungaricum and specifically targets the global Hungarian diaspora.",
    date: '2024-07-05',
  },
]

// ─── GUIDES ───────────────────────────────────────────────────────────────────

export const STATIC_GUIDES: StaticGuide[] = [
  {
    id: 'visa-guide',
    title: 'How to Apply for a Hungarian D-Type Student Visa',
    category: 'Visa Application',
    icon: '🛂',
    description: "Non-EU students who plan to study in Hungary for more than 90 days need a Type D national visa. Follow these steps to apply successfully.",
    steps: [
      { id: 's1', label: 'Check if you need a visa', detail: "EU/EEA citizens do not need a visa. Check Hungary's immigration website or contact the nearest Hungarian embassy to confirm if your nationality requires a D-type visa." },
      { id: 's2', label: 'Gather required documents', detail: "Collect: valid passport (valid for at least 6 months beyond your stay), university acceptance letter, proof of accommodation in Hungary, health insurance covering the full stay, proof of financial means (bank statements showing at least €500/month), and 2 passport photos." },
      { id: 's3', label: 'Book appointment at Hungarian embassy', detail: "Visit your nearest Hungarian embassy or consulate website to book an appointment. Do this at least 6–8 weeks before your intended arrival date as slots can fill up quickly." },
      { id: 's4', label: 'Submit your application', detail: "Attend your appointment with all original documents plus photocopies. Pay the visa application fee (approximately €60–€100 depending on your country). Be prepared for a short interview about your study plans." },
      { id: 's5', label: 'Wait for processing', detail: "Standard processing takes 15–30 days. Some embassies offer express processing for an additional fee. You will be notified by email when your visa is ready." },
      { id: 's6', label: 'Collect your visa and prepare for arrival', detail: "Collect your visa from the embassy. Upon arrival in Hungary, you must apply for a residence permit within 30 days at the National Directorate-General for Aliens Policing (BÁH). Your university's international office will assist with this." },
    ],
  },
  {
    id: 'bank-guide',
    title: 'How to Open a Bank Account in Hungary as a Student',
    category: 'Bank Accounts',
    icon: '🏦',
    description: "Having a Hungarian bank account makes daily life much easier — for paying rent, utilities, and receiving scholarship payments. Here's how to open one.",
    steps: [
      { id: 's7', label: 'Choose your bank', detail: "The most student-friendly banks are OTP Bank (largest in Hungary), K&H Bank, Erste Bank, and Raiffeisen. OTP and K&H are most commonly used by international students. Visit their websites to compare student account fees before visiting." },
      { id: 's8', label: 'Register your address first (get lakcímkártya)', detail: "Most banks require a Hungarian address card (lakcímkártya) before opening an account. Visit your local Kormányablak (Government Office) with your passport, rental contract or dorm letter, and your landlord to register your address." },
      { id: 's9', label: 'Gather your documents', detail: "Bring: valid passport or national ID, your Hungarian address card (lakcímkártya), student enrollment certificate from your university (some banks require this), and your residence permit if you have one." },
      { id: 's10', label: 'Visit a branch', detail: "Go to a branch of your chosen bank during business hours (usually Mon–Fri, 8am–4pm). Ask specifically for a student account (diákszámla) to benefit from reduced or zero monthly fees." },
      { id: 's11', label: 'Fill in the application form', detail: "Complete the application form — ask for an English version if available. Review all terms, especially monthly fees, transaction limits, and international transfer fees. Sign the contract to open your account." },
      { id: 's12', label: 'Receive your card and activate online banking', detail: "Your debit card will be mailed to your registered address within 5–10 business days. Once received, activate it at an ATM and set up your online/mobile banking app. Your account number (IBAN) will be available immediately." },
    ],
  },
  {
    id: 'studentid-guide',
    title: 'How to Get Your Student ID (Diákigazolvány)',
    category: 'Arrival Checklist',
    icon: '🪪',
    description: "The Diákigazolvány (Student ID card) gives you 50% off public transport, discounts at museums, cinemas, and many shops across Hungary. Get yours as soon as possible after enrollment.",
    steps: [
      { id: 's13', label: 'Complete your university registration', detail: "Make sure you are fully registered as an active student at your university and that your student status is confirmed in the university's academic system (usually Neptun)." },
      { id: 's14', label: 'Log in to the Neptun system', detail: "Neptun is the academic management system used by almost all Hungarian universities. Log in with the credentials provided by your university's registration office." },
      { id: 's15', label: 'Submit your application and photo', detail: "Find the student ID application section in Neptun. Upload a passport-style photo (plain background, face clearly visible). Complete all required fields in the application form." },
      { id: 's16', label: 'Pay the fee', detail: "The application fee is 800 HUF (approximately €2). Pay this through the Neptun system or at your student services office. Keep the payment confirmation." },
      { id: 's17', label: 'Wait 2–3 weeks for production', detail: "The card is produced centrally and sent to your university. Processing typically takes 2–3 weeks. You can check the status of your application in Neptun." },
      { id: 's18', label: 'Pick up your card at student services', detail: "You'll be notified when your card is ready. Collect it from your university's student services office with your passport. Activate it if required and remember to renew it each semester." },
    ],
  },
  {
    id: 'address-guide',
    title: 'How to Register Your Address in Hungary (Lakcímkártya)',
    category: 'Arrival Checklist',
    icon: '🏠',
    description: "Registering your Hungarian address (lakcímkártya) is one of the most important steps after arrival. You need it for opening a bank account, getting a tax number, and many other official purposes.",
    steps: [
      { id: 's19', label: 'Find your accommodation', detail: "Before you can register, you must have a confirmed address — either a dorm room or private rental. If renting privately, make sure you have a signed rental contract." },
      { id: 's20', label: 'Get your rental contract or dorm letter', detail: "For private rentals: your landlord must sign a form confirming they consent to your address registration. Some landlords may be reluctant — confirm this before signing a lease. For dorms: get an official letter of accommodation from the dorm administration." },
      { id: 's21', label: 'Visit your local Government Office (Kormányablak)', detail: "Find your nearest Kormányablak (Government Office) at kormanyablak.hu. Bring your passport/ID, rental contract or dorm letter, and your landlord (if renting privately — they usually need to be present to sign)." },
      { id: 's22', label: 'Fill in the address registration form', detail: "Request the address registration form (bejelentkezési lap) at the counter. Fill in all details — your name as in passport, new address, and the landlord/dorm details. The staff will guide you through the process." },
      { id: 's23', label: 'Receive your address card', detail: "You will receive your lakcímkártya (address card) on the spot — it is issued immediately free of charge. Keep it safe as you will need it frequently for banking, tax registration, and other official purposes." },
    ],
  },
  {
    id: 'sh-guide',
    title: 'How to Apply for the Stipendium Hungaricum Scholarship',
    category: 'Arrival Checklist',
    icon: '🏆',
    description: "The Stipendium Hungaricum is Hungary's most prestigious international scholarship, covering full tuition, dormitory accommodation, and a monthly stipend. Follow these steps to apply successfully.",
    steps: [
      { id: 's24', label: "Check your country's participation", detail: "Visit stipendiumhungaricum.hu to check if your country is a participating partner. Over 70 countries are eligible. Each country has a limited number of nominations available each year." },
      { id: 's25', label: "Contact your home country's sending organization", detail: "Applications are NOT made directly to Hungary. You must apply through your home country's designated sending organization — usually the Ministry of Education, Ministry of Foreign Affairs, or a cultural institute. Find your country's contact on the Stipendium website." },
      { id: 's26', label: 'Prepare your documents', detail: "Typical required documents: motivation letter (why you want to study in Hungary), certified academic transcripts, language certificate (usually B2 English or Hungarian), 2 letters of recommendation, valid passport copy, and any research proposal (for PhD applicants)." },
      { id: 's27', label: 'Submit your application on the Stipendium portal', detail: "Applications are usually open October through January. Submit your completed application package through the Stipendium Hungaricum online portal AND through your home country's sending organization. Both submissions are required." },
      { id: 's28', label: 'Wait for nomination from your home country', detail: "Your home country's authority reviews applications and nominates candidates. If selected, you'll receive a nomination letter. Competition varies by country — some have hundreds of applicants for a handful of spots." },
      { id: 's29', label: 'Complete your Hungarian university application', detail: "Nominated students must then apply directly to a Hungarian university through the Stipendium portal, ranking their preferred universities and programs. Universities make the final admission decision. Once accepted, you'll receive your scholarship contract and visa invitation letter." },
    ],
  },
]

// ─── SCHOLARSHIPS ─────────────────────────────────────────────────────────────

export const STATIC_SCHOLARSHIPS: StaticScholarship[] = [
  {
    id: 'stipendium',
    name: 'Stipendium Hungaricum Scholarship',
    type: 'Government',
    description: "Hungary's flagship international scholarship program offering full tuition coverage, free dormitory accommodation, and a monthly stipend of 43,700 HUF. Available for Bachelor's, Master's, and PhD studies at Hungarian state universities. Applications are made through your home country's nominated sending authority.",
    coverage: 'Full tuition + dormitory + monthly stipend (43,700 HUF)',
    eligibility: 'Citizens of 80+ partner countries; high academic achievement; no prior Hungarian state scholarship',
    deadline: 'January 15',
    featured: true,
    link: 'https://stipendiumhungaricum.hu',
  },
  {
    id: 'erasmus',
    name: 'Erasmus+ Exchange Grant',
    type: 'EU',
    description: "The European Union's flagship education mobility program. Students enrolled at a European university can spend one or two semesters in Hungary with a monthly mobility grant covering living costs. Bilateral agreements between universities determine which programs and partner institutions are available.",
    coverage: 'Monthly grant of €400–€800 depending on country + home university waives tuition',
    eligibility: 'Enrolled at a participating European university with an Erasmus+ agreement with a Hungarian institution',
    deadline: 'Varies by home institution (typically October–February)',
    featured: true,
    link: 'https://erasmus-plus.ec.europa.eu',
  },
  {
    id: 'campus-mundi',
    name: 'Campus Mundi Scholarship',
    type: 'Government',
    description: "A Hungarian government-funded program supporting outbound and inbound mobility. Campus Mundi offers grants for short-term study visits, internships, and language courses. Hungarian universities also receive support to attract international students for summer schools and short programs.",
    coverage: 'Up to €1,500 per semester + travel allowance',
    eligibility: 'Hungarian citizens studying abroad OR foreigners at Hungarian institutions participating in the program',
    deadline: 'Rolling deadlines, typically spring and autumn rounds',
    featured: false,
    link: 'https://www.campusmundi.hu',
  },
  {
    id: 'ceepus',
    name: 'CEEPUS (Central European Exchange Program)',
    type: 'Regional',
    description: "The Central European Exchange Program for University Studies (CEEPUS) enables free mobility between universities in Central, Eastern, and South-Eastern Europe. Students and academics from member countries can study or teach at a partner university with all fees waived and a monthly stipend provided.",
    coverage: 'Full tuition waiver + monthly stipend from host country',
    eligibility: 'Citizens of CEEPUS member states (Austria, Bulgaria, Croatia, Czech Republic, Hungary, North Macedonia, Poland, Romania, Serbia, Slovakia, Slovenia, Albania, Bosnia and Herzegovina, Montenegro, Moldova)',
    deadline: 'October 31 (for spring semester), June 15 (for autumn semester)',
    featured: false,
    link: 'https://www.ceepus.info',
  },
  {
    id: 'diaspora',
    name: 'Hungarian Diaspora Scholarship',
    type: 'Government',
    description: "Specifically designed for Hungarians living outside Hungary (diaspora communities). This scholarship provides full support for Hungarian-heritage students to study at Hungarian universities, covering tuition, accommodation, and a monthly stipend, with an emphasis on preserving Hungarian culture and identity.",
    coverage: 'Full tuition + accommodation + monthly stipend',
    eligibility: 'Hungarian diaspora members living outside Hungary with proof of Hungarian heritage/community affiliation',
    deadline: 'January 31',
    featured: false,
    link: 'https://diasporascholarship.hu',
  },
  {
    id: 'bilateral',
    name: 'Bilateral State Scholarships',
    type: 'Government',
    description: "Hungary maintains bilateral scholarship agreements with dozens of countries. These intergovernmental scholarships provide places for students from partner countries to study at Hungarian universities, often covering partial or full costs. Contact the Hungarian Embassy in your country for country-specific bilateral scholarships.",
    coverage: 'Varies by bilateral agreement (full or partial coverage)',
    eligibility: 'Citizens of countries with bilateral scholarship agreements with Hungary; typically requires strong academic record',
    deadline: 'Varies by country (typically November–February)',
    featured: false,
    link: 'https://tka.hu/international-programmes/scholarship-programmes',
  },
  {
    id: 'corvinus-merit',
    name: 'Corvinus University Merit Scholarship',
    type: 'University',
    description: "Corvinus University of Budapest offers merit-based scholarships for high-achieving international students enrolled in its English-language programs. Awards range from partial to full tuition waivers based on academic excellence, demonstrated leadership, and financial need.",
    coverage: '30–100% tuition waiver',
    eligibility: 'Admitted to an English-language program at Corvinus; GPA equivalent of 3.5+ on a 4.0 scale',
    deadline: 'Concurrent with admission application',
    featured: false,
    link: 'https://www.uni-corvinus.hu/en/admissions/scholarships/',
  },
  {
    id: 'bme-excellence',
    name: 'BME Excellence Scholarship',
    type: 'University',
    description: "Budapest University of Technology and Economics offers excellence-based financial support for outstanding international students in engineering and technology programs. Recipients benefit from partial tuition reductions and priority placement in university-affiliated dormitories.",
    coverage: 'Partial tuition reduction (up to 50%)',
    eligibility: 'Accepted to a BME program; demonstrated academic excellence; strong motivation letter',
    deadline: 'Within 4 weeks of admission confirmation',
    featured: false,
    link: 'https://www.bme.hu/en/admissions',
  },
]

