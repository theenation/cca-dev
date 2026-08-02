import type { CollectionConfig } from 'payload'

export const PlacementPartners: CollectionConfig = {
  slug: 'placement-partners',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'url', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
