# Stepper

Status: Implementation complete.

`NStepper` manages linear workflows, providing visual feedback of pipeline state progress and displaying context cards dynamically depending on the current active step index.

## Import

```ts
import { NStepper, NStep } from '@neural/angular-ui/stepper';
```

## API

```html
<n-stepper [activeStep]="currentStepIndex">
  <n-step label="Import" icon="check">
    <p>Upload video source file.</p>
    <button nButton (click)="next()">Next</button>
  </n-step>
  <n-step label="Extract" icon="film">
    <p>Frames stream extraction.</p>
    <button nButton (click)="next()">Next</button>
  </n-step>
</n-stepper>
```

### NStepper Component Inputs

* `activeStep`: 0-indexed number representing the active step card (default: `0`)

### NStep Component Inputs

* `label`: Label string displayed under node (required)
* `icon`: Icon name displayed when node is upcoming (required)
* `completedIcon`: Icon name displayed when node is completed (default: `'check'`)
* `activeIcon`: Icon name displayed when node is active (default: `'sparkles'`)

## Theming

CSS classes customize progress states:
* `--n-color-success` (completed status)
* `--n-gradient-primary-secondary` (active progress path & active dot)
* `--n-border-2` (muted upcoming borders)
