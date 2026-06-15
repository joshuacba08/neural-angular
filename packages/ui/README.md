# @neural/angular-ui

Angular-first UI system for Neural Angular.

Current status: token foundation, a minimal Angular theme provider, Lucide icon provider, and Core UI primitives for buttons, cards, icons, badges, chips, forms, feedback, avatars, status, and empty states.

## Styles

```css
@import "@neural/angular-ui/styles";
```

## Theme

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

```html
<body data-n-theme="dark">
```

The provider applies `data-n-theme` to the document element in the browser. The dark theme is the primary theme for now. The light theme file exists as an explicit placeholder because the imported design reference is dark-only.

## Icons

```ts
import { provideNeuralIcons } from '@neural/angular-ui';

export const appConfig = {
  providers: [provideNeuralIcons()],
};
```

`provideNeuralIcons` registers a curated Lucide set through `@lucide/angular`. It does not use global scripts or `window.lucide`.

## Components

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

Secondary entry points are available in the workspace:

```ts
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
import { NIcon } from '@neural/angular-ui/icon';
import { NBadge } from '@neural/angular-ui/badge';
import { NChip } from '@neural/angular-ui/chip';
import { NInput } from '@neural/angular-ui/input';
import { NTextarea } from '@neural/angular-ui/textarea';
import { NSelect } from '@neural/angular-ui/select';
import { NAvatar } from '@neural/angular-ui/avatar';
import { NProgress } from '@neural/angular-ui/progress';
import { NSpinner } from '@neural/angular-ui/spinner';
import { NEmptyState } from '@neural/angular-ui/empty-state';
import { NStatusDot } from '@neural/angular-ui/status-dot';
```

```html
<n-button variant="primary">Primary</n-button>
<n-icon name="sparkles" />
<n-badge variant="success" [dot]="true">Ready</n-badge>
<n-chip variant="primary" [selected]="true">Angular</n-chip>
<n-input label="Email" placeholder="you@example.com" />
<n-progress [value]="64" label="Processing" [showValue]="true" />
<n-avatar name="Neural Angular" status="online" />

<n-card variant="gradient" [interactive]="true">
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

## Token Prefixes

Public tokens use the stable `--n-*` prefix. Imported `--nn-*` names are compatibility aliases only and should not be treated as the final public API.

## Not Implemented Yet

- Motion provider
- SSR helpers

## Next

- Layout primitives
- Navigation primitives
