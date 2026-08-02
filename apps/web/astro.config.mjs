// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const payloadUrl = new URL(process.env.PAYLOAD_URL || 'http://localhost:3000');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow astro:assets to process images served by the Payload CMS (dev + prod origin).
    remotePatterns: [{ protocol: payloadUrl.protocol.replace(':', ''), hostname: payloadUrl.hostname }],
  },
});
