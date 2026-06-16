# NBadge

Status: implemented as a Core UI primitive.

`NBadge` is a standalone Angular component for compact status labels. It follows the Claude design system spec: mono typography, 20px default height, soft semantic fills without borders, and a Gemini gradient highlight variant.

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
| `variant` | `'neutral' \| 'gradient' \| 'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` |
| `size` | `'sm' \| 'md'` | `'sm'` |
| `shape` | `'pill' \| 'square'` | `'pill'` |
| `dot` | `boolean` | `false` |

### Variant mapping (design system)

| `variant` | Design class | Use |
| --- | --- | --- |
| `gradient` | `nb-g` | Highlight badge with Gemini gradient fill |
| `primary` | `nb-bv` | Blue Violet status |
| `tertiary` | `nb-vp` | Violet Pink status |
| `success` | `nb-s` | Success / active |
| `warning` | `nb-w` | Warning / beta / queued |
| `danger` | `nb-e` | Error / failed |
| `neutral` | — | Idle / queued neutral |

## Examples

```html
<n-badge variant="gradient">✦ Gemini</n-badge>
<n-badge variant="primary">Processing</n-badge>
<n-badge variant="success">Activo</n-badge>
<n-badge variant="success" [dot]="true">Running</n-badge>
<n-badge variant="warning">Beta</n-badge>
<n-badge variant="danger">Error</n-badge>
<n-badge variant="neutral">Idle</n-badge>
<n-badge variant="info" shape="square" size="sm">v22.0.1</n-badge>
```
