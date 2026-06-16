# NCard

Status: implemented as the first surface component in `@neural/angular-ui`.

`NCard` is a standalone Angular component for visual grouping. It follows the Claude design system: gradient borders on all four sides (`padding-box / border-box`), surface-1 background, gradient tint overlay on hover, and optional interactive lift.

## Imports

```ts
import {
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardIcon,
  NCardMeta,
  NCardRow,
  NCardRowAvatar,
  NCardRowBody,
  NCardRowSubtitle,
  NCardRowTitle,
  NCardRowTrailing,
  NCardTitle,
} from '@neural/angular-ui';
```

```ts
import { NCard } from '@neural/angular-ui/card';
```

## API

### `NCard`

| Input | Type | Default |
| --- | --- | --- |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'gradient' \| 'elevated' \| 'outlined'` | `'default'` |
| `interactive` | `boolean` | `false` |

### Variant mapping (design system)

| `variant` | Design class | Border |
| --- | --- | --- |
| `default` / `gradient` | `.nn-card` | Full Gemini gradient |
| `primary` | `.nn-card.bv` | Blue → violet |
| `secondary` | `.nn-card.vp` | Violet → pink |
| `elevated` | — | Full gradient + elevation |
| `outlined` | — | Plain border, low emphasis |

### Subcomponents

| Selector | Purpose |
| --- | --- |
| `n-card-header` | Header stack |
| `n-card-title` | Title (15px display) |
| `n-card-description` | Supporting text (13px) |
| `n-card-content` | Main body |
| `n-card-footer` | Actions row |
| `n-card-icon` | 38×38 gradient icon box (`accent`: `gemini` \| `primary` \| `secondary`) |
| `n-card-meta` | Mono gradient label below content |
| `n-card-row` | Horizontal list item surface |
| `n-card-row-avatar` | Leading avatar/initials |
| `n-card-row-body` | Title + subtitle stack |
| `n-card-row-title` | Row title |
| `n-card-row-subtitle` | Row subtitle |
| `n-card-row-trailing` | Trailing slot (e.g. badge) |

## Examples

### Feature card

```html
<n-card [interactive]="true">
  <n-card-icon accent="gemini">
    <n-icon name="zap" size="md" />
  </n-card-icon>
  <n-card-title>Neural Agent</n-card-title>
  <n-card-content>Contexto extendido de 2M tokens.</n-card-content>
  <n-card-meta accent="primary">Gemini full gradient</n-card-meta>
</n-card>
```

### Horizontal list item

```html
<n-card-row variant="primary">
  <n-card-row-avatar accent="primary">A</n-card-row-avatar>
  <n-card-row-body>
    <n-card-row-title>Asesor Financiero AI</n-card-row-title>
    <n-card-row-subtitle>Especialista en análisis de mercados</n-card-row-subtitle>
  </n-card-row-body>
  <n-card-row-trailing>
    <n-badge variant="success">Activo</n-badge>
  </n-card-row-trailing>
</n-card-row>
```

### Composed card

```html
<n-card variant="primary" [interactive]="true">
  <n-card-header>
    <n-card-title>Project status</n-card-title>
    <n-card-description>Current build health</n-card-description>
  </n-card-header>
  <n-card-content>Everything is running correctly.</n-card-content>
  <n-card-footer>
    <n-button size="sm">Open</n-button>
  </n-card-footer>
</n-card>
```

## Related

- `NStatCard` — KPI cards with gradient values (see Stat Card stories).
- `variant="outlined"` — use for low-emphasis containers without gradient border.
