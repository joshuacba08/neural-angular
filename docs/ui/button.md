# NButton

Status: implemented in `@neural/angular-ui`, aligned with the button reference in `docs/design_system/components.html`.

`NButton` is a standalone Angular component that renders a real internal `<button>`. It uses public `--n-*` tokens, supports content projection, and stays SSR-safe by relying only on Angular template bindings and CSS.

Visual behavior follows the imported `.nn-btn-*` design system: gradient fills, gradient borders, tonal and ghost treatments, four sizes, icon-only mode, loading state, and full-width CTAs.

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
| `variant` | See [Variants](#variants) | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `disabled` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |
| `iconOnly` | `boolean` | `false` |
| `ariaLabel` | `string \| null` | `null` |

When `iconOnly` is `true`, provide `ariaLabel` for accessible naming.

## Variants

| `variant` | Design reference | Use |
| --- | --- | --- |
| `primary` | `.nn-btn-f` | Default filled action, blue → violet gradient |
| `gemini` | `.nn-btn-fg` | High-emphasis Gemini gradient CTA |
| `accent` | `.nn-btn-fv` | Violet → pink gradient emphasis |
| `danger` | `.nn-btn-fd` | Destructive action |
| `outline` | `.nn-btn-o` | Gradient border, transparent fill |
| `outline-gemini` | `.nn-btn-og` | Gemini gradient border |
| `tonal` | `.nn-btn-t` | Low-emphasis blue tonal surface |
| `tonal-violet` | `.nn-btn-tv` | Low-emphasis violet tonal surface |
| `ghost` | `.nn-btn-g` | Minimal primary ghost action |
| `secondary` | `.nn-btn-gm` | Muted ghost action for secondary controls |

## Sizes

| `size` | Height | Design reference |
| --- | --- | --- |
| `sm` | 32px | `.nn-btn-sm` |
| `md` | 40px | default `.nn-btn` |
| `lg` | 48px | `.nn-btn-lg` |
| `xl` | 56px | `.nn-btn-xl` |

With `iconOnly`, the button becomes circular and uses the same height as the selected size.

## Examples

### Basic

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

### Gradient fills

```html
<n-button variant="primary">Blue → Violet</n-button>
<n-button variant="gemini">Gemini</n-button>
<n-button variant="accent">Violet → Pink</n-button>
```

### Outlined, tonal, and ghost

```html
<n-button variant="outline">Gradient Border</n-button>
<n-button variant="outline-gemini">Gemini Border</n-button>

<n-button variant="tonal">Tonal Blue</n-button>
<n-button variant="tonal-violet">Tonal Violet</n-button>

<n-button variant="ghost">Ghost Primary</n-button>
<n-button variant="secondary">Ghost Muted</n-button>
```

### Icon buttons

```html
<n-button variant="primary" size="sm" [iconOnly]="true" ariaLabel="Add">
  <n-icon name="plus" size="sm" />
</n-button>

<n-button variant="gemini" [iconOnly]="true" ariaLabel="Add">
  <n-icon name="plus" size="md" />
</n-button>
```

### Full-width CTAs

```html
<n-button variant="gemini" size="lg" [fullWidth]="true">
  <n-icon name="sparkles" size="sm" />
  Comenzar con Neural AI
</n-button>

<n-button variant="outline-gemini" size="lg" [fullWidth]="true">
  Continuar con Google
</n-button>
```

## Loading state

When `loading` is `true`, the internal button is disabled, exposes `aria-busy="true"`, and displays a CSS spinner centered over the label.

## Storybook

Open `Components/Button` in Storybook for an MDX docs page with **Features**, **API**, and **Theming** sections (pure MDX, no extra React/TSX files). Interactive stories remain available as child entries.

```bash
pnpm nx run @neural/angular-ui:storybook
```
