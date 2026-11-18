# DESIGN.md — Sistema de Diseño Global (Airbnb Luxe Dark)

## 1. Identidad Visual y Tipografía
- **Estética General:** Dark Luxury / Glassmorphism moderno de alto contraste[cite: 4, 6].
- **Clase Base:** Modo oscuro obligatorio (`dark`) con fondo profundo y suavizado tipográfico (`bg-[#0B0F17] text-slate-100 antialiased selection:bg-[#FF385C] selection:text-white`)[cite: 4, 6].
- **Tipografía Principal:** `Plus Jakarta Sans` (dominante en 2 de 3 vistas; pesos: `400`, `500`, `600`, `700`, `800`)[cite: 4, 6].

## 2. Paleta de Colores Unificada (Tokens HEX)
- **Superficies (Surfaces):**
  - Fondo Base (`surface.base`): `#0B0F17`[cite: 4, 6]
  - Tarjetas y Contenedores (`surface.card`): `#161F30` (con efecto cristal: `rgba(22, 31, 48, 0.75)` + `backdrop-blur-md`)[cite: 4, 6]
  - Hover en Tarjetas (`surface.cardHover`): `#1C273C`[cite: 4, 6]
  - Bordes Base (`surface.border`): `#27354A` (hover/activo: `#334155` o `border-white/10`)[cite: 4, 6, 8]
- **Marca y Acentos (Brand):**
  - Primario / CTA (`brand.coral`): `#FF385C` (hover: `#E00B41`)[cite: 4, 6, 8]
  - Secundario / Verificado (`brand.teal`): `#00A699` (hover: `#008489`)[cite: 4, 6, 8]
  - Rating / Estrellas (`brand.gold`): `#FFB400`[cite: 4, 6]
- **Jerarquía de Texto:**
  - Títulos y precios destacados: `#FFFFFF` (`text-white`)[cite: 4, 6, 8]
  - Texto secundario / descripciones: `#CBD5E1` (`text-slate-300`)[cite: 4, 6, 8]
  - Metadatos / etiquetas sutiles: `#94A3B8` (`text-slate-400`)[cite: 4, 6, 8]

## 3. Geometría y Patrones de Componentes
- **Layout Global:** Contenedor centrado `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` con barra superior fija `sticky top-0 z-50 h-20` con glassmorphism y borde inferior[cite: 4, 6, 8].
- **Radios de Borde:**
  - Contenedores principales, tarjetas de propiedades y galerías: `rounded-3xl` (24px)[cite: 4, 6, 8].
  - Tarjetas internas de métricas, listas horizontales e inputs: `rounded-2xl` (16px)[cite: 4, 6, 8].
  - Botones secundarios y badges de precio flotantes: `rounded-xl` (12px)[cite: 4, 6, 8].
  - Píldoras de navegación, avatares y etiquetas de estado: `rounded-full`[cite: 4, 6, 8].
- **Botón Principal (CTA):** Fondo degradado coral (`bg-gradient-to-r from-[#FF385C] to-rose-500`), texto blanco en negrita (`font-extrabold`), sombra `shadow-lg shadow-[#FF385C]/25`[cite: 4, 6].
- **Insignias (Badges):** Fondo translúcido al 15% con borde al 30% (ej. `bg-[#FF385C]/15 text-[#FF385C] border border-[#FF385C]/30` o `bg-[#00A699]/15 text-[#00A699] border border-[#00A699]/30`)[cite: 4, 6, 8].
- **Tarjetas de Catálogo:** Imagen superior con efecto zoom suave al hacer hover (`group-hover:scale-105 transition-transform duration-500`), badge de precio en esquina inferior izquierda y calificación con estrella dorada (`★`) en esquina inferior derecha[cite: 8, 9].