import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'phone', 'email', 'status', 'createdAt'],
  },
  access: {
    // Public site forms create enquiries anonymously; only logged-in admins can view/manage them.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Book a Seat', value: 'book-seat' },
        { label: 'Enroll Course', value: 'enroll' },
        { label: 'Student Complaint', value: 'complaint' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'subject', type: 'text' },
    { name: 'course', type: 'text' },
    { name: 'studentId', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
  ],
  timestamps: true,
}
