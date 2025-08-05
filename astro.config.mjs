// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';
import node from '@astrojs/node';

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

  adapter: node({
    mode: 'standalone'
  })
});