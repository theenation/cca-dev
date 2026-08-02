import { chromium } from '@playwright/test';

const outDir = '/tmp/claude-1000/-home-sanjeev-labs-projects3/0252630c-47bb-4223-9087-46450f21414f/scratchpad/mobile-shots';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const pages = [
  { path: '/', name: 'home-v2' },
  { path: '/we-offer/acca', name: 'course-detail-v2' },
  { path: '/contact', name: 'contact-v2' },
  { path: '/about', name: 'about-v2' },
  { path: '/accreditation-and-membership', name: 'accreditation-v2' },
  { path: '/our-team', name: 'our-team-v2' },
  { path: '/testimonial', name: 'testimonial-v2' },
  { path: '/blogs', name: 'blogs-v2' },
  { path: '/student-section', name: 'student-section-v2' },
  { path: '/enroll-course', name: 'enroll-course-v2' },
];

for (const p of pages) {
  await page.goto(`http://localhost:4321${p.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/${p.name}.png`, fullPage: true });
  console.log(`shot: ${p.name}`);
}

await browser.close();
console.log('done');
