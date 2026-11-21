# Guía de Auditoría de Código — Taller Airbnb IA

Este documento y proceso son de uso exclusivo cuando el usuario solicite explícitamente auditar la calidad, contratos o buenas prácticas del código desarrollado. **No aplica durante la implementación de pantallas.**

---

## 1. Comando de Auditoría
```bash
npm run audit
```
*(Ejecuta ESLint configurado en `eslint.config.mjs`, auditando exclusivamente `app/` y `components/` e ignorando directorios auxiliares).*

---

## 2. Puntos de Control de la Auditoría

1. **Contrato de Datos (`types/property.ts`):**
   - Comprobar que no existan tipos `any`.
   - Comprobar que los datos se lean desde `@/data/properties.json`.
   - Comprobar ausencia de `useEffect` o `fetch` para datos locales en Server Components.
2. **Uso de Imágenes:**
   - Confirmar uso estricto de `<img>` con clases de Tailwind (cero `next/image`).
3. **Tokens de Diseño (`DESIGN.md`):**
   - Fondo `#0B0F17`, tarjetas `#161F30`, color coral `#FF385C`.
   - Clases `rounded-3xl` en galerías/contenedores y `rounded-2xl` en tarjetas.
4. **Calidad y Linter:**
   - Reportar advertencias de ESLint detectadas por `npm run audit`.

---

## 3. Formato del Reporte de Auditoría (Máximo 6 líneas)
- **Archivos auditados:** Lista de archivos inspeccionados.
- **Resultado:** `APROBADO ✓` o `OBSERVACIONES ⚠`.
- **Hallazgos:** Máximo 3 viñetas concretas (`archivo:línea` + observación).
