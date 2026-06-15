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

Import from the root package:

```ts
import { NButton, NCard } from '@neural/angular-ui';
```

Or import from secondary entry points:

```ts
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
```

Use them in standalone components:

```ts
@Component({
  imports: [NButton, NCard],
  template: `
    <n-button variant="primary">Primary</n-button>
    <n-card>Example card</n-card>
  `,
})
export class ExampleComponent {}
```

`NButton` and `NCard` are pure Angular template + CSS components. They do not use browser globals, GSAP, Angular Material, CDK overlays, or fake SSR helpers.
