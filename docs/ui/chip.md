# NChip

Status: implemented as a Core UI primitive.

`NChip` supports two design-system modes: **filter chips** (selectable pills with gradient border) and **tag chips** (severity labels, closable, with optional icons/avatars).

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
| `mode` | `'filter' \| 'tag'` | `'filter'` |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `selected` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `removable` | `boolean` | `false` |

| Output | Type |
| --- | --- |
| `removed` | `void` |

### Mode mapping

| `mode` | Design | Use |
| --- | --- | --- |
| `filter` | `.nn-chip` | Model filters, toggles; use `selected` for `.on` state |
| `tag` | `.nn-chip.nn-chip-*` | Severity labels, tags, closable filters |

Filter chips: 30px (`md`) / 24px (`sm`), gradient border on hover and when `selected`.

Tag chips: padding-based, semantic colors, optional `removable` with muted close icon.

## Examples

### Filter chips

```html
<n-chip [selected]="true">Todos los modelos</n-chip>
<n-chip>Neural Pro</n-chip>
<n-chip size="sm">Compact</n-chip>
```

### Tag severity

```html
<n-chip mode="tag" variant="primary">Blue</n-chip>
<n-chip mode="tag" variant="success">Success</n-chip>
```

### Closable tag

```html
<n-chip mode="tag" variant="primary" [removable]="true" (removed)="onRemove()">
  <n-icon name="info" size="xs" />
  4K UHD
</n-chip>
```

### With avatar

```html
<n-chip mode="tag" class="n-chip-with-avatar">
  <n-avatar name="John Doe" size="xs" variant="blue-violet" />
  John Doe
</n-chip>
```
