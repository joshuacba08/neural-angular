# NTabs

Status: MVP available.

`NTabs` and `NTabItem` provide simple visual tab navigation for local state.

## Import

```ts
import { NTabItem, NTabs } from '@neural/angular-ui/tabs';
```

## API

`NTabs`:

- `value?: string`
- `variant: 'line' | 'pill' = 'line'`
- `size: 'sm' | 'md' = 'md'`
- `valueChange: string`

`NTabItem`:

- `value: string`
- `label?: string`
- `icon?: string`
- `badge?: string`
- `disabled: boolean = false`

## Example

```html
<n-tabs [(value)]="activeTab">
  <n-tab-item value="overview" icon="home" label="Overview" />
  <n-tab-item value="jobs" icon="cpu" label="Jobs" badge="3" />
</n-tabs>
```

## Accessibility

The container uses `role="tablist"` and each item uses a real button with `role="tab"`, `aria-selected`, and native disabled support.

## Limitations

Panels and router integration are intentionally out of scope for this MVP.
