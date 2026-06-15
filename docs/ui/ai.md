# AI Interaction MVP

## Estado

Primer bloque AI-first implementado en `@neural/angular-ui`.

## Componentes incluidos

- `NPromptInput`
- `NChat`
- `NChatMessage`
- `NStreamingText`
- `NVoiceOrb`
- `NAIPipeline`
- `NAIPipelineStep`

## Imports

```ts
import {
  NAIPipeline,
  NChat,
  NPromptInput,
  NStreamingText,
  NVoiceOrb,
} from '@neural/angular-ui';
```

Tipos compartidos:

```ts
import type {
  NAIMessage,
  NAIMessageRole,
  NAIStatus,
  NAIPipelineStep,
} from '@neural/angular-ui/ai';
```

## Alcance

Este MVP cubre:

- prompt input con submit
- conversación visual por roles
- texto streaming con cursor CSS
- estado visual de voz/agente
- pipeline de procesamiento AI

## SSR Safety

Todos los componentes de esta HU:

- evitan browser globals
- no usan timers
- no usan WebSocket/EventSource
- no usan Canvas, GSAP ni Web Audio

## Limitaciones conocidas

- sin backend AI
- sin Markdown
- sin audio real
- sin streaming real de red
