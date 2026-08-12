// Fallback content used when the Payload CMS is unreachable (e.g. offline dev, first run).
// This mirrors the shape of the CMS collections/globals so components don't need to branch.
// Once the CMS is seeded and running, live data from Payload takes over automatically.

export const siteSettings = {
  siteName: 'CCA - Certified College of Accountancy',
  tagline: 'Accelerate towards your professional career',
  logo: { url: '/images/logo.png', alt: 'CCA Logo' },
  email: 'info@cca.edu.np',
  phones: [{ number: '01-5244697' }, { number: '9801811222' }, { number: '9801811219' }],
  address: 'Thapagaun, New Baneshwar, Kathmandu, Nepal',
  whatsapp: '9779801811222',
  socials: [
    { platform: 'facebook', url: 'https://www.facebook.com/ccaeducation' },
    { platform: 'instagram', url: 'https://www.instagram.com/certifiedcollegeofaccountancy/' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/accatcca/' },
    { platform: 'youtube', url: 'https://www.youtube.com/channel/UChSluAj7L3xGwpgzL10wZ5A' },
    { platform: 'tiktok', url: 'https://www.tiktok.com/@accaatcca' },
  ],
  elearningLoginUrl: 'https://cca.learn360lms.com/account/login',
  elearningRegisterUrl: 'https://cca.learn360lms.com/account/register',
}

export const homePage = {
  heroTitle: 'Certified College of Accountancy',
  heroSubtitle:
    'Certified College of Accountancy (CCA) is a leading ACCA college in Kathmandu, Nepal, recognized as a Platinum Approved Learning Partner by ACCA. With high pass rates, experienced faculty, and career-focused training, CCA is the trusted choice in Kathmandu for students pursuing global accounting careers.',
  heroImage: { url: '/images/hero-bg.webp' },
  heroVideoId: 'ly_5MwKRux4',
  heroCtaText: 'Learn More',
  heroCtaLink: '/about',
  highlights: [
    {
      icon: 'award',
      title: '20 Years Of Excellence',
      description:
        "Cheers to 20 years of excellence and community support! Here's to more growth, success, and shaping bright futures together.",
    },
    {
      icon: 'shield',
      title: 'Platinum Approved Learning Partner',
      description:
        "CCA Institution achieves Platinum Approved Learning Partner status from ACCA, marking the pinnacle of success in accounting education.",
    },
    {
      icon: 'teacher',
      title: 'Qualified Faculty Members.',
      description:
        'The Certified College of Accountancy has an exceptional faculty of experienced professionals bringing practical and academic expertise.',
    },
    {
      icon: 'scholarship',
      title: 'Scholarship Facility',
      description:
        "CCA also offers scholarships based on academic performance and achievements in ACCA exams for pursuing ACCA qualifications.",
    },
  ],
  aboutTitle: 'About Us',
  aboutText:
    'Certified College of Accountancy (CCA) is a leading ACCA college in Kathmandu, Nepal, offering internationally recognized ACCA courses for students after +2 and bachelor level studies. As a Platinum Approved Learning Partner approved by ACCA, CCA has become a preferred destination for students looking to build successful careers in accounting, auditing, taxation, and finance.\n\nWith over 20 years of ACCA education excellence, experienced ACCA faculty members, scholarship facilities, career support, mock exams, and consistently high pass rates, CCA is widely recognized as one of the best ACCA colleges in Nepal.',
  aboutImage: { url: '/images/about-us.webp' },
  aboutStats: [
    { label: 'Pass Percentage', value: 91 },
    { label: 'Students Satisfaction', value: 96 },
  ],
  categories: [
    { title: 'Graduate Courses', icon: 'graduate-cap', courseCount: 3 },
    { title: 'Diploma Courses', icon: 'diploma', courseCount: 2 },
    { title: 'Undergraduate Courses', icon: 'certificate', courseCount: 1 },
  ],
  intakeLabel: 'Jan/Feb 2026 Intake',
  achievementTitle: 'Our Achievement',
  achievementText: "In celebration of our college's achievement, We stand proud, showcasing excellence and fulfillment.",
  achievementImage: { url: '/images/conference.webp' },
  achievementVideoUrl: '',
  sinceYear: 2006,
  ctaTitle: 'Unbounded Education, Infinite Opportunities!',
  ctaText:
    'At CCA, we aspire to be an ACCA education leader recognized for innovation and quality in teaching and learning, international standing in strategic research areas, and commitment to outreach and service to the community.',
}

export const aboutPage = {
  heroTitle: 'About Us',
  heroSubtitle:
    "CCA has always focused in its ethos - 'Student Always Comes First'. So, we do not compromise anything in our quality of education and student satisfaction.",
  introTitle: 'Intro To CCA',
  introText:
    'Certified College of Accountancy (CCA), a distinguished Platinum Approved Learning Partner of ACCA in Nepal, boasts an impressive legacy of over 20 years in delivering the esteemed Association of Chartered Certified Accountants (ACCA) Course. Commencing its journey on September 12, 2006, under the previous moniker "CCA School of Accountancy," the institution has swiftly risen to prominence as a premier ACCA educational hub within Nepal.\n\nUnder the guidance of a diverse cadre of adept professionals, CCA stands renowned for its student-centric pedagogical approach, exceptional infrastructure, vibrant co-curricular engagements, and comprehensive career advisory services. Notably, CCA has consistently achieved the highest ACCA examination pass rates year after year and takes pride in having the largest enrollment of ACCA students in Nepal.',
  introImage: { url: '/images/about-intro.webp' },
  introStats: [
    { label: 'Practical Knowledge', value: 92 },
    { label: 'Passed Percentage', value: 89 },
    { label: 'Happy Students', value: 90 },
  ],
  missionTitle: 'Our Mission',
  missionText:
    'CCA is committed to the intellectual, personal, and professional growth of its students studying for ACCA Qualification. The goal of this college is to inspire a lifelong passion for learning, and to empower a diverse population of students by integrating teaching, research, and creative activity in an engaging, challenging, and supportive learning environment to develop leaders and citizens who will challenge the present and enrich the future by being a global finance professionals.\n\nTowards this goal, we at CCA are dedicated to excellence in teaching, student professional enrichment, and service.',
  visionTitle: 'Our Vision',
  visionText:
    'Our vision is to create a culture of excellence for our students by providing a focused learning environment that meets their academic, professional and developmental needs.\n\nAt CCA, we aspire to be an ACCA education leader recognized for innovation and quality in teaching and learning, international standing in strategic research areas, and commitment to outreach and service to the community.\n\nWe intend to prepare our students both professionally and morally for the upcoming challenges of tomorrow\'s dynamic corporate and business environment.',
  experienceYears: '20+ Years of Experience',
  tourImage: { url: '/images/college-tour.webp' },
  tourLabel: 'College Tour',
  tourVideoTitle: 'Intro College Video',
  tourVideoText: "Experience excellence firsthand with CCA's virtual college tour. Join us for a glimpse into the vibrant world of CCA.",
  tourVideoId: 'sqP0VAbmeDg',
  chairmanMessageTitle: 'Message from Chairman',
  chairmanMessageText:
    'Certified College of Accountancy (CCA), A Distinguished Blended Platinum Approved Learning Partner of ACCA in Nepal, boasts an impressive legacy of over 20 years in delivering the esteemed Association of Chartered Certified Accountants (ACCA) program. Commencing its journey on September 12, 2006, under the previous moniker "CCA School of Accountancy," the institution has swiftly risen to prominence as a premier ACCA educational hub within Nepal.',
  chairmanImage: { url: '/images/chairman.webp' },
}

export type CourseCategory = 'undergraduate' | 'diploma' | 'graduate'

const FACULTY_BLOCK = {
  description:
    "CCA's faculty comprises highly qualified educators and seasoned tutors specialising in ACCA, including FCAs and FCCAs, bringing a wealth of expertise and experience to our academic team.",
  quote: 'We believe the best faculty members are the assets and guiding tools for any student to go through exams.',
  name: 'Mr. Diwas Silwal',
  title: 'Director of Academics',
}

export const courses = [
  {
    slug: 'acca',
    title: 'ACCA',
    category: 'graduate' as CourseCategory,
    summary:
      'ACCA stands for Association of Chartered Certified Accountants. It is a global professional accounting body offering the Chartered Certified Accountant qualification.',
    thumbnail: { url: '/images/f-image1.png' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4.5,
    students: '5000+ students',
    duration: '3 Years',
    levels: '3 Levels',
    passPercentage: '90% above',
    content: `## What is ACCA?
ACCA stands for Association of Chartered Certified Accountants, one of the world's leading professional accounting bodies. The ACCA qualification is designed to develop technical accounting knowledge, strategic thinking, financial understanding, ethics, and real-world business decision-making skills.

## Why Choose ACCA in Nepal?
In today's competitive financial world, companies are looking for professionals who understand accounting, taxation, reporting, auditing, financial management, and business strategy. That is why ACCA in Nepal is growing rapidly among students and working professionals.

**Here's why many students choose ACCA:**
- Globally recognized qualification accepted in 180+ countries
- Flexible study and exam system
- Strong career opportunities in accounting and finance
- Opportunity to work in Nepal and internationally
- Practical business and financial knowledge
- Suitable for +2 graduates and working professionals
- High demand in audit firms, banks, MNCs, and finance companies
- Pathway toward leadership and finance management roles

## Why Study ACCA at CCA College?
1. **Platinum Approved Learning Partner (ALP)** — CCA is a Platinum Approved Learning Partner, the highest level of recognition awarded by ACCA.
2. **Nepal's Only ISO Certified ACCA College** — CCA is Nepal's only ISO 9001:2015 certified ACCA college.
3. **Licensed CBE Centre** — On-demand Computer Based Exams available for FA, MA, BT and LW papers.
4. **Approved by Ministry of Social Development, Nepal Government**
5. **ACCA Approved Employer**
6. **Student-Centered Learning Environment**

## ACCA Course Structure
1. Applied Knowledge Level
2. Applied Skills Level
3. Strategic Professional Level`,
    faqs: [],
    order: 1,
    featured: true,
    awardingBody: 'ACCA (UK)',
    intake: 'March / June / September / December',
    highlights: [
      { icon: 'globe', label: '180+ Countries' },
      { icon: 'award', label: 'Platinum Learning Partner' },
      { icon: 'monitor', label: 'On-Demand CBE Centre' },
      { icon: 'users', label: '5000+ Students' },
    ],
    benefits: [
      {
        icon: 'monitor',
        title: 'On-Demand CBE Centre',
        description: 'Sit BT, MA, FA and LW computer-based exams at any time — not restricted to the four ACCA exam sessions a year.',
      },
      {
        icon: 'scholarship',
        title: 'OBU BSc Mentorship',
        description: 'Earn the BSc (Hons) in Applied Accounting from Oxford Brookes University alongside your ACCA studies.',
      },
      {
        icon: 'briefcase',
        title: 'Career Flexibility',
        description: 'Qualify to work in any sector nationally and internationally across accounting, audit, tax and finance roles.',
      },
    ],
    curriculum: [
      {
        levelTitle: 'Level 1 — Applied Knowledge',
        papers: [
          { code: 'BT', title: 'Business and Technology' },
          { code: 'MA', title: 'Management Accounting' },
          { code: 'FA', title: 'Financial Accounting' },
        ],
      },
      {
        levelTitle: 'Level 2 — Applied Skills',
        papers: [
          { code: 'LW', title: 'Corporate and Business Law' },
          { code: 'PM', title: 'Performance Management' },
          { code: 'TX', title: 'Taxation' },
          { code: 'FR', title: 'Financial Reporting' },
          { code: 'AA', title: 'Audit and Assurance' },
          { code: 'FM', title: 'Financial Management' },
        ],
      },
      {
        levelTitle: 'Level 3 — Strategic Professional',
        levelSubtitle: 'Essentials',
        papers: [
          { code: 'SBL', title: 'Strategic Business Leader' },
          { code: 'SBR', title: 'Strategic Business Reporting' },
        ],
      },
      {
        levelTitle: 'Level 3 — Strategic Professional',
        levelSubtitle: 'Options — choose any two',
        papers: [
          { code: 'AFM', title: 'Advanced Financial Management' },
          { code: 'APM', title: 'Advanced Performance Management' },
          { code: 'ATX', title: 'Advanced Taxation' },
          { code: 'AAA', title: 'Advanced Audit and Assurance' },
        ],
      },
    ],
    careerOpportunities: [
      'Auditing',
      'Tax Consulting',
      'Financial Control',
      'Management Accountancy',
      'Treasury Consultancy',
      'Business Analysis',
    ].map((title) => ({ title })),
    entryRequirements: [
      {
        title: 'Applied Knowledge Level / FIA',
        points: [
          { text: '10+2 / SEE (A–C) in five separate subjects including Mathematics & English' },
          { text: 'or 2 passes at GCE / A-Level (grades A–E)' },
        ],
      },
      {
        title: 'Applied Skills Level',
        points: [{ text: 'FIA/ACCA Applied Knowledge level papers passed or exempted' }],
      },
      {
        title: 'Strategic Professional Level',
        points: [{ text: 'ACCA Applied Knowledge and Applied Skills level papers passed or exempted' }],
      },
    ],
    entryNote:
      'Applicants who do not meet the minimum entry requirements can complete the Foundations in Accountancy route before progressing directly into the ACCA qualification.',
    faculty: FACULTY_BLOCK,
  },
  {
    slug: 'bbs',
    title: 'BBS',
    category: 'undergraduate' as CourseCategory,
    summary:
      'BBS is the four year degree program conducted by Tribhuvan University (TU), faculty of Management (FOM). It is an annual exam based program.',
    thumbnail: { url: '/images/conference.webp' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4,
    students: '1000+ students',
    duration: '4 Years',
    levels: '8 Semesters',
    passPercentage: '85% above',
    content: `## About BBS
BBS (Bachelor of Business Studies) is a four year degree program conducted by Tribhuvan University (TU), Faculty of Management (FOM). It is an annual exam based program designed to develop a strong foundation in management and business studies.`,
    faqs: [],
    order: 2,
    featured: true,
    awardingBody: 'Tribhuvan University (TU)',
    intake: 'Annual intake (Falgun)',
    highlights: [
      { icon: 'layers', label: '8 Semesters' },
      { icon: 'users', label: '1000+ Students' },
      { icon: 'percent', label: '85% Pass Rate' },
      { icon: 'award', label: 'TU Affiliated' },
    ],
    benefits: [
      {
        icon: 'book',
        title: 'Broad Management Foundation',
        description: 'Covers accounting, finance, marketing and management, preparing students for a wide range of business careers.',
      },
      {
        icon: 'users',
        title: 'Experienced Faculty',
        description: 'Taught by experienced lecturers with strong academic and industry backgrounds.',
      },
      {
        icon: 'briefcase',
        title: 'Pathway to ACCA',
        description: 'A solid academic base for students who want to pursue ACCA or other professional studies afterwards.',
      },
    ],
    careerOpportunities: ['Accounting', 'Banking & Finance', 'Business Administration', 'Marketing', 'Entrepreneurship'].map(
      (title) => ({ title }),
    ),
    entryRequirements: [
      { title: 'Eligibility', points: [{ text: '+2 (or equivalent) in any stream from a recognised board' }] },
    ],
    curriculum: [] as never[],
    entryNote: undefined as string | undefined,
    faculty: FACULTY_BLOCK,
  },
  {
    slug: 'cbe',
    title: 'CBE',
    category: 'graduate' as CourseCategory,
    summary:
      'On-demand CBE allow for flexibility in your studies as you can sit them at any time of the year. ACCA allows students to take on demand CBE for 4 papers (BT, MA, FA and LW).',
    thumbnail: { url: '/images/reception.webp' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4.7,
    students: '2000+ students',
    duration: 'Flexible',
    levels: '4 Papers',
    passPercentage: '92% above',
    content: `## Licensed CBE Centre
![On Demand Licensed CBE Centre](/images/cbe-centre.webp)
On-demand CBE allows flexibility in your studies as you can sit exams at any time of the year. ACCA allows students to take on-demand CBE for 4 papers: Business Technology (BT), Management Accounting (MA), Financial Accounting (FA) and Law (LW).`,
    faqs: [],
    order: 3,
    featured: true,
    awardingBody: 'ACCA (UK)',
    intake: 'Available year-round',
    highlights: [
      { icon: 'monitor', label: '4 On-Demand Papers' },
      { icon: 'clock', label: 'Sit Anytime' },
      { icon: 'users', label: '2000+ Students' },
      { icon: 'percent', label: '92% Pass Rate' },
    ],
    benefits: [
      {
        icon: 'monitor',
        title: 'Licensed CBE Centre',
        description: 'CCA is an ACCA-approved on-demand CBE centre for the BT, MA, FA and LW papers.',
      },
      {
        icon: 'clock',
        title: 'Total Flexibility',
        description: 'Book and sit your exam whenever you are ready, without waiting for a fixed exam session.',
      },
      {
        icon: 'check',
        title: 'Faster Results',
        description: 'Computer-based exams are marked automatically, so results come back sooner.',
      },
    ],
    careerOpportunities: ['Accounting Assistant', 'Audit Trainee', 'Finance Executive', 'Tax Associate'].map((title) => ({
      title,
    })),
    entryRequirements: [
      {
        title: 'Eligibility',
        points: [{ text: 'Open to all active ACCA and FIA students registered for BT, MA, FA or LW' }],
      },
    ],
    curriculum: [] as never[],
    entryNote: undefined as string | undefined,
    faculty: FACULTY_BLOCK,
  },
  {
    slug: 'diploma-in-ifrs',
    title: 'Diploma in IFRS',
    category: 'diploma' as CourseCategory,
    summary:
      'The Diploma in International Financial Reporting Standards (DipIFR) is designed for professionals who want in-depth knowledge of IFRS.',
    thumbnail: { url: '/images/hero-bg.webp' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4.5,
    students: '300+ students',
    duration: '6 Months',
    levels: '1 Level',
    passPercentage: '88% above',
    content: `## Diploma in IFRS
The Diploma in International Financial Reporting Standards (DipIFR) equips accounting professionals with a deep understanding of IFRS, essential for working with multinational companies and global reporting standards.`,
    faqs: [],
    order: 4,
    featured: false,
    awardingBody: 'ACCA (UK)',
    intake: 'Rolling intake',
    highlights: [
      { icon: 'globe', label: 'Global Standard' },
      { icon: 'clock', label: '6 Months' },
      { icon: 'users', label: '300+ Students' },
      { icon: 'percent', label: '88% Pass Rate' },
    ],
    benefits: [
      {
        icon: 'globe',
        title: 'Globally Recognised',
        description: 'IFRS is the reporting language used by companies in over 100 countries.',
      },
      {
        icon: 'briefcase',
        title: 'Career Advancement',
        description: 'Strengthens your profile for roles in audit, financial reporting and multinational finance teams.',
      },
      {
        icon: 'book',
        title: 'Practical Curriculum',
        description: 'Covers the standards most used in real-world financial statements, taught by practising professionals.',
      },
    ],
    careerOpportunities: ['Financial Reporting', 'External Audit', 'Group Consolidation', 'Corporate Finance'].map((title) => ({
      title,
    })),
    entryRequirements: [
      {
        title: 'Recommended Background',
        points: [{ text: 'A relevant accounting qualification, or at least two years of relevant accounting experience' }],
      },
    ],
    curriculum: [] as never[],
    entryNote: undefined as string | undefined,
    faculty: FACULTY_BLOCK,
  },
  {
    slug: 'certificate-in-international-financial-reporting-cert-ifr',
    title: 'Certificate in International Financial Reporting (Cert IFR)',
    category: 'diploma' as CourseCategory,
    summary:
      'The Certificate in International Financial Reporting (Cert IFR) provides a solid grounding in the principles of IFRS.',
    thumbnail: { url: '/images/conference.webp' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4.4,
    students: '200+ students',
    duration: '3 Months',
    levels: '1 Level',
    passPercentage: '87% above',
    content: `## Certificate in International Financial Reporting
The Cert IFR provides a solid grounding in the principles and practicalities of IFRS, ideal for finance professionals wanting to update their knowledge.`,
    faqs: [],
    order: 5,
    featured: false,
    awardingBody: 'ACCA (UK)',
    intake: 'Rolling intake',
    highlights: [
      { icon: 'book', label: 'Foundational Course' },
      { icon: 'clock', label: '3 Months' },
      { icon: 'users', label: '200+ Students' },
      { icon: 'percent', label: '87% Pass Rate' },
    ],
    benefits: [
      {
        icon: 'book',
        title: 'Solid IFRS Grounding',
        description: 'Builds a working knowledge of the core principles and practicalities of IFRS.',
      },
      {
        icon: 'clock',
        title: 'Short & Focused',
        description: 'A compact course designed to fit around a working schedule.',
      },
      {
        icon: 'briefcase',
        title: 'Stepping Stone',
        description: 'A natural first step before progressing to the Diploma in IFRS.',
      },
    ],
    careerOpportunities: ['Accounts Executive', 'Finance Assistant', 'Reporting Analyst'].map((title) => ({ title })),
    entryRequirements: [
      {
        title: 'Recommended Background',
        points: [{ text: 'A basic understanding of financial accounting is helpful but not required' }],
      },
    ],
    curriculum: [] as never[],
    entryNote: undefined as string | undefined,
    faculty: FACULTY_BLOCK,
  },
  {
    slug: 'bsc-hons-degree-in-applied-accounting',
    title: 'BSc (Hons) Degree in Applied Accounting',
    category: 'graduate' as CourseCategory,
    summary:
      "Awarded by Oxford Brookes University, this degree is available exclusively to ACCA students who have completed the Applied Skills level.",
    thumbnail: { url: '/images/reception.webp' },
    heroImage: { url: '/images/hero-bg.webp' },
    rating: 4.6,
    students: '800+ students',
    duration: 'Concurrent with ACCA',
    levels: '1 Level',
    passPercentage: '90% above',
    content: `## BSc (Hons) Degree in Applied Accounting
Awarded by Oxford Brookes University (UK), this degree is available exclusively to ACCA students who have completed the Applied Skills level, giving students a globally recognized honours degree alongside their ACCA qualification.`,
    faqs: [],
    order: 6,
    featured: false,
    awardingBody: 'Oxford Brookes University (UK)',
    intake: 'November & May submission cycles',
    highlights: [
      { icon: 'award', label: 'UK Honours Degree' },
      { icon: 'users', label: '800+ Students' },
      { icon: 'percent', label: '90% Pass Rate' },
      { icon: 'layers', label: 'Concurrent with ACCA' },
    ],
    benefits: [
      {
        icon: 'award',
        title: 'Earn a UK Degree',
        description: 'Awarded by Oxford Brookes University alongside your ACCA studies, without sitting extra exams.',
      },
      {
        icon: 'teacher',
        title: 'Mentorship Included',
        description: 'Guided support through the Research and Analysis Project (RAP) from CCA mentors.',
      },
      {
        icon: 'briefcase',
        title: 'Boosts Employability',
        description: "A recognised bachelor's degree strengthens job and further-study applications worldwide.",
      },
    ],
    careerOpportunities: ['Graduate Finance Roles', 'Further Postgraduate Study', 'International Career Mobility'].map(
      (title) => ({ title }),
    ),
    entryRequirements: [
      {
        title: 'Eligibility',
        points: [
          { text: 'Completion of the ACCA Applied Skills level' },
          { text: 'Completion of the Ethics and Professional Skills module' },
        ],
      },
    ],
    curriculum: [] as never[],
    entryNote: undefined as string | undefined,
    faculty: FACULTY_BLOCK,
  },
]

export const testimonials = [
  {
    name: 'Sampresh Nagarkoti',
    role: 'Student',
    rating: 4,
    group: 'student',
    message:
      "As a student of the Certified College of Accountancy (CCA), I can undoubtedly say that CCA is a premier institution that provides high-quality education, expert faculty, and a strong focus on professional certification (ACCA). The college provides excellent career development support through internships, job placements, and networking opportunities. Beyond academics, CCA fosters an embracive and supportive environment, encouraging us to engage in extracurricular activities, leadership programs, and research initiatives. It's commitment to academic excellence and professional growth has made me believe that my choice to study in CCA has been a right one.",
  },
  {
    name: 'Elina Jha',
    role: 'Student',
    rating: 5,
    group: 'student',
    message:
      "Coming from a science background, I was initially worried about keeping up with students from a management background. However, CCA, with its exceptional faculty and nurturing environment, made the transition seamless. The dedicated teachers ensured that every concept was built from the basics, making learning both engaging and accessible. Thanks to their unwavering support, I have successfully completed the Knowledge Level and Law and am now preparing for Tax. Today, CCA feels less like an institution and more like a second home, and I am truly grateful to be part of this incredible family. Thank you CCA",
  },
  {
    name: 'Abhay Thakur',
    role: 'Student',
    rating: 5,
    group: 'student',
    message:
      'ACCA, one of the career leading profession, has catered my interest in accounting and finance to a level that gained me 100/100 in two subjects FA and MA. This landmark accomplishment was not possible without the invaluable support of CCA, the best ACCA college of Nepal.',
  },
  {
    name: 'Shirish Babu Tiwari',
    role: 'Student',
    rating: 5,
    group: 'student',
    message:
      'My journey at CCA has been amazing. The friendly and supportive environment, along with approachable teachers, colleagues, and seniors, made learning enjoyable. The dual faculty system was highly beneficial, ensuring I never felt alone during my Knowledge Level studies. Well-structured classes and regular mock tests kept me confident and prepared. CCA has provided me with a strong foundation, and I am grateful to be part of such an excellent institution. I have no second thoughts about my decision to choose CCA.',
  },
]

export type Post = {
  slug: string
  title: string
  type: 'blog' | 'article' | 'event' | 'newsfeed'
  excerpt: string
  publishedDate: string
  content?: string
  featuredImage?: { url: string }
}

export const posts: Post[] = [
  {
    slug: 'top-3-high-paying-job-sectors-for-acca-in-nepal',
    title: 'Top 3 High Paying Job Sectors for ACCA in Nepal',
    type: 'blog',
    excerpt:
      'You have worked hard for your ACCA. Now comes the most important decision: which sector should you work in? Not all sectors pay equally. Choosing the wrong one can keep...',
    publishedDate: '2026-05-12',
    featuredImage: { url: '/images/conference.webp' },
    content: `You have worked hard for your ACCA. Now comes the most important decision: which sector should you work in? Not all sectors pay equally, and choosing the wrong one can keep your salary growth flat for years.

## 1. Audit & Assurance (Big 4 and Mid-Tier Firms)
Audit remains the classic launchpad for ACCA affiliates in Nepal. Big 4 and reputed mid-tier firms actively recruit ACCA students for statutory audit, internal audit, and assurance roles, and the structured articleship builds the kind of client exposure that fast-tracks promotions.

## 2. Banking & Financial Institutions
Commercial banks, development banks, and microfinance institutions in Nepal increasingly prefer ACCA qualified professionals for credit risk, treasury, financial reporting, and compliance roles — areas where IFRS knowledge and strong technical accounting matter most.

## 3. Multinational Companies (MNCs) & Corporate Finance
MNCs operating in Nepal and abroad look for ACCA affiliates for financial controllership, FP&A, and corporate finance positions. The global recognition of ACCA makes it easier to move into regional or international roles within the same company.

**Bottom line:** audit builds the foundation, banking rewards technical depth, and corporate/MNC roles offer the highest long-term ceiling — pick based on where you want to be in five years, not just the next job.`,
  },
  {
    slug: 'difference-between-acca-and-other-accounting-degrees',
    title: 'Difference Between ACCA and Other Accounting Degrees',
    type: 'blog',
    excerpt:
      'Introduction: Why Choosing the Right Accounting Qualification Matters. Choosing the right accounting qualification is one of the most important decisions for students interested in finance, business, or auditing. In Nepal,...',
    publishedDate: '2026-05-12',
    featuredImage: { url: '/images/reception.webp' },
    content: `## Why Choosing the Right Accounting Qualification Matters
Choosing the right accounting qualification is one of the most important decisions for students interested in finance, business, or auditing. In Nepal, students are often confused between ACCA, BBS, and other local accounting degrees.

## Global Recognition
ACCA is recognized in 180+ countries, while a standalone BBS or local degree is generally recognized only within Nepal or a handful of neighboring countries.

## Curriculum Depth
ACCA's syllabus is built and updated by a global professional body, covering financial reporting, audit, tax, and strategic business leadership at a depth most university degrees only touch on.

## Career Flexibility
- ACCA affiliates can work in audit, banking, or corporate finance in Nepal or abroad without further conversion exams in most jurisdictions.
- Other accounting degrees usually require an additional professional certification (like ACCA, CA, or CPA) before reaching the same career ceiling.

**In short:** ACCA is a globally portable professional qualification, while most other accounting degrees are an academic foundation you build a career on top of — many CCA students in fact combine BBS with ACCA to get both.`,
  },
  {
    slug: 'acca-scholarships',
    title: 'ACCA Scholarships – How to Get Scholarship in ACCA Course',
    type: 'blog',
    excerpt:
      'The Association of Chartered Certified Accountants (ACCA) qualification is one of the most respected professional accounting certifications in the world. It prepares students for global careers in accounting, auditing, taxation,...',
    publishedDate: '2026-03-09',
    featuredImage: { url: '/images/hero-bg.webp' },
    content: `The Association of Chartered Certified Accountants (ACCA) qualification is one of the most respected professional accounting certifications in the world. It prepares students for global careers in accounting, auditing, taxation, and finance — and CCA offers scholarship support to make it more accessible.

## Who Can Apply
CCA offers scholarships based on academic performance in +2/A-Levels and on outstanding results in ACCA exams, so both incoming and existing students have a path to financial support.

## What the Scholarship Covers
- Partial or full tuition waiver on ACCA papers, depending on the merit category
- Additional recognition for students who achieve Nepal or World Rank in ACCA exams
- Ongoing support for high-performing students through subsequent levels of the qualification

## How to Apply
Interested students can enquire at CCA's admissions desk with their academic transcripts; rank holders from previous ACCA sessions are considered automatically for the achievement-based scholarship category.

**Why it matters:** a scholarship can meaningfully reduce the cost of the full ACCA journey, which is exactly why CCA continues to invest in rewarding both incoming merit and exam performance along the way.`,
  },
  {
    slug: 'celebrating-success-cca-honors-graduates-with-a-grand-ceremony',
    title: 'Celebrating Success: CCA Honors Graduates with a Grand Ceremony',
    type: 'event',
    excerpt:
      'Kathmandu, March 22, 2025 — The Certified College of Accountancy (CCA) successfully hosted the CCA Graduation 2025 at Dusit Princess, Lazimpat, celebrating the achievements of its graduates in a grand ceremony.',
    publishedDate: '2025-03-30',
  },
  {
    slug: 'cca-to-host-its-grandest-acca-graduation-ceremony-on-march-22',
    title: 'CCA to Host Its Grandest ACCA Graduation Ceremony on March 22',
    type: 'event',
    excerpt:
      "For the first time, Certified College of Accountancy (CCA), Nepal's leading ACCA Approved Learning Partner, is set to organize the biggest ACCA graduation ceremony to date. Scheduled for March 22...",
    publishedDate: '2025-03-04',
  },
  {
    slug: 'cca-a-18-year-journey-of-quality-education',
    title: 'CCA: A 18-Year Journey Of Quality Education',
    type: 'event',
    excerpt:
      'Certified College of Accountancy (CCA) has established itself as one of the Best ACCA learning College in Nepal, holding the prestigious title of a Platinum Approved Learning Partner for over...',
    publishedDate: '2024-03-14',
  },
  {
    slug: 'cca-secures-rank-1-in-nepal-with-highest-acca-affiliates-in-march-2026-exams',
    title: 'CCA Secures Rank 1 in Nepal with Highest ACCA Affiliates in March 2026 Exams',
    type: 'newsfeed',
    excerpt:
      'Certified College of Accountancy has achieved an outstanding milestone in the March 2026 ACCA examination session. The college secured Rank 1 in Nepal by producing the highest number of ACCA...',
    publishedDate: '2026-04-28',
  },
  {
    slug: 'acca-march-2026-results-cca-college-students-achieve-nepal-world-ranks',
    title: 'ACCA March 2026 Results: CCA College Students Achieve Nepal & World Ranks',
    type: 'newsfeed',
    excerpt:
      'The ACCA March 2026 examination results have brought outstanding success for students of Certified College of Accountancy, reinforcing its position as one of the leading ACCA colleges in Nepal. Continuing...',
    publishedDate: '2026-04-27',
  },
  {
    slug: 'cca-ranked-1st-position-among-nepals-alps-with-91-pass-rate-in-december-2025-acca-exams',
    title: "CCA Ranked 1st Position Among Nepal's ALPs with 91% Pass Rate in December 2025 ACCA Exams",
    type: 'newsfeed',
    excerpt:
      "Certified College of Accountancy – CCA has once again reinforced its leadership in ACCA education by achieving an outstanding 91% pass rate in the December 2025 ACCA examinations. Based on...",
    publishedDate: '2026-02-11',
  },
]

export const teamMembers = [
  {
    name: 'Mr. Govinda Raj Panta',
    role: 'Managing Director',
    group: 'board',
    image: { url: '/images/team/govinda-raj-panta.webp' },
    socials: [
      { platform: 'facebook', url: 'https://www.facebook.com/share/1aZ8fNvsaP/?mibextid=wwXIfr' },
      { platform: 'instagram', url: 'https://www.instagram.com/govinda_raj_panta/' },
    ],
  },
  {
    name: 'Mr. Manish Sharma',
    role: 'Director Of Marketing',
    group: 'board',
    image: { url: '/images/team/manish-sharma.webp' },
    socials: [
      { platform: 'facebook', url: 'https://www.facebook.com/share/1CweBqXUnQ/?mibextid=wwXIfr' },
      { platform: 'instagram', url: 'https://www.instagram.com/manisssigdel/' },
    ],
  },
  {
    name: 'Mr. Diwas Silwal',
    role: 'Director of Academics',
    group: 'board',
    image: { url: '/images/team/diwas-silwal.webp' },
    socials: [
      { platform: 'linkedin', url: 'http://linkedin.com/in/diwas-silwal-1b0770114' },
      { platform: 'instagram', url: 'https://www.instagram.com/thediwas/' },
    ],
  },
  {
    name: 'Sunita Dhanuk',
    role: 'Operational Officer',
    group: 'management',
    image: { url: '/images/team/sunita-dhanuk.webp' },
    socials: [],
  },
  {
    name: 'Nitin Tiwari',
    role: 'Admin Support Officer',
    group: 'management',
    image: { url: '/images/team/nitin-tiwari.webp' },
    socials: [],
  },
  {
    name: 'Santoshi Shrestha',
    role: 'Admin Officer',
    group: 'management',
    image: { url: '/images/team/santoshi-shrestha.webp' },
    socials: [],
  },
  {
    name: 'Ramiz Raja Hussain',
    role: 'Lecturer',
    group: 'faculty',
    image: { url: '/images/team/ramiz-raja-hussain.webp' },
    socials: [],
  },
  {
    name: 'Saroj Dangal',
    role: 'Lecturer',
    group: 'faculty',
    image: { url: '/images/team/saroj-dangal.webp' },
    socials: [],
  },
  {
    name: 'Saroj Budhathoki',
    role: 'Lecturer',
    group: 'faculty',
    image: { url: '/images/team/saroj-budhathoki.webp' },
    socials: [],
  },
  {
    name: 'Sujan Aryal',
    role: 'Lecturer',
    group: 'faculty',
    image: { url: '/images/team/sujan-aryal.webp' },
    socials: [],
  },
]

export const placementPartners = [
  { name: 'Learning Park Education Services', logo: { url: '/images/partners/learning-park.webp' }, url: '#' },
  { name: 'SDR Associates Chartered Accountants', logo: { url: '/images/partners/sdr-associates.webp' }, url: '#' },
  { name: 'Shangri-la Development Bank Ltd.', logo: { url: '/images/partners/sangrila-development-bank.webp' }, url: '#' },
  { name: 'SPSA Business Consultants Pvt. Ltd.', logo: { url: '/images/partners/spsa-business-consultants.webp' }, url: '#' },
  { name: 'SPSA Securities Ltd.', logo: { url: '/images/partners/spsa-securities.webp' }, url: '#' },
  { name: 'Boost Pvt. Ltd.', logo: { url: '/images/partners/boost.webp' }, url: '#' },
  { name: 'Delphi Associates', logo: { url: '/images/partners/delphi-associates.webp' }, url: '#' },
  { name: 'Dynamic Serve', logo: { url: '/images/partners/dynamic-serve.webp' }, url: '#' },
]

export const contactPage = {
  heroTitle: 'Contact',
  heroSubtitle:
    'Connectivity that knows no bounds. Experience the power of our cutting-edge contact solutions and stay connected wherever you go.',
  introTitle: 'Feel Free To Contact And',
  introAccent: 'Reach Us !',
  introText:
    'Experience seamless communication with our innovative contact solutions. Connect with confidence and never miss a beat.',
  mapEmbedUrl: 'https://www.google.com/maps?q=27.6919151,85.3308987&z=17&output=embed',
}

export const studentSectionPage = {
  heroTitle: 'Student Section',
  heroSubtitle: "Celebrating our top-performing students and supporting every learner's journey.",
  worldRankPhotos: [
    { image: { url: '/images/student-section/world-rank/1.webp' } },
    { image: { url: '/images/student-section/world-rank/2.webp' } },
    { image: { url: '/images/student-section/world-rank/3.webp' } },
    { image: { url: '/images/student-section/world-rank/4.webp' } },
    { image: { url: '/images/student-section/world-rank/5.webp' } },
    { image: { url: '/images/student-section/world-rank/6.webp' } },
    { image: { url: '/images/student-section/world-rank/7.webp' } },
  ],
  nepalRankPhotos: [
    { image: { url: '/images/student-section/nepal-rank/1.webp' } },
    { image: { url: '/images/student-section/nepal-rank/2.webp' } },
    { image: { url: '/images/student-section/nepal-rank/3.webp' } },
    { image: { url: '/images/student-section/nepal-rank/4.webp' } },
    { image: { url: '/images/student-section/nepal-rank/5.webp' } },
    { image: { url: '/images/student-section/nepal-rank/6.webp' } },
    { image: { url: '/images/student-section/nepal-rank/7.webp' } },
    { image: { url: '/images/student-section/nepal-rank/8.webp' } },
    { image: { url: '/images/student-section/nepal-rank/9.webp' } },
    { image: { url: '/images/student-section/nepal-rank/10.webp' } },
    { image: { url: '/images/student-section/nepal-rank/11.webp' } },
  ],
  scholarshipPhotos: Array.from({ length: 26 }, (_, i) => ({
    image: { url: `/images/student-section/scholarship-holders/${i + 1}.webp` },
  })),
}

export const accreditationPage = {
  heroTitle: 'Accreditation And Membership',
  heroSubtitle: "CCA's credentials, certifications and memberships that reflect our commitment to quality ACCA education.",
  items: [
    {
      title: 'Approved by Ministry of Social Development,',
      highlight: 'Nepal Government',
      description:
        'As a College authorized by the Ministry of Social Development, Government of Nepal, our dedication is directed towards providing vital assistance to students who aspire to pursue ACCA studies. Our diligent and committed team is devoted to delivering guidance and information in strict adherence to the prescribed code of conduct and the rules and regulations established by the Government of Nepal.',
      image: '/images/accreditation/gov-approval.webp',
    },
    {
      title: 'ACCA',
      highlight: 'Platinum Approved Learning Partner: Blended and Face to Face',
      description:
        "Certified College of Accountancy (CCA) is recognized as Nepal's First and Only Blended Platinum Approved Learning Partner for the Association of Chartered Certified Accountants (ACCA).\n\nThe Blended learning model combines the flexibility of structured online education with the effectiveness of face-to-face classroom engagement. This approach enables students to benefit from digital learning convenience alongside in-person academic guidance, mentoring, and exam-focused support. Platinum is the highest level of recognition awarded by ACCA to learning partners that consistently meet rigorous global standards in teaching quality, student support, academic systems, and overall excellence.\n\nThis recognition ensures that every CCA student receives personalized support, globally aligned learning resources, and a structured pathway designed to maximize success in their ACCA journey.",
      image: '/images/accreditation/acca-platinum-partner.webp',
    },
    {
      title: 'ISO Certified',
      highlight: 'ACCA college',
      description:
        'Certified College of Accountancy (CCA) is an ISO-certified institution, recognized for its commitment to providing high-quality education and academic excellence. As an ISO-certified ACCA college, CCA adheres to international standards of quality management, ensuring that students receive a top-tier learning experience with consistent and effective processes in place.\n\n' +
        "This certification highlights CCA's dedication to delivering exceptional ACCA education, maintaining rigorous academic standards, and continuously improving its services to help students succeed in their professional journey.",
      image: '/images/accreditation/iso-certified.png',
    },
    {
      title: 'Licensed',
      highlight: 'CBE Centre',
      description:
        'CCA operates its own ACCA Computer-Based Exam (CBE) Licensed Centre, providing students with the opportunity to take on-demand CBEs. This center allows students to schedule and sit for their ACCA exams at their convenience, offering flexibility and accessibility in the examination process. The on-demand CBE system at CCA enhances the overall learning experience by facilitating a more adaptable approach to assessment, aligning with the modern educational landscape.',
      image: '/images/accreditation/cbe-licence.webp',
    },
    {
      title: 'ACCA',
      highlight: 'Approved Employer',
      description:
        "CCA has earned the prestigious designation of being recognized as an Approved Employer Trainee Development – Gold by ACCA. This acknowledgment reflects CCA's commitment to providing exceptional support for individuals working towards the ACCA Qualification or holding the Certified Accounting Technician (CAT) credential. As an Approved Employer Trainee Development – Gold, CCA stands out for its dedication to fostering the professional growth and development of ACCA trainees. This recognition underscores the high standards set by CCA in facilitating a conducive and enriching environment for those pursuing ACCA qualifications or holding CAT credentials.",
      image: '/images/accreditation/acca-approved-employer.webp',
    },
    {
      title: 'Awarded as',
      highlight: '"Best ACCA College of Nepal - 2024"',
      description:
        'CCA proudly received the Best ACCA College Award at the prestigious 6th International Excellence Awards 2024, held at the Radisson Hotel, Lazimpat. The event was organized by Le Divine, associated by Pageant Nepal, and presented by the Nepal Chamber of Commerce.\n\n' +
        "This recognition reflects the college's unwavering commitment to high-quality accountancy education. CCA is distinguished as a Platinum Approved Learning Partner (ALP) of ACCA and the only ISO Certified ACCA College in Nepal, ensuring rigorous educational standards. The college's outstanding pass rates and the highest number of ACCA registered students in Nepal further solidify its reputation. This award highlights CCA's dedication to fostering future leaders in accounting and finance through continuous curriculum innovation and strong industry relevance.",
      image: '/images/accreditation/best-acca-college-award.webp',
    },
  ],
}
