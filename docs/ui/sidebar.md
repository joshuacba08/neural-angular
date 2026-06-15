# NSidebar

Status: MVP available.

`NSidebar`, `NSidebarSection`, and `NSidebarItem` provide vertical app navigation without router coupling.

## Import

```ts
import {
  NSidebar,
  NSidebarItem,
  NSidebarSection,
} from '@neural/angular-ui/sidebar';
```

## API

`NSidebar`:

- `variant: 'default' | 'floating' = 'default'`
- `size: 'sm' | 'md' | 'lg' = 'md'`
- `collapsed: boolean = false`
- `ariaLabel: string = 'Main navigation'`

`NSidebarSection`:

- `label?: string`

`NSidebarItem`:

- `icon?: string`
- `label?: string`
- `badge?: string`
- `active: boolean = false`
- `disabled: boolean = false`
- `href?: string`
- `itemClick: void`

## Example

```html
<n-sidebar ariaLabel="Main navigation">
  <div nSidebarBrand>
    <n-icon name="sparkles" />
    <span>Neural Angular</span>
  </div>

  <n-sidebar-section label="Core">
    <n-sidebar-item icon="home" label="Overview" [active]="true" />
    <n-sidebar-item icon="cpu" label="Processing" badge="AI" />
  </n-sidebar-section>
</n-sidebar>
```

## Accessibility

The sidebar renders a `nav` with `aria-label`. Items render as real buttons or anchors, and disabled items do not emit clicks.
