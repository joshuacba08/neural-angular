# SpeedDial

Status: Implementation complete.

`NSpeedDial` is a floating action button (FAB) component that displays multiple staggered action options when clicked. It is equivalent to PrimeNG's SpeedDial.

## Import

```ts
import { NSpeedDial, NSpeedDialItem } from '@neural/angular-ui/speed-dial';
```

## API

```html
<n-speed-dial icon="plus" activeIcon="x" buttonVariant="primary" type="linear" direction="up">
  <button n-speed-dial-item icon="trash-2" title="Delete" (clickItem)="onDelete()"></button>
  <button n-speed-dial-item icon="share-2" title="Share" (clickItem)="onShare()"></button>
</n-speed-dial>
```

### NSpeedDial Component Inputs

* `icon`: Main button icon name (default: `'plus'`)
* `activeIcon`: Main button icon name when open (default: `'x'`)
* `buttonVariant`: FAB visual style: `'primary' | 'gemini' | 'secondary'` (default: `'primary'`)
* `type`: Layout style: `'linear' | 'radial'` (default: `'linear'`)
* `direction`: Direction of items: `'up' | 'down' | 'left' | 'right'` (default: `'up'`)
* `radius`: Spread radius in pixels for radial layout (default: `80`)

### NSpeedDialItem Component Inputs

* `icon`: Name of the Lucide icon to display (required)
* `title`: Tooltip label description
* `clickItem`: Output event emitter triggered on click

## Theming

These components consume variables defined in the design tokens:
* `--n-gradient-primary-secondary`
* `--n-gradient-gemini`
* `--n-surface-3`
* `--n-text-2`
