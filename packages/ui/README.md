# @neural/angular-ui

Angular-first UI system for Neural Angular.

Current status: token foundation plus a minimal Angular theme provider. This package exposes curated CSS tokens, small TypeScript token metadata, and an SSR-safe provider for applying `data-n-theme`.

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

## Token Prefixes

Public tokens use the stable `--n-*` prefix. Imported `--nn-*` names are compatibility aliases only and should not be treated as the final public API.

## Not Implemented Yet

- Components
- Icon provider
- Motion provider
- SSR helpers

## Next

- `NButton`
- `NCard`
