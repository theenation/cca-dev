/**
 * Seeds the Payload CMS with the same content used as the Astro app's bundled
 * fallback data (apps/web/src/data/fallback.ts), so the admin panel and the
 * live REST API are populated out of the box and mirror what content editors
 * will see. Images are read directly from apps/web/public/images so both the
 * standalone fallback and the CMS point at the same source photos.
 *
 * Usage: pnpm seed   (from apps/cms)
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const webImages = path.resolve(dirname, '../../../web/public/images')

async function run() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding CCA content...')

  const media = new Map<string, number>() // local relative path -> media id

  async function uploadImage(relPath: string, alt: string): Promise<number> {
    if (media.has(relPath)) return media.get(relPath) as number
    const existing = await payload.find({
      collection: 'media',
      where: { sourceKey: { equals: relPath } },
      limit: 1,
    })
    if (existing.docs[0]) {
      media.set(relPath, existing.docs[0].id)
      return existing.docs[0].id
    }
    const filePath = path.join(webImages, relPath)
    const doc = await payload.create({
      collection: 'media',
      data: { alt, sourceKey: relPath },
      filePath,
    })
    media.set(relPath, doc.id)
    return doc.id
  }

  // ---------- Site Settings ----------
  const logoId = await uploadImage('logo.png', 'CCA Logo')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'CCA - Certified College of Accountancy',
      tagline: 'Accelerate towards your professional career',
      logo: logoId,
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
    },
  })
  payload.logger.info('✔ Site settings')

  // ---------- Home Page ----------
  const heroImg = await uploadImage('hero-bg.webp', 'CCA campus hero')
  const aboutImg = await uploadImage('reception.webp', 'CCA reception')
  const achievementImg = await uploadImage('conference.webp', 'CCA classroom')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'ACCA College in Kathmandu, Nepal | Study ACCA at CCA',
      heroSubtitle:
        'Certified College of Accountancy (CCA) is a leading ACCA college in Kathmandu, Nepal, recognized as a Platinum Approved Learning Partner by ACCA. With high pass rates, experienced faculty, and career-focused training, CCA is the trusted choice in Kathmandu for students pursuing global accounting careers.',
      heroImage: heroImg,
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
            'CCA Institution achieves Platinum Approved Learning Partner status from ACCA, marking the pinnacle of success in accounting education.',
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
            'CCA also offers scholarships based on academic performance and achievements in ACCA exams for pursuing ACCA qualifications.',
        },
      ],
      aboutTitle: 'About Us',
      aboutText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Certified College of Accountancy (CCA) is a leading ACCA college in Kathmandu, Nepal, offering internationally recognized ACCA courses for students after +2 and bachelor level studies. As a Platinum Approved Learning Partner approved by ACCA, CCA has become a preferred destination for students looking to build successful careers in accounting, auditing, taxation, and finance.',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'With over 20 years of ACCA education excellence, experienced ACCA faculty members, scholarship facilities, career support, mock exams, and consistently high pass rates, CCA is widely recognized as one of the best ACCA colleges in Nepal.',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      aboutImage: aboutImg,
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
      achievementText:
        "In celebration of our college's achievement, We stand proud, showcasing excellence and fulfillment.",
      achievementImage: achievementImg,
      sinceYear: 2006,
      ctaTitle: 'Unbounded Education, Infinite Opportunities!',
      ctaText:
        'At CCA, we aspire to be an ACCA education leader recognized for innovation and quality in teaching and learning, international standing in strategic research areas, and commitment to outreach and service to the community.',
    },
  })
  payload.logger.info('✔ Home page')

  // ---------- About Page ----------
  const chairmanImg = await uploadImage('chairman.webp', 'Chairman')
  const tourImg = await uploadImage('college-tour.webp', 'CCA college tour')
  const aboutIntroImg = await uploadImage('about-intro.webp', 'CCA reception desk')

  const textBlock = (paras: string[]) => ({
    root: {
      type: 'root',
      children: paras.map((text) => ({
        type: 'paragraph',
        children: [{ type: 'text', text }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as const

  // Converts a small markdown subset (## headings, numbered/bulleted lines, blank-line
  // paragraphs) into proper Lexical nodes so the richText field renders nicely, instead
  // of showing the raw "##" / "1." markers as plain text.
  const markdownToLexical = (markdown: string) => {
    const lines = markdown.split('\n')
    const children: { type: string; version: number; [key: string]: unknown }[] = []
    let listItems: string[] = []

    const flushList = () => {
      if (listItems.length) {
        children.push({
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          start: 1,
          children: listItems.map((text) => ({
            type: 'listitem',
            children: [{ type: 'text', text }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            value: 1,
          })),
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        listItems = []
      }
    }

    for (const raw of lines) {
      const line = raw.trim()
      if (!line) {
        flushList()
        continue
      }
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imageMatch) {
        flushList()
        const [, alt, src] = imageMatch
        children.push({ type: 'image', alt, src, version: 1 })
      } else if (line.startsWith('## ')) {
        flushList()
        children.push({
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: line.slice(3) }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
      } else if (/^\d+\.\s/.test(line)) {
        flushList()
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: line, format: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
      } else if (line.startsWith('- ')) {
        listItems.push(line.slice(2))
      } else {
        flushList()
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: line }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
      }
    }
    flushList()

    return { root: { type: 'root', children, direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 } }
  }

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroTitle: 'About Us',
      heroSubtitle:
        "CCA has always focused in its ethos - 'Student Always Comes First'. So, we do not compromise anything in our quality of education and student satisfaction.",
      introTitle: 'Intro To CCA',
      introText: textBlock([
        'Certified College of Accountancy (CCA), a distinguished Platinum Approved Learning Partner of ACCA in Nepal, boasts an impressive legacy of over 20 years in delivering the esteemed Association of Chartered Certified Accountants (ACCA) Course. Commencing its journey on September 12, 2006, under the previous moniker "CCA School of Accountancy," the institution has swiftly risen to prominence as a premier ACCA educational hub within Nepal.',
        'Under the guidance of a diverse cadre of adept professionals, CCA stands renowned for its student-centric pedagogical approach, exceptional infrastructure, vibrant co-curricular engagements, and comprehensive career advisory services.',
      ]),
      introImage: aboutIntroImg,
      introStats: [
        { label: 'Practical Knowledge', value: 92 },
        { label: 'Passed Percentage', value: 89 },
        { label: 'Happy Students', value: 90 },
      ],
      missionTitle: 'Our Mission',
      missionText: textBlock([
        'CCA is committed to the intellectual, personal, and professional growth of its students studying for ACCA Qualification. The goal of this college is to inspire a lifelong passion for learning, and to empower a diverse population of students by integrating teaching, research, and creative activity in an engaging, challenging, and supportive learning environment.',
        'Towards this goal, we at CCA are dedicated to excellence in teaching, student professional enrichment, and service.',
      ]),
      visionTitle: 'Our Vision',
      visionText: textBlock([
        'Our vision is to create a culture of excellence for our students by providing a focused learning environment that meets their academic, professional and developmental needs.',
        'At CCA, we aspire to be an ACCA education leader recognized for innovation and quality in teaching and learning, international standing in strategic research areas, and commitment to outreach and service to the community.',
      ]),
      experienceYears: '20+ Years of Experience',
      tourImage: tourImg,
      tourLabel: 'College Tour',
      tourVideoTitle: 'Intro College Video',
      tourVideoText: "Experience excellence firsthand with CCA's virtual college tour. Join us for a glimpse into the vibrant world of CCA.",
      tourVideoId: 'sqP0VAbmeDg',
      chairmanMessageTitle: 'Message from Chairman',
      chairmanMessageText: textBlock([
        'Certified College of Accountancy (CCA), A Distinguished Blended Platinum Approved Learning Partner of ACCA in Nepal, boasts an impressive legacy of over 20 years in delivering the esteemed Association of Chartered Certified Accountants (ACCA) program.',
      ]),
      chairmanImage: chairmanImg,
    },
  })
  payload.logger.info('✔ About page')

  // ---------- Contact page ----------
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      heroTitle: 'Contact',
      heroSubtitle:
        'Connectivity that knows no bounds. Experience the power of our cutting-edge contact solutions and stay connected wherever you go.',
      introTitle: 'Feel Free To Contact And',
      introAccent: 'Reach Us !',
      introText:
        'Experience seamless communication with our innovative contact solutions. Connect with confidence and never miss a beat.',
      mapEmbedUrl: 'https://www.google.com/maps?q=27.6919151,85.3308987&z=17&output=embed',
    },
  })
  payload.logger.info('✔ Contact page')

  // ---------- Student section page ----------
  const worldRankImages = await Promise.all(
    Array.from({ length: 7 }, (_, i) => uploadImage(`student-section/world-rank/${i + 1}.webp`, `World rank holder ${i + 1}`)),
  )
  const nepalRankImages = await Promise.all(
    Array.from({ length: 11 }, (_, i) => uploadImage(`student-section/nepal-rank/${i + 1}.webp`, `Nepal rank holder ${i + 1}`)),
  )
  const scholarshipImages = await Promise.all(
    Array.from({ length: 26 }, (_, i) =>
      uploadImage(`student-section/scholarship-holders/${i + 1}.webp`, `CCA Scholarship Holder ${i + 1}`),
    ),
  )

  await payload.updateGlobal({
    slug: 'student-section-page',
    data: {
      heroTitle: 'Student Section',
      heroSubtitle: "Celebrating our top-performing students and supporting every learner's journey.",
      worldRankPhotos: worldRankImages.map((image) => ({ image })),
      nepalRankPhotos: nepalRankImages.map((image) => ({ image })),
      scholarshipPhotos: scholarshipImages.map((image) => ({ image })),
    },
  })
  payload.logger.info('✔ Student section page')

  // ---------- Accreditation page ----------
  const accreditationImages = [
    ['accreditation/gov-approval.webp', 'Approved by Ministry of Social Development, Nepal Government'],
    ['accreditation/acca-platinum-partner.webp', 'ACCA Platinum Approved Learning Partner certificate'],
    ['accreditation/iso-certified.png', 'ISO 9001:2015 certified'],
    ['accreditation/cbe-licence.webp', 'Licensed CBE Centre certificate'],
    ['accreditation/acca-approved-employer.webp', 'ACCA Approved Employer certificate'],
    ['accreditation/best-acca-college-award.webp', 'Best ACCA College of Nepal 2024 award'],
  ] as const
  const [govImg, platinumImg, isoImg, cbeImg, employerImg, awardImg] = await Promise.all(
    accreditationImages.map(([path, alt]) => uploadImage(path, alt)),
  )

  await payload.updateGlobal({
    slug: 'accreditation-page',
    data: {
      heroTitle: 'Accreditation And Membership',
      heroSubtitle: "CCA's credentials, certifications and memberships that reflect our commitment to quality ACCA education.",
      items: [
        {
          title: 'Approved by Ministry of Social Development,',
          highlight: 'Nepal Government',
          description:
            'As a College authorized by the Ministry of Social Development, Government of Nepal, our dedication is directed towards providing vital assistance to students who aspire to pursue ACCA studies. Our diligent and committed team is devoted to delivering guidance and information in strict adherence to the prescribed code of conduct and the rules and regulations established by the Government of Nepal.',
          image: govImg,
        },
        {
          title: 'ACCA',
          highlight: 'Platinum Approved Learning Partner: Blended and Face to Face',
          description:
            "Certified College of Accountancy (CCA) is recognized as Nepal's First and Only Blended Platinum Approved Learning Partner for the Association of Chartered Certified Accountants (ACCA).\n\nThe Blended learning model combines the flexibility of structured online education with the effectiveness of face-to-face classroom engagement. This approach enables students to benefit from digital learning convenience alongside in-person academic guidance, mentoring, and exam-focused support. Platinum is the highest level of recognition awarded by ACCA to learning partners that consistently meet rigorous global standards in teaching quality, student support, academic systems, and overall excellence.\n\nThis recognition ensures that every CCA student receives personalized support, globally aligned learning resources, and a structured pathway designed to maximize success in their ACCA journey.",
          image: platinumImg,
        },
        {
          title: 'ISO Certified',
          highlight: 'ACCA college',
          description:
            'Certified College of Accountancy (CCA) is an ISO-certified institution, recognized for its commitment to providing high-quality education and academic excellence. As an ISO-certified ACCA college, CCA adheres to international standards of quality management, ensuring that students receive a top-tier learning experience with consistent and effective processes in place.\n\n' +
            "This certification highlights CCA's dedication to delivering exceptional ACCA education, maintaining rigorous academic standards, and continuously improving its services to help students succeed in their professional journey.",
          image: isoImg,
        },
        {
          title: 'Licensed',
          highlight: 'CBE Centre',
          description:
            'CCA operates its own ACCA Computer-Based Exam (CBE) Licensed Centre, providing students with the opportunity to take on-demand CBEs. This center allows students to schedule and sit for their ACCA exams at their convenience, offering flexibility and accessibility in the examination process. The on-demand CBE system at CCA enhances the overall learning experience by facilitating a more adaptable approach to assessment, aligning with the modern educational landscape.',
          image: cbeImg,
        },
        {
          title: 'ACCA',
          highlight: 'Approved Employer',
          description:
            "CCA has earned the prestigious designation of being recognized as an Approved Employer Trainee Development – Gold by ACCA. This acknowledgment reflects CCA's commitment to providing exceptional support for individuals working towards the ACCA Qualification or holding the Certified Accounting Technician (CAT) credential. As an Approved Employer Trainee Development – Gold, CCA stands out for its dedication to fostering the professional growth and development of ACCA trainees. This recognition underscores the high standards set by CCA in facilitating a conducive and enriching environment for those pursuing ACCA qualifications or holding CAT credentials.",
          image: employerImg,
        },
        {
          title: 'Awarded as',
          highlight: '"Best ACCA College of Nepal - 2024"',
          description:
            'CCA proudly received the Best ACCA College Award at the prestigious 6th International Excellence Awards 2024, held at the Radisson Hotel, Lazimpat. The event was organized by Le Divine, associated by Pageant Nepal, and presented by the Nepal Chamber of Commerce.\n\n' +
            "This recognition reflects the college's unwavering commitment to high-quality accountancy education. CCA is distinguished as a Platinum Approved Learning Partner (ALP) of ACCA and the only ISO Certified ACCA College in Nepal, ensuring rigorous educational standards. The college's outstanding pass rates and the highest number of ACCA registered students in Nepal further solidify its reputation. This award highlights CCA's dedication to fostering future leaders in accounting and finance through continuous curriculum innovation and strong industry relevance.",
          image: awardImg,
        },
      ],
    },
  })
  payload.logger.info('✔ Accreditation page')

  // ---------- Courses ----------
  const courseSeeds = [
    {
      slug: 'acca',
      title: 'ACCA',
      category: 'graduate',
      summary:
        'ACCA stands for Association of Chartered Certified Accountants. It is a global professional accounting body offering the Chartered Certified Accountant qualification.',
      thumb: 'f-image1.png',
      hero: 'hero-bg.webp',
      rating: 4.5,
      students: '5000+ students',
      duration: '3 Years',
      levels: '3 Levels',
      passPercentage: '90% above',
      order: 1,
      featured: true,
      content: `## What is ACCA?\nACCA stands for Association of Chartered Certified Accountants, one of the world's leading professional accounting bodies.\n\n## Why Study ACCA at CCA College?\n1. Platinum Approved Learning Partner (ALP)\n2. Nepal's Only ISO Certified ACCA College\n3. Licensed CBE Centre\n4. Approved by Ministry of Social Development, Nepal Government\n5. ACCA Approved Employer\n6. Student-Centered Learning Environment`,
    },
    {
      slug: 'bbs',
      title: 'BBS',
      category: 'undergraduate',
      summary:
        'BBS is the four year degree program conducted by Tribhuvan University (TU), faculty of Management (FOM). It is an annual exam based program.',
      thumb: 'conference.webp',
      hero: 'hero-bg.webp',
      rating: 4,
      students: '1000+ students',
      duration: '4 Years',
      levels: '8 Semesters',
      passPercentage: '85% above',
      order: 2,
      featured: true,
      content: `## About BBS\nBBS (Bachelor of Business Studies) is a four year degree program conducted by Tribhuvan University (TU), Faculty of Management (FOM).`,
    },
    {
      slug: 'cbe',
      title: 'CBE',
      category: 'graduate',
      summary:
        'On-demand CBE allow for flexibility in your studies as you can sit them at any time of the year. ACCA allows students to take on demand CBE for 4 papers (BT, MA, FA and LW).',
      thumb: 'reception.webp',
      hero: 'hero-bg.webp',
      rating: 4.7,
      students: '2000+ students',
      duration: 'Flexible',
      levels: '4 Papers',
      passPercentage: '92% above',
      order: 3,
      featured: true,
      content: `## Licensed CBE Centre\n![On Demand Licensed CBE Centre](/images/cbe-centre.webp)\nOn-demand CBE allows flexibility in your studies as you can sit exams at any time of the year.`,
    },
    {
      slug: 'diploma-in-ifrs',
      title: 'Diploma in IFRS',
      category: 'diploma',
      summary:
        'The Diploma in International Financial Reporting Standards (DipIFR) is designed for professionals who want in-depth knowledge of IFRS.',
      thumb: 'hero-bg.webp',
      hero: 'hero-bg.webp',
      rating: 4.5,
      students: '300+ students',
      duration: '6 Months',
      levels: '1 Level',
      passPercentage: '88% above',
      order: 4,
      featured: false,
      content: `## Diploma in IFRS\nThe Diploma in International Financial Reporting Standards (DipIFR) equips accounting professionals with a deep understanding of IFRS.`,
    },
    {
      slug: 'certificate-in-international-financial-reporting-cert-ifr',
      title: 'Certificate in International Financial Reporting (Cert IFR)',
      category: 'diploma',
      summary: 'The Cert IFR provides a solid grounding in the principles of IFRS.',
      thumb: 'conference.webp',
      hero: 'hero-bg.webp',
      rating: 4.4,
      students: '200+ students',
      duration: '3 Months',
      levels: '1 Level',
      passPercentage: '87% above',
      order: 5,
      featured: false,
      content: `## Certificate in International Financial Reporting\nThe Cert IFR provides a solid grounding in the principles and practicalities of IFRS.`,
    },
    {
      slug: 'bsc-hons-degree-in-applied-accounting',
      title: 'BSc (Hons) Degree in Applied Accounting',
      category: 'graduate',
      summary:
        'Awarded by Oxford Brookes University, this degree is available exclusively to ACCA students who have completed the Applied Skills level.',
      thumb: 'reception.webp',
      hero: 'hero-bg.webp',
      rating: 4.6,
      students: '800+ students',
      duration: 'Concurrent with ACCA',
      levels: '1 Level',
      passPercentage: '90% above',
      order: 6,
      featured: false,
      content: `## BSc (Hons) Degree in Applied Accounting\nAwarded by Oxford Brookes University (UK), available exclusively to ACCA students who have completed the Applied Skills level.`,
    },
  ] as const

  for (const c of courseSeeds) {
    const thumbId = await uploadImage(c.thumb, `${c.title} thumbnail`)
    const heroId = await uploadImage(c.hero, `${c.title} hero`)
    const existing = await payload.find({ collection: 'courses', where: { slug: { equals: c.slug } }, limit: 1 })
    const data = {
      title: c.title,
      slug: c.slug,
      category: c.category,
      summary: c.summary,
      thumbnail: thumbId,
      heroImage: heroId,
      rating: c.rating,
      students: c.students,
      duration: c.duration,
      levels: c.levels,
      passPercentage: c.passPercentage,
      order: c.order,
      featured: c.featured,
      content: markdownToLexical(c.content),
    }
    if (existing.docs[0]) {
      await payload.update({ collection: 'courses', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'courses', data })
    }
  }
  payload.logger.info(`✔ Courses (${courseSeeds.length})`)

  // ---------- Testimonials ----------
  const testimonialSeeds = [
    {
      name: 'Sampresh Nagarkoti',
      role: 'Student',
      rating: 4,
      group: 'student' as const,
      message:
        "As a student of the Certified College of Accountancy (CCA), I can undoubtedly say that CCA is a premier institution that provides high-quality education, expert faculty, and a strong focus on professional certification (ACCA).",
    },
    {
      name: 'Elina Jha',
      role: 'Student',
      rating: 5,
      group: 'student' as const,
      message:
        'Coming from a science background, I was initially worried about keeping up with students from a management background. However, CCA, with its exceptional faculty and nurturing environment, made the transition seamless.',
    },
    {
      name: 'Abhay Thakur',
      role: 'Student',
      rating: 5,
      group: 'student' as const,
      message:
        'ACCA, one of the career leading profession, has catered my interest in accounting and finance to a level that gained me 100/100 in two subjects FA and MA.',
    },
  ]
  for (const [i, t] of testimonialSeeds.entries()) {
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } }, limit: 1 })
    const data = { ...t, order: i }
    if (existing.docs[0]) await payload.update({ collection: 'testimonials', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'testimonials', data })
  }
  payload.logger.info(`✔ Testimonials (${testimonialSeeds.length})`)

  // ---------- Team Members ----------
  const teamSeeds = [
    {
      name: 'Mr. Govinda Raj Panta',
      role: 'Managing Director',
      group: 'board',
      image: 'team/govinda-raj-panta.webp',
      socials: [
        { platform: 'facebook', url: 'https://www.facebook.com/share/1aZ8fNvsaP/?mibextid=wwXIfr' },
        { platform: 'instagram', url: 'https://www.instagram.com/govinda_raj_panta/' },
      ],
    },
    {
      name: 'Mr. Manish Sharma',
      role: 'Director Of Marketing',
      group: 'board',
      image: 'team/manish-sharma.webp',
      socials: [
        { platform: 'facebook', url: 'https://www.facebook.com/share/1CweBqXUnQ/?mibextid=wwXIfr' },
        { platform: 'instagram', url: 'https://www.instagram.com/manisssigdel/' },
      ],
    },
    {
      name: 'Mr. Diwas Silwal',
      role: 'Director of Academics',
      group: 'board',
      image: 'team/diwas-silwal.webp',
      socials: [
        { platform: 'linkedin', url: 'http://linkedin.com/in/diwas-silwal-1b0770114' },
        { platform: 'instagram', url: 'https://www.instagram.com/thediwas/' },
      ],
    },
    { name: 'Sunita Dhanuk', role: 'Operational Officer', group: 'management', image: 'team/sunita-dhanuk.webp', socials: [] },
    { name: 'Nitin Tiwari', role: 'Admin Support Officer', group: 'management', image: 'team/nitin-tiwari.webp', socials: [] },
    { name: 'Santoshi Shrestha', role: 'Admin Officer', group: 'management', image: 'team/santoshi-shrestha.webp', socials: [] },
    { name: 'Ramiz Raja Hussain', role: 'Lecturer', group: 'faculty', image: 'team/ramiz-raja-hussain.webp', socials: [] },
    { name: 'Saroj Dangal', role: 'Lecturer', group: 'faculty', image: 'team/saroj-dangal.webp', socials: [] },
    { name: 'Saroj Budhathoki', role: 'Lecturer', group: 'faculty', image: 'team/saroj-budhathoki.webp', socials: [] },
    { name: 'Sujan Aryal', role: 'Lecturer', group: 'faculty', image: 'team/sujan-aryal.webp', socials: [] },
  ] as const

  for (const [i, m] of teamSeeds.entries()) {
    const imageId = await uploadImage(m.image, m.name)
    const existing = await payload.find({ collection: 'team-members', where: { name: { equals: m.name } }, limit: 1 })
    const data = { name: m.name, role: m.role, group: m.group, image: imageId, socials: [...m.socials], order: i }
    if (existing.docs[0]) await payload.update({ collection: 'team-members', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'team-members', data })
  }
  payload.logger.info(`✔ Team members (${teamSeeds.length})`)

  // ---------- Placement Partners ----------
  const partnerSeeds = [
    { name: 'Learning Park Education Services', logo: 'partners/learning-park.webp' },
    { name: 'SDR Associates Chartered Accountants', logo: 'partners/sdr-associates.webp' },
    { name: 'Shangri-la Development Bank Ltd.', logo: 'partners/sangrila-development-bank.webp' },
    { name: 'SPSA Business Consultants Pvt. Ltd.', logo: 'partners/spsa-business-consultants.webp' },
    { name: 'SPSA Securities Ltd.', logo: 'partners/spsa-securities.webp' },
    { name: 'Boost Pvt. Ltd.', logo: 'partners/boost.webp' },
    { name: 'Delphi Associates', logo: 'partners/delphi-associates.webp' },
    { name: 'Dynamic Serve', logo: 'partners/dynamic-serve.webp' },
  ] as const

  for (const [i, p] of partnerSeeds.entries()) {
    const logoId = await uploadImage(p.logo, p.name)
    const existing = await payload.find({ collection: 'placement-partners', where: { name: { equals: p.name } }, limit: 1 })
    const data = { name: p.name, logo: logoId, order: i }
    if (existing.docs[0]) await payload.update({ collection: 'placement-partners', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'placement-partners', data })
  }
  payload.logger.info(`✔ Placement partners (${partnerSeeds.length})`)

  // ---------- Posts (blog / event / newsfeed) ----------
  const postSeeds = [
    {
      slug: 'top-3-high-paying-job-sectors-for-acca-in-nepal',
      title: 'Top 3 High Paying Job Sectors for ACCA in Nepal',
      type: 'blog',
      excerpt:
        'You have worked hard for your ACCA. Now comes the most important decision: which sector should you work in?',
      publishedDate: '2026-05-12',
    },
    {
      slug: 'difference-between-acca-and-other-accounting-degrees',
      title: 'Difference Between ACCA and Other Accounting Degrees',
      type: 'blog',
      excerpt: 'Choosing the right accounting qualification is one of the most important decisions for students.',
      publishedDate: '2026-05-12',
    },
    {
      slug: 'acca-scholarships',
      title: 'ACCA Scholarships – How to Get Scholarship in ACCA Course',
      type: 'blog',
      excerpt: 'The ACCA qualification is one of the most respected professional accounting certifications in the world.',
      publishedDate: '2026-03-09',
    },
    {
      slug: 'celebrating-success-cca-honors-graduates-with-a-grand-ceremony',
      title: 'Celebrating Success: CCA Honors Graduates with a Grand Ceremony',
      type: 'event',
      excerpt: 'Kathmandu, March 22, 2025 — The Certified College of Accountancy (CCA) successfully hosted the CCA Graduation 2025.',
      publishedDate: '2025-03-30',
    },
    {
      slug: 'cca-to-host-its-grandest-acca-graduation-ceremony-on-march-22',
      title: 'CCA to Host Its Grandest ACCA Graduation Ceremony on March 22',
      type: 'event',
      excerpt: "For the first time, CCA is set to organize the biggest ACCA graduation ceremony to date.",
      publishedDate: '2025-03-04',
    },
    {
      slug: 'cca-a-18-year-journey-of-quality-education',
      title: 'CCA: A 18-Year Journey Of Quality Education',
      type: 'event',
      excerpt: 'CCA has established itself as one of the Best ACCA learning Colleges in Nepal.',
      publishedDate: '2024-03-14',
    },
    {
      slug: 'cca-secures-rank-1-in-nepal-with-highest-acca-affiliates-in-march-2026-exams',
      title: 'CCA Secures Rank 1 in Nepal with Highest ACCA Affiliates in March 2026 Exams',
      type: 'newsfeed',
      excerpt: 'CCA has achieved an outstanding milestone in the March 2026 ACCA examination session.',
      publishedDate: '2026-04-28',
    },
    {
      slug: 'acca-march-2026-results-cca-college-students-achieve-nepal-world-ranks',
      title: 'ACCA March 2026 Results: CCA College Students Achieve Nepal & World Ranks',
      type: 'newsfeed',
      excerpt: 'The ACCA March 2026 examination results have brought outstanding success for CCA students.',
      publishedDate: '2026-04-27',
    },
    {
      slug: 'cca-ranked-1st-position-among-nepals-alps-with-91-pass-rate-in-december-2025-acca-exams',
      title: "CCA Ranked 1st Position Among Nepal's ALPs with 91% Pass Rate in December 2025 ACCA Exams",
      type: 'newsfeed',
      excerpt: 'CCA has once again reinforced its leadership in ACCA education.',
      publishedDate: '2026-02-11',
    },
  ] as const

  for (const p of postSeeds) {
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1 })
    const data = {
      title: p.title,
      slug: p.slug,
      type: p.type,
      excerpt: p.excerpt,
      publishedDate: p.publishedDate,
      content: textBlock([p.excerpt]),
    }
    if (existing.docs[0]) await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'posts', data })
  }
  payload.logger.info(`✔ Posts (${postSeeds.length})`)

  payload.logger.info('Seeding complete!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
