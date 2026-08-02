import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'group'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Board of Directors', value: 'board' },
        { label: 'Management Team', value: 'management' },
        { label: 'Faculty Member', value: 'faculty' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
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
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
