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


## Gobernanza de Archivos de Superpowers (Carpeta Única `/specs`)
Cuando ejecutes los skills de `superpowers` (`brainstorming`, `writing-plans` o `verification-before-completion`):

1. **Carpeta Única Obligatoria (`/specs`):**
   - Ignora cualquier ruta por defecto del skill (`docs/plans/`, `docs/specs/` o `/walkthrough`).
   - Tanto las especificaciones como los informes de resultados deben guardarse exclusivamente dentro de la carpeta `/specs` en la raíz del proyecto.

2. **Nomenclatura y Numeración Correlativa (2 dígitos):**
   - Antes de crear un archivo, verifica el último número existente dentro de `/specs` y asigna el siguiente correlativo:
   - **Especificaciones / Planes:** `specs/spec01.md`, `specs/spec02.md`, `specs/spec03.md`, etc.
   - **Informes de Ejecución (Walkthroughs):** `specs/walkthrough01.md`, `specs/walkthrough02.md`, `specs/walkthrough03.md`, etc. (manteniendo exactamente el mismo número de la spec implementada).

3. **Estructura Mínima de cada archivo:**
   - **`specs/specXX.md`:** Objetivo, contrato de datos (`types/property.ts` + `@/data/properties.json`), tokens visuales (`DESIGN.md`), criterios de aceptación y alcance excluido.
   - **`specs/walkthroughXX.md`:** Referencia a `specs/specXX.md`, lista de archivos creados/editados, confirmación de respeto al contrato de tipos y 2 pruebas rápidas en `localhost:3000`.

## Puerta de Aprobación Obligatoria (Flujo en 2 Fases Separadas)
Cuando el usuario solicite diseñar o planificar una pantalla/funcionalidad:

1. **Fase 1 — SOLO Especificación (Detenerse al guardar):**
   - Ejecuta `brainstorming` (preguntas de aclaración) y `writing-plans`.
   - Guarda **únicamente** el archivo `specs/specXX.md`.
   - **PROHIBIDO** escribir, editar o crear archivos de código (`app/`, `components/`, `types/`, etc.) en esta fase, incluso si el usuario dice "apruebo el plan" dentro del flujo de `writing-plans`.
   - Al guardar `specs/specXX.md`, detente inmediatamente y responde:
     `"Documento specs/specXX.md creado. Revísalo, edítalo si deseas y dime 'implementa specXX' para ejecutar el código."`

2. **Fase 2 — Implementación (Solo bajo orden explícita):**
   - Procede a programar y generar `specs/walkthroughXX.md` **únicamente** cuando el usuario envíe una nueva instrucción explícita indicando `"implementa specXX"` o `"ejecuta specs/specXX.md"`.