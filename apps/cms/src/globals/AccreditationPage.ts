import type { GlobalConfig } from 'payload'

export const AccreditationPage: GlobalConfig = {
  slug: 'accreditation-page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Accreditation And Membership' },
    { name: 'heroSubtitle', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'highlight', type: 'text', required: true, admin: { description: 'Accent-colored part of the heading' } },
        { name: 'description', type: 'textarea', required: true, admin: { description: 'Blank line = new paragraph' } },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
