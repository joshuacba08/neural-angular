# NTooltip

Status: MVP complete for HU-007.

`NTooltip` is a text-only tooltip directive backed by Angular CDK Overlay positioning.

## Import

```ts
import { NTooltipDirective } from '@neural/angular-ui/tooltip';
```

## API

```html
<n-button
  nTooltip="Run enhancement pipeline"
  nTooltipPosition="top"
>
  Run
</n-button>
```

Positions: `top`, `bottom`, `left`, `right`.

Inputs: `nTooltip`, `nTooltipPosition`, `nTooltipDisabled`, `nTooltipShowDelay`, `nTooltipHideDelay`.

## Accessibility

The tooltip opens on hover and focus, closes on mouse leave and blur, and renders `role="tooltip"`. It does not rely on the native `title` attribute.

## Known Limitations

The MVP supports plain text only. Rich interactive content belongs in `NPopover`, not `NTooltip`.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
