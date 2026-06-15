# HU-004 — Forms, Feedback y Empty States para cerrar Core UI MVP

## Contexto

Ya existen o deben existir antes de esta HU:

* Token foundation.
* Theme Provider.
* Playground.
* `NButton`.
* `NCard`.
* `NIcon` con Lucide.
* `NBadge`.
* `NChip`.

Ahora vamos a avanzar rápido hacia el MVP creando un bloque completo de componentes Core UI de formularios y feedback.

Esta HU implementa:

```txt
NInput
NTextarea
NSelect
NAvatar
NProgress
NSpinner
NEmptyState
NStatusDot
```

No crear todavía layout grande, sidebar, toolbar, tables, dialogs ni overlays.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener componentes básicos de formularios, loading, estado vacío y presencia visual,
para poder construir pantallas reales de dashboards, apps AI y herramientas internas usando el UI kit.

---

## Objetivo principal

Completar el primer bloque Core UI práctico de `@neural/angular-ui`.

Al terminar esta HU, el playground debe poder mostrar una pantalla demo suficientemente real con:

* Inputs.
* Textareas.
* Selects.
* Avatares.
* Progress bars.
* Spinners.
* Empty states.
* Status dots.
* Buttons.
* Cards.
* Badges.
* Chips.
* Icons.

---

# 1. Componentes a crear

Crear estructura:

```txt
packages/ui/src/input/
packages/ui/src/textarea/
packages/ui/src/select/
packages/ui/src/avatar/
packages/ui/src/progress/
packages/ui/src/spinner/
packages/ui/src/empty-state/
packages/ui/src/status-dot/
```

Cada componente debe tener:

```txt
*.component.ts
*.component.html
*.component.scss
*.types.ts
index.ts
```

Mantener la convención usada por `NButton`, `NCard`, `NIcon`, `NBadge` y `NChip`.

---

# 2. NInput

Selector:

```html
<n-input />
```

Debe renderizar internamente un `<input>` real.

## API mínima

```ts
export type NInputSize = 'sm' | 'md' | 'lg';
export type NInputVariant = 'default' | 'filled' | 'ghost';
```

Inputs:

```ts
label?: string;
hint?: string;
error?: string;
placeholder?: string;
type?: string;
value?: string;
size?: NInputSize;
variant?: NInputVariant;
disabled?: boolean;
readonly?: boolean;
required?: boolean;
```

Outputs:

```ts
valueChange
```

Uso esperado:

```html
<n-input label="Email" placeholder="you@example.com" />

<n-input
  label="Project name"
  hint="Use a clear name"
  [(value)]="projectName"
/>

<n-input
  label="API Key"
  type="password"
  error="API key is required"
/>
```

Reglas:

* Usar `<label>` real cuando haya label.
* Conectar label e input con `id`.
* Mostrar hint si no hay error.
* Mostrar error si existe.
* Usar `aria-invalid` cuando hay error.
* Usar tokens `--n-*`.
* No implementar ControlValueAccessor todavía salvo que sea muy barato y limpio.
* No integrar Angular Material todavía.

---

# 3. NTextarea

Selector:

```html
<n-textarea></n-textarea>
```

Debe renderizar internamente `<textarea>`.

API similar a `NInput`:

```ts
label?: string;
hint?: string;
error?: string;
placeholder?: string;
value?: string;
rows?: number;
size?: 'sm' | 'md' | 'lg';
disabled?: boolean;
readonly?: boolean;
required?: boolean;
resize?: 'none' | 'vertical' | 'horizontal' | 'both';
```

Uso:

```html
<n-textarea
  label="Prompt"
  placeholder="Describe what you want to generate..."
  [rows]="5"
/>
```

---

# 4. NSelect

Selector:

```html
<n-select></n-select>
```

Implementación simple con `<select>` nativo.

No crear dropdown custom todavía.

## API mínima

```ts
export interface NSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
```

Inputs:

```ts
label?: string;
hint?: string;
error?: string;
placeholder?: string;
value?: string;
options: NSelectOption[];
size?: 'sm' | 'md' | 'lg';
disabled?: boolean;
required?: boolean;
```

Output:

```ts
valueChange
```

Uso:

```html
<n-select
  label="Model"
  placeholder="Select model"
  [options]="modelOptions"
  [(value)]="selectedModel"
/>
```

---

# 5. NAvatar

Selector:

```html
<n-avatar></n-avatar>
```

## API

```ts
export type NAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type NAvatarShape = 'circle' | 'rounded';
```

Inputs:

```ts
src?: string;
alt?: string;
name?: string;
size?: NAvatarSize;
shape?: NAvatarShape;
status?: 'online' | 'offline' | 'busy' | 'away' | null;
```

Comportamiento:

* Si hay `src`, renderizar imagen.
* Si no hay `src`, mostrar initials basadas en `name`.
* Si hay `status`, mostrar pequeño status dot.
* No usar browser APIs.

Uso:

```html
<n-avatar name="Anderson Oroya" />
<n-avatar src="/avatar.png" alt="Anderson" status="online" />
```

---

# 6. NProgress

Selector:

```html
<n-progress></n-progress>
```

## API

```ts
export type NProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type NProgressSize = 'sm' | 'md' | 'lg';
```

Inputs:

```ts
value?: number;
max?: number;
variant?: NProgressVariant;
size?: NProgressSize;
indeterminate?: boolean;
label?: string;
showValue?: boolean;
```

Uso:

```html
<n-progress [value]="64" label="Processing" [showValue]="true" />

<n-progress variant="success" [value]="100" />

<n-progress [indeterminate]="true" />
```

Reglas:

* Si `indeterminate` es true, no depender de JS.
* Animación solo CSS.
* Agregar `role="progressbar"`.
* Usar `aria-valuenow`, `aria-valuemin`, `aria-valuemax` cuando aplique.

---

# 7. NSpinner

Selector:

```html
<n-spinner />
```

## API

```ts
export type NSpinnerSize = 'sm' | 'md' | 'lg';
export type NSpinnerVariant = 'primary' | 'neutral' | 'success' | 'danger';
```

Inputs:

```ts
size?: NSpinnerSize;
variant?: NSpinnerVariant;
label?: string;
```

Reglas:

* Animación CSS.
* `role="status"` si tiene label.
* Texto accesible para screen readers.

Uso:

```html
<n-spinner label="Loading content" />
<n-spinner size="sm" />
```

---

# 8. NEmptyState

Selector:

```html
<n-empty-state></n-empty-state>
```

## API

Inputs:

```ts
icon?: string;
title?: string;
description?: string;
orientation?: 'vertical' | 'horizontal';
```

Debe permitir content projection para acciones:

```html
<n-empty-state
  icon="sparkles"
  title="No projects yet"
  description="Create your first Neural project to get started."
>
  <n-button>
    <n-icon name="plus" size="sm" />
    Create project
  </n-button>
</n-empty-state>
```

Debe usar `NIcon` si `icon` existe.

---

# 9. NStatusDot

Selector:

```html
<n-status-dot />
```

## API

```ts
export type NStatusDotStatus =
  | 'neutral'
  | 'online'
  | 'offline'
  | 'busy'
  | 'away'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
```

Inputs:

```ts
status?: NStatusDotStatus;
pulse?: boolean;
label?: string;
```

Uso:

```html
<n-status-dot status="online" [pulse]="true" label="Online" />
<n-status-dot status="danger" label="Error" />
```

Si tiene `label`, debe ser accesible.

---

# 10. Tokens permitidos

Agregar tokens mínimos si hacen falta:

```css
--n-field-bg
--n-field-bg-hover
--n-field-border
--n-field-border-hover
--n-field-border-focus
--n-field-placeholder
--n-focus-ring

--n-avatar-bg
--n-progress-bg
--n-progress-fill
```

No agregar tokens masivamente.

Usar tokens existentes cuando sea posible.

---

# 11. Exports

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/package.json
```

Agregar exports para:

```txt
./input
./textarea
./select
./avatar
./progress
./spinner
./empty-state
./status-dot
```

No romper exports existentes.

---

# 12. Playground

Actualizar `apps/playground`.

Crear secciones:

```txt
Forms
Feedback
Empty State
Avatar & Presence
Composition Demo
```

## Forms demo

Mostrar:

```html
<n-input label="Email" placeholder="you@example.com" />
<n-input label="Password" type="password" />
<n-input label="Project" hint="This will be visible in the dashboard" />
<n-input label="API Key" error="Required field" />

<n-textarea label="Prompt" placeholder="Write your prompt..." />

<n-select
  label="Model"
  placeholder="Select model"
  [options]="modelOptions"
/>
```

## Feedback demo

Mostrar:

```html
<n-progress [value]="72" label="Enhancement progress" [showValue]="true" />
<n-progress [indeterminate]="true" />
<n-spinner label="Loading" />
<n-status-dot status="online" [pulse]="true" label="Online" />
```

## Avatar demo

Mostrar:

```html
<n-avatar name="Anderson Oroya" status="online" />
<n-avatar name="Neural Angular" size="lg" />
<n-avatar name="Oroya Video" shape="rounded" status="busy" />
```

## Empty state demo

Mostrar:

```html
<n-empty-state
  icon="sparkles"
  title="No projects yet"
  description="Create your first AI-enhanced project."
>
  <n-button>
    <n-icon name="plus" size="sm" />
    Create project
  </n-button>
</n-empty-state>
```

## Composition demo

Crear una card más realista que combine todo:

```html
<n-card variant="gradient">
  <n-card-header>
    <n-card-title>
      <n-icon name="cpu" size="sm" />
      Processing Job
    </n-card-title>
    <n-card-description>
      Video enhancement pipeline
    </n-card-description>
  </n-card-header>

  <n-card-content>
    <n-badge variant="success" [dot]="true">Running</n-badge>
    <n-progress [value]="68" label="Progress" [showValue]="true" />
    <n-chip variant="primary" [selected]="true">Real-ESRGAN</n-chip>
    <n-chip variant="secondary">GPU</n-chip>
  </n-card-content>

  <n-card-footer>
    <n-button variant="ghost">Cancel</n-button>
    <n-button>
      Open
      <n-icon name="arrow-right" size="sm" />
    </n-button>
  </n-card-footer>
</n-card>
```

---

# 13. Documentación

Crear:

```txt
docs/ui/input.md
docs/ui/textarea.md
docs/ui/select.md
docs/ui/avatar.md
docs/ui/progress.md
docs/ui/spinner.md
docs/ui/empty-state.md
docs/ui/status-dot.md
```

Actualizar:

```txt
packages/ui/README.md
docs/ui/getting-started.md
docs/ui/implementation-plan.md
docs/ui/component-inventory.md
```

Cada doc debe incluir:

* Estado del componente.
* Import.
* API.
* Ejemplos.
* Notas de accesibilidad si aplica.

---

# 14. Tests

Si ya existe test runner configurado, crear pruebas mínimas para:

```txt
NInput
NTextarea
NSelect
NAvatar
NProgress
NSpinner
NEmptyState
NStatusDot
```

Si no hay test runner, no instalar uno ahora. Documentar que queda pendiente.

---

# 15. SSR Safety

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
window.lucide
```

Componentes deben ser Angular template + CSS + signals/inputs/outputs.

---

# 16. Fuera de alcance

No hacer todavía:

```txt
NDialog
NTooltip
NToast
NSidebar
NToolbar
NShell
NTable
NVoiceOrb
NPromptInput
Oroya Video components
Angular Material integration
CDK overlays
GSAP utilities
Motion provider
SSR package
CLI
Schematics
Adapters
Storybook
```

---

# 17. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NInput`.
2. Exista `NTextarea`.
3. Exista `NSelect`.
4. Exista `NAvatar`.
5. Exista `NProgress`.
6. Exista `NSpinner`.
7. Exista `NEmptyState`.
8. Exista `NStatusDot`.
9. Todos sean standalone Angular components.
10. Todos usen tokens `--n-*`.
11. Todos sean SSR-safe.
12. Exports públicos estén actualizados.
13. Playground tenga demos funcionales.
14. Docs estén creadas/actualizadas.
15. No se hayan creado componentes fuera del alcance.
16. Build/check disponible pase o se documenten limitaciones.

---

# 18. Validación manual

Debe poder ejecutarse:

```bash
pnpm nx serve playground
```

o el comando real del workspace.

En la UI debe verse:

```txt
Neural Angular Playground
Token Preview
Components Preview
Forms
Feedback
Avatar & Presence
Empty State
Composition Demo
```

---

# 19. Resultado esperado

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
HU-005 — Crear Layout MVP: NShell, NSidebar, NToolbar, NTabs y NCommandBar
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add forms and feedback primitives"
```
