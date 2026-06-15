# NDataCard

Status: MVP available.

`NDataCard` displays entity metadata as label/value rows with optional icons and status dots.

## Import

```ts
import { NDataCard, type NDataCardItem } from '@neural/angular-ui/data-card';
```

## API

- `title?: string`
- `description?: string`
- `icon?: string`
- `variant: 'default' | 'outlined' | 'gradient' = 'default'`
- `density: 'comfortable' | 'compact' = 'comfortable'`
- `items: readonly NDataCardItem[] = []`
- `interactive: boolean = false`

```ts
interface NDataCardItem {
  label: string;
  value: string | number;
  icon?: string;
  status?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}
```

## Example

```html
<n-data-card
  title="Real-ESRGAN x4"
  description="Video enhancement model"
  icon="sparkles"
  [items]="modelItems"
/>
```

## Notes

Projected content can be used for simple actions or footer content. The component does not contain business logic.
