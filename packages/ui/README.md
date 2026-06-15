# @neural/angular-ui

Angular-first UI system for Neural Angular.

Current status: token foundation, a minimal Angular theme provider, and the first standalone components: `NButton` and `NCard`.

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

## Components

```ts
import { NButton, NCard } from '@neural/angular-ui';
```

Secondary entry points are available in the workspace:

```ts
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
```

```html
<n-button variant="primary">Primary</n-button>

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

- Icon provider
- Motion provider
- SSR helpers

## Next

- `NIcon`
- `NBadge`
- `NChip`
