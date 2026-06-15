# HU-007 — Crear Overlay/Feedback MVP: NDialog, NDrawer, NToast, NTooltip y NPopover con Angular CDK

## Contexto

El repositorio `neural-angular` ya existe.

Ya se completaron y comitearon las HUs anteriores:

* Fase 0: análisis técnico del design system importado.
* Fase 1A: estructura inicial de `@neural/angular-ui` y token foundation.
* HU-001: Theme Provider mínimo y playground visual de tokens.
* HU-002: `NButton` y `NCard`.
* HU-003: `NIcon`, `NBadge`, `NChip` e integración con Lucide.
* HU-004: Forms, Feedback y Empty States.
* HU-005: Layout MVP.
* HU-006: Data Display MVP.

Ahora vamos a crear el primer bloque de Overlay/Feedback usando Angular CDK.

Esta HU implementa:

```txt
NDialog
NDrawer
NToast
NTooltip
NPopover
```

También puede crear servicios internos necesarios para abrir/cerrar overlays.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener componentes y servicios básicos para diálogos, drawers, toasts, tooltips y popovers,
para construir interacciones reales de aplicación usando overlays accesibles, reutilizables y compatibles con Angular.

---

## Objetivo principal

Crear un MVP funcional de overlays para `@neural/angular-ui`.

Al terminar esta HU, el playground debe poder demostrar:

* Abrir y cerrar un dialog.
* Abrir y cerrar un drawer lateral.
* Mostrar toasts.
* Mostrar tooltips.
* Mostrar popovers.
* Usar Angular CDK de forma limpia.
* Mantener SSR safety.
* Mantener el diseño basado en tokens `--n-*`.

---

# 1. Dependencia permitida

Se permite usar Angular CDK.

Si `@angular/cdk` ya está instalado, reutilizarlo.

Si no está instalado, instalarlo:

```bash
pnpm add @angular/cdk
```

Actualizar `packages/ui/package.json` según corresponda.

Estrategia recomendada:

```json
{
  "peerDependencies": {
    "@angular/core": "^22.0.0",
    "@angular/common": "^22.0.0",
    "@angular/cdk": "^22.0.0"
  }
}
```

Si el workspace necesita `@angular/cdk` como `devDependency` para compilar, agregarlo también en el lugar correcto.

No instalar Angular Material en esta HU.

No instalar librerías externas de toast/dialog.

---

# 2. Componentes y servicios a crear

Crear estructura:

```txt
packages/ui/src/dialog/
packages/ui/src/drawer/
packages/ui/src/toast/
packages/ui/src/tooltip/
packages/ui/src/popover/
packages/ui/src/overlay/
```

Estructura sugerida:

```txt
packages/ui/src/dialog/
├─ dialog.component.ts
├─ dialog.component.html
├─ dialog.component.scss
├─ dialog.service.ts
├─ dialog-ref.ts
├─ dialog.tokens.ts
├─ dialog.types.ts
└─ index.ts

packages/ui/src/drawer/
├─ drawer.component.ts
├─ drawer.component.html
├─ drawer.component.scss
├─ drawer.service.ts
├─ drawer-ref.ts
├─ drawer.tokens.ts
├─ drawer.types.ts
└─ index.ts

packages/ui/src/toast/
├─ toast.component.ts
├─ toast.component.html
├─ toast.component.scss
├─ toast.service.ts
├─ toast.types.ts
└─ index.ts

packages/ui/src/tooltip/
├─ tooltip.directive.ts
├─ tooltip.component.ts
├─ tooltip.component.html
├─ tooltip.component.scss
├─ tooltip.types.ts
└─ index.ts

packages/ui/src/popover/
├─ popover.directive.ts
├─ popover.component.ts
├─ popover.component.html
├─ popover.component.scss
├─ popover.types.ts
└─ index.ts

packages/ui/src/overlay/
├─ overlay-utils.ts
├─ overlay.types.ts
└─ index.ts
```

Ajustar si el repo tiene una convención más simple, pero mantener separación clara.

---

# 3. NDialog

## Objetivo

Crear un dialog modal básico usando Angular CDK Overlay.

Debe ser accesible, visualmente alineado con Neural Angular UI y usable desde servicio.

## API pública esperada

Servicio:

```ts
NDialogService
```

Método mínimo:

```ts
open<TData = unknown, TResult = unknown>(
  componentOrTemplate: ComponentType<unknown> | TemplateRef<unknown>,
  config?: NDialogConfig<TData>
): NDialogRef<TResult>
```

Tipos:

```ts
export type NDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface NDialogConfig<TData = unknown> {
  title?: string;
  description?: string;
  data?: TData;
  size?: NDialogSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  panelClass?: string | string[];
}
```

Defaults sugeridos:

```ts
size = 'md';
closeOnBackdropClick = true;
closeOnEscape = true;
showCloseButton = true;
```

Dialog ref:

```ts
export class NDialogRef<TResult = unknown> {
  close(result?: TResult): void;
  afterClosed(): Observable<TResult | undefined>;
}
```

## Uso esperado

```ts
const ref = this.dialog.open(ProjectDialogComponent, {
  title: 'Create project',
  description: 'Configure your new Neural project.',
  size: 'md',
  data: {
    mode: 'create'
  }
});

ref.afterClosed().subscribe(result => {
  console.log(result);
});
```

## Componente visual

Crear:

```ts
NDialogComponent
```

Debe renderizar:

* Backdrop.
* Panel.
* Header opcional.
* Title.
* Description.
* Close button opcional.
* Content outlet.
* Footer por proyección si aplica.

## Reglas

* Usar CDK Overlay.
* Usar CDK Portal.
* Usar FocusTrap si está disponible vía CDK A11y.
* Cerrar con ESC si `closeOnEscape` es true.
* Cerrar con backdrop si `closeOnBackdropClick` es true.
* Restaurar foco si CDK lo permite limpiamente.
* No usar `document.querySelector`.
* No manipular DOM manualmente salvo APIs CDK/Angular.
* SSR-safe.

---

# 4. NDrawer

## Objetivo

Crear drawer lateral básico usando Angular CDK Overlay.

Debe servir para panels, settings, filters, inspectors o side sheets.

## API pública esperada

Servicio:

```ts
NDrawerService
```

Método:

```ts
open<TData = unknown, TResult = unknown>(
  componentOrTemplate: ComponentType<unknown> | TemplateRef<unknown>,
  config?: NDrawerConfig<TData>
): NDrawerRef<TResult>
```

Tipos:

```ts
export type NDrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type NDrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface NDrawerConfig<TData = unknown> {
  title?: string;
  description?: string;
  data?: TData;
  position?: NDrawerPosition;
  size?: NDrawerSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  panelClass?: string | string[];
}
```

Defaults:

```ts
position = 'right';
size = 'md';
closeOnBackdropClick = true;
closeOnEscape = true;
showCloseButton = true;
```

## Uso esperado

```ts
this.drawer.open(SettingsDrawerComponent, {
  title: 'Settings',
  description: 'Adjust Neural Angular preferences.',
  position: 'right',
  size: 'md'
});
```

## Reglas

* Usar CDK Overlay.
* Usar CDK Portal.
* Usar transform/opacity CSS para entrada si es simple.
* No usar GSAP.
* No usar browser APIs directas.
* SSR-safe.

---

# 5. NToast

## Objetivo

Crear sistema de toasts básico para mensajes temporales.

Debe usar Angular CDK Overlay.

## API pública esperada

Servicio:

```ts
NToastService
```

Métodos:

```ts
show(message: string, config?: NToastConfig): NToastRef;
success(message: string, config?: NToastConfig): NToastRef;
info(message: string, config?: NToastConfig): NToastRef;
warning(message: string, config?: NToastConfig): NToastRef;
danger(message: string, config?: NToastConfig): NToastRef;
dismissAll(): void;
```

Tipos:

```ts
export type NToastVariant =
  | 'neutral'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type NToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface NToastConfig {
  title?: string;
  icon?: string;
  variant?: NToastVariant;
  duration?: number;
  position?: NToastPosition;
  dismissible?: boolean;
}
```

Defaults:

```ts
variant = 'neutral';
duration = 4000;
position = 'bottom-right';
dismissible = true;
```

## Uso esperado

```ts
this.toast.success('Project created', {
  title: 'Success',
  icon: 'circle-check'
});

this.toast.danger('Export failed', {
  title: 'Error',
  duration: 6000
});
```

## Reglas

* Usar CDK Overlay.
* Soportar múltiples toasts.
* Animación solo CSS.
* Auto dismiss con timer permitido.
* Limpiar timers correctamente.
* No usar `document.querySelector`.
* No usar global event hacks.
* Si se usa `setTimeout`, encapsularlo y limpiar al destruir.
* SSR-safe: no intentar abrir toasts en server.

## Accesibilidad

* Usar `role="status"` para info/success.
* Usar `role="alert"` para warning/danger.
* Mantener contenido legible.
* Botón de cerrar accesible con `aria-label`.

---

# 6. NTooltip

## Objetivo

Crear tooltip básico mediante directive + CDK Overlay.

## API pública esperada

Directive selector:

```html
[nTooltip]
```

Inputs:

```ts
nTooltip: string;
nTooltipPosition?: NTooltipPosition;
nTooltipDisabled?: boolean;
nTooltipShowDelay?: number;
nTooltipHideDelay?: number;
```

Tipos:

```ts
export type NTooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';
```

Uso:

```html
<n-button
  nTooltip="Create new project"
  nTooltipPosition="top"
>
  New
</n-button>
```

## Componente interno

Crear:

```ts
NTooltipComponent
```

Debe recibir texto y renderizarlo.

## Reglas

* Mostrar en hover y focus.
* Ocultar en mouseleave y blur.
* Usar CDK Overlay positioning.
* No usar title nativo.
* No usar manipulación manual de DOM.
* No implementar tooltip con HTML rico todavía.
* No meter interactividad dentro del tooltip.
* SSR-safe.

---

# 7. NPopover

## Objetivo

Crear popover básico para contenido pequeño contextual.

## API pública esperada

Directive selector:

```html
[nPopover]
```

Inputs:

```ts
nPopover: TemplateRef<unknown> | string;
nPopoverPosition?: NPopoverPosition;
nPopoverDisabled?: boolean;
nPopoverTrigger?: NPopoverTrigger;
```

Tipos:

```ts
export type NPopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';

export type NPopoverTrigger =
  | 'click'
  | 'hover'
  | 'focus';
```

Uso con template:

```html
<n-button [nPopover]="projectMenu" nPopoverTrigger="click">
  Options
</n-button>

<ng-template #projectMenu>
  <div class="demo-popover-content">
    <n-button variant="ghost" size="sm">Edit</n-button>
    <n-button variant="ghost" size="sm">Duplicate</n-button>
    <n-button variant="danger" size="sm">Delete</n-button>
  </div>
</ng-template>
```

Uso con string:

```html
<n-button nPopover="Quick info">
  Info
</n-button>
```

## Reglas

* Usar CDK Overlay positioning.
* Cerrar al hacer click fuera.
* Cerrar con ESC si es viable.
* No implementar menús accesibles complejos todavía.
* No implementar focus roving.
* No crear command palette.
* SSR-safe.

---

# 8. Overlay shared utilities

Crear utilidades compartidas si ayudan:

```txt
packages/ui/src/overlay/
```

Posibles helpers:

```ts
createOverlayPosition(...)
createBackdropClass(...)
normalizePanelClass(...)
```

Mantenerlo pequeño.

No crear framework interno gigante.

---

# 9. Tokens permitidos

Agregar tokens mínimos si hacen falta:

```css
--n-overlay-backdrop-bg
--n-overlay-panel-bg
--n-overlay-panel-border
--n-overlay-panel-shadow
--n-dialog-width-sm
--n-dialog-width-md
--n-dialog-width-lg
--n-dialog-width-xl
--n-drawer-width-sm
--n-drawer-width-md
--n-drawer-width-lg
--n-toast-bg
--n-tooltip-bg
--n-popover-bg
```

Preferir tokens existentes cuando sea posible.

No agregar tokens masivamente.

---

# 10. Exports públicos

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/package.json
```

Agregar exports:

```txt
./dialog
./drawer
./toast
./tooltip
./popover
./overlay
```

No romper exports existentes.

Cada carpeta debe tener `index.ts`.

---

# 11. Providers

Si algún servicio requiere providers globales, crear helper:

```ts
provideNeuralOverlay()
```

O incluir services con `providedIn: 'root'` si es suficiente.

Uso deseado:

```ts
import {
  provideNeuralTheme,
  provideNeuralIcons,
  provideNeuralOverlay
} from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({ defaultTheme: 'dark' }),
    provideNeuralIcons(),
    provideNeuralOverlay()
  ]
};
```

Si `provideNeuralOverlay()` no es necesario técnicamente, no crearlo solo por estética. Pero documentar la decisión.

---

# 12. Playground — Overlay Demo

Actualizar `apps/playground`.

Crear sección:

```txt
Overlay / Feedback MVP
```

Debe mostrar:

```txt
Dialog
Drawer
Toast
Tooltip
Popover
Composition
```

## Dialog demo

Agregar botón:

```html
<n-button (click)="openDialog()">
  <n-icon name="sparkles" size="sm" />
  Open Dialog
</n-button>
```

Dialog demo debe mostrar:

* Title.
* Description.
* Form simple con `NInput`.
* Footer con Cancel / Confirm.

## Drawer demo

```html
<n-button variant="secondary" (click)="openDrawer()">
  Open Drawer
</n-button>
```

Drawer demo debe mostrar:

* Settings panel.
* `NSelect`.
* `NChip`.
* `NProgress`.
* Actions.

## Toast demo

Botones:

```html
<n-button (click)="showSuccessToast()">Success Toast</n-button>
<n-button variant="danger" (click)="showDangerToast()">Danger Toast</n-button>
<n-button variant="ghost" (click)="showInfoToast()">Info Toast</n-button>
```

## Tooltip demo

```html
<n-button nTooltip="Run enhancement pipeline">
  <n-icon name="play" size="sm" />
  Run
</n-button>
```

## Popover demo

```html
<n-button [nPopover]="popoverTpl">
  More actions
</n-button>

<ng-template #popoverTpl>
  <div class="demo-popover-menu">
    <n-button variant="ghost" size="sm">Edit</n-button>
    <n-button variant="ghost" size="sm">Duplicate</n-button>
    <n-button variant="danger" size="sm">Delete</n-button>
  </div>
</ng-template>
```

---

# 13. Demo components para Dialog/Drawer

Si abrir componentes Angular reales desde servicios CDK es más limpio, crear componentes demo dentro de playground, no en package UI:

```txt
apps/playground/src/app/demos/overlay-demo/
├─ demo-dialog.component.ts
├─ demo-drawer.component.ts
```

No meter componentes demo dentro de `packages/ui`.

---

# 14. Documentación

Crear:

```txt
docs/ui/dialog.md
docs/ui/drawer.md
docs/ui/toast.md
docs/ui/tooltip.md
docs/ui/popover.md
docs/ui/overlay.md
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
* Uso básico.
* Accesibilidad.
* Limitaciones conocidas.
* Ejemplo en playground.

---

# 15. Tests

Si ya existe test runner configurado, crear pruebas mínimas.

Prioridad:

```txt
NToastService
NTooltipDirective
NPopoverDirective
NDialogService
NDrawerService
```

Tests sugeridos:

## Toast

* `success()` crea toast.
* `danger()` crea toast.
* `dismissAll()` limpia toasts.

## Tooltip

* Muestra tooltip en hover/focus.
* Oculta tooltip en mouseleave/blur.
* No muestra si disabled.

## Popover

* Abre en click.
* Cierra al hacer click fuera.
* No abre si disabled.

## Dialog

* `open()` devuelve ref.
* `close()` completa `afterClosed`.

## Drawer

* `open()` devuelve ref.
* `close()` completa `afterClosed`.

Si no hay test runner configurado, no instalar uno solo para esta HU. Documentar que queda pendiente.

---

# 16. Accesibilidad

## Dialog

* Debe tener `role="dialog"`.
* Si es modal, usar `aria-modal="true"`.
* Asociar título con `aria-labelledby` si existe.
* Asociar descripción con `aria-describedby` si existe.
* Cerrar con ESC si está habilitado.
* Focus trap si está disponible.

## Drawer

* Puede usar `role="dialog"` si se comporta como modal drawer.
* `aria-modal="true"` cuando bloquea interacción de fondo.
* Cerrar con ESC si está habilitado.

## Toast

* `role="status"` para neutral/info/success.
* `role="alert"` para warning/danger.
* Close button accesible.

## Tooltip

* Debe funcionar con hover y focus.
* No debe requerir mouse.
* Usar `role="tooltip"`.

## Popover

* Cerrar con ESC si es viable.
* Cerrar al hacer click fuera.
* No prometer comportamiento de menú accesible completo todavía.

---

# 17. SSR Safety

Overlays normalmente solo se abren en browser por interacción de usuario.

Aun así:

* No usar `window` directamente.
* No usar `document` directamente.
* Si se necesita document, usar `DOCUMENT`.
* Proteger cualquier browser API con platform guards si aplica.
* No ejecutar overlay creation en server.
* No usar `querySelector`.
* No usar `getElementById`.
* No usar `window.lucide`.
* No usar GSAP.

---

# 18. Fuera de alcance

No hacer todavía:

```txt
NCommandPalette
NMenu
NDropdownMenu avanzado
NCalendar
NChart
NVoiceOrb
NPromptInput
Oroya Video components
Advanced router integration
Advanced forms integration
Virtual scroll
Storybook
SSR package
CLI
Schematics
Adapters
Motion provider
GSAP utilities
```

---

# 19. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NDialog`.
2. Exista `NDialogService`.
3. Exista `NDialogRef`.
4. Exista `NDrawer`.
5. Exista `NDrawerService`.
6. Exista `NDrawerRef`.
7. Exista `NToast`.
8. Exista `NToastService`.
9. Exista `NTooltipDirective`.
10. Exista `NPopoverDirective`.
11. Todos usen Angular CDK donde corresponde.
12. Todos usen tokens `--n-*`.
13. Todos sean SSR-safe.
14. Dialog y drawer cierren con ESC si está habilitado.
15. Dialog y drawer cierren con backdrop si está habilitado.
16. Toast soporte variantes success/info/warning/danger/neutral.
17. Tooltip funcione con hover y focus.
18. Popover funcione con click y template.
19. Exports públicos estén actualizados.
20. `package.json` tenga exports secundarios si aplica.
21. Playground tenga demo Overlay/Feedback MVP.
22. Docs estén creadas/actualizadas.
23. Build/check disponible pase o se documenten limitaciones.

---

# 20. Validación manual

Debe poder ejecutarse:

```bash
pnpm nx serve playground
```

o el comando real del workspace.

En la UI debe verse:

```txt
Neural Angular Playground
Overlay / Feedback MVP
Dialog
Drawer
Toast
Tooltip
Popover
Composition
```

Validar manualmente:

* Click en Open Dialog abre modal.
* ESC cierra dialog si está habilitado.
* Click en backdrop cierra dialog si está habilitado.
* Open Drawer abre panel lateral.
* Toast aparece y desaparece.
* Tooltip aparece en hover/focus.
* Popover abre con click y cierra al hacer click fuera.

---

# 21. Resultado esperado

Mostrar resumen con:

```txt
Files created
Files updated
Dependency installed or reused
Components created
Services created
Directives created
Public API added
Playground overlay demo added
Docs added
Tests added or skipped with reason
How to run
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-008 — Crear Media/Upload MVP: NDropzone, NFileCard, NImageCompare y NMediaPreview
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add overlay and feedback primitives"
```
