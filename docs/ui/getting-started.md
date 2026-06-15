# UI Getting Started

The first package planned for the workspace is `@neural/angular-ui`, an Angular-first UI system focused on standalone components, tokens, theming, and SSR-safe behavior.

The imported design reference currently lives in `docs/design_system/`. Treat those HTML/CSS files as prototype material for analysis, not as the final Angular implementation.

The initial package structure now exists in `packages/ui/`. Public CSS variables use the `--n-*` prefix, while selected imported `--nn-*` names are reserved for compatibility during migration.

## Styles

Import the UI token foundation once in an application stylesheet:

```css
@import "@neural/angular-ui/styles";
```

## Theme Provider

`@neural/angular-ui` now includes a minimal standalone-compatible theme provider:

```ts
import { provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({
      defaultTheme: 'dark',
      storage: false,
    }),
  ],
};
```

The provider applies `data-n-theme` in the browser and guards access to browser-only APIs. The playground in `apps/playground` validates the tokens visually and now renders the first real standalone components.

The package-level style import remains the public target. The local playground currently imports source CSS by relative path so the Angular dev server can resolve it before the UI package has a full packaging pipeline.

## Components

Register theme and icons in application config:

```ts
import { provideNeuralIcons, provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({ defaultTheme: 'dark' }),
    provideNeuralIcons(),
  ],
};
```

Import components from the root package:

```ts
import {
  NAvatar,
  NBadge,
  NButton,
  NCard,
  NChip,
  NCommandBar,
  NDataCard,
  NEmptyState,
  NIcon,
  NInput,
  NMetricCard,
  NPageHeader,
  NProgress,
  NSelect,
  NShell,
  NSidebar,
  NSidebarItem,
  NSidebarSection,
  NSpinner,
  NStatCard,
  NStatusDot,
  NTable,
  NTabItem,
  NTabs,
  NTextarea,
  NTimeline,
  NTimelineItem,
  NToolbar,
} from '@neural/angular-ui';
```

Or import from secondary entry points:

```ts
import { NBadge } from '@neural/angular-ui/badge';
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
import { NChip } from '@neural/angular-ui/chip';
import { NEmptyState } from '@neural/angular-ui/empty-state';
import { NIcon } from '@neural/angular-ui/icon';
import { NInput } from '@neural/angular-ui/input';
import { NPageHeader } from '@neural/angular-ui/page-header';
import { NProgress } from '@neural/angular-ui/progress';
import { NSelect } from '@neural/angular-ui/select';
import { NShell } from '@neural/angular-ui/shell';
import { NSidebar } from '@neural/angular-ui/sidebar';
import { NSpinner } from '@neural/angular-ui/spinner';
import { NStatusDot } from '@neural/angular-ui/status-dot';
import { NTabItem, NTabs } from '@neural/angular-ui/tabs';
import { NTextarea } from '@neural/angular-ui/textarea';
import { NToolbar } from '@neural/angular-ui/toolbar';
import { NCommandBar } from '@neural/angular-ui/command-bar';
import { NDataCard } from '@neural/angular-ui/data-card';
import { NMetricCard } from '@neural/angular-ui/metric-card';
import { NStatCard } from '@neural/angular-ui/stat-card';
import { NTable } from '@neural/angular-ui/table';
import { NTimeline, NTimelineItem } from '@neural/angular-ui/timeline';
```

Use them in standalone components:

```ts
@Component({
  imports: [
    NBadge,
    NButton,
    NCard,
    NCardContent,
    NCardFooter,
    NCardHeader,
    NCardTitle,
    NChip,
    NCommandBar,
    NDataCard,
    NEmptyState,
    NIcon,
    NInput,
    NMetricCard,
    NPageHeader,
    NProgress,
    NSelect,
    NShell,
    NSidebar,
    NSidebarItem,
    NSidebarSection,
    NSpinner,
    NStatCard,
    NStatusDot,
    NTable,
    NTabItem,
    NTabs,
    NTextarea,
    NTimeline,
    NTimelineItem,
    NToolbar,
  ],
  template: `
    <n-shell>
      <n-sidebar>
        <n-sidebar-section label="Core">
          <n-sidebar-item icon="home" label="Overview" [active]="true" />
        </n-sidebar-section>
      </n-sidebar>

      <div nShellContent>
        <n-toolbar>
          <div nToolbarEnd>
            <n-button size="sm">New</n-button>
          </div>
        </n-toolbar>

        <n-page-header
          title="Neural Layout"
          description="First app layout primitives."
        />

        <n-tabs [(value)]="activeTab">
          <n-tab-item value="overview" label="Overview" />
        </n-tabs>

        <n-command-bar>
          <n-chip selected>Angular 22</n-chip>
        </n-command-bar>
      </div>
    </n-shell>

    <n-card variant="gradient">
      <n-card-header>
        <n-card-title>
          <n-icon name="sparkles" size="sm" />
          Neural Core
        </n-card-title>
      </n-card-header>

      <n-card-content>
        <n-badge variant="success" [dot]="true">Ready</n-badge>
        <n-chip variant="primary" [selected]="true">Angular 22</n-chip>
        <n-progress [value]="64" label="Progress" [showValue]="true" />
      </n-card-content>

      <n-card-footer>
        <n-button variant="primary">Open</n-button>
      </n-card-footer>
    </n-card>

    <n-stat-card label="Jobs processed" value="128" icon="activity" />
    <n-metric-card title="Queue" value="14" icon="cpu" [progress]="64" />
    <n-data-card title="Model" icon="sparkles" [items]="modelItems" />
    <n-timeline>
      <n-timeline-item title="Upload completed" status="success" />
    </n-timeline>
    <n-table [columns]="jobColumns" [data]="jobs" />
  `,
})
export class ExampleComponent {}
```

Core and layout components are pure Angular template + CSS components, with Lucide integrated through `@lucide/angular`. They do not use browser globals, GSAP, Angular Material, CDK overlays, or fake SSR helpers.

Form primitives currently expose `value` and `valueChange` for simple two-way binding. `ControlValueAccessor` integration is intentionally left for a future forms-focused iteration.

Layout primitives currently avoid router integration and advanced mobile drawers. Those remain future iterations.

Data display primitives intentionally avoid advanced data-grid behavior. Sorting, filtering, pagination, virtual scroll, and column templates remain future iterations.
