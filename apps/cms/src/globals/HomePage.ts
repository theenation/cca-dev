import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    // Hero
    { name: 'heroTitle', type: 'text', defaultValue: 'ACCA College in Kathmandu, Nepal | Study ACCA at CCA' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroVideoId', type: 'text', admin: { description: 'YouTube video ID for the autoplaying hero background (optional — falls back to heroImage if blank)' } },
    { name: 'heroCtaText', type: 'text', defaultValue: 'Learn More' },
    { name: 'heroCtaLink', type: 'text', defaultValue: '/about' },

    // Highlight cards under hero
    {
      name: 'highlights',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Icon name, e.g. award, shield, teacher, scholarship' } },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },

    // About section
    { name: 'aboutTitle', type: 'text', defaultValue: 'About Us' },
    { name: 'aboutText', type: 'richText' },
    { name: 'aboutImage', type: 'upload', relationTo: 'media' },
    {
      name: 'aboutStats',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'number' },
      ],
    },

    // Categories
    {
      name: 'categories',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'icon', type: 'text' },
        { name: 'courseCount', type: 'number' },
      ],
    },

    // Book seat form intro
    { name: 'intakeLabel', type: 'text', defaultValue: 'Jan/Feb 2026 Intake' },

    // Achievement section
    { name: 'achievementTitle', type: 'text', defaultValue: 'Our Achievement' },
    { name: 'achievementText', type: 'textarea' },
    { name: 'achievementVideoUrl', type: 'text' },
    { name: 'achievementImage', type: 'upload', relationTo: 'media' },
    { name: 'sinceYear', type: 'number', defaultValue: 2006 },

    // Unbounded education CTA section
    { name: 'ctaTitle', type: 'text', defaultValue: 'Unbounded Education, Infinite Opportunities!' },
    { name: 'ctaText', type: 'textarea' },
    { name: 'ctaImage', type: 'upload', relationTo: 'media' },
  ],
}
