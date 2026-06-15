# Overlay Foundation

Status: MVP complete for HU-007.

The overlay foundation provides shared Angular CDK Overlay setup and small helpers used by `NDialog`, `NDrawer`, `NToast`, `NTooltip`, and `NPopover`.

## Import

```ts
import { provideNeuralOverlay } from '@neural/angular-ui/overlay';
```

The root package also exports it:

```ts
import { provideNeuralOverlay } from '@neural/angular-ui';
```

## Provider

```ts
export const appConfig = {
  providers: [
    provideNeuralOverlay(),
  ],
};
```

The helper imports `OverlayModule` providers from Angular CDK. Overlay services remain `providedIn: 'root'`.

## Tokens

The MVP adds minimal overlay tokens:

```css
--n-overlay-backdrop-bg
--n-overlay-panel-bg
--n-overlay-panel-border
--n-overlay-panel-shadow
--n-dialog-width-md
--n-drawer-width-md
--n-toast-bg
--n-tooltip-bg
--n-popover-bg
```

## Accessibility

Dialog and drawer use CDK focus trap. Tooltip and popover use CDK positioning. Toasts use status and alert roles by variant.

## Known Limitations

This is not a full overlay framework. Stacking strategy, advanced animations, nested overlay policies, and advanced menu semantics remain future work.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
