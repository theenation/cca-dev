import type { GlobalConfig } from 'payload'

export const StudentSectionPage: GlobalConfig = {
  slug: 'student-section-page',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Student Section' },
    { name: 'heroSubtitle', type: 'textarea' },
    {
      name: 'worldRankPhotos',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'nepalRankPhotos',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'scholarshipPhotos',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}
