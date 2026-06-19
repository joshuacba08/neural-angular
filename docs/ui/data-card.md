# NDataCard

Status: Implemented.

`NDataCard` displays entity metadata as label/value rows with optional icons and status dots, or hosts embedded SVG charts (bar charts, donut charts, sparklines) for visual metrics without external chart engine dependencies.

## Import

```ts
import {
  NDataCard,
  NBarChart,
  NDonutChart,
  NSparkline,
  type NDataCardItem,
  type NDonutSegment
} from '@neural/angular-ui/data-card';
```

## API

### NDataCard

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

### NBarChart

- `data: readonly number[] = []` - Numeric history values (0-100)
- `height: number = 64` - Canvas vertical height
- `gridLines: boolean = true` - Render grid guidelines
- `labels?: { start: string; end: string }` - Low margin markers

### NDonutChart

- `segments: readonly NDonutSegment[] = []` - Stacked partition list
- `centerValue: string = ''` - Main content text
- `centerLabel: string = ''` - Small detail label

```ts
interface NDonutSegment {
  label: string;
  value: number;
  displayValue?: string;
  color?: 'blue-violet' | 'violet-pink' | 'neutral' | string;
}
```

### NSparkline

- `points: readonly number[] = []` - Numeric points array
- `variant: 'primary' | 'accent' | 'gemini' = 'primary'` - Gradient indicator preset

### NECharts

- `options: any = {}` - Native ECharts configuration object
- `height: string = '200px'` - DOM container height
- `theme?: 'light' | 'dark'` - Color scheme override

## Examples

### Basic Metadata List

```html
<n-data-card
  title="Real-ESRGAN x4"
  description="Video enhancement model"
  icon="sparkles"
  [items]="modelItems"
/>
```

### Embedded GPU Bar Chart

```html
<n-data-card variant="gradient">
  <div class="header-row">
    <h3>GPU utilization</h3>
    <n-badge variant="success" [dot]="true">Active</n-badge>
  </div>
  <n-bar-chart [data]="gpuHistory" [labels]="{ start: '-2 min', end: 'now' }" />
</n-data-card>
```

### Embedded VRAM Donut Chart

```html
<n-data-card variant="gradient">
  <n-donut-chart
    [segments]="vramData"
    centerValue="12 GB"
    centerLabel="VRAM"
  />
</n-data-card>
```

### ECharts Integration Card

```html
<n-data-card variant="gradient">
  <n-echarts [options]="chartOptions" height="150px" />
</n-data-card>
```

