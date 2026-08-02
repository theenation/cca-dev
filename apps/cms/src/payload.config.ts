import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { TeamMembers } from './collections/TeamMembers'
import { PlacementPartners } from './collections/PlacementPartners'
import { Enquiries } from './collections/Enquiries'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { StudentSectionPage } from './globals/StudentSectionPage'
import { AccreditationPage } from './globals/AccreditationPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Courses, Posts, Testimonials, TeamMembers, PlacementPartners, Enquiries],
  globals: [SiteSettings, HomePage, AboutPage, ContactPage, StudentSectionPage, AccreditationPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: ['http://localhost:4321', 'http://localhost:3000', process.env.WEB_URL || ''].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      // Only needed for a remote libSQL/Turso database (production); local
      // sqlite file URLs (file:./cms.db, used in dev) ignore this.
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
  }),
  sharp,
  plugins: [
    // Only active when deployed with Vercel Blob storage configured (BLOB_READ_WRITE_TOKEN
    // set, normally automatic once Blob storage is attached to a Vercel project). Falls
    // back to Payload's default local-disk storage otherwise (used in local dev), since
    // serverless hosts like Vercel don't have a persistent filesystem to write uploads to.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
