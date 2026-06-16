# NStatCard

Status: implemented as a Core UI data primitive.

`NStatCard` displays KPI metrics with Gemini gradient borders, gradient values, optional icon, trend and meta text. Supports a compact `mini` size for inline stat rows.

## Import

```ts
import { NStatCard } from '@neural/angular-ui';
import { NStatCard } from '@neural/angular-ui/stat-card';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `label` | `string` | — |
| `value` | `string \| number` | — |
| `description` | `string` | — |
| `icon` | `string` | — |
| `variant` | `'default' \| 'primary' \| 'secondary' \| ...` | `'default'` |
| `size` | `'default' \| 'mini'` | `'default'` |
| `trend` | `'up' \| 'down' \| 'neutral'` | `'neutral'` |
| `trendValue` | `string` | — |
| `interactive` | `boolean` | `false` |

### Size mapping

| `size` | Use |
| --- | --- |
| `default` | KPI grid cards with icon, trend and meta |
| `mini` | Inline mini stats — label + gradient value only |

### Variant borders (mini)

| `variant` | Border |
| --- | --- |
| `default` | Gemini gradient border |
| `primary` | Blue → Violet |
| `secondary` | Violet → Pink |

## Examples

### KPI Grid

```html
<n-stat-card
  label="Tokens / día"
  value="2.4M"
  icon="zap"
  trend="up"
  trendValue="18.4% vs. ayer"
  description="Máx. 4M en el plan Pro"
  [interactive]="true"
/>
```

### Mini Stats

```html
<n-stat-card size="mini" variant="primary" label="Req / min" value="4,280" />
<n-stat-card size="mini" variant="secondary" label="Cache hit" value="87.3%" />
<n-stat-card size="mini" variant="default" label="Memoria" value="6.2 GB" />
```

## Notes

- Hover applies a gradient surface tint, lift and glow on all cards.
- `interactive` only adds `cursor: pointer`; the card does not emit click events.
- GSAP count-up animation is a future enhancement for the design system reference.
