# NCard

Status: implemented as the first surface component in `@neural/angular-ui`.

`NCard` is a standalone Angular component for visual grouping. It uses public `--n-*` tokens for surfaces, borders, radius, elevation, and gradient treatments. It does not add fake click behavior or `role="button"` when `interactive` is enabled.

## Imports

```ts
import {
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardTitle,
} from '@neural/angular-ui';
```

```ts
import { NCard } from '@neural/angular-ui/card';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'gradient'` | `'default'` |
| `interactive` | `boolean` | `false` |

## Subcomponents

- `NCardHeader` with selector `n-card-header`
- `NCardTitle` with selector `n-card-title`
- `NCardDescription` with selector `n-card-description`
- `NCardContent` with selector `n-card-content`
- `NCardFooter` with selector `n-card-footer`

## Examples

```html
<n-card>
  Basic card
</n-card>

<n-card variant="elevated">
  Elevated card
</n-card>

<n-card variant="outlined">
  Outlined card
</n-card>

<n-card variant="gradient" [interactive]="true">
  Gradient card
</n-card>
```

```html
<n-card variant="gradient">
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
