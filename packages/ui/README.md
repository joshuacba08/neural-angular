# @neural/angular-ui

Angular-first UI system for Neural Angular.

Current status: token foundation only. This package exposes curated CSS tokens and small TypeScript token metadata. Components, providers, and motion utilities are intentionally not implemented yet.

## Styles

```css
@import "@neural/angular-ui/styles";
```

## Theme

```html
<body data-n-theme="dark">
```

The dark theme is the primary theme for now. The light theme file exists as an explicit placeholder because the imported design reference is dark-only.

## Token Prefixes

Public tokens use the stable `--n-*` prefix. Imported `--nn-*` names are compatibility aliases only and should not be treated as the final public API.

## Not Implemented Yet

- Components
- Theme provider
- Icon provider
- Motion provider
- SSR helpers

## Next

- Minimal Angular theme provider
- Tiny playground token usage check
- `NButton`
- `NCard`
