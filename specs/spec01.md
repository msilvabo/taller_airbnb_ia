# Spec 01 — Pantalla principal (Home) mínima

## Objetivo
Reemplazar la plantilla inicial de Next.js en `app/page.tsx` por una Home estática y sencilla: un texto de saludo y, debajo, un gato en emoji. Server Component, sin estado ni interactividad.

## Contrato de datos
- **No aplica.** Esta pantalla no consume `types/property.ts` ni `@/data/properties.json`.
- Prohibido introducir `useEffect`, `fetch()` o llamadas a APIs: todo el contenido es literal en el JSX.

## Tokens visuales (DESIGN.md)
- Fondo base: `#0B0F17`.
- Títulos: `text-white`; texto secundario: `text-slate-400` (`#94A3B8`).
- Layout centrado a pantalla completa: `min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center`.
- Gato: emoji `🐱` con `text-[8rem] leading-none` y `aria-label="Gato"` mediante `role="img"`.
- Sin `next/image` (no hay archivo de imagen), sin dependencias nuevas.

## Criterios de aceptación
1. `app/page.tsx` no conserva ningún elemento de la plantilla de Next.js (logos, enlaces a Vercel, textos de documentación).
2. Se muestra un saludo (`h1`) y, debajo, el emoji de gato (`span` con `role="img"`).
3. La pantalla queda centrada vertical y horizontalmente en móvil y desktop.
4. `app/layout.tsx` declara `lang="es"` y metadata propia (`title`, `description`).
5. `npm run lint` y `npm run build` terminan sin errores.

## Alcance excluido
- Imágenes reales o SVG dibujados del gato.
- Navegación, header, footer, botones o animaciones.
- Listado de propiedades, consumo de datos locales o cualquier lógica de negocio.
