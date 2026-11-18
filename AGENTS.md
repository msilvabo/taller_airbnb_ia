# Contrato de Arquitectura — Taller Airbnb IA

## Stack y Reglas Inmutables
1. **Framework:** Next.js (App Router), TypeScript estricto y Tailwind CSS.
2. **Capa de Datos (Repository Pattern):**
   - Leer datos exclusivamente desde `@/data/properties.json` respetando la interfaz `Property` en `types/property.ts`.
   - Prohibido usar `useEffect` o `fetch()` para cargar datos locales; priorizar Server Components.
3. **Imágenes:** Para evitar errores de dominios externos en `next/image`, usa etiquetas estándar `<img>` con clases de Tailwind (`object-cover w-full h-48`).
4. **Control de Alcance:**
   - Antes de modificar código, presenta un Plan breve (máximo 5 líneas) listando los archivos a crear o editar.
   - Al finalizar, entrega un resumen corto (Walkthrough) de los componentes creados.