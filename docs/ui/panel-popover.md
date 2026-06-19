# Panel & Popover

Status: Implementation complete.

The **Panel & Popover** suite provides floating overlays and glassmorphic panels for displaying metadata, interactive tooltips, and contextual actions.

## Directives

### NPopoverDirective

The `nPopover` directive triggers a floating contextual card with text or a rich HTML/Angular template.

#### Import

```ts
import { NPopoverDirective } from '@neural/angular-ui/popover';
```

#### API

```html
<button nButton [nPopover]="interactiveMenu" nPopoverPosition="bottom" nPopoverTrigger="click">
  Actions
</button>

<ng-template #interactiveMenu>
  <div class="n-ctx-menu">
    <div class="n-ctx-item">Settings</div>
    <div class="n-ctx-item">Monitor</div>
  </div>
</ng-template>
```

#### Inputs
* `nPopover`: Popover content (`TemplateRef` or `string`).
* `nPopoverPosition`: `'top' | 'bottom' | 'left' | 'right'` (default `'bottom'`).
* `nPopoverTrigger`: `'click' | 'hover' | 'focus'` (default `'click'`).
* `nPopoverDisabled`: Boolean to temporarily disable interaction.

---

### NTooltipDirective

The `nTooltip` directive renders a text-only floating balloon with a pointing arrow.

#### Import

```ts
import { NTooltipDirective } from '@neural/angular-ui/tooltip';
```

#### API

```html
<button nButton nTooltip="Saves progress instantly" nTooltipPosition="top">
  Save
</button>
```

#### Inputs
* `nTooltip`: Plain text message.
* `nTooltipPosition`: `'top' | 'bottom' | 'left' | 'right'` (default `'top'`).
* `nTooltipDisabled`: Boolean to temporarily disable.
* `nTooltipShowDelay`: Delay in ms before appearing (default `120`).
* `nTooltipHideDelay`: Delay in ms before disappearing (default `80`).

---

## Global Styles

These components consume unified overlay styles from `neural-overlay.css`:

### Glass Panel (`.n-glass-panel`)
A glassmorphic card container with real-time backdrop-blur and border gradients.
```html
<div class="n-glass-panel">
  <h4>Compute Status</h4>
  <p>Active nodes inside virtual cluster.</p>
</div>
```

### Context Menu (`.n-ctx-menu` & `.n-ctx-item`)
Classes designed to structure dropdown and popup menus.
```html
<div class="n-ctx-menu">
  <div class="n-ctx-item">Edit Segment</div>
  <div class="n-ctx-item n-ctx-item--active">Active Mode</div>
  <div class="n-ctx-item n-ctx-item--danger">Delete Node</div>
</div>
```
