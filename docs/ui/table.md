# NTable

`NTable` is a standalone, semantic table component designed to display structured collections. It supports sorting, single or multiple checkbox row selections, client-side pagination, and customizable cell templates.

## Import

```ts
import { NTable, NTemplate, type NTableColumn, type NTableSortEvent } from '@neural/angular-ui/table';
```

## API

### Inputs and Models

- `columns: readonly NTableColumn[] = []` - Array of column configuration objects.
- `data: readonly any[] = []` - The data set records.
- `density: 'comfortable' | 'compact' = 'comfortable'` - Padding intensity.
- `variant: 'default' | 'bordered' | 'surface' = 'default'` - Border style variant.
- `emptyTitle: string = 'No data'` - Title displayed in empty state.
- `emptyDescription: string = 'There are no records to display.'` - Subtext in empty state.
- `sortable: boolean = false` - Enables/disables header sorting behaviors by default.
- `sortField: string | null` - *(two-way)* Active sort column key.
- `sortOrder: 'asc' | 'desc' | null` - *(two-way)* Active sort direction.
- `selectionMode: 'single' | 'multiple' | null = null` - Enables checkbox selection.
- `selection: any[] | any = null` - *(two-way)* Selected row data (array for multiple, single object for single selection).
- `dataKey: string = 'id'` - Unique row identifier key.
- `paginator: boolean = false` - Enables paginator footer and slices client data.
- `rows: number = 10` - *(two-way)* Number of records per page.
- `first: number = 0` - *(two-way)* Index of the first record to display.
- `totalRecords: number | null = null` - Overrides total items (for remote servers).
- `rowsPerPageOptions: number[] = [10, 25, 50]` - Rows-per-page options.

### Outputs

- `sort: EventEmitter<NTableSortEvent>` - Emitted when a header column is sorted.

```ts
interface NTableSortEvent {
  field: string;
  order: 'asc' | 'desc';
}
```

## NTableColumn Configuration

```ts
interface NTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  align?: 'start' | 'center' | 'end';
  width?: string;
  sortable?: boolean;
  format?: (value: unknown, row: T) => string;
}
```

## Custom Cell Templates

To render custom HTML (e.g. badges or icons) in any column cell, add an `<ng-template>` with the `nTemplate` directive matching the column's `key`:

```html
<n-table [columns]="jobColumns" [data]="jobs">
  <ng-template nTemplate="status" let-value let-row="row">
    <n-badge [variant]="value === 'Done' ? 'success' : 'info'">
      {{ value }}
    </n-badge>
  </ng-template>
</n-table>
```

## Accessibility

The component uses fully semantic HTML structure (`table`, `thead`, `tbody`, `tr`, `th`, `td`) along with explicit accessibility attributes for buttons and selections.
