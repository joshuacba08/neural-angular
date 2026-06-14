# Neural Angular Tokens

## Source

The token source is `docs/design_system/nn-tokens.css`. It declares "NEURAL ANGULAR - Tokens v1.2" for a Gemini Dark visual language with Angular Material v22-compatible CSS variables.

## Token Prefix

The main token prefix is `--nn-*`. The file also maps selected values to Angular Material CSS variables using `--mat-*`.

## Backgrounds

| Token | Value |
|---|---|
| `--nn-bg-canvas` | `#06060E` |
| `--nn-bg-base` | `#0A0A15` |
| `--nn-overlay` | `rgba(6,6,14,0.90)` |

## Surfaces

| Token | Value |
|---|---|
| `--nn-surface-1` | `#0F0F1C` |
| `--nn-surface-2` | `#141426` |
| `--nn-surface-3` | `#1A1A2E` |
| `--nn-surface-4` | `#202038` |

## Borders

| Token | Value |
|---|---|
| `--nn-b0` | `rgba(255,255,255,0.04)` |
| `--nn-b1` | `rgba(255,255,255,0.07)` |
| `--nn-b2` | `rgba(255,255,255,0.12)` |
| `--nn-b3` | `rgba(255,255,255,0.20)` |

## Primary Colors

| Token | Value |
|---|---|
| `--nn-blue-primary` | `#4285F4` |
| `--nn-blue-bright` | `#669DF6` |
| `--nn-blue-light` | `#8AB4F8` |
| `--nn-blue-deep` | `#1A56C4` |
| `--nn-blue-10` | originally `rgba(66,133,244,0.10)`, later redefined as `var(--nn-violet-10)` |
| `--nn-blue-15` | `rgba(66,133,244,0.15)` |
| `--nn-blue-20` | originally `rgba(66,133,244,0.20)`, later redefined as `var(--nn-violet-20)` |

## Secondary Colors

| Token | Value |
|---|---|
| `--nn-violet-primary` | `#7B5CF6` |
| `--nn-violet-bright` | originally `#9D7BFF`, later redefined as `var(--nn-pink-bright)` |
| `--nn-violet-deep` | `#5B3FCC` |
| `--nn-violet-10` | originally `rgba(123,92,246,0.10)`, later redefined as `var(--nn-pink-10)` |
| `--nn-violet-15` | `rgba(123,92,246,0.15)` |
| `--nn-violet-20` | originally `rgba(123,92,246,0.20)`, later redefined as `rgba(217,70,239,0.20)` |

## Tertiary Colors

| Token | Value |
|---|---|
| `--nn-pink-primary` | `#D946EF` |
| `--nn-pink-bright` | `#E879F9` |
| `--nn-pink-deep` | `#A21CAF` |
| `--nn-pink-10` | `rgba(217,70,239,0.10)` |
| `--nn-pink-15` | `rgba(217,70,239,0.15)` |

## Status Colors

| Token | Value |
|---|---|
| `--nn-success` | `#34A853` |
| `--nn-success-10` | `rgba(52,168,83,0.10)` |
| `--nn-warning` | `#FBBC05` |
| `--nn-warning-10` | `rgba(251,188,5,0.10)` |
| `--nn-error` | `#EA4335` |
| `--nn-error-10` | `rgba(234,67,53,0.10)` |
| `--nn-info` | `#4285F4` |
| `--nn-info-10` | `rgba(66,133,244,0.10)` |

## Text Colors

| Token | Value |
|---|---|
| `--nn-t1` | `rgba(255,255,255,0.92)` |
| `--nn-t2` | `rgba(255,255,255,0.58)` |
| `--nn-t3` | `rgba(255,255,255,0.34)` |
| `--nn-t4` | `rgba(255,255,255,0.16)` |

## Gradients

| Token | Value |
|---|---|
| `--nn-grad-g` | Gemini four-stop gradient |
| `--nn-grad-g-90` | 90-degree Gemini gradient |
| `--nn-grad-g-soft` | translucent Gemini gradient |
| `--nn-grad-blue-v` | blue to violet |
| `--nn-grad-v-pink` | violet to pink |
| `--nn-grad-blue-cyan` | blue to cyan |
| `--nn-grad-surface` | subtle surface gradient |
| `--nn-grad-surface-strong` | stronger surface gradient |

## Gradient Borders

| Token | Usage |
|---|---|
| `--nn-border-grad` | general gradient border |
| `--nn-border-grad-b` | blue/violet gradient border |
| `--nn-border-grad-v` | violet/pink gradient border |
| `--nn-border-subtle` | subtle white border gradient |

## Typography

| Token | Value |
|---|---|
| `--nn-font-d` | Plus Jakarta Sans, Google Sans, system UI |
| `--nn-font-b` | Plus Jakarta Sans, Google Sans, system UI |
| `--nn-font-m` | JetBrains Mono, Cascadia Code, monospace |

## Type Scale

`--nn-sz-10`, `--nn-sz-11`, `--nn-sz-12`, `--nn-sz-13`, `--nn-sz-14`, `--nn-sz-15`, `--nn-sz-16`, `--nn-sz-18`, `--nn-sz-20`, `--nn-sz-24`, `--nn-sz-28`, `--nn-sz-32`, `--nn-sz-36`, `--nn-sz-40`, `--nn-sz-48`, `--nn-sz-56`, and `--nn-sz-64`.

## Font Weights

`--nn-w-light`, `--nn-w-regular`, `--nn-w-medium`, `--nn-w-semibold`, and `--nn-w-bold`.

## Spacing

The spacing scale follows a 4px grid: `--nn-s1`, `--nn-s2`, `--nn-s3`, `--nn-s4`, `--nn-s5`, `--nn-s6`, `--nn-s8`, `--nn-s10`, `--nn-s12`, `--nn-s14`, `--nn-s16`, `--nn-s20`, `--nn-s24`, and `--nn-s32`.

## Radius

`--nn-r-none`, `--nn-r-xs`, `--nn-r-sm`, `--nn-r-md`, `--nn-r-lg`, `--nn-r-xl`, `--nn-r-2xl`, `--nn-r-3xl`, and `--nn-r-full`.

## Elevation

`--nn-elev-0` through `--nn-elev-5` define progressively deeper shadow stacks for dark surfaces.

## Glow

Glow tokens include `--nn-glow-teal-xs`, `--nn-glow-teal-sm`, `--nn-glow-teal-md`, `--nn-glow-teal-lg`, `--nn-glow-blue-sm`, `--nn-glow-blue-md`, `--nn-glow-violet-sm`, `--nn-glow-violet-md`, `--nn-glow-g-sm`, `--nn-glow-success-sm`, and `--nn-glow-error-sm`.

## Motion / Transitions

| Token group | Tokens |
|---|---|
| Easing | `--nn-ease-std`, `--nn-ease-decel`, `--nn-ease-spring` |
| Duration | `--nn-dur-sm`, `--nn-dur-md`, `--nn-dur-lg`, `--nn-dur-xl` |
| Transition aliases | `--nn-t-fast`, `--nn-t-base`, `--nn-t-slow`, `--nn-t-spring` |

## Z-index

`--nn-z-sticky`, `--nn-z-overlay`, `--nn-z-modal`, and `--nn-z-toast`.

## Angular Material Token Mapping

The token file maps Neural tokens to Angular Material system tokens:

- App: `--mat-app-background-color`, `--mat-app-text-color`
- Primary: `--mat-sys-primary`, `--mat-sys-on-primary`, `--mat-sys-primary-container`, `--mat-sys-on-primary-container`
- Secondary: `--mat-sys-secondary`, `--mat-sys-on-secondary`, `--mat-sys-secondary-container`, `--mat-sys-on-secondary-container`
- Tertiary: `--mat-sys-tertiary`, `--mat-sys-on-tertiary`, `--mat-sys-tertiary-container`, `--mat-sys-on-tertiary-container`
- Surfaces: `--mat-sys-surface`, `--mat-sys-surface-container-*`, `--mat-sys-background`
- Text: `--mat-sys-on-surface`, `--mat-sys-on-surface-variant`, `--mat-sys-on-background`
- Outline: `--mat-sys-outline`, `--mat-sys-outline-variant`
- Error: `--mat-sys-error`, `--mat-sys-on-error`
- Shape: `--mat-sys-shape-corner-*`

This mapping should be preserved as a reference and reviewed when the real Angular Material theme integration is implemented.

## Legacy Aliases

The file includes legacy aliases:

- `--nn-teal*` aliases point to blue primary tokens.
- `--nn-blue`, `--nn-blue-bright-alias`, and `--nn-blue-muted` point to violet tokens.
- `--nn-violet`, `--nn-violet-bright`, and `--nn-violet-muted` point to pink tokens.

## Potential Issues

- Duplicate definitions exist for `--nn-blue-10`, `--nn-blue-20`, `--nn-violet-bright`, `--nn-violet-10`, and `--nn-violet-20`.
- Some aliases overwrite earlier semantic meaning. For example, `--nn-blue-10` starts as a blue alpha token and later becomes `var(--nn-violet-10)`.
- `--nn-violet-bright` starts as violet and later becomes a pink alias.
- Legacy `teal` names now represent blue, which can confuse future API naming.
- The Angular Material mapping depends on potentially redefined aliases, so final computed values should be verified before shipping a theme package.
- The file is dark-only; light mode tokens are not present in the current source.

## Recommended Future Token Structure

- Keep raw palette tokens separate from semantic tokens.
- Prefer stable semantic names such as `--n-color-primary`, `--n-color-secondary`, `--n-surface-base`, and `--n-border-subtle` for public UI package tokens.
- Keep imported `--nn-*` tokens as a compatibility or internal source layer during migration.
- Remove or quarantine legacy aliases before exposing a public API.
- Add explicit light/dark theme layers before implementing `NThemeProvider`.
