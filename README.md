# EMCL — Frontend Astro (headless)

Frontend en [Astro](https://astro.build) para emcl.cl. Consume contenido desde
un WordPress headless (solo backend/admin, sin theme público) vía REST API.
Mientras WordPress no esté conectado, el sitio usa contenido de respaldo
(`src/content/fallback.ts`) con la copia real del sitio actual, para poder
avanzar en diseño y estructura desde ya.

## Comandos

| Comando           | Acción                                         |
| :----------------- | :---------------------------------------------- |
| `npm install`       | Instala dependencias                            |
| `npm run dev`        | Servidor de desarrollo en `localhost:4321`       |
| `npm run build`       | Build de producción en `./dist/`                  |
| `npm run preview`      | Previsualiza el build de producción localmente     |

## Conectar WordPress headless

1. Instalar WordPress en el subdominio/ruta definida (recomendado: subdominio
   tipo `admin.emcl.cl`, o `emcl.cl/admin` si se prefiere subcarpeta).
2. Instalar y activar el plugin **Yoast SEO** (ya lo usan) más el addon
   **Yoast SEO REST API** o WPGraphQL + WPGraphQL Yoast SEO, según se decida.
3. Crear los endpoints/CPTs necesarios:
   - `servicios` (Custom Post Type) → expuesto en `/wp-json/wp/v2/servicios`
     o vía endpoint custom `/wp-json/emcl/v1/servicios`.
   - Datos de contacto → endpoint custom `/wp-json/emcl/v1/contacto`
     (puede ser una opción de tema/ACF Options Page).
4. Copiar `.env.example` a `.env` y definir `WORDPRESS_API_URL`.
5. Listo — `src/lib/wp.ts` empieza a consultar la API real automáticamente
   y deja de usar el contenido de respaldo (se nota porque desaparece el
   aviso amarillo "Modo contenido local").

## Estructura relevante

- `src/lib/wp.ts` — cliente headless (fetch a WP + fallback automático).
- `src/content/fallback.ts` — copia real del sitio actual, mientras no hay WP.
- `src/layouts/Layout.astro` — `<head>` con SEO (title/description/OG),
  preparado para reemplazarse por `yoast_head_json` cuando WP esté conectado.
- `src/components/` — Header, Hero, ServicesGrid, ContactSection, Footer.
- `src/pages/index.astro` — Home.

## Pendiente / próximos pasos

- Recibir afiche e info adicional de Raul para ampliar contenido y secciones.
- Definir arquitectura final de hosting (subdominio vs subcarpeta para WP admin).
- Páginas Empresa, Servicios (detalle), Proyectos, Contacto (formulario).
- Imágenes reales optimizadas (actualmente hay placeholders visuales).
- Paleta de marca definitiva (hoy: azul + acento cobre, provisional).
