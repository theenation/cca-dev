// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

const payloadUrl = new URL(process.env.PAYLOAD_URL || 'http://localhost:3000');

// https://astro.build/config
export default defineConfig({
  // Sentry must come before spotlightjs() — Spotlight uses its SDK locally for the dev error overlay.
  // No DSN is set, so no error data ever leaves this machine; telemetry: false stops the
  // sentry-vite-plugin from separately phoning home anonymous build stats by default.
  integrations: [sentry({ telemetry: false }), spotlightjs()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow astro:assets to process images served by the Payload CMS (dev + prod origin).
    remotePatterns: [{ protocol: payloadUrl.protocol.replace(':', ''), hostname: payloadUrl.hostname }],
  },
});
