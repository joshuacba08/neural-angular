# NDialog

Status: MVP complete for HU-007.

`NDialog` is a modal overlay primitive built with Angular CDK Overlay, Portal, and A11y focus trap. It is opened through `NDialogService` and uses Neural tokens for surface, border, shadow, width, and backdrop styling.

## Import

```ts
import { NDialogService } from '@neural/angular-ui/dialog';
```

## API

```ts
dialog.open(ComponentOrTemplate, {
  title: 'Create project',
  description: 'Configure the first Neural project.',
  size: 'md',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
});
```

Sizes: `sm`, `md`, `lg`, `xl`, `fullscreen`.

The call returns `NDialogRef<TResult>` with `close(result?)` and `afterClosed()`.

## Basic Usage

```ts
const ref = this.dialog.open(ProjectDialogComponent, {
  title: 'Create project',
  description: 'Configure your workspace.',
});

ref.afterClosed().subscribe((result) => {
  // Handle the optional result.
});
```

## Accessibility

The container renders `role="dialog"`, `aria-modal="true"`, optional title and description associations, a close button with an accessible label, ESC close support, and CDK focus trapping.

## Known Limitations

Footer slots are owned by the projected component or template for now. Advanced stacked dialogs, custom animation APIs, and alert-dialog semantics are intentionally out of scope.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
