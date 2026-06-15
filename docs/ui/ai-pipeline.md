# NAIPipeline y NAIPipelineStep

## Estado

MVP implementado.

## Import

```ts
import { NAIPipeline, NAIPipelineStep } from '@neural/angular-ui/ai-pipeline';
```

## API

`NAIPipeline`:

- `steps`
- `orientation`
- `density`
- `showProgress`

`NAIPipelineStep`:

- `title`
- `description`
- `icon`
- `status`
- `progress`
- `metadata`
- `active`

Estados:

- `pending`
- `running`
- `success`
- `warning`
- `error`
- `skipped`

## Ejemplos

```html
<n-ai-pipeline [steps]="pipelineSteps" />
```

```html
<n-ai-pipeline orientation="horizontal" density="compact">
  <n-ai-pipeline-step title="Analyze" status="success" icon="search" />
  <n-ai-pipeline-step title="Enhance" status="running" icon="sparkles" [progress]="68" />
</n-ai-pipeline>
```

## Accesibilidad

- Usa lista ordenada semántica.
- El estado visual siempre va acompañado por texto.

## SSR Safety

- No usa timers.
- No usa Canvas ni GSAP.
- No implementa lógica real de procesamiento.

## Limitaciones conocidas

- No coordina jobs reales.
- No hay reintentos, colas ni orquestación real.
