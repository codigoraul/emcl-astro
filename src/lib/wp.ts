/**
 * Cliente headless de WordPress para EMCL.
 *
 * Mientras el WordPress headless (emcl.cl/admin o el subdominio que se defina)
 * no esté publicado, este módulo sirve datos "fallback" que replican el
 * contenido real del sitio actual (src/content/fallback.ts), con la MISMA
 * forma (shape) que devolverá la API real. Así, cuando WP esté listo, solo
 * hay que:
 *   1. Definir WORDPRESS_API_URL en variables de entorno (.env)
 *   2. Confirmar los slugs de los custom post types / ACF-REST o
 *      instalar el plugin "Yoast SEO REST API" para exponer meta/schema.
 *
 * No se requiere tocar los componentes .astro: siguen llamando a
 * getServices() / getContactInfo() / getSeoMeta() igual que hoy.
 */

export interface WPService {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string[];
  icon?: string;
  image?: string;
  order?: number;
}

export interface WPContactInfo {
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  city: string;
  region: string;
  phoneSecondary?: string;
  socials: { label: string; url: string }[];
}

export interface WPSeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const WORDPRESS_API_URL = import.meta.env.WORDPRESS_API_URL as string | undefined;

/**
 * true mientras no haya WORDPRESS_API_URL configurada: usa el contenido
 * de respaldo (fallback) en vez de llamar a la API real.
 */
export const USING_FALLBACK_CONTENT = !WORDPRESS_API_URL;

async function wpFetch<T>(path: string): Promise<T | null> {
  if (!WORDPRESS_API_URL) return null;
  try {
    const res = await fetch(`${WORDPRESS_API_URL.replace(/\/$/, '')}${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      console.warn(`[wp] ${path} respondió ${res.status}, usando fallback`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[wp] error consultando ${path}, usando fallback:`, err);
    return null;
  }
}

export async function getServices(): Promise<WPService[]> {
  // Ruta esperada una vez exista el CPT "servicios" en WP:
  // GET /wp-json/wp/v2/servicios?_embed
  const remote = await wpFetch<WPService[]>('/wp-json/emcl/v1/servicios');
  if (remote) return remote;
  const { fallbackServices } = await import('../content/fallback');
  return fallbackServices;
}

export async function getContactInfo(): Promise<WPContactInfo> {
  // Ruta esperada: GET /wp-json/emcl/v1/contacto (endpoint REST custom)
  const remote = await wpFetch<WPContactInfo>('/wp-json/emcl/v1/contacto');
  if (remote) return remote;
  const { fallbackContact } = await import('../content/fallback');
  return fallbackContact;
}

/**
 * Metadatos SEO por página. Cuando exista el plugin "Yoast SEO REST API",
 * cada tipo de contenido de WP expone su meta Yoast en el campo `yoast_head_json`
 * dentro de la respuesta de /wp-json/wp/v2/<tipo>/<id>. Aquí se deja el
 * fallback con los textos actuales para no perder posicionamiento.
 */
export async function getSeoMeta(pageSlug: string): Promise<WPSeoMeta> {
  const remote = await wpFetch<WPSeoMeta>(`/wp-json/emcl/v1/seo/${pageSlug}`);
  if (remote) return remote;
  const { fallbackSeo } = await import('../content/fallback');
  return fallbackSeo[pageSlug] ?? fallbackSeo.home;
}
