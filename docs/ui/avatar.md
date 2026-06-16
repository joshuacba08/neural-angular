# NAvatar

Status: implemented in `@neural/angular-ui`, aligned with the avatar reference in `docs/design_system/components.html`.

`NAvatar` renders an image when `src` is provided, initials from `name`, or projected content such as `NIcon`. It supports four gradient/surface variants, five sizes, optional status dots, and stacks with `NAvatarGroup`.

## Import

```ts
import { NAvatar, NAvatarGroup } from '@neural/angular-ui';
import { NAvatar, NAvatarGroup } from '@neural/angular-ui/avatar';
```

## API

### NAvatar

| Input | Type | Default |
| --- | --- | --- |
| `src` | `string \| undefined` | `undefined` |
| `alt` | `string \| undefined` | `undefined` |
| `name` | `string` | `''` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `variant` | `'blue-violet' \| 'violet-pink' \| 'gemini' \| 'surface'` | `'blue-violet'` |
| `status` | `'online' \| 'active' \| 'away' \| 'offline' \| null` | `null` |
| `shape` | `'circle' \| 'rounded'` | `'circle'` |

### Sizes

| `size` | Dimensions | Design reference |
| --- | --- | --- |
| `xs` | 24px | `.nn-av-xs` |
| `sm` | 32px | `.nn-av-sm` |
| `md` | 40px | `.nn-av-md` |
| `lg` | 56px | `.nn-av-lg` |
| `xl` | 72px | `.nn-av-xl` |

### Variants

| `variant` | Design reference | Description |
| --- | --- | --- |
| `blue-violet` | `.nn-av-bv` | Blue → violet gradient |
| `violet-pink` | `.nn-av-vp` | Violet → pink gradient |
| `gemini` | `.nn-av-gg` | Full Gemini gradient |
| `surface` | `.nn-av-surf` | Neutral surface with border |

### Status

| `status` | Dot color | Notes |
| --- | --- | --- |
| `online` | Success green | |
| `active` | Primary blue | |
| `away` | Muted gray | Avatar opacity reduced |
| `offline` | Muted gray | |

## Examples

```html
<n-avatar name="John Doe" />

<n-avatar name="Maria R" variant="violet-pink" status="active" />

<n-avatar variant="surface">
  <n-icon name="user" size="sm" />
</n-avatar>

<n-avatar src="/avatar.png" alt="Anderson" status="online" />
```

### Stacked group

```html
<n-avatar-group>
  <n-avatar name="+5" variant="surface" />
  <n-avatar name="Grace H" />
  <n-avatar name="Sam T" variant="gemini" />
  <n-avatar name="Maria R" variant="violet-pink" />
  <n-avatar name="John Doe" />
</n-avatar-group>
```
