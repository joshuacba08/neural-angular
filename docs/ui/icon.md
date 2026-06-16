# NIcon

Status: implemented with `@lucide/angular`.

`NIcon` is the shared icon primitive for Neural Angular. It renders registered Lucide glyphs through Angular-native bindings, inherits `currentColor`, resolves size from design tokens, and stays SSR-safe by avoiding global icon hydration.

## Why it exists

`NIcon` gives the design system a single icon contract:

- typed `name` values through `NIconName`
- shared size tokens from `xs` to `xl`
- accessible decorative vs semantic behavior
- one provider to register the curated Neural icon pack
- predictable rendering inside buttons, cards, chips, avatars, and empty states

## Provider

Register the icon set once at the app boundary:

```ts
import { provideNeuralIcons, provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({ defaultTheme: 'dark' }),
    provideNeuralIcons(),
  ],
};
```

## Imports

```ts
import { NIcon } from '@neural/angular-ui/icon';
```

```ts
import {
  NIcon,
  type NIconName,
  NEURAL_LUCIDE_ICON_NAMES,
  provideNeuralIcons,
} from '@neural/angular-ui';
```

## API

| Input | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `NIconName \| ''` | `''` | Must exist in the registered Neural icon pack. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Maps to shared icon tokens. |
| `label` | `string \| undefined` | `undefined` | Used when the icon is semantic. |
| `decorative` | `boolean` | `true` | When `true`, the icon is hidden from assistive tech. |
| `strokeWidth` | `number` | `2` | Passed through to the Lucide SVG stroke width. |

## Accessibility

- Decorative icons render with `aria-hidden="true"`.
- Semantic icons render `role="img"`.
- If `decorative` is `false` and `label` is omitted, `NIcon` derives one from the icon name.
  - Example: `search-x` becomes `Search X`.

## Sizing

| Size | Dimension | Token |
| --- | --- | --- |
| `xs` | 12px | `--n-icon-size-xs` |
| `sm` | 16px | `--n-icon-size-sm` |
| `md` | 20px | `--n-icon-size-md` |
| `lg` | 24px | `--n-icon-size-lg` |
| `xl` | 32px | `--n-icon-size-xl` |

## Examples

```html
<n-icon name="sparkles" />
<n-icon name="settings" size="lg" />

<n-icon
  name="trash-2"
  size="sm"
  [decorative]="false"
  label="Delete project"
/>
```

```ts
import type { NIconName } from '@neural/angular-ui/icon';

const emptyStateIcon: NIconName = 'search-x';
```

## Registry

The current Neural pack exposes a curated Lucide subset for product UI, including actions, navigation, status, media, and system glyphs.

You can inspect the available names programmatically:

```ts
import { NEURAL_LUCIDE_ICON_NAMES } from '@neural/angular-ui/icon';

console.log(NEURAL_LUCIDE_ICON_NAMES);
```

This keeps app code, Storybook controls, and docs aligned around one registry instead of ad hoc icon strings.
