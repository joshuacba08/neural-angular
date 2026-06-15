# NStatCard

Status: MVP available.

`NStatCard` displays a compact KPI with label, value, description, icon, variant, and trend.

## Import

```ts
import { NStatCard } from '@neural/angular-ui/stat-card';
```

## API

- `label?: string`
- `value?: string | number`
- `description?: string`
- `icon?: string`
- `variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'default'`
- `trend: 'up' | 'down' | 'neutral' = 'neutral'`
- `trendValue?: string`
- `interactive: boolean = false`

## Example

```html
<n-stat-card
  label="Jobs processed"
  value="128"
  description="Last 24 hours"
  icon="activity"
  trend="up"
  trendValue="12%"
/>
```

## Notes

`interactive` is visual only. The card does not emit click events or behave like a button.
