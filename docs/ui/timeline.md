# NTimeline

Status: MVP available.

`NTimeline` and `NTimelineItem` render sequential activity, pipeline events, logs, or processing steps.

## Import

```ts
import { NTimeline, NTimelineItem } from '@neural/angular-ui/timeline';
```

## API

`NTimeline`:

- `density: 'comfortable' | 'compact' = 'comfortable'`

`NTimelineItem`:

- `title?: string`
- `description?: string`
- `time?: string`
- `icon?: string`
- `status: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'running' | 'pending' = 'neutral'`
- `timeAlign: 'inline' | 'end' = 'end'`
- `timeAccent: boolean = false`
- `active: boolean = false`

## Example

```html
<n-timeline>
  <n-timeline-item
    title="Upload completed"
    description="Source video uploaded successfully"
    time="10:24"
    icon="upload"
    status="success"
  />
</n-timeline>
```

## Accessibility

The timeline renders an ordered list, and each item is a list item for sequential reading.

## Limitations

No JS animation, no automatic timestamps, and no data loading behavior are included.
