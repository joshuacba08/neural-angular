# NDataView

`NDataView` is a layout-switching component that displays a data set using either a grid card format or vertical list rows. It uses structural templates mapped to each display mode.

## Import

```ts
import { NDataView, NGridItem, NListItem } from '@neural/angular-ui/data-view';
```

## API

### Inputs and Models

- `data: readonly any[] = []` - The data set records.
- `layout: 'grid' | 'list' = 'grid'` - *(two-way)* Active display layout.
- `dataKey: string = 'id'` - Unique identifier key for row tracking.

### Structural Directives

- `NGridItem` (`[nGridItem]`) - Identifies the template to use in Grid mode.
- `NListItem` (`[nListItem]`) - Identifies the template to use in List mode.

## Example Usage

```html
<n-data-view [data]="models" [(layout)]="viewLayout">
  <!-- Grid layout (cards) -->
  <ng-template nGridItem let-item>
    <div class="n-dv-card" [class.n-dv-card--active]="item.active" [class.n-dv-card--default]="!item.active">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </ng-template>

  <!-- List layout (rows) -->
  <ng-template nListItem let-item>
    <div class="n-dv-list-item n-dv-list-item--default">
      <div style="flex: 1">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>
      <n-badge variant="info">Active</n-badge>
    </div>
  </ng-template>
</n-data-view>
```

## Theming

### CSS Helper Classes

You can style items by applying the following classes in your projected templates:

- `.n-dv-card` - Basic spacing and border layout for grid item.
- `.n-dv-card--default` - Border gradient matching default cards.
- `.n-dv-card--active` - Primary Gemini border gradient and glow effect.
- `.n-dv-card--muted` - Reduced-opacity available state layout.
- `.n-dv-list-item` - Row configuration layout for list mode.
- `.n-dv-list-item--default` - Border gradient list row.
- `.n-dv-list-item--active` - Glowing primary gradient list row.
- `.n-dv-list-item--muted` - Reduced-opacity list row.
