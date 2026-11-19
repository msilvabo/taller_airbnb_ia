# Contrato de Arquitectura — Taller Airbnb IA

## Stack y Reglas Inmutables
1. **Framework:** Next.js 16.4.6 (App Router) + React 19.3, TypeScript estricto (`strict: true`) y Tailwind CSS 4.3.3 (plugin `@tailwindcss/turbopack`).
2. **Capa de Datos (Repository Pattern):**
   - Leer datos exclusivamente desde `@/data/properties.json` (4 propiedades semilla) respetando la interfaz `Property` en `types/property.ts`.
   - Prohibido usar `useEffect` o `fetch()` para cargar datos locales; priorizar Server Components. Datos e imágenes son estáticos: importar el JSON o leerlo en servidor.
3. **Imágenes:** Para evitar errores de dominios externos en `next/image`, usa etiquetas estándar `<img>` con clases de Tailwind (`object-cover w-full h-48`). No configurar `images.remotePatterns` en `next.config.ts`.
4. **Control de Alcance:**
   - Antes de modificar código, presenta un Plan breve (máximo 5 líneas) listando los archivos a crear o editar.
   - Al finalizar, entrega un resumen corto (Walkthrough) de los componentes creados.

## Mapa del Proyecto
- `app/` — App Router: `layout.tsx` (fuente Geist, `lang="es"`), `page.tsx` (Home mínima actual), `globals.css` (Tailwind v4 vía `@import "tailwindcss"`, sin `tailwind.config.js`).
- `components/` — **aún no existe**; crear ahí los componentes de UI (PascalCase, un archivo por componente).
- `data/properties.json` — fuente única de datos. Propiedades: `villa-serenity` (Luxe), `the-glass-pavilion` (Luxe), `modern-design-loft` (Ciudad), `nordic-forest-retreat` (Cabaña).
- `types/property.ts` — contrato `Property`; no modificar sin autorización explícita.
- `references/templates/{home,detalle,usuario,autentificacion}/` — `code.html` + `screen.png` de referencia visual. **Solo lectura:** nunca editarlos ni copiarlos tal cual; son inspiración, no código del proyecto.
- `specs/` — única carpeta para especificaciones y walkthroughs (ver gobernanza abajo).
- `public/` — assets estáticos; hoy solo SVGs de la plantilla.

## Contrato de Datos (`types/property.ts`)
- Campos obligatorios: `id`, `title`, `subtitle`, `description`, `pricePerNight`, `currency` (`'USD' | 'BOB'`), `category` (`'Luxe' | 'Cabaña' | 'Playa' | 'Montaña' | 'Ciudad'`), `location`, `rating`, `reviewsCount`, `specs`, `host`, `images`, `amenities`.
- Opcionales: `isFeatured?`, `isVerifiedLuxe?`.
- `specs`: `areaSqm`, `guests`, `bedrooms`, `bathrooms`, `garages`. `host`: `name`, `isSuperhost`, `yearsExperience`.
- Nunca inventar campos ni renombrar claves: si falta un dato, derivarlo en UI o pedir ampliación de contrato.
- Precios: formatear con `currency` (`USD` → `$`, `BOB` → `Bs`) y sufijo `/ noche`.

## Sistema Visual 
- Dark mode obligatorio: fondo `#0B0F17`, texto `text-slate-100`, selección coral.
- Superficies: tarjetas `#161F30` con glassmorphism (`backdrop-blur-md`, `border-white/10`), hover `#1C273C`, bordes `#27354A`.
- Marca: `#FF385C` (CTA, hover `#E00B41`), `#00A699` (verificado), `#FFB400` (estrellas/rating).
- Radios: `rounded-3xl` contenedores/galerías, `rounded-2xl` tarjetas internas e inputs, `rounded-xl` botones secundarios/badges, `rounded-full` píldoras y avatares.
- Layout global: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; header `sticky top-0 z-50 h-20` con glassmorphism.
- Tipografía objetivo: `Plus Jakarta Sans` (pesos 400–800). `app/layout.tsx` aún carga Geist: al implementar la primera pantalla real, migrar a `next/font/google` con Plus Jakarta Sans y ajustar `globals.css`. No mezclar ambas.

## Convenciones de Código
- Server Components por defecto; `"use client"` solo cuando haya estado, eventos o APIs de navegador.
- TypeScript estricto: nada de `any`; tipar props con `interface` y reutilizar `Property`.
- Componentes en `components/` (PascalCase); utilidades de formato en `lib/` si se necesitan (crear cuando aplique, no antes).
- Copy de UI en español; precios y metadatos en el formato del JSON.
- Sin librerías nuevas sin autorización (hoy solo Next, React y Tailwind).
- No agregar comentarios al código salvo que se soliciten.
- No tocar `references/`, `.opencode/`, `.agents/` ni `node_modules/` al implementar pantallas.

## Comandos de Verificación
- `npm run dev` → desarrollo en `http://localhost:3000`.
- `npx eslint app components --max-warnings=0` → lint del código propio (rápido y fiable).
- `npm run build` → verificación de compilación y prerender.
- `npm run lint` global puede fallar por scripts preexistentes en `.agents/skills/` (`no-require-imports`), ajenos al código de la app: no es un fallo del proyecto; no "arreglarlo" tocando esos skills.
- Antes de declarar algo terminado, ejecutar el comando que lo prueba y citar la salida real.

## Estado Actual
- `spec01` implementada: Home mínima (saludo + emoji) — ver `specs/spec01.md` y `specs/walkthrough01.md`.
- Pendiente: catálogo Home, detalle de propiedad, perfil de usuario y autenticación, guiados por `references/templates` + `data/properties.json`.
- El siguiente número correlativo en `/specs` se asigna al crear el archivo (`spec02`, `walkthrough02`, …).

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
   - **`specs/specXX.md`:** Objetivo, contrato de datos (`types/property.ts` + `@/data/properties.json`), tokens visuales, criterios de aceptación y alcance excluido.
   - **`specs/walkthroughXX.md`:** Referencia a `specs/specXX.md`, lista de archivos creados/editados, confirmación de respeto al contrato de tipos y 2 pruebas rápidas en `localhost:3000`.

## Flujo de Trabajo Obligatorio (3 Fases y Doble Puerta de Aprobación)
Cuando el usuario solicite diseñar, planificar o construir una pantalla o funcionalidad, debes seguir estrictamente este flujo de 3 fases:

1. **Fase 1 — Brainstorming y Consulta Exhaustiva (Aclaración previa):**
   - **OBLIGATORIO:** Inicia siempre con el skill `brainstorming`.
   - **Consultas activas al usuario:** No asumas nada. Pregunta y aclara exhaustivamente:
     - Datos o requisitos no especificados, ambiguos o incompletos.
     - Posibles mejoras, alternativas de UX/UI y flujos de interacción.
     - Aspectos a definir: decisiones de arquitectura, tecnologías, componentes, patrones o modos de trabajo.
   - **PROHIBIDO** redactar el spec o crear archivos sin antes resolver estas dudas con el usuario.
   - **Puerta de Aprobación 1 (Permiso para redactar el Spec):** Una vez consensuados todos los puntos del brainstorm, **debes solicitar permiso explícito al usuario antes de escribir el spec** con `writing-plans` (ej.: *"¿Estás de acuerdo con estos puntos? ¿Me autorizas a redactar `specs/specXX.md`?"*).

2. **Fase 2 — Especificación Formal (`specs/specXX.md`) (Detenerse al guardar):**
   - **Solo tras recibir autorización explícita para redactar el spec**, ejecuta `writing-plans` para formalizar la especificación.
   - Guarda **únicamente** el archivo `specs/specXX.md` (según la numeración correlativa en `/specs`).
   - **PROHIBIDO** escribir, editar o crear archivos de código (`app/`, `components/`, `types/`, `data/`, etc.) en esta fase.
   - **Puerta de Aprobación 2 (Permiso para Implementar):** Al guardar `specs/specXX.md`, detente inmediatamente sin tocar código y responde:
     `"Documento specs/specXX.md creado. Revísalo, edítalo si deseas y confírmame ('procede con el spec' o 'implementa specXX') para comenzar la implementación."`

3. **Fase 3 — Implementación y Verificación (Solo bajo orden explícita):**
   - Procede a programar en el código base y generar `specs/walkthroughXX.md` **únicamente** cuando el usuario envíe una orden explícita indicando `"procede con el spec"`, `"implementa specXX"` o `"ejecuta specs/specXX.md"`.
   - La implementación debe el contrato de `Property`.
   - Al finalizar, ejecuta la verificación (`npx eslint app components --max-warnings=0`, `npm run build`), genera el walkthrough y documenta la evidencia real.


## Git y Archivos Ajenos
- No hacer commit, push ni PR sin instrucción explícita.
- Hay archivos temporales ajenos al proyecto en la raíz (`y41156a1b0 ….mp4.part`, `.ytdl`): no agregarlos, moverlos ni commitearlos.
- **Control de Git:** Prohibido ejecutar `git commit` o `git push` automáticamente. Deja los cambios sin commitear para revisión manual del usuario.
