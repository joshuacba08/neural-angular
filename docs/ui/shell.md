# NShell

Status: MVP available.

`NShell` is the main app container for layouts with sidebar plus content or full-width content.

## Import

```ts
import { NShell } from '@neural/angular-ui/shell';
```

## API

- `variant: 'default' | 'compact' = 'default'`
- `sidebarMode: 'fixed' | 'inline' | 'none' = 'fixed'`
- `contentMaxWidth: string = 'none'`

## Example

```html
<n-shell>
  <n-sidebar />

  <div nShellContent>
    App content
  </div>
</n-shell>
```

## Notes

The component is CSS-only and SSR-safe. It does not implement a mobile drawer yet.
