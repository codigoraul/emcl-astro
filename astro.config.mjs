// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final antes de desplegar (necesario para sitemap y canonical URLs)
  site: 'https://emcl.cl',
  // TODO: quitar "base" cuando el sitio se publique en la raíz del dominio
  base: '/prueba',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
