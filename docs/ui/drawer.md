# NDrawer

Status: MVP complete for HU-007.

`NDrawer` is a modal side sheet primitive built with Angular CDK Overlay, Portal, and A11y focus trap. It is opened through `NDrawerService` and is intended for settings panels, filters, inspectors, and side workflows.

## Import

```ts
import { NDrawerService } from '@neural/angular-ui/drawer';
```

## API

```ts
drawer.open(ComponentOrTemplate, {
  title: 'Settings',
  description: 'Adjust Neural Angular preferences.',
  position: 'right',
  size: 'md',
});
```

Positions: `left`, `right`, `top`, `bottom`.

Sizes: `sm`, `md`, `lg`, `xl`.

The call returns `NDrawerRef<TResult>` with `close(result?)` and `afterClosed()`.

## Basic Usage

```ts
this.drawer.open(SettingsDrawerComponent, {
  title: 'Workspace settings',
  position: 'right',
});
```

## Accessibility

The drawer uses `role="dialog"`, `aria-modal="true"`, optional title and description associations, ESC close support, backdrop close support, and CDK focus trapping.

## Known Limitations

The MVP does not include nested drawers, router integration, gesture-driven mobile behavior, or custom animation configuration.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
