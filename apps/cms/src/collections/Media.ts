import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'sourceKey',
      type: 'text',
      unique: true,
      admin: { hidden: true },
      // Stable identifier the seed script uses to find-or-create a media doc across
      // re-seeds, independent of Payload's on-disk filename collision suffixing
      // (which increments on every re-upload of a same-named file).
    },
  ],
  upload: true,
}
