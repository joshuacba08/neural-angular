# NCommandBar

Status: MVP available.

`NCommandBar` is a horizontal action strip for filters, chips, and quick commands.

## Import

```ts
import { NCommandBar } from '@neural/angular-ui/command-bar';
```

## API

- `density: 'comfortable' | 'compact' = 'comfortable'`
- `align: 'start' | 'center' | 'end' | 'between' = 'start'`

## Example

```html
<n-command-bar align="between">
  <div nCommandGroup>
    <n-chip selected>Angular 22</n-chip>
    <n-chip>SSR Ready</n-chip>
  </div>

  <div nCommandGroup>
    <n-button variant="ghost" size="sm">Preview</n-button>
    <n-button size="sm">Run</n-button>
  </div>
</n-command-bar>
```

## Notes

This is not a command palette overlay. It is layout-only and SSR-safe.
