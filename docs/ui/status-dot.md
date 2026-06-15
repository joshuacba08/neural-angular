# NStatusDot

Status: implemented as a Core UI presence and status primitive.

`NStatusDot` renders a small token-based status indicator with optional pulse.

## Import

```ts
import { NStatusDot } from '@neural/angular-ui';
import { NStatusDot } from '@neural/angular-ui/status-dot';
```

## API

Inputs: `status`, `pulse`, `label`.

```html
<n-status-dot status="online" [pulse]="true" label="Online" />
<n-status-dot status="danger" label="Error" />
```

Accessibility: when `label` exists, the component uses `role="status"` and `aria-label`.
