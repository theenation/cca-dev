import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Contact' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'introTitle', type: 'text', defaultValue: 'Feel Free To Contact And' },
    { name: 'introAccent', type: 'text', defaultValue: 'Reach Us !' },
    { name: 'introText', type: 'textarea' },
    { name: 'mapEmbedUrl', type: 'text' },
  ],
}
