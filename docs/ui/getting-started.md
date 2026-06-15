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
  NEmptyState,
  NIcon,
  NInput,
  NProgress,
  NSelect,
  NSpinner,
  NStatusDot,
  NTextarea,
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
import { NProgress } from '@neural/angular-ui/progress';
import { NSelect } from '@neural/angular-ui/select';
import { NSpinner } from '@neural/angular-ui/spinner';
import { NStatusDot } from '@neural/angular-ui/status-dot';
import { NTextarea } from '@neural/angular-ui/textarea';
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
    NEmptyState,
    NIcon,
    NInput,
    NProgress,
    NSelect,
    NSpinner,
    NStatusDot,
    NTextarea,
  ],
  template: `
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
  `,
})
export class ExampleComponent {}
```

Core components are pure Angular template + CSS components, with Lucide integrated through `@lucide/angular`. They do not use browser globals, GSAP, Angular Material, CDK overlays, or fake SSR helpers.

Form primitives currently expose `value` and `valueChange` for simple two-way binding. `ControlValueAccessor` integration is intentionally left for a future forms-focused iteration.
