# NToolbar

Status: MVP available.

`NToolbar` is a top application bar for search, actions, status, and user controls.

## Import

```ts
import { NToolbar } from '@neural/angular-ui/toolbar';
```

## API

- `density: 'comfortable' | 'compact' = 'comfortable'`
- `bordered: boolean = true`
- `sticky: boolean = false`

## Example

```html
<n-toolbar>
  <div nToolbarStart>
    <n-badge variant="success" [dot]="true">Online</n-badge>
  </div>

  <div nToolbarEnd>
    <n-button variant="ghost" size="sm">Search</n-button>
  </div>
</n-toolbar>
```

## Notes

The toolbar is layout-only and uses projected start, center, and end slots. It does not manage focus or menus.
