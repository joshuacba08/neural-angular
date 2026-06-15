# NPopover

Status: MVP complete for HU-007.

`NPopover` is a contextual overlay directive for short string content or a small Angular template. It is backed by Angular CDK Overlay positioning.

## Import

```ts
import { NPopoverDirective } from '@neural/angular-ui/popover';
```

## API

```html
<n-button [nPopover]="projectMenu" nPopoverTrigger="click">
  More actions
</n-button>

<ng-template #projectMenu>
  <div class="demo-popover-menu">
    <n-button variant="ghost" size="sm">Edit</n-button>
    <n-button variant="ghost" size="sm">Duplicate</n-button>
    <n-button variant="danger" size="sm">Delete</n-button>
  </div>
</ng-template>
```

Positions: `top`, `bottom`, `left`, `right`.

Triggers: `click`, `hover`, `focus`.

## Accessibility

The popover closes with ESC. Click-triggered popovers also close through the transparent CDK backdrop. The MVP does not claim full menu semantics or roving focus.

## Known Limitations

Advanced menu behavior, nested popovers, focus roving, command palettes, and typeahead are intentionally out of scope.

## Playground

See the `Overlay / Feedback MVP` section in `apps/playground`.
