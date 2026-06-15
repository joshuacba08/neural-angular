# NButton

Status: implemented as the first actionable component in `@neural/angular-ui`.

`NButton` is a standalone Angular component that renders a real internal `<button>`. It uses public `--n-*` tokens, supports content projection, and stays SSR-safe by relying only on Angular template bindings and CSS.

## Imports

```ts
import { NButton } from '@neural/angular-ui';
```

```ts
import { NButton } from '@neural/angular-ui/button';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `disabled` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |

## Examples

```html
<n-button>Default</n-button>

<n-button variant="primary">
  Save changes
</n-button>

<n-button variant="secondary" size="lg">
  Continue
</n-button>

<n-button variant="ghost" size="sm">
  Cancel
</n-button>

<n-button variant="danger" [loading]="true">
  Delete
</n-button>

<n-button type="submit" [fullWidth]="true">
  Submit form
</n-button>
```

When `loading` is true, the internal button is disabled, exposes `aria-busy="true"`, and displays a simple CSS loader.
