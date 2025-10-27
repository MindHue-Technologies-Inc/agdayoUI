// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true, // This allows listening on all network interfaces (0.0.0.0)
                  // which is essential when running in Docker or other containerized environments.
      allowedHosts: ['localhost', '127.0.0.1', '::1', 'agdayo.mindhue.tech'],
    },
  },
  
  integrations: [vue()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 300,
  }),
});