# HU-002 — Crear NButton y NCard como primeros componentes reales del UI Kit

## Contexto

El repositorio `neural-angular` ya existe.

Ya se completaron las fases anteriores:

* Fase 0: análisis técnico del design system importado.
* Fase 1A: estructura inicial de `@neural/angular-ui` y token foundation.
* HU-001: Theme Provider mínimo y playground visual de tokens.

Ahora vamos a crear los primeros componentes reales del paquete:

```txt
@neural/angular-ui
```

Esta HU debe implementar únicamente:

```txt
NButton
NCard
```

No implementar todavía el resto del UI kit.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener `NButton` y `NCard` como primeros componentes standalone del paquete `@neural/angular-ui`,
para validar la arquitectura real de componentes, estilos, exports y consumo desde el playground antes de escalar el sistema.

---

## Objetivo principal

Crear los primeros componentes Angular reales del UI kit usando la fundación de tokens ya migrada.

Los componentes deben:

* Ser standalone Angular components.
* Usar tokens públicos `--n-*`.
* Ser SSR-safe.
* Tener API pequeña.
* Poder importarse desde `@neural/angular-ui`.
* Poder importarse también desde secondary entry points si el workspace lo permite.
* Renderizar correctamente en `apps/playground`.
* Estar documentados.

---

## Alcance incluido

### 1. Crear estructura para componentes

Crear estructura dentro de:

```txt
packages/ui/src/
```

Sugerencia:

```txt
packages/ui/src/
├─ button/
│  ├─ button.component.ts
│  ├─ button.component.html
│  ├─ button.component.scss
│  ├─ button.types.ts
│  └─ index.ts
│
├─ card/
│  ├─ card.component.ts
│  ├─ card.component.html
│  ├─ card.component.scss
│  ├─ card.types.ts
│  └─ index.ts
```

Adaptar nombres si el proyecto ya tiene una convención distinta, pero mantener la intención:

```txt
button/ = componente botón
card/ = componente tarjeta/surface
index.ts = exports limpios
types.ts = tipos públicos pequeños
```

---

## 2. Implementar NButton

Crear componente:

```ts
NButton
```

Selector:

```html
<n-button></n-button>
```

Debe ser standalone.

### API mínima

Debe soportar:

```ts
variant: 'primary' | 'secondary' | 'ghost' | 'danger'
size: 'sm' | 'md' | 'lg'
type: 'button' | 'submit' | 'reset'
disabled: boolean
loading: boolean
fullWidth: boolean
```

Tipos sugeridos:

```ts
export type NButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type NButtonSize = 'sm' | 'md' | 'lg';
export type NButtonType = 'button' | 'submit' | 'reset';
```

Uso esperado:

```html
<n-button>Default</n-button>

<n-button variant="primary">
  Save changes
</n-button>

<n-button variant="secondary" size="lg">
  Continue
</n-button>

<n-button variant="ghost" size="sm">
  Cancel
</n-button>

<n-button variant="danger" [loading]="true">
  Delete
</n-button>

<n-button type="submit" [fullWidth]="true">
  Submit form
</n-button>
```

### Reglas de comportamiento

El botón debe renderizar internamente un `<button>` real.

Debe respetar:

```txt
disabled
loading
type
aria-busy
```

Cuando `loading` sea `true`:

* El botón debe estar deshabilitado.
* Debe mostrar un indicador simple de carga.
* Debe mantener accesibilidad razonable.
* No usar GSAP.
* No usar Canvas.
* No usar browser APIs.

### Content projection

Debe permitir contenido proyectado:

```html
<n-button>
  Save changes
</n-button>
```

Puede soportar iconos por proyección simple, pero no crear `NIcon` todavía.

Ejemplo permitido:

```html
<n-button>
  <span aria-hidden="true">+</span>
  Add item
</n-button>
```

No crear todavía una API formal de iconos.

### Styling

El componente debe usar tokens `--n-*`.

Ejemplos:

```css
background: var(--n-color-primary);
color: white;
border-radius: var(--n-radius-full);
transition: transform var(--n-duration-fast) var(--n-ease-standard);
```

Variantes sugeridas:

```txt
primary = gradient or primary color
secondary = surface + gradient border or secondary accent
ghost = transparent/subtle
danger = danger status color
```

Tamaños sugeridos:

```txt
sm = 32px height
md = 40px height
lg = 48px height
```

Debe tener:

* Focus visible.
* Hover.
* Active.
* Disabled.
* Loading.

No copiar directamente el CSS original `.nn-btn` completo. Usarlo como referencia, pero crear una implementación curada, limpia y propia.

---

## 3. Implementar NCard

Crear componente:

```ts
NCard
```

Selector:

```html
<n-card></n-card>
```

Debe ser standalone.

### API mínima

Debe soportar:

```ts
variant: 'default' | 'elevated' | 'outlined' | 'gradient'
interactive: boolean
```

Tipos sugeridos:

```ts
export type NCardVariant = 'default' | 'elevated' | 'outlined' | 'gradient';
```

Uso esperado:

```html
<n-card>
  Basic card
</n-card>

<n-card variant="elevated">
  Elevated card
</n-card>

<n-card variant="outlined">
  Outlined card
</n-card>

<n-card variant="gradient" [interactive]="true">
  Gradient card
</n-card>
```

### Subcomponentes opcionales

Crear subcomponentes standalone simples si es razonable:

```txt
NCardHeader
NCardTitle
NCardDescription
NCardContent
NCardFooter
```

Selectors:

```html
<n-card-header></n-card-header>
<n-card-title></n-card-title>
<n-card-description></n-card-description>
<n-card-content></n-card-content>
<n-card-footer></n-card-footer>
```

Uso esperado:

```html
<n-card variant="gradient">
  <n-card-header>
    <n-card-title>Project status</n-card-title>
    <n-card-description>Current build health</n-card-description>
  </n-card-header>

  <n-card-content>
    Everything is running correctly.
  </n-card-content>

  <n-card-footer>
    <n-button size="sm">Open</n-button>
  </n-card-footer>
</n-card>
```

Mantener estos subcomponentes muy simples. Solo deben aportar estructura semántica y estilos básicos.

No crear lógica compleja.

### Styling

Debe usar tokens `--n-*`.

Debe soportar:

* Surface base.
* Border.
* Radius.
* Elevation.
* Gradient border.
* Interactive hover opcional.
* Dark theme.

No usar JS para efectos visuales.

No usar GSAP.

No usar browser APIs.

---

## 4. Exportar componentes

Actualizar:

```txt
packages/ui/src/index.ts
```

Debe exportar:

```ts
export * from './button';
export * from './card';
```

Crear:

```txt
packages/ui/src/button/index.ts
packages/ui/src/card/index.ts
```

Exports esperados:

```ts
export * from './button.component';
export * from './button.types';
```

y:

```ts
export * from './card.component';
export * from './card.types';
```

Si se crean subcomponentes de card, exportarlos también.

---

## 5. Actualizar package exports

Actualizar:

```txt
packages/ui/package.json
```

Agregar exports para:

```txt
./button
./card
```

Ejemplo orientativo:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./button": {
      "types": "./dist/button/index.d.ts",
      "default": "./dist/button/index.js"
    },
    "./card": {
      "types": "./dist/card/index.d.ts",
      "default": "./dist/card/index.js"
    }
  }
}
```

Adaptar al build real del workspace.

No romper los exports existentes de styles/tokens/theme.

---

## 6. Crear demos en Playground

Actualizar `apps/playground`.

Agregar sección o página:

```txt
Components Preview
```

Debe mostrar demos para:

```txt
NButton
NCard
NCard + NButton
```

### Demos de NButton

Mostrar:

* Variants.
* Sizes.
* Disabled.
* Loading.
* Full width.
* Submit type visual example.

Ejemplo visual:

```html
<section>
  <h2>Buttons</h2>

  <n-button variant="primary">Primary</n-button>
  <n-button variant="secondary">Secondary</n-button>
  <n-button variant="ghost">Ghost</n-button>
  <n-button variant="danger">Danger</n-button>

  <n-button size="sm">Small</n-button>
  <n-button size="md">Medium</n-button>
  <n-button size="lg">Large</n-button>

  <n-button [disabled]="true">Disabled</n-button>
  <n-button [loading]="true">Loading</n-button>
</section>
```

### Demos de NCard

Mostrar:

* Default.
* Elevated.
* Outlined.
* Gradient.
* Interactive.
* Card con header/content/footer.
* Card usando `NButton` dentro.

---

## 7. No crear todavía

Fuera de alcance:

```txt
NIcon
NBadge
NChip
NInput
NDialog
NTooltip
NToast
NSidebar
NToolbar
NShell
NTable
NVoiceOrb
Oroya Video components
```

No crear todavía integración con Angular Material.

No crear CDK overlays.

No crear GSAP utilities.

No crear motion provider.

No crear Storybook.

No crear SSR package.

---

## 8. Accesibilidad mínima

### NButton

Debe cumplir:

* Renderizar `<button>`.
* Usar `type`.
* Usar `[disabled]`.
* Usar `aria-busy` cuando loading.
* Tener focus visible.
* No remover outline sin reemplazo accesible.

### NCard

Debe ser contenedor visual.

No debe fingir ser botón/link si no lo es.

Si `interactive` es true:

* Solo aplicar estilos visuales.
* No agregar `role="button"` automáticamente.
* No agregar click behavior ficticio.
* La interactividad real debe venir de contenido interno o de uso futuro.

---

## 9. SSR safety

Los componentes deben ser SSR-safe.

No usar:

```txt
window
document
localStorage
sessionStorage
matchMedia
Canvas
setInterval
setTimeout
querySelector
getElementById
GSAP
global lucide
```

Estos componentes deben ser puramente Angular template + CSS.

---

## 10. Tests básicos

Si el workspace ya tiene test runner configurado, crear pruebas mínimas.

Prioridad:

```txt
NButton
NCard
```

Tests sugeridos:

### NButton

* Debe renderizar contenido proyectado.
* Debe aplicar variant.
* Debe aplicar size.
* Debe deshabilitarse cuando `disabled` es true.
* Debe deshabilitarse cuando `loading` es true.
* Debe exponer `aria-busy` cuando `loading` es true.

### NCard

* Debe renderizar contenido proyectado.
* Debe aplicar variant.
* Debe aplicar clase interactive si corresponde.
* Debe renderizar header/content/footer si se crean subcomponentes.

Si no hay test runner configurado todavía, no instalar uno solo para esta HU. Documentar que los tests quedan pendientes para una HU futura.

---

## 11. Documentación

Actualizar:

```txt
packages/ui/README.md
docs/ui/getting-started.md
docs/ui/implementation-plan.md
```

Crear, si no existen:

```txt
docs/ui/button.md
docs/ui/card.md
```

### docs/ui/button.md

Debe incluir:

* Estado del componente.
* Imports.
* API.
* Variants.
* Sizes.
* Loading.
* Disabled.
* Ejemplos.

### docs/ui/card.md

Debe incluir:

* Estado del componente.
* Imports.
* API.
* Variants.
* Subcomponentes si existen.
* Ejemplos.

Ejemplo de import raíz:

```ts
import { NButton, NCard } from '@neural/angular-ui';
```

Ejemplo de imports secundarios, si están soportados:

```ts
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
```

---

## 12. Validación manual esperada

Debe poder ejecutarse el playground:

```bash
pnpm nx serve playground
```

o el comando real del workspace.

En la UI se debe ver:

```txt
Neural Angular Playground
Token Preview
Components Preview
Buttons
Cards
```

El diseño debe usar tokens reales del paquete, no valores hardcodeados excesivos.

---

## 13. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NButton`.
2. Exista `NCard`.
3. Ambos sean standalone Angular components.
4. Ambos usen tokens `--n-*`.
5. Ambos sean SSR-safe.
6. `NButton` renderice un `<button>` real.
7. `NButton` soporte variant, size, type, disabled, loading y fullWidth.
8. `NCard` soporte variant e interactive.
9. Existan exports desde `packages/ui/src/index.ts`.
10. Existan exports desde `packages/ui/src/button/index.ts`.
11. Existan exports desde `packages/ui/src/card/index.ts`.
12. `package.json` mantenga exports existentes y agregue button/card si aplica.
13. Playground muestre demos de buttons y cards.
14. Documentación de button y card exista.
15. No se hayan creado componentes fuera del alcance.
16. No se haya integrado GSAP.
17. No se haya integrado Lucide global.
18. No se haya copiado directamente el CSS original sin curaduría.
19. Build/check disponible pase o se documenten limitaciones.
20. El resumen final indique cómo correr el playground.

---

## Resultado esperado al finalizar

Mostrar resumen con:

```txt
Files created
Files updated
Components created
Public API added
Playground demos added
Docs added
Tests added or skipped with reason
How to run
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-003 — Crear NBadge, NChip y NIcon básico para completar el primer set Core UI
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add button and card components"
```
