# Walkthrough 01 — Home mínima con saludo y gato

Implementa `specs/spec01.md`.

## Archivos creados / editados
- **Creado:** `specs/spec01.md` — especificación del cambio.
- **Creado:** `specs/walkthrough01.md` — este informe.
- **Editado:** `app/page.tsx` — Home estática: `<h1>` de saludo, emoji `🐱` con `role="img"` y `aria-label="Gato"`, párrafo secundario. Fondo `#0B0F17`, layout centrado `min-h-screen`.
- **Editado:** `app/layout.tsx` — `lang="es"` y metadata `title: "Inicio"` / `description` propia.

## Contrato de tipos
Respetado: la pantalla no consume `types/property.ts` ni `@/data/properties.json`, no usa `useEffect`, `fetch()` ni `next/image`. Sin dependencias nuevas.

## Verificación
- `npx eslint app --max-warnings=0` → sin salida (limpio).
- `npm run build` → `✓ Compiled successfully`, ruta `/` prerenderizada como estática.
- `npm run lint` global → falla solo por scripts preexistentes en `.agents/skills/brainstorming/scripts/` (`no-require-imports`), ajenos a este cambio.

## 2 pruebas rápidas en `localhost:3000`
1. **Contenido servido:** `npm run start` + `curl http://localhost:3000` devuelve el `<h1>Hola, bienvenido</h1>`, el `<span role="img" aria-label="Gato">🐱</span>` y el `<title>Inicio</title>` con `lang="es"`.
2. **Layout centrado:** al abrir `http://localhost:3000` en móvil y desktop, saludo arriba, gato debajo y párrafo al final, todo centrado vertical y horizontalmente sobre fondo oscuro.
