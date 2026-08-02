import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Undergraduate', value: 'undergraduate' },
        { label: 'Diploma', value: 'diploma' },
        { label: 'Graduate', value: 'graduate' },
      ],
    },
    { name: 'summary', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'rating', type: 'number', defaultValue: 4.5 },
    { name: 'students', type: 'text', admin: { description: 'e.g. 5000+' } },
    { name: 'duration', type: 'text' },
    { name: 'levels', type: 'text' },
    { name: 'passPercentage', type: 'text' },
    { name: 'content', type: 'richText' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
