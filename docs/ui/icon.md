# NIcon

Status: implemented with `@lucide/angular`.

`NIcon` is a standalone Angular component that renders Lucide icons through the Angular-native dynamic icon directive. It does not use `window.lucide`, global scripts, DOM replacement, or manual icon hydration.

## Installation

`@lucide/angular` is required by `@neural/angular-ui` and is declared as a peer dependency.

```bash
pnpm add @lucide/angular
```

## Provider

Register the initial Neural icon set once in application config:

```ts
import { provideNeuralIcons, provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({ defaultTheme: 'dark' }),
    provideNeuralIcons(),
  ],
};
```

## Imports

```ts
import { NIcon, provideNeuralIcons } from '@neural/angular-ui';
```

```ts
import { NIcon } from '@neural/angular-ui/icon';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `name` | `string` | `''` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `label` | `string \| undefined` | `undefined` |
| `decorative` | `boolean` | `true` |
| `strokeWidth` | `number` | `2` |

## Examples

```html
<n-icon name="sparkles" />
<n-icon name="settings" size="lg" />

<n-icon
  name="trash-2"
  size="sm"
  label="Delete"
  [decorative]="false"
/>
```

## Registered Icons

Initial registered names:

```txt
activity
alert-circle
arrow-right
check
chevron-down
circle-check
circle-x
code
command
cpu
external-link
file-text
home
info
loader-circle
moon
play
plus
search
settings
sparkles
sun
trash-2
upload
x
```

`@lucide/angular@1.18.0` does not expose a GitHub brand icon, so the initial Neural set uses `code` instead.

## Accessibility

Decorative icons render with `aria-hidden="true"`. Meaningful icons should set `[decorative]="false"` and provide `label`, which maps to `role="img"` and `aria-label`.
