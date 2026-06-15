# NVoiceOrb

## Estado

MVP implementado.

## Import

```ts
import { NVoiceOrb } from '@neural/angular-ui/voice-orb';
```

## API

Inputs:

- `state`
- `size`
- `label`
- `interactive`
- `disabled`

Output:

- `orbClick`

Estados:

- `idle`
- `listening`
- `thinking`
- `speaking`
- `error`
- `muted`

## Ejemplo

```html
<n-voice-orb
  [state]="voiceState"
  size="lg"
  [interactive]="true"
  label="Voice assistant"
  (orbClick)="cycleVoiceState()"
/>
```

## Accesibilidad

- Si es interactivo, usa `<button type="button">`.
- Respeta `disabled`.
- Expone label accesible con el estado actual.

## SSR Safety

- Solo usa HTML + CSS.
- No usa micrófono, Web Audio ni Canvas.

## Limitaciones conocidas

- No captura audio real.
- No hace STT ni TTS.
- Las animaciones son solo visuales y CSS-only.
