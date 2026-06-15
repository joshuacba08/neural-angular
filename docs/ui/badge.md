# NBadge

Status: implemented as a Core UI primitive.

`NBadge` is a standalone Angular component for compact status labels. It uses public `--n-*` tokens and supports variants, sizes, shape, and optional dot mode.

## Imports

```ts
import { NBadge } from '@neural/angular-ui';
```

```ts
import { NBadge } from '@neural/angular-ui/badge';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `variant` | `'neutral' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `shape` | `'pill' \| 'square'` | `'pill'` |
| `dot` | `boolean` | `false` |

## Examples

```html
<n-badge>Default</n-badge>
<n-badge variant="primary">Primary</n-badge>
<n-badge variant="success" [dot]="true">Ready</n-badge>
<n-badge variant="warning" size="sm">Pending</n-badge>
<n-badge variant="danger">Error</n-badge>
<n-badge variant="info" shape="square">Info</n-badge>
```
