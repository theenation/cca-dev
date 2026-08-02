// Thin client around the Payload CMS REST API.
// Every getter falls back to bundled seed content (src/data/fallback.ts) so the
// site still builds and looks right even if the CMS isn't running yet.

import * as fallback from '../data/fallback'

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000'

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${PAYLOAD_URL}${path}`, {
      // Astro build-time fetch; keep it short so a missing CMS doesn't hang the build.
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export function mediaUrl(media?: { url?: string | null } | string | null, fallbackUrl = ''): string {
  if (!media) return fallbackUrl
  if (typeof media === 'string') return media
  if (media.url) {
    if (media.url.startsWith('http')) return media.url
    // Bundled fallback images live in this app's own /public/images folder and should stay relative.
    // Anything else is a Payload-served upload path (e.g. /media/xyz.jpg) and needs the CMS origin.
    if (media.url.startsWith('/images/')) return media.url
    return `${PAYLOAD_URL}${media.url}`
  }
  return fallbackUrl
}

type Docs<T> = { docs: T[] }

export async function getSiteSettings() {
  const data = await safeFetch<typeof fallback.siteSettings>('/api/globals/site-settings')
  return data && data.siteName ? data : fallback.siteSettings
}

export async function getHomePage() {
  const data = await safeFetch<typeof fallback.homePage>('/api/globals/home-page')
  return data && data.heroTitle ? data : fallback.homePage
}

export async function getAboutPage() {
  const data = await safeFetch<typeof fallback.aboutPage>('/api/globals/about-page')
  return data && data.heroTitle ? data : fallback.aboutPage
}

export async function getContactPage() {
  const data = await safeFetch<typeof fallback.contactPage>('/api/globals/contact-page')
  return data && data.heroTitle ? data : fallback.contactPage
}

export async function getStudentSectionPage() {
  const data = await safeFetch<typeof fallback.studentSectionPage>('/api/globals/student-section-page')
  return data && data.heroTitle && data.cbeSubjects?.length ? data : fallback.studentSectionPage
}

export async function getAccreditationPage() {
  const data = await safeFetch<typeof fallback.accreditationPage>('/api/globals/accreditation-page')
  return data && data.heroTitle && data.items?.length ? data : fallback.accreditationPage
}

export async function getCourses() {
  const data = await safeFetch<Docs<(typeof fallback.courses)[number]>>('/api/courses?limit=100&sort=order')
  return data && data.docs && data.docs.length ? data.docs : fallback.courses
}

export async function getCourseBySlug(slug: string) {
  const courses = await getCourses()
  return courses.find((c) => c.slug === slug) || null
}

export async function getTestimonials() {
  const data = await safeFetch<Docs<(typeof fallback.testimonials)[number]>>('/api/testimonials?limit=100&sort=order')
  return data && data.docs && data.docs.length ? data.docs : fallback.testimonials
}

export async function getTeamMembers() {
  const data = await safeFetch<Docs<(typeof fallback.teamMembers)[number]>>('/api/team-members?limit=100&sort=order')
  return data && data.docs && data.docs.length ? data.docs : fallback.teamMembers
}

export async function getPlacementPartners() {
  const data = await safeFetch<Docs<(typeof fallback.placementPartners)[number]>>(
    '/api/placement-partners?limit=100&sort=order',
  )
  return data && data.docs && data.docs.length ? data.docs : fallback.placementPartners
}

export async function getPosts(type?: 'blog' | 'article' | 'event' | 'newsfeed') {
  const query = type ? `&where[type][equals]=${type}` : ''
  const data = await safeFetch<Docs<(typeof fallback.posts)[number]>>(
    `/api/posts?limit=100&sort=-publishedDate${query}`,
  )
  const list = data && data.docs && data.docs.length ? data.docs : fallback.posts
  return type ? list.filter((p) => p.type === type) : list
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) || null
}

export { fallback }
