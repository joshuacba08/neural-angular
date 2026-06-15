# HU-006 — Crear Data Display MVP: NStatCard, NMetricCard, NDataCard, NTimeline y NTable básico

## Contexto

Después de HU-005, `@neural/angular-ui` ya cuenta con layout/navigation MVP: `NShell`, `NSidebar`, `NToolbar`, `NTabs`, `NPageHeader` y `NCommandBar`.

Esta HU agrega el primer bloque de componentes Data Display para construir dashboards reales, paneles de monitoreo, vistas de jobs y pantallas tipo AI/media workflow.

## Componentes a crear

```txt
NStatCard
NMetricCard
NDataCard
NTimeline
NTimelineItem
NTable
NTableColumn
```

Estructura esperada:

```txt
packages/ui/src/stat-card/
packages/ui/src/metric-card/
packages/ui/src/data-card/
packages/ui/src/timeline/
packages/ui/src/table/
```

## Objetivo

Crear el primer MVP de Data Display para `@neural/angular-ui`.

El playground debe mostrar:

- Stats.
- Metrics.
- Data Cards.
- Timeline.
- Table.
- Dashboard Composition.

## Reglas principales

- Todos los componentes deben ser standalone Angular components.
- Usar tokens `--n-*`.
- Mantener SSR safety.
- No usar browser APIs.
- No usar Canvas.
- No usar GSAP.
- No crear lógica de negocio.
- `NTable` debe renderizar tabla semántica real con `table`, `thead`, `tbody`, `tr`, `th` y `td`.
- `NTable` debe mostrar empty state si no hay data.
- `NTimeline` debe permitir items proyectados.
- No implementar todavía sorting avanzado, pagination, virtual scroll, column templates ni Angular Material Table.

## API esperada

### NStatCard

```ts
export type NStatCardVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type NStatTrend = 'up' | 'down' | 'neutral';
```

Inputs:

```txt
label?: string
value?: string | number
description?: string
icon?: string
variant?: NStatCardVariant
trend?: NStatTrend
trendValue?: string
interactive?: boolean
```

### NMetricCard

```ts
export type NMetricCardVariant =
  | 'default'
  | 'gradient'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
```

Inputs:

```txt
title?: string
subtitle?: string
value?: string | number
unit?: string
icon?: string
variant?: NMetricCardVariant
progress?: number | null
footer?: string
```

### NDataCard

```ts
export type NDataCardVariant = 'default' | 'outlined' | 'gradient';
export type NDataCardDensity = 'comfortable' | 'compact';

export interface NDataCardItem {
  label: string;
  value: string | number;
  icon?: string;
  status?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}
```

### NTimeline

```ts
export type NTimelineDensity = 'comfortable' | 'compact';

export type NTimelineItemStatus =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'running'
  | 'pending';
```

### NTable

```ts
export type NTableDensity = 'comfortable' | 'compact';
export type NTableVariant = 'default' | 'bordered' | 'surface';

export interface NTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  align?: 'start' | 'center' | 'end';
  width?: string;
  format?: (value: unknown, row: T) => string;
}
```

## Playground

Agregar una sección:

```txt
Data Display MVP
```

Debe incluir:

- `Stats`
- `Metrics`
- `Data Cards`
- `Timeline`
- `Table`
- `Dashboard Composition`

La composición debe usar componentes existentes como `NShell`, `NPageHeader`, `NCommandBar`, `NBadge`, `NChip`, `NProgress`, `NButton` y `NIcon`, sin crear componentes `OV*`.

## Documentación

Crear:

```txt
docs/ui/stat-card.md
docs/ui/metric-card.md
docs/ui/data-card.md
docs/ui/timeline.md
docs/ui/table.md
```

Actualizar:

```txt
packages/ui/README.md
docs/ui/getting-started.md
docs/ui/implementation-plan.md
docs/ui/component-inventory.md
```

## Fuera de alcance

No crear todavía:

- `NDialog`
- `NTooltip`
- `NToast`
- `NDrawer`
- `NPopover`
- `NCommandPalette`
- `NCalendar`
- `NChart`
- `NVoiceOrb`
- `NPromptInput`
- Componentes `Oroya Video`
- Sorting/filtering avanzado
- Pagination
- Virtual scroll
- Column templates
- Angular Material table integration
- CDK overlays
- SSR package
- CLI
- Schematics
- Adapters
- Storybook

## Criterios de aceptación

La HU estará completa cuando:

1. Exista `NStatCard`.
2. Exista `NMetricCard`.
3. Exista `NDataCard`.
4. Exista `NTimeline`.
5. Exista `NTimelineItem`.
6. Exista `NTable`.
7. Exista tipo público `NTableColumn`.
8. Todos sean standalone Angular components.
9. Todos usen tokens `--n-*`.
10. Todos sean SSR-safe.
11. `NTable` renderice tabla semántica real.
12. `NTable` muestre empty state cuando no hay data.
13. `NTimeline` permita items proyectados.
14. Los exports públicos estén actualizados.
15. `package.json` tenga exports secundarios.
16. Playground tenga demo Data Display MVP.
17. Playground tenga dashboard composition demo.
18. Docs estén creadas/actualizadas.
19. No se hayan creado componentes fuera del alcance.
20. Build/check disponible pase o se documenten limitaciones.

## Validación manual

Debe poder ejecutarse:

```bash
pnpm nx serve playground
```

En la UI debe verse:

```txt
Neural Angular Playground
Data Display MVP
Stats
Metrics
Data Cards
Timeline
Table
Dashboard Composition
```

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add data display primitives"
```

