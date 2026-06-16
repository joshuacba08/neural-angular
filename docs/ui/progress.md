# Progress & Loading

Status: implemented as Core UI feedback primitives.

Neural Angular splits progress & loading into focused components that mirror the Claude design system: linear bars, circular rings, spinners and skeleton loaders — all pure CSS + SVG, no charting dependencies.

## Components

| Component | Purpose |
| --- | --- |
| `NProgress` | Linear determinate, indeterminate and segmented bars |
| `NProgressRing` | Circular SVG progress with optional label |
| `NSpinner` | Ring arc or bouncing dots |
| `NSkeleton` | Shimmer placeholder blocks |

## NProgress

```ts
import { NProgress } from '@neural/angular-ui';
import { NProgress } from '@neural/angular-ui/progress';
```

| Input | Type | Default |
| --- | --- | --- |
| `value` | `number` | `0` |
| `max` | `number` | `100` |
| `variant` | `'gemini' \| 'gemini-full' \| 'primary' \| 'secondary' \| 'success' \| 'success-blue' \| 'warning' \| 'danger'` | `'primary'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` |
| `indeterminate` | `boolean` | `false` |
| `indeterminateMode` | `'fill' \| 'bar'` | `'fill'` |
| `label` | `string` | — |
| `showValue` | `boolean` | `false` |
| `hint` | `string` | — |
| `shimmer` | `boolean` | auto on `gemini` |
| `step` | `number` | `0` |
| `totalSteps` | `number` | `0` |

### Examples

```html
<!-- Gemini gradient with shimmer -->
<n-progress
  variant="gemini"
  [value]="67"
  label="Gemini Gradient · Determinate"
  [showValue]="true"
/>

<!-- Blue → Violet -->
<n-progress variant="primary" [value]="42" label="Blue → Violet" />

<!-- Indeterminate -->
<n-progress variant="primary" [indeterminate]="true" label="Indeterminate · Running" />

<!-- Segmented steps -->
<n-progress variant="primary" [step]="3" [totalSteps]="5" label="Segmented · Step 3 / 5" />

<!-- Thick download bar -->
<n-progress
  variant="gemini"
  size="lg"
  [value]="78"
  label="Thick · Model download"
  hint="Real-ESRGAN x4 · 1.8 GB / 2.3 GB"
  [showValue]="true"
/>
```

## NProgressRing

## NProgressRing

| Input | Type | Default |
| --- | --- | --- |
| `value` | `number` | `0` |
| `variant` | `'primary' \| 'secondary' \| 'gemini' \| 'success-blue' \| 'success'` | `'primary'` |
| `size` | `'orbital' \| 'sm' \| 'md' \| 'lg'` | `'lg'` |
| `metric` | `string` | — |
| `caption` | `string` | — |

### Orbital (AI Patterns)

```html
<n-progress-ring size="orbital" variant="primary" [value]="75" metric="CPU" caption="Blue-Violet" />
<n-progress-ring size="orbital" variant="secondary" [value]="50" metric="RAM" caption="Violet-Pink" />
<n-progress-ring size="orbital" variant="gemini" [value]="90" metric="GPU" caption="Gemini Full" />
<n-progress-ring size="orbital" variant="success-blue" [value]="20" metric="NET" caption="Success-Blue" />
```

### AI gradient bars

```html
<n-progress variant="gemini-full" [value]="78" label="Tokens procesados" [showValue]="true" />
<n-progress variant="primary" size="md" [value]="54" label="Memoria del contexto" [showValue]="true" />
<n-progress variant="secondary" size="xs" [value]="91" label="Capacidad del modelo" [showValue]="true" />
<n-progress
  variant="gemini-full"
  [indeterminate]="true"
  indeterminateMode="bar"
  label="Cargando modelo…"
  [showValue]="true"
/>
```

```html
<n-progress-ring size="lg" variant="primary" [value]="67" caption="Ring · Blue" />
<n-progress-ring size="md" variant="secondary" [value]="60" caption="Ring · Violet" />
<n-progress-ring size="sm" variant="success" [value]="100" caption="Done" />
<n-progress-ring [indeterminate]="true" caption="Spinner" />
```

## NSpinner

```html
<n-spinner mode="ring" label="Loading" />
<n-spinner mode="dots" label="Loading" />
```

## NSkeleton

```html
<n-skeleton shape="text" width="55%" height="13px" />
<n-skeleton shape="circle" width="34px" height="34px" />
<n-skeleton width="100%" height="60px" radius="8px" />
```

Accessibility: linear and circular progress use `role="progressbar"` with ARIA values. Spinners expose `role="status"` when a `label` is provided.
