# NTable

Status: MVP available.

`NTable` renders a semantic table for basic data display.

## Import

```ts
import { NTable, type NTableColumn } from '@neural/angular-ui/table';
```

## API

- `columns: readonly NTableColumn[] = []`
- `data: readonly Record<string, unknown>[] = []`
- `density: 'comfortable' | 'compact' = 'comfortable'`
- `variant: 'default' | 'bordered' | 'surface' = 'default'`
- `emptyTitle: string = 'No data'`
- `emptyDescription: string = 'There are no records to display.'`

```ts
interface NTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  align?: 'start' | 'center' | 'end';
  width?: string;
  format?: (value: unknown, row: T) => string;
}
```

## Example

```html
<n-table
  [columns]="jobColumns"
  [data]="jobs"
  emptyTitle="No jobs"
  emptyDescription="Start a new processing job to see results."
/>
```

## Accessibility

The component renders real `table`, `thead`, `tbody`, `tr`, `th scope="col"`, and `td` elements.

## Limitations

Sorting, filtering, pagination, virtual scroll, and column templates are intentionally out of scope for this MVP.
