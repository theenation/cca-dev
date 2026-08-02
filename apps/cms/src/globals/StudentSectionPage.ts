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
      name: 'cbeSubjects',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'scholarshipText', type: 'textarea' },
    { name: 'feeStructureText', type: 'textarea' },
    { name: 'feeStructureUrl', type: 'text', defaultValue: '/uploads/Fee-Structure-CCA.pdf' },
    { name: 'brochureUrl', type: 'text', defaultValue: '/uploads/CCA-Brochure.pdf' },
  ],
}
