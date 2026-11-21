# Spec 02 — Pantalla Principal (Home) Catálogo Completo

## Objetivo
Implementar la pantalla principal (Home) completa del proyecto reproduciendo fielmente el diseño visual, espaciado y estructura de `references/templates/home/screen.png` y `references/templates/home/code.html`.
Reemplazar el contenido mínimo actual de `app/page.tsx`, migrar la tipografía en `app/layout.tsx` a `Plus Jakarta Sans`, configurar los tokens de diseño dark mode en `app/globals.css`, y descomponer la interfaz en Server Components modulares y reutilizables en `components/`.

---

## Contrato de Datos y Repositorio
- **Fuente única:** Leer exclusivamente desde `@/data/properties.json` importándolo directamente en servidor (`import propertiesData from '@/data/properties.json'`).
- **Tipado estricto:** Tipar la colección con `Property[]` importada de `types/property.ts`. Prohibido el uso de `any` o modificar `types/property.ts`.
- **Prohibición de hooks de carga:** Prohibido usar `useEffect`, `useState` para datos o `fetch()` para leer el JSON. Renderizado 100% Server Components.
- **Mapeo de Colecciones:**
  - **Colección Signature (Alojamientos destacados):** Filtrar `properties.filter(p => p.isFeatured)` (coinciden exactamente las 2 propiedades con `isFeatured: true`: `villa-serenity` y `the-glass-pavilion`).
  - **Nuevos en el mercado (Grid 4 columnas):** Mapear las 4 propiedades semilla del JSON (`villa-serenity`, `the-glass-pavilion`, `modern-design-loft`, `nordic-forest-retreat`) como tarjetas estándar.
- **Formato de Precios:** Moneda dinámica según `currency`: `USD` → `$`, `BOB` → `Bs`, sufijo `/ noche`. Total calculado derivado cuando aplique o precio por noche base.
- **Imágenes:** Uso exclusivo de etiquetas nativas `<img>` con clases de Tailwind (`w-full h-full object-cover`). Prohibido usar `next/image` y prohibido configurar `images.remotePatterns` en `next.config.ts`.
- **Navegación:** Los enlaces de las tarjetas y botones "Reservar" deben apuntar a `/propiedad/${property.id}` mediante el componente `Link` de `next/link`.

---

## Tokens Visuales y Estilos Globales
- **Fondo general:** `#0B0F17` aplicado en el `body`.
- **Superficies y Tarjetas:** Fondo `#151D2A` con bordes `#233044` (o con opacidad `border-[#233044]/80`). Estados hover en `#1B2637` y transiciones suaves (`transition-all duration-300`).
- **Colores de Marca y Acentos:**
  - Marca / CTA / Activo: `#FF385C` con hover `#E00B41`.
  - Acentos de Lujo / Verificación: Esmeralda `#10B981` / `#34D399` (`text-emerald-400`, `bg-emerald-400`).
  - Rating / Estrellas: `#FFB400` o `#34D399` según la coherencia con el template (`★` con valor numérico y total de reseñas).
- **Tipografía:** Migración obligatoria a `Plus Jakarta Sans` en `app/layout.tsx` usando `next/font/google` con pesos 400 a 800 y variable CSS `--font-plus-jakarta-sans`.
- **Radios de bordes:**
  - `rounded-3xl` para tarjetas destacadas y contenedor de búsqueda en desktop.
  - `rounded-2xl` para tarjetas estándar de grid y campos de input.
  - `rounded-full` para píldoras de navegación, botones circulares, avatares y badges.
- **Contenedor Principal:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## Descomposición Modular de Componentes

### 1. `app/layout.tsx` y `app/globals.css`
- **`app/layout.tsx`:**
  - Reemplazar `Geist` por `Plus_Jakarta_Sans` de `next/font/google` (`subsets: ["latin"]`, `weight: ["400", "500", "600", "700", "800"]`, `variable: "--font-plus-jakarta-sans"`).
  - Configurar `html` con `lang="es"`, clase `dark`, y `className={`${plusJakartaSans.variable} font-sans`}`.
  - Metadata: Título `LuxeStay — Alojamientos Exclusivos & Alquiler Vacacional Premium`.
- **`app/globals.css`:**
  - Mantener `@import "tailwindcss";`.
  - Configurar `@theme inline { --font-sans: var(--font-plus-jakarta-sans); }`.
  - Definir `body` con `bg-[#0B0F17] text-slate-100 antialiased min-h-screen selection:bg-[#FF385C] selection:text-white`.
  - Agregar utilidades para ocultar scrollbars horizontales en filtros (`.hide-scrollbar`).

### 2. `components/Header.tsx` (Server Component)
- `header` sticky con `sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#233044]/60 h-20`.
- **Logo:** SVG de Airbnb en `#FF385C` con texto `airbnb` blanco (`font-bold tracking-tight text-xl`).
- **Navegación central:** Píldora con enlaces (`Alojamientos` con fondo `#FF385C` activo, `Experiencias`, `Villas & Áticos`, `Departamentos` con hover sutil).
- **Acciones derecha:**
  - Enlace `"Pon tu espacio en Airbnb"`.
  - Botón de selector de idioma/moneda (icono globo terráqueo).
  - Botón de notificaciones (icono campana con punto indicador esmeralda pulsante).
  - Píldora de usuario con icono menú hamburguesa y avatar con iniciales `"JS"` sobre degradado.

### 3. `components/HeroSearch.tsx` (Server Component)
- Contenedor centrado con título: `"Encuentra tu "` + `<span class="italic font-normal text-emerald-400 underline decoration-emerald-500/40">mejor estadía</span>` + `"."`.
- Subtítulo: `"Alojamientos de diseño, residencias de descanso y estancias extraordinarias con verificación premium."`.
- **Barra de búsqueda flotante:** Píldora dividida (`divide-y md:divide-y-0 md:divide-x divide-[#233044]`) con 3 secciones:
  1. *Dónde:* Label en mayúsculas coral (`text-[#FF385C]`), valor o placeholder `"Explora destinos (ej. Cancún, Miami)"`.
  2. *Fechas:* Label en mayúsculas coral, texto `"14 nov. — 20 nov. (6 noches)"`.
  3. *Quién / Huéspedes:* Label en mayúsculas coral, texto `"2 huéspedes · 1 habitación"`.
  4. *Botón Buscar:* Fondo `#FF385C` con hover `#E00B41`, icono lupa blanca y texto `"Buscar"`.

### 4. `components/CategoryFilters.tsx` (Server Component)
- Scroll horizontal sin barra visible (`hide-scrollbar`) con píldoras de categorías alineadas estrictamente al contrato de tipos:
  - `"Todo"` (activo por defecto con borde y texto `#FF385C`, fondo `#FF385C/10`).
  - `"Luxe"` (icono SVG alusivo / corona o villa).
  - `"Cabaña"` (icono SVG cabaña/árbol).
  - `"Playa"` (icono SVG ola/sol).
  - `"Montaña"` (icono SVG montaña).
  - `"Ciudad"` (icono SVG edificios).
- Botón lateral derecho `"Filtros avanzados"` con icono de ajustes.

### 5. `components/FeaturedProperties.tsx` y `components/FeaturedCard.tsx` (Server Components)
- Encabezado de sección con indicador esmeralda y badge `"Colección Signature"`.
- Título: `"Alojamientos destacados para tus fechas"` y descripción.
- Controles visuales circulares anterior/siguiente.
- Grid de 2 columnas (`grid-cols-1 lg:grid-cols-2 gap-8`).
- **`FeaturedCard`:**
  - Contenedor con `rounded-3xl`, imagen de altura `h-72 sm:h-84` con `object-cover`, gradiente overlay inferior.
  - Badges sobre la imagen: `★ Favorito de huéspedes` y `Superanfitrión` (si `host.isSuperhost`).
  - Botón corazón (favorito) superior derecho.
  - Badge de disponibilidad (`Disponible del 14 al 20 nov.`) y contador fotos (`1/${property.images.length || 1} fotos`).
  - Ubicación con icono de pin (`property.location`).
  - Rating con estrella y número de reseñas (`★ ${property.rating} (${property.reviewsCount} reseñas)`).
  - Título (`property.title`) con hover en esmeralda.
  - Píldoras de especificaciones: `${property.specs.guests} huéspedes`, `${property.specs.bedrooms} habitaciones`, más las dos primeras amenidades de `property.amenities`.
  - Footer de precio: `${property.currency === 'USD' ? '$' : 'Bs'}${property.pricePerNight} ${property.currency} / noche` y cálculo total referencial.
  - Botón `"Reservar"` enlazado con `Link` a `/propiedad/${property.id}`.

### 6. `components/PropertyGrid.tsx` y `components/PropertyCard.tsx` (Server Components)
- Encabezado: `"Nuevos en el mercado con reserva inmediata"` y subtítulo.
- Tabs de filtro visuales: `"Todos"` (activo coral), `"Menos de $50/noche"`, `"Suites y Condos"`.
- Grid responsivo de 4 columnas: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.
- **`PropertyCard`:**
  - Contenedor con `rounded-2xl`, imagen en proporción `aspect-4/3` con zoom en hover (`group-hover:scale-105 transition-transform`).
  - Badge sobre imagen: `"Reserva Inmediata"` o `"Superanfitrión"`.
  - Botón corazón en esquina superior derecha.
  - Ubicación (`property.location`) y rating en esmeralda/amarillo (`★ ${property.rating}`).
  - Título en una sola línea truncada (`line-clamp-1 font-semibold text-white`).
  - Resumen de specs: `${property.specs.bedrooms} hab · ${property.specs.bathrooms} baños · ${property.category}`.
  - Footer con precio formateado `${property.currency === 'USD' ? '$' : 'Bs'}${property.pricePerNight} ${property.currency} / noche` y rango de fechas.
  - Enlace envolvente o de navegación a `/propiedad/${property.id}`.
- Botón inferior centrado: `"Cargar más propiedades exclusivas"`.

### 7. `components/Footer.tsx` (Server Component)
- `footer` con fondo `#080C12` y borde superior `border-t border-[#233044]/80`.
- 4 columnas temáticas en grid (`grid-cols-2 md:grid-cols-4 gap-8`):
  1. *Soporte y Asistencia:* Centro de ayuda, AirCover para huéspedes, Cancelaciones flexibles, Accesibilidad, Limpieza.
  2. *Comunidad:* Airbnb Diversidad, Estancias para emergencias, Reseñas, Recompensas.
  3. *Anfitriones:* Pon tu alojamiento, AirCover para anfitriones, Recursos de hospedaje, Foro.
  4. *Airbnb:* Sala de prensa, Nuevas funciones, Carreras e inversionistas, Airbnb Plus Exclusive.
- Barra inferior: Copyright (`© 2025 Airbnb, Inc.`), enlaces de Privacidad, Términos, Mapa del sitio, selector de idioma (`Español (BO)`) y moneda (`$ USD`).

### 8. `app/page.tsx` (Server Component principal)
- Carga `properties` de `@/data/properties.json`.
- Renderiza en orden semántico:
  ```tsx
  <Header />
  <main className="pb-24">
    <HeroSearch />
    <CategoryFilters />
    <FeaturedProperties properties={featuredProperties} />
    <PropertyGrid properties={allProperties} />
  </main>
  <Footer />
  ```

---

## Criterios de Aceptación
1. **Fidelidad Visual:** La Home reproduce fielmente el diseño, colores, fuentes, glassmorphism y disposición observada en `references/templates/home/screen.png` y `references/templates/home/code.html`.
2. **Cumplimiento de Tipos:** No se altera `types/property.ts`, no se utiliza `any` y se respetan estrictamente los campos existentes en el dataset.
3. **Cero `next/image`:** Todas las imágenes emplean etiquetas `<img>` nativas con clases de Tailwind correspondientes.
4. **Server Components:** Todos los componentes se renderizan del lado del servidor sin errores de hidratación ni dependencias de hooks no autorizados.
5. **Tipografía Unificada:** `Plus Jakarta Sans` queda cargada desde `next/font/google` y aplicada en toda la app sin rastros de `Geist`.
6. **Verificación Técnica:** `npm run build` ejecuta y finaliza con código de salida 0 (verificación exclusiva de compilación y tipado).

---

## Alcance Excluido
- Implementación de la pantalla de detalle de propiedad en `/propiedad/[id]` (pertenece a la siguiente especificación `spec03`).
- Persistencia o estado global para filtros de búsqueda o favoritos.
- Conexión a bases de datos o APIs externas.
