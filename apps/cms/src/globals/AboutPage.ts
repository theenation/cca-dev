import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'About Us' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'introTitle', type: 'text', defaultValue: 'Intro To CCA' },
    { name: 'introText', type: 'richText' },
    { name: 'introImage', type: 'upload', relationTo: 'media' },
    {
      name: 'introStats',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'number' },
      ],
    },
    { name: 'missionTitle', type: 'text', defaultValue: 'Our Mission' },
    { name: 'missionText', type: 'richText' },
    { name: 'visionTitle', type: 'text', defaultValue: 'Our Vision' },
    { name: 'visionText', type: 'richText' },
    { name: 'experienceYears', type: 'text', defaultValue: '20+ Years of Experience' },
    { name: 'tourImage', type: 'upload', relationTo: 'media' },
    { name: 'tourLabel', type: 'text', defaultValue: 'College Tour' },
    { name: 'tourVideoTitle', type: 'text', defaultValue: 'Intro College Video' },
    { name: 'tourVideoText', type: 'textarea' },
    { name: 'tourVideoId', type: 'text', admin: { description: 'YouTube video ID for the College Tour popup video' } },
    { name: 'chairmanMessageTitle', type: 'text', defaultValue: 'Message from Chairman' },
    { name: 'chairmanMessageText', type: 'richText' },
    { name: 'chairmanImage', type: 'upload', relationTo: 'media' },
  ],
}
