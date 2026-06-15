# NToast

Status: MVP complete for HU-007.

`NToast` is a temporary feedback primitive built with Angular CDK Overlay. Toasts are created through `NToastService`, support multiple variants, and use CSS animation only.

## Import

```ts
import { NToastService } from '@neural/angular-ui/toast';
```

## API

```ts
toast.show('Saved');
toast.success('Project created', { title: 'Success' });
toast.info('Pipeline started');
toast.warning('Check settings');
toast.danger('Export failed', { duration: 6000 });
toast.dismissAll();
```

Variants: `neutral`, `success`, `info`, `warning`, `danger`.

Positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`.

## Basic Usage

```ts
this.toast.success('Project created', {
  title: 'Success',
  icon: 'circle-check',
});
```

## Accessibility

Neutral, info, and success toasts use `role="status"`. Warning and danger toasts use `role="alert"`. Dismissible toasts include a close button with an accessible label.

## Known Limitations

Queue layout is intentionally simple. The MVP does not include pause-on-hover, action buttons, promise toasts, or cross-route persistence.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
