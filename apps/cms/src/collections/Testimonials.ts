import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', defaultValue: 'Student' },
    { name: 'rating', type: 'number', defaultValue: 5, min: 1, max: 5 },
    { name: 'message', type: 'textarea', required: true },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    {
      name: 'group',
      type: 'select',
      defaultValue: 'student',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Alumni', value: 'alumni' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
