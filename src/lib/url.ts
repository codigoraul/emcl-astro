// Prefija rutas absolutas con la "base" configurada en astro.config.mjs.
// Con base '/prueba' => withBase('/contacto') === '/prueba/contacto'
// Sin base (producción en raíz) => withBase('/contacto') === '/contacto'
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  return `${base}${path}`;
}
