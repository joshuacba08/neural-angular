# UI Getting Started

The first package planned for the workspace is `@neural/angular-ui`, an Angular-first UI system focused on standalone components, tokens, theming, and SSR-safe behavior.

The imported design reference currently lives in `docs/design_system/`. Treat those HTML/CSS files as prototype material for analysis, not as the final Angular implementation.

The initial package structure now exists in `packages/ui/`. Its first real implementation layer is token-only: public CSS variables use the `--n-*` prefix, while selected imported `--nn-*` names are reserved for compatibility during migration.

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

The provider applies `data-n-theme` in the browser and guards access to browser-only APIs. The playground in `apps/playground` validates the tokens visually with normal HTML and local demo styles. Real UI kit components such as `NButton`, `NCard`, `NIcon`, `NBadge`, and `NChip` are still intentionally not implemented.

The package-level style import remains the public target. The local playground currently imports source CSS by relative path so the Angular dev server can resolve it before the UI package has a full packaging pipeline.
