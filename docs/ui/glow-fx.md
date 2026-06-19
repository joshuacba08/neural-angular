# Glow & FX

Status: Implementation complete.

The **Glow & FX** collection features components and styling tools designed to elevate visual presentation using hardware-accelerated gradients and glows.

## Components

### NGlowCard

`NGlowCard` is a decorative container rendering an atmospheric glow orb backdrop.

#### Import

```ts
import { NGlowCard } from '@neural/angular-ui/glow-fx';
```

#### API

```html
<n-glow-card variant="gemini">
  <h3>Gemini Card</h3>
  <p>Atmospheric background orb with premium border gradient.</p>
</n-glow-card>
```

#### Inputs
* `variant`: `'blue' | 'pink' | 'gemini'` (default `'blue'`).

---

### NGradientRing

`NGradientRing` renders a rotating double conic-gradient ring utilizing high-performance CSS `@keyframes` animations. It is completely safe for Server-Side Rendering (SSR).

#### Import

```ts
import { NGradientRing } from '@neural/angular-ui/glow-fx';
```

#### API

```html
<n-gradient-ring variant="gemini" size="80px" duration="3s">
  <span>Node 1</span>
</n-gradient-ring>
```

#### Inputs
* `variant`: `'gemini' | 'primary' | 'secondary' | 'cyan'` (default `'gemini'`).
* `size`: Width and height of the ring (default `'80px'`).
* `duration`: Time for a full rotation (default `'3s'`).

## CSS custom properties

These components consume variables defined in the design tokens:
* `--n-gradient-gemini`
* `--n-gradient-primary-secondary`
* `--n-gradient-secondary-tertiary`
* `--n-gradient-primary-cyan`
* `--n-glow-gradient-sm`
