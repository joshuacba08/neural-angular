# NSpinner

Status: implemented as a Core UI loading primitive.

`NSpinner` is a CSS-only spinner. It can expose accessible status text through `label`.

## Import

```ts
import { NSpinner } from '@neural/angular-ui';
import { NSpinner } from '@neural/angular-ui/spinner';
```

## API

Inputs: `size`, `variant`, `label`.

```html
<n-spinner label="Loading content" />
<n-spinner size="sm" />
```

Accessibility: when `label` exists, the component uses `role="status"` and hides the text visually.
