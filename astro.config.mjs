// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final antes de desplegar (necesario para sitemap y canonical URLs)
  site: 'https://emcl.cl',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
