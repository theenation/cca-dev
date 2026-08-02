import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'CCA - Certified College of Accountancy' },
    { name: 'tagline', type: 'text', defaultValue: 'Accelerate towards your professional career' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'text', defaultValue: 'info@cca.edu.np' },
    {
      name: 'phones',
      type: 'array',
      fields: [{ name: 'number', type: 'text' }],
    },
    { name: 'address', type: 'text', defaultValue: 'Thapagaun, New Baneshwar, Kathmandu, Nepal' },
    { name: 'whatsapp', type: 'text' },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'elearningLoginUrl', type: 'text' },
    { name: 'elearningRegisterUrl', type: 'text' },
  ],
}
