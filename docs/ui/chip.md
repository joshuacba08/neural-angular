# NChip

Status: implemented as a Core UI primitive.

`NChip` is a standalone Angular component for compact filters, selections, and labels. It uses public `--n-*` tokens and composes with `NIcon` for the removable action.

## Imports

```ts
import { NChip } from '@neural/angular-ui';
```

```ts
import { NChip } from '@neural/angular-ui/chip';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `selected` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `removable` | `boolean` | `false` |

| Output | Type |
| --- | --- |
| `removed` | `void` |

## Examples

```html
<n-chip>Default</n-chip>
<n-chip variant="primary" [selected]="true">Angular</n-chip>
<n-chip variant="secondary">Lucide</n-chip>
<n-chip [disabled]="true">Disabled</n-chip>
<n-chip [removable]="true" (removed)="onRemove()">Removable</n-chip>
```

When `removable` is true, the chip renders a real internal `<button type="button">` with `aria-label="Remove chip"`. Disabled chips do not emit `removed`.
