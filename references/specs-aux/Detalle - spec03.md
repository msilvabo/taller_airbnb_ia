# Spec 03 — Pantalla de Detalle de Propiedad (`/propiedad/[id]`)

## Objetivo
Implementar la pantalla dinámica completa de Detalle de Propiedad en la ruta `app/propiedad/[id]/page.tsx`, reproduciendo con exactitud milimétrica el diseño visual, jerarquía, glassmorphism y paleta oscura de `references/templates/detalle/screen.png` y `references/templates/detalle/code.html`.
La pantalla debe consumir los datos de cualquier propiedad existente en `@/data/properties.json` (incluyendo `villa-serenity`), generar páginas estáticas en build mediante `generateStaticParams()`, manejar propiedades inexistentes con `notFound()`, y organizar la interfaz en Server Components modulares bajo `components/property-detail/`.

---

## Contrato de Datos y Repositorio
- **Fuente única:** Importar los datos desde `@/data/properties.json` (`import propertiesData from '@/data/properties.json'`).
- **Tipado estricto:** Tipar la propiedad con `Property` importada de `types/property.ts`. Prohibido el uso de `any` o modificar `types/property.ts`.
- **Ruta dinámica:** `app/propiedad/[id]/page.tsx` donde `params` se resuelve como `Promise<{ id: string }>` acorde a Next.js 15/16 App Router.
- **Validación 404:** Si el `id` no coincide con ninguna entidad del JSON, invocar inmediatamente `notFound()` de `next/navigation`.
- **Pre-renderizado estático:** Exportar `generateStaticParams()` retornando todos los IDs disponibles:
  ```ts
  export function generateStaticParams() {
    return propertiesData.map((property) => ({ id: property.id }));
  }
  ```
- **Metadata dinámica:** Exportar `generateMetadata({ params })` para renderizar el título con el formato: `${property.title} · ${property.location.split(',')[0]} | Airbnb Luxe`.
- **Imágenes:** Uso exclusivo de etiquetas estándar `<img>` con clases de Tailwind (`w-full h-full object-cover`). Prohibido usar `next/image` y prohibido configurar `images.remotePatterns` en `next.config.ts`.
- **Sin hooks ni estado cliente:** Renderizado 100% Server Components en todas las secciones principales.

---

## Tokens Visuales y Estilos de Referencia
- **Fondo base:** `#0B0F17` (`bg-[#0B0F17]`).
- **Superficies y Tarjetas:** `#161F30` (`bg-[#161F30]`) con bordes `#27354A` (`border-[#27354A]`), hover `#1C273C` y glassmorphism `backdrop-blur-md`.
- **Colores de Marca:**
  - Coral Airbnb (CTA y activo): `#FF385C` con degradado `from-[#FF385C] to-rose-500` y hover `#E00B41`.
  - Teal / Esmeralda Luxe (Verificación, badges y acentos): `#00A699` / `#10B981` (`text-teal-300`, `text-emerald-400`, `bg-teal-500/15`, `border-teal-500/30`).
  - Oro / Rating: `#FFB400` (`text-[#FFB400]` o `text-amber-300`).
- **Tipografía:** `Plus Jakarta Sans` con jerarquía de pesos clara (400 regular, 500 medium, 600 semibold, 700 bold, 800/900 extrabold).
- **Iconografía:** Todos los iconos deben ser SVGs inline limpios optimizados con clases Tailwind. Prohibido enlazar FontAwesome o librerías por CDN externo.
- **Contenedor Principal:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8`.

---

## Descomposición Modular de Componentes

### 1. `components/Header.tsx` y `components/Footer.tsx` (Reutilizados)
- Se reutilizan directamente los componentes globales creados en `spec02`, manteniendo la barra de navegación superior sticky (`h-20`) y el pie de página completo de 4 columnas.

### 2. `components/property-detail/PropertyDetailHeader.tsx` (Server Component)
- **Badges superiores:**
  - `★ Favorito entre huéspedes` (si `property.rating >= 4.9`, con fondo `#FF385C/15`, texto `#FF385C`, borde `#FF385C/30`).
  - `Airbnb Luxe Verified` (si `property.isVerifiedLuxe`, con fondo `teal-500/15`, texto `teal-300`, borde `teal-500/30`).
  - `Superanfitrión` (si `property.host.isSuperhost`, con fondo `amber-500/15`, texto `amber-300`, borde `amber-500/30`).
- **Título Principal (H1):** `${property.title}` (`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight`).
- **Subtítulo de Metadatos:**
  - Calificación destacada: `★ ${property.rating}` (`text-white font-semibold flex items-center gap-1`).
  - Enlace a evaluaciones: `· ${property.reviewsCount} evaluaciones verificadas` (enlace con subrayado a `#reviews`).
  - Ubicación con icono de pin: `· ${property.location}`.
- **Acciones laterales:**
  - Botón `"Compartir"` con icono de subida/compartir.
  - Botón `"Guardar"` con icono de corazón en tono rosa/coral.

### 3. `components/property-detail/PropertyGallery.tsx` (Server Component)
- **Visor Hero Principal:**
  - Altura `h-[360px] sm:h-[480px] lg:h-[560px]`, contenedor con `rounded-3xl border border-[#27354A] overflow-hidden relative shadow-2xl group`.
  - Imagen principal: `property.images[0]` con `w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700`.
  - Overlay de degradado inferior: `bg-gradient-to-t from-[#0B0F17]/80 via-transparent to-black/30 pointer-events-none`.
  - Badges flotantes esquina superior izquierda: `PREMIUM` (esmeralda backdrop) y `NEW` (superficie oscura).
  - Botón flotante esquina inferior derecha: `"Mostrar todas las fotos (28)"` con icono de cuadrícula (grip) y efecto glassmorphism.
- **Tira de 4 Miniaturas Secundarias:**
  - Grid de 4 columnas (`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4`).
  - Tarjetas de altura `h-28 sm:h-36 rounded-2xl overflow-hidden border border-[#27354A] relative shadow-md group cursor-pointer`.
  - Imágenes: utilizar `property.images[1]` si existe, o `property.images[0]` con distintos encuadres focales (`object-left`, `object-center`, `object-right`, `object-top`) y zoom en hover.
  - Etiquetas flotantes inferiores: `"Entrada"`, `"Living Room"`, `"Cocina Chef"`, `"Suite Master"`.

### 4. Layout a Dos Columnas (`grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4`)
- **Columna Izquierda Principal (`lg:col-span-7 xl:col-span-8 space-y-10`):**
  - Specs, Anfitrión, Descripción, Amenidades, Ubicación/Mapa, Evaluaciones.
- **Columna Derecha Sticky (`lg:col-span-5 xl:col-span-4`):**
  - Sidebar con tarjeta de reserva sticky.

---

### 5. `components/property-detail/PropertySpecs.tsx` (Server Component)
- Contenedor: `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] shadow-xl`.
- Título con icono de formas geométricas: `"Características de la propiedad"`.
- Grid de 4 bloques (`grid grid-cols-2 sm:grid-cols-4 gap-4`):
  1. *Metros Cuadrados:* Icono regla/superficie en caja teal, valor `${property.specs.areaSqm}`, etiqueta mayúscula `"Metros Cuadrados"`.
  2. *Habitaciones:* Icono cama en caja teal, valor `${property.specs.bedrooms}`, etiqueta `"Habitaciones"`.
  3. *Baños Completos:* Icono ducha en caja teal, valor `${property.specs.bathrooms}`, etiqueta `"Baños Completos"`.
  4. *Garajes:* Icono auto en caja teal, valor `${property.specs.garages}`, etiqueta `"Garajes (Carga EV)"`.

### 6. `components/property-detail/PropertyHost.tsx` (Server Component)
- Contenedor `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] space-y-6`.
- **Encabezado del anfitrión:**
  - Título H2: `${property.subtitle} · Anfitrión: ${property.host.name}`.
  - Subtexto: `${property.specs.guests} huéspedes · ${property.specs.bedrooms} habitaciones · ${property.specs.bedrooms} camas · ${property.specs.bathrooms} baños de lujo`.
  - Avatar circular con borde coral y anillo de resplandor; indicador o iniciales (`${property.host.name.split(' ').map(n=>n[0]).join('')}`).
- **4 Pilares de Calidad Airbnb Luxe (Grid de 2 columnas `md:grid-cols-2 gap-4`):**
  1. *Superanfitrión:* Icono medalla coral. `${property.host.name} es Superanfitriona` con texto `"Los Superanfitriones cuentan con ${property.host.yearsExperience} años de experiencia y excelentes calificaciones constantes."`.
  2. *Llegada autónoma:* Icono llave teal. `"Llegada autónoma sin contacto"` con texto `"Accede cómodamente a la propiedad mediante cerradura inteligente cifrada de última generación."`.
  3. *Cancelación flexible:* Icono calendario verde. `"Cancelación flexible"` con texto `"Reembolso del 100% cancelando hasta 48 horas antes de la fecha fijada de llegada."`.
  4. *AirCover Luxe:* Icono escudo índigo. `"Cobertura AirCover Luxe"` con texto `"Protección de reserva y soporte de conserjería VIP 24/7 incluido de forma gratuita."`.

### 7. `components/property-detail/PropertyAbout.tsx` (Server Component)
- Contenedor `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] space-y-4`.
- Título H2: `"Acerca de este alojamiento"`.
- Párrafos formateados con texto `${property.description}` y extensión arquitectónica fiel al diseño.
- Botón enlace interactivo visual: `"Mostrar más detalles sobre la distribución"` con flecha animada en hover.

### 8. `components/property-detail/PropertyAmenities.tsx` (Server Component)
- Contenedor `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] space-y-6`.
- Encabezado con título `"Comodidades y servicios incluidos"` y badge superior con total de servicios.
- Grid de 2 columnas (`grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6`):
  - Renderizar las amenidades propias de `property.amenities`.
  - Complementar con comodidades estándar de lujo del template (Wifi de fibra óptica ultrarrápido, Climatización central, Smart Home, Jacuzzi exterior, Purificadores HEPA, Cava de vinos) hasta sumar 8 ítems.
  - Cada elemento luce un checkmark verde dentro de un círculo `bg-emerald-500/15 text-emerald-400`.
- Botón inferior `"Mostrar todos los servicios y comodidades"`.

### 9. `components/property-detail/PropertyLocation.tsx` (Server Component)
- Contenedor `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] space-y-6`.
- Título `"Ubicación y Entorno"`, descripción con `${property.location}` y badge de referencia de distancia local.
- **Gráfico de Mapa Estilizado:**
  - Altura `h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#27354A] relative bg-slate-900`.
  - Imagen cartográfica o de entorno con filtro oscuro (`brightness-75 contrast-125 saturate-50`).
  - Overlay de degradado oscuro.
  - Pin de ubicación animado (`animate-bounce`) centrado con el icono de casa sobre fondo coral `#FF385C` con sombra pronunciada.
  - Botón flotante inferior derecho: `"Ver en Google Maps"` con icono de mapa.

### 10. `components/property-detail/PropertyReviews.tsx` (Server Component)
- Contenedor `bg-[#161F30] rounded-3xl p-6 sm:p-8 border border-[#27354A] space-y-6` con ancla `id="reviews"`.
- Encabezado con estrella dorada `#FFB400` y título `${property.rating} · ${property.reviewsCount} evaluaciones`.
- **Matriz de 6 Dimensiones de Calidad (Grid 2 o 3 columnas):**
  - Factores: *Limpieza* (4.9), *Precisión* (5.0), *Comunicación* (4.9), *Ubicación* (5.0), *Llegada* (5.0), *Calidad-precio* (4.8).
  - Cada factor incluye etiqueta, calificación numérica y barra de progreso esmeralda sobre fondo oscuro.
- **Testimonio Destacado:**
  - Avatar circular con iniciales `"MR"`, nombre *"Mateo Ramírez"*, metadatos de estancia (*"hace 3 semanas · Se alojó 5 noches"*), y cita textual elogiosa sobre el alojamiento.

### 11. `components/property-detail/PropertyBookingCard.tsx` (Server Component)
- Contenedor `aside` en la columna derecha con `sticky top-28 space-y-6`.
- **Tarjeta Principal de Reserva:**
  - Fondo `bg-[#161F30] rounded-3xl p-6 sm:p-7 border border-[#27354A] shadow-2xl space-y-6 relative overflow-hidden`.
  - Resplandor difuso de fondo coral (`bg-[#FF385C]/10 rounded-full blur-3xl pointer-events-none`).
  - **Cabecera de Precio:**
    - Precio por noche: `${property.currency === 'USD' ? '$' : 'Bs'}${property.pricePerNight.toLocaleString()} ${property.currency} / noche`.
    - Calificación con estrella dorada: `★ ${property.rating} (${property.reviewsCount})`.
  - **Bloque de Selección de Fechas y Huéspedes:**
    - Caja con bordes `#27354A` y fondo `#0B0F17/80` dividida en dos filas:
      - Fila 1 (Llegada / Salida en 2 columnas): Labels en mayúsculas pequeñas, fechas simuladas (`14 nov. 2025` y `20 nov. 2025`).
      - Fila 2 (Huéspedes con chevron down): Label `"Huéspedes"`, texto `Hasta ${property.specs.guests} huéspedes`.
  - **Botón CTA Principal:**
    - Botón ancho completo con degradado coral `from-[#FF385C] via-rose-500 to-[#FF385C] hover:from-[#E00B41] hover:to-rose-600`, texto `"Reservar Estancia"`, icono de calendario y texto secundario centrado `"No se te cobrará nada aún"`.
  - **Desglose de Costos Dinámico (6 noches referenciales):**
    - Subtotal estancia: `${symbol}${(price * 6).toLocaleString()} ${currency}` (cálculo de 6 noches).
    - Tarifa de limpieza profesional: `${symbol}${Math.round(price * 0.15).toLocaleString()} ${currency}`.
    - Tarifa por servicio Airbnb Luxe: `${symbol}${Math.round(price * 0.30).toLocaleString()} ${currency}`.
    - Línea divisoria y fila de total: `"Total antes de impuestos"` con precio resaltado en coral `${symbol}${(price * 6 + Math.round(price * 0.15) + Math.round(price * 0.30)).toLocaleString()} ${currency}`.
  - **Sección de Contacto Directo con el Anfitrión:**
    - Fila con avatar del anfitrión, nombre `${property.host.name}`, badge `"Top Rated Superhost"`, botones para mensaje y llamada, y botón secundario ancho `"Contactar al anfitrión"`.
- **Caja de Tarifa Mensual Especial:**
  - Tarjeta redondeada inferior con icono de calculadora teal, texto `"Tarifa mensual especial - Desde ${symbol}${(price * 20).toLocaleString()}/mes (-25% dto.)"` y botón `"Ver estancias"`.
- **Enlace de Seguridad:**
  - Enlace discreto `"Denunciar este anuncio ante Airbnb"` con icono de bandera.

---

## Criterios de Aceptación
1. **Fidelidad Visual Total:** La pantalla renderizada en `/propiedad/villa-serenity` reproduce con exactitud cada sección, proporción, color, tipografía y detalle visual de `references/templates/detalle/screen.png` y `references/templates/detalle/code.html`.
2. **Generación Estática:** `generateStaticParams()` pre-genera correctamente todas las rutas de los IDs presentes en `properties.json` durante `npm run build`.
3. **Manejo de Errores (404):** Navegar a `/propiedad/id-inexistente` activa la página `notFound()`.
4. **Respeto a los Contratos:** Se preserva intacto `types/property.ts` sin usar `any`.
5. **Cero `next/image`:** Todas las imágenes emplean etiquetas nativas `<img>` con clases de Tailwind.
6. **Cero Dependencias Externas:** No se incluye FontAwesome por CDN ni librerías externas adicionales; toda la iconografía se resuelve con SVGs inline.
7. **Verificación Técnica:** `npm run build` ejecuta y finaliza con código de salida 0 (verificación exclusiva de compilación y tipado).

---

## Alcance Excluido
- Formulario de checkout real o pasarela de pagos.
- Envío real de mensajes o llamadas al anfitrión.
- Datepicker interactivo con bloqueo de calendario en tiempo real (selectores presentacionales).
