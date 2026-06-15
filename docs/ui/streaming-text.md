# NStreamingText

## Estado

MVP implementado.

## Import

```ts
import { NStreamingText } from '@neural/angular-ui/streaming-text';
```

## API

- `text`
- `state`
- `cursor`
- `cursorLabel`
- `mono`

Estados:

- `idle`
- `streaming`
- `complete`
- `error`

## Ejemplo

```html
<n-streaming-text
  [text]="streamedText"
  state="streaming"
/>
```

## Accesibilidad

- El cursor es decorativo y va con `aria-hidden`.
- El texto sigue siendo plano y legible.

## SSR Safety

- No usa timers.
- No usa `innerHTML`.
- El componente solo representa el texto que recibe.

## Limitaciones conocidas

- No hace streaming real.
- El consumidor debe actualizar `text`.
