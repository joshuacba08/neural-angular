# HU-005 — Crear Layout MVP: NShell, NSidebar, NToolbar, NTabs, NPageHeader y NCommandBar

## Contexto

El repositorio `neural-angular` ya existe.

Ya se completaron y comitearon las HUs anteriores:

* Fase 0: análisis técnico del design system importado.
* Fase 1A: estructura inicial de `@neural/angular-ui` y token foundation.
* HU-001: Theme Provider mínimo y playground visual de tokens.
* HU-002: `NButton` y `NCard`.
* HU-003: `NIcon`, `NBadge`, `NChip` e integración con Lucide.
* HU-004: Forms, Feedback y Empty States.

Ahora vamos a crear el primer bloque grande de layout y navegación para que el UI kit ya pueda construir pantallas reales tipo dashboard, app AI, video tool o admin panel.

Esta HU implementa:

```txt
NShell
NSidebar
NSidebarSection
NSidebarItem
NToolbar
NTabs
NTabItem
NPageHeader
NCommandBar
```

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener componentes de layout y navegación para construir una pantalla completa tipo aplicación,
para que el playground deje de ser solo una galería de componentes y empiece a parecer una app real construida con Neural Angular UI.

---

## Objetivo principal

Crear el primer sistema de layout MVP de `@neural/angular-ui`.

Al terminar esta HU, el playground debe tener una demo tipo aplicación real con:

* Sidebar.
* Toolbar superior.
* Page header.
* Tabs.
* Command bar.
* Área de contenido.
* Cards.
* Forms.
* Feedback.
* Badges/chips/icons.
* Composición realista usando componentes existentes.

---

# 1. Componentes a crear

Crear estructura:

```txt
packages/ui/src/shell/
packages/ui/src/sidebar/
packages/ui/src/toolbar/
packages/ui/src/tabs/
packages/ui/src/page-header/
packages/ui/src/command-bar/
```

Cada carpeta debe seguir la convención usada por los componentes anteriores:

```txt
*.component.ts
*.component.html
*.component.scss
*.types.ts
index.ts
```

Si algún componente tiene subcomponentes, crear archivos separados solo cuando sea necesario.

---

# 2. NShell

Selector:

```html
<n-shell></n-shell>
```

## Objetivo

`NShell` es el contenedor principal de una aplicación.

Debe permitir layouts tipo:

```txt
sidebar + main content
sidebar + toolbar + content
full content
```

## API mínima

Tipos:

```ts
export type NShellVariant = 'default' | 'compact';
export type NShellSidebarMode = 'fixed' | 'inline' | 'none';
```

Inputs:

```ts
variant?: NShellVariant;
sidebarMode?: NShellSidebarMode;
contentMaxWidth?: string;
```

Defaults:

```ts
variant = 'default';
sidebarMode = 'fixed';
contentMaxWidth = 'none';
```

## Uso esperado

```html
<n-shell>
  <n-sidebar shell-sidebar>
    ...
  </n-sidebar>

  <main shell-content>
    ...
  </main>
</n-shell>
```

O si se prefiere una API más simple:

```html
<n-shell>
  <n-sidebar />
  <div nShellContent>
    ...
  </div>
</n-shell>
```

Elegir una estrategia limpia según la arquitectura actual del repo.

## Reglas

* No usar JavaScript para calcular layout.
* Usar CSS Grid o Flexbox.
* Usar tokens `--n-*`.
* SSR-safe.
* Responsive básico.
* No implementar aún drawer móvil complejo.

---

# 3. NSidebar

Selector:

```html
<n-sidebar></n-sidebar>
```

## Objetivo

Sidebar vertical para navegación de apps.

Debe soportar:

* Header/logo proyectado.
* Secciones.
* Items.
* Footer opcional.
* Estado colapsado visual básico.

## API mínima

Tipos:

```ts
export type NSidebarVariant = 'default' | 'floating';
export type NSidebarSize = 'sm' | 'md' | 'lg';
```

Inputs:

```ts
variant?: NSidebarVariant;
size?: NSidebarSize;
collapsed?: boolean;
ariaLabel?: string;
```

Defaults:

```ts
variant = 'default';
size = 'md';
collapsed = false;
ariaLabel = 'Main navigation';
```

Uso:

```html
<n-sidebar ariaLabel="Main navigation">
  <div nSidebarBrand>
    <n-icon name="sparkles" />
    <span>Neural Angular</span>
  </div>

  <n-sidebar-section label="Core">
    <n-sidebar-item icon="home" label="Overview" [active]="true" />
    <n-sidebar-item icon="cpu" label="Processing" badge="AI" />
    <n-sidebar-item icon="settings" label="Settings" />
  </n-sidebar-section>

  <div nSidebarFooter>
    <n-avatar name="Anderson Oroya" status="online" />
  </div>
</n-sidebar>
```

---

# 4. NSidebarSection

Selector:

```html
<n-sidebar-section></n-sidebar-section>
```

## API

Inputs:

```ts
label?: string;
```

Uso:

```html
<n-sidebar-section label="Workspace">
  <n-sidebar-item icon="home" label="Dashboard" />
  <n-sidebar-item icon="file-text" label="Projects" />
</n-sidebar-section>
```

Debe renderizar:

* Label pequeño uppercase si existe.
* Content projection.

---

# 5. NSidebarItem

Selector:

```html
<n-sidebar-item></n-sidebar-item>
```

## API

Inputs:

```ts
icon?: string;
label?: string;
badge?: string;
active?: boolean;
disabled?: boolean;
href?: string;
```

Output:

```ts
itemClick
```

## Uso

```html
<n-sidebar-item
  icon="home"
  label="Overview"
  [active]="true"
/>

<n-sidebar-item
  icon="external-link"
  label="Docs"
  href="https://example.com"
/>
```

## Reglas

* Si tiene `href`, puede renderizar `<a>`.
* Si no tiene `href`, renderizar `<button type="button">`.
* No usar Angular Router todavía como dependencia obligatoria.
* No crear `routerLink` API todavía salvo que sea trivial y no agregue complejidad.
* Usar `NIcon` internamente si `icon` existe.
* Usar `NBadge` internamente si `badge` existe.
* Accesible con teclado.
* Si `disabled`, no emitir evento.

---

# 6. NToolbar

Selector:

```html
<n-toolbar></n-toolbar>
```

## Objetivo

Toolbar superior para acciones, búsqueda, estado y usuario.

## API mínima

Inputs:

```ts
density?: 'comfortable' | 'compact';
bordered?: boolean;
sticky?: boolean;
```

Defaults:

```ts
density = 'comfortable';
bordered = true;
sticky = false;
```

## Slots / proyección

Permitir zonas:

```html
<n-toolbar>
  <div nToolbarStart>
    ...
  </div>

  <div nToolbarCenter>
    ...
  </div>

  <div nToolbarEnd>
    ...
  </div>
</n-toolbar>
```

Uso:

```html
<n-toolbar>
  <div nToolbarStart>
    <n-button variant="ghost" size="sm">
      <n-icon name="search" size="sm" />
      Search
    </n-button>
  </div>

  <div nToolbarEnd>
    <n-badge variant="success" [dot]="true">Online</n-badge>
    <n-avatar name="Anderson Oroya" size="sm" />
  </div>
</n-toolbar>
```

---

# 7. NTabs y NTabItem

## NTabs

Selector:

```html
<n-tabs></n-tabs>
```

## NTabItem

Selector:

```html
<n-tab-item></n-tab-item>
```

## Objetivo

Crear tabs visuales simples para navegación de secciones.

No implementar todavía router tabs complejos.

## API de NTabs

Inputs:

```ts
value?: string;
variant?: 'line' | 'pill';
size?: 'sm' | 'md';
```

Output:

```ts
valueChange
```

## API de NTabItem

Inputs:

```ts
value: string;
label?: string;
icon?: string;
badge?: string;
disabled?: boolean;
```

Output interno o comunicación con parent según convención elegida.

Uso esperado:

```html
<n-tabs [(value)]="activeTab">
  <n-tab-item value="overview" icon="home" label="Overview" />
  <n-tab-item value="jobs" icon="cpu" label="Jobs" badge="3" />
  <n-tab-item value="settings" icon="settings" label="Settings" />
</n-tabs>
```

## Reglas

* Mantenerlo simple.
* No implementar paneles todavía.
* No implementar router integration todavía.
* Usar botones reales.
* Accesible razonablemente:

  * `role="tablist"` para contenedor.
  * `role="tab"` para items.
  * `aria-selected`.
  * `disabled` si aplica.

---

# 8. NPageHeader

Selector:

```html
<n-page-header></n-page-header>
```

## Objetivo

Header de página con eyebrow, título, descripción, metadata y acciones.

## API

Inputs:

```ts
eyebrow?: string;
title?: string;
description?: string;
icon?: string;
```

Content projection para acciones:

```html
<n-page-header
  eyebrow="Workspace"
  title="Neural Dashboard"
  description="Monitor components, jobs and AI workflows."
  icon="sparkles"
>
  <n-button pageHeaderAction variant="ghost">Cancel</n-button>
  <n-button pageHeaderAction>
    <n-icon name="plus" size="sm" />
    New Project
  </n-button>
</n-page-header>
```

Debe usar `NIcon` si `icon` existe.

---

# 9. NCommandBar

Selector:

```html
<n-command-bar></n-command-bar>
```

## Objetivo

Barra horizontal de acciones rápidas.

No es command palette overlay todavía.

## API

Inputs:

```ts
density?: 'comfortable' | 'compact';
align?: 'start' | 'center' | 'end' | 'between';
```

Uso:

```html
<n-command-bar align="between">
  <div>
    <n-chip selected>Angular 22</n-chip>
    <n-chip>SSR Ready</n-chip>
  </div>

  <div>
    <n-button variant="ghost" size="sm">Preview</n-button>
    <n-button size="sm">
      <n-icon name="play" size="sm" />
      Run
    </n-button>
  </div>
</n-command-bar>
```

Debe ser layout-only, sin lógica compleja.

---

# 10. Tokens permitidos

Agregar tokens mínimos si hacen falta:

```css
--n-shell-bg
--n-sidebar-width-sm
--n-sidebar-width-md
--n-sidebar-width-lg
--n-sidebar-bg
--n-sidebar-border
--n-toolbar-height
--n-toolbar-bg
--n-toolbar-border
--n-page-header-gap
--n-command-bar-bg
```

No agregar tokens masivamente.

Usar tokens ya existentes cuando sea posible.

---

# 11. Exports públicos

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/package.json
```

Agregar exports:

```txt
./shell
./sidebar
./toolbar
./tabs
./page-header
./command-bar
```

No romper exports existentes.

Cada carpeta debe tener `index.ts`.

---

# 12. Playground — App Layout Demo

Actualizar `apps/playground`.

Crear una nueva vista/sección principal:

```txt
Layout MVP Demo
```

Debe mostrar una pantalla tipo app real usando los nuevos componentes.

Ejemplo de estructura:

```html
<n-shell>
  <n-sidebar>
    <div nSidebarBrand>
      <n-icon name="sparkles" />
      <div>
        <strong>Neural Angular</strong>
        <small>UI Kit</small>
      </div>
    </div>

    <n-sidebar-section label="Foundation">
      <n-sidebar-item icon="home" label="Overview" [active]="true" />
      <n-sidebar-item icon="palette" label="Tokens" />
      <n-sidebar-item icon="component" label="Components" badge="MVP" />
    </n-sidebar-section>

    <n-sidebar-section label="Product">
      <n-sidebar-item icon="cpu" label="AI Jobs" badge="3" />
      <n-sidebar-item icon="play" label="Video Tools" />
      <n-sidebar-item icon="settings" label="Settings" />
    </n-sidebar-section>

    <div nSidebarFooter>
      <n-avatar name="Anderson Oroya" status="online" />
    </div>
  </n-sidebar>

  <div nShellContent>
    <n-toolbar>
      <div nToolbarStart>
        <n-badge variant="success" [dot]="true">System Online</n-badge>
      </div>

      <div nToolbarEnd>
        <n-button variant="ghost" size="sm">
          <n-icon name="search" size="sm" />
          Search
        </n-button>

        <n-button size="sm">
          <n-icon name="plus" size="sm" />
          New
        </n-button>
      </div>
    </n-toolbar>

    <n-page-header
      eyebrow="Playground"
      title="Neural Angular Layout"
      description="A full app layout composed with the first MVP primitives."
      icon="sparkles"
    >
      <n-button pageHeaderAction variant="ghost">View Docs</n-button>
      <n-button pageHeaderAction>
        <n-icon name="play" size="sm" />
        Run Demo
      </n-button>
    </n-page-header>

    <n-tabs [(value)]="activeLayoutTab">
      <n-tab-item value="overview" icon="home" label="Overview" />
      <n-tab-item value="jobs" icon="cpu" label="Jobs" badge="3" />
      <n-tab-item value="settings" icon="settings" label="Settings" />
    </n-tabs>

    <n-command-bar align="between">
      <div>
        <n-chip selected>Angular 22</n-chip>
        <n-chip>Lucide</n-chip>
        <n-chip>Dark UI</n-chip>
      </div>

      <div>
        <n-button variant="ghost" size="sm">Reset</n-button>
        <n-button size="sm">
          <n-icon name="arrow-right" size="sm" />
          Continue
        </n-button>
      </div>
    </n-command-bar>

    <section class="layout-demo-grid">
      <n-card variant="gradient" [interactive]="true">
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
        </n-card-content>

        <n-card-footer>
          <n-button variant="ghost" size="sm">Cancel</n-button>
          <n-button size="sm">Open</n-button>
        </n-card-footer>
      </n-card>

      <n-card>
        <n-card-header>
          <n-card-title>Create Project</n-card-title>
          <n-card-description>
            Test form primitives inside a real layout.
          </n-card-description>
        </n-card-header>

        <n-card-content>
          <n-input label="Project name" placeholder="Neural demo" />
          <n-select
            label="Model"
            placeholder="Select model"
            [options]="modelOptions"
          />
        </n-card-content>

        <n-card-footer>
          <n-button fullWidth>
            <n-icon name="plus" size="sm" />
            Create
          </n-button>
        </n-card-footer>
      </n-card>
    </section>
  </div>
</n-shell>
```

Adaptar si algunos componentes tienen nombres o APIs ligeramente diferentes en el repo actual.

---

# 13. Playground responsive básico

El layout demo debe funcionar razonablemente en:

```txt
desktop
tablet-ish
small viewport básico
```

No implementar todavía drawer móvil ni menú hamburguesa real.

En pantallas pequeñas:

* Sidebar puede quedar arriba, colapsar visualmente o mantenerse horizontalmente scrollable.
* Content debe seguir siendo usable.
* No hace falta perfección responsive todavía.

---

# 14. Documentación

Crear:

```txt
docs/ui/shell.md
docs/ui/sidebar.md
docs/ui/toolbar.md
docs/ui/tabs.md
docs/ui/page-header.md
docs/ui/command-bar.md
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

# 15. Tests

Si ya existe test runner configurado, crear pruebas mínimas.

Prioridad de tests:

```txt
NSidebarItem
NTabs / NTabItem
NPageHeader
NCommandBar
```

Tests sugeridos:

## NSidebarItem

* Renderiza label.
* Renderiza icon si existe.
* Renderiza badge si existe.
* Aplica active.
* No emite click si disabled.

## NTabs

* Renderiza items.
* Aplica selected.
* Emite valueChange al seleccionar tab.
* No emite si tab está disabled.

## NPageHeader

* Renderiza title, description, eyebrow e icon.
* Renderiza acciones proyectadas.

## NCommandBar

* Renderiza contenido proyectado.
* Aplica align.

Si no hay test runner configurado, no instalar uno solo para esta HU. Documentar que queda pendiente.

---

# 16. Accesibilidad

## Sidebar

* Usar `<nav>` o `role="navigation"`.
* Permitir `aria-label`.
* Items deben ser `<button>` o `<a>`, no `<div>` clickeable.

## Tabs

* Usar `role="tablist"`.
* Items con `role="tab"`.
* `aria-selected`.
* `disabled` si aplica.

## Toolbar

* Puede usar `role="toolbar"` si tiene acciones.
* No forzar roles incorrectos si solo es layout.

## PageHeader

* Renderizar título como heading real.
* Usar `h1` por defecto si no hay conflicto.

---

# 17. SSR Safety

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

Todo debe ser Angular template + CSS + inputs/outputs/signals si ya se usan.

---

# 18. Fuera de alcance

No hacer todavía:

```txt
NDialog
NTooltip
NToast
NTable
NDataCard
NStatCard
NMetricCard
NVoiceOrb
NPromptInput
Oroya Video components
Advanced responsive drawer
Router integration
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

# 19. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NShell`.
2. Exista `NSidebar`.
3. Exista `NSidebarSection`.
4. Exista `NSidebarItem`.
5. Exista `NToolbar`.
6. Exista `NTabs`.
7. Exista `NTabItem`.
8. Exista `NPageHeader`.
9. Exista `NCommandBar`.
10. Todos sean standalone Angular components.
11. Todos usen tokens `--n-*`.
12. Todos sean SSR-safe.
13. Los exports públicos estén actualizados.
14. `package.json` tenga exports secundarios si aplica.
15. Playground tenga una demo tipo app real.
16. Docs estén creadas/actualizadas.
17. No se hayan creado componentes fuera del alcance.
18. Build/check disponible pase o se documenten limitaciones.

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
Layout MVP Demo
Sidebar
Toolbar
Page Header
Tabs
Command Bar
Cards
Forms
Feedback
```

---

# 21. Resultado esperado

Mostrar resumen con:

```txt
Files created
Files updated
Components created
Public API added
Playground layout demo added
Docs added
Tests added or skipped with reason
How to run
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-006 — Crear Data Display MVP: NStatCard, NMetricCard, NDataCard, NTimeline y NTable básico
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add layout and navigation primitives"
```
