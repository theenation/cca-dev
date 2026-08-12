import type { CollectionConfig } from 'payload'

const ICON_OPTIONS = [
  { label: 'Award', value: 'award' },
  { label: 'Shield', value: 'shield' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Scholarship', value: 'scholarship' },
  { label: 'Star', value: 'star' },
  { label: 'Users', value: 'users' },
  { label: 'List', value: 'list' },
  { label: 'Percent', value: 'percent' },
  { label: 'Globe', value: 'globe' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Briefcase', value: 'briefcase' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Clock', value: 'clock' },
  { label: 'Layers', value: 'layers' },
  { label: 'Book', value: 'book' },
  { label: 'Check', value: 'check' },
]

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
    { name: 'awardingBody', type: 'text', admin: { description: 'e.g. ACCA (UK) — shown in the course info strip' } },
    { name: 'intake', type: 'text', admin: { description: 'e.g. March / June / September / December' } },
    {
      name: 'highlights',
      type: 'array',
      admin: { description: 'Stat band shown below the hero, e.g. "170+ countries"' },
      fields: [
        { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'star' },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      admin: { description: '"Key benefits" card grid' },
      fields: [
        { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'award' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'curriculum',
      type: 'array',
      admin: { description: 'Programme papers grouped by level' },
      fields: [
        { name: 'levelTitle', type: 'text', required: true },
        { name: 'levelSubtitle', type: 'text' },
        {
          name: 'papers',
          type: 'array',
          fields: [
            { name: 'code', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'careerOpportunities',
      type: 'array',
      fields: [{ name: 'title', type: 'text', required: true }],
    },
    {
      name: 'entryRequirements',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'points',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    { name: 'entryNote', type: 'textarea', admin: { description: 'Closing paragraph under entry requirements' } },
    {
      name: 'faculty',
      type: 'group',
      fields: [
        { name: 'description', type: 'textarea' },
        { name: 'quote', type: 'textarea' },
        { name: 'name', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },
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
