# NProgress

Status: implemented as a Core UI feedback primitive.

`NProgress` renders a token-based progress bar with determinate and CSS-only indeterminate modes.

## Import

```ts
import { NProgress } from '@neural/angular-ui';
import { NProgress } from '@neural/angular-ui/progress';
```

## API

Inputs: `value`, `max`, `variant`, `size`, `indeterminate`, `label`, `showValue`.

```html
<n-progress [value]="64" label="Processing" [showValue]="true" />
<n-progress variant="success" [value]="100" />
<n-progress [indeterminate]="true" />
```

Accessibility: the track uses `role="progressbar"` and determinate mode sets progress ARIA values.
