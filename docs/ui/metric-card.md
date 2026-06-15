# NMetricCard

Status: MVP available.

`NMetricCard` displays a richer metric with title, subtitle, value, optional unit, optional progress, footer, and projected details.

## Import

```ts
import { NMetricCard } from '@neural/angular-ui/metric-card';
```

## API

- `title?: string`
- `subtitle?: string`
- `value?: string | number`
- `unit?: string`
- `icon?: string`
- `variant: 'default' | 'gradient' | 'success' | 'warning' | 'danger' | 'info' = 'default'`
- `progress?: number | null`
- `footer?: string`

## Example

```html
<n-metric-card
  title="Enhancement Queue"
  subtitle="Active jobs"
  value="14"
  icon="cpu"
  [progress]="64"
/>
```

## Accessibility

When progress is provided, the component uses `NProgress`, preserving its progressbar semantics.
