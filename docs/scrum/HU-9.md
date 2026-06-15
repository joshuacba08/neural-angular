# HU-009 — Crear AI Interaction MVP: NPromptInput, NChat, NStreamingText, NVoiceOrb y NAIPipeline

## Contexto

El repositorio `neural-angular` ya existe.

Ya se completaron y comitearon las HUs anteriores:

* Fase 0: análisis técnico del design system importado.
* Fase 1A: estructura inicial de `@neural/angular-ui` y token foundation.
* HU-001: Theme Provider mínimo y playground visual de tokens.
* HU-002: `NButton` y `NCard`.
* HU-003: `NIcon`, `NBadge`, `NChip` e integración con Lucide.
* HU-004: Forms, Feedback y Empty States.
* HU-005: Layout MVP.
* HU-006: Data Display MVP.
* HU-007: Overlay/Feedback MVP con Angular CDK.
* HU-008: Media/Upload MVP.

Ahora vamos a crear el primer bloque de componentes AI Interaction.

Esta HU implementa:

```txt
NPromptInput
NChat
NChatMessage
NStreamingText
NVoiceOrb
NAIPipeline
NAIPipelineStep
```

Estos componentes deben servir para construir interfaces de:

```txt
AI assistants
Prompt-based tools
Chat interfaces
Streaming responses
Voice/agent states
AI processing pipelines
Oroya Video AI workflows
Neural dashboards
```

Pero no deben implementar todavía conexión real con modelos AI, backend, WebSocket, audio real ni procesamiento de voz.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener componentes AI-first para prompt, chat, streaming visual, voice state y pipeline de procesamiento,
para construir pantallas modernas de inteligencia artificial usando Neural Angular UI sin depender todavía de lógica real de backend.

---

## Objetivo principal

Crear el primer MVP AI Interaction de `@neural/angular-ui`.

Al terminar esta HU, el playground debe poder mostrar:

* Prompt input con submit.
* Chat visual con mensajes de usuario, asistente, sistema y tool.
* Texto tipo streaming.
* Voice orb visual con estados.
* Pipeline AI con pasos y estados.
* Composición tipo AI workspace.
* Integración visual con componentes ya existentes.

---

# 1. Componentes a crear

Crear estructura:

```txt
packages/ui/src/prompt-input/
packages/ui/src/chat/
packages/ui/src/streaming-text/
packages/ui/src/voice-orb/
packages/ui/src/ai-pipeline/
packages/ui/src/ai/
```

Estructura sugerida:

```txt
packages/ui/src/prompt-input/
├─ prompt-input.component.ts
├─ prompt-input.component.html
├─ prompt-input.component.scss
├─ prompt-input.types.ts
└─ index.ts

packages/ui/src/chat/
├─ chat.component.ts
├─ chat.component.html
├─ chat.component.scss
├─ chat-message.component.ts
├─ chat-message.component.html
├─ chat-message.component.scss
├─ chat.types.ts
└─ index.ts

packages/ui/src/streaming-text/
├─ streaming-text.component.ts
├─ streaming-text.component.html
├─ streaming-text.component.scss
├─ streaming-text.types.ts
└─ index.ts

packages/ui/src/voice-orb/
├─ voice-orb.component.ts
├─ voice-orb.component.html
├─ voice-orb.component.scss
├─ voice-orb.types.ts
└─ index.ts

packages/ui/src/ai-pipeline/
├─ ai-pipeline.component.ts
├─ ai-pipeline.component.html
├─ ai-pipeline.component.scss
├─ ai-pipeline-step.component.ts
├─ ai-pipeline-step.component.html
├─ ai-pipeline-step.component.scss
├─ ai-pipeline.types.ts
└─ index.ts

packages/ui/src/ai/
├─ ai.types.ts
└─ index.ts
```

Mantener la convención de componentes existentes.

---

# 2. Shared AI types

Crear tipos compartidos en:

```txt
packages/ui/src/ai/ai.types.ts
```

Tipos sugeridos:

```ts
export type NAIStatus =
  | 'idle'
  | 'thinking'
  | 'running'
  | 'streaming'
  | 'success'
  | 'warning'
  | 'error';

export type NAIMessageRole =
  | 'user'
  | 'assistant'
  | 'system'
  | 'tool';

export interface NAIMessage {
  id?: string;
  role: NAIMessageRole;
  content: string;
  author?: string;
  avatar?: string;
  timestamp?: string | Date;
  status?: NAIStatus;
  metadata?: Record<string, unknown>;
}

export type NAIPipelineStepStatus =
  | 'pending'
  | 'running'
  | 'success'
  | 'warning'
  | 'error'
  | 'skipped';

export interface NAIPipelineStep {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  status?: NAIPipelineStepStatus;
  progress?: number;
  metadata?: string;
}
```

Reglas:

* Mantener tipos simples.
* No modelar backends reales.
* No crear contratos de API.
* No crear cliente AI.
* No crear WebSocket.

---

# 3. NPromptInput

Selector:

```html
<n-prompt-input></n-prompt-input>
```

## Objetivo

Componente para escribir prompts, instrucciones o mensajes AI.

Debe ser más rico que `NTextarea`, pero no debe convertirse en un editor complejo todavía.

## API

Tipos:

```ts
export type NPromptInputSize = 'md' | 'lg';
export type NPromptInputVariant = 'default' | 'surface' | 'gradient';
```

Inputs:

```ts
value?: string;
placeholder?: string;
label?: string;
hint?: string;
disabled?: boolean;
loading?: boolean;
size?: NPromptInputSize;
variant?: NPromptInputVariant;
minRows?: number;
maxRows?: number;
submitLabel?: string;
submitIcon?: string;
clearable?: boolean;
showCounter?: boolean;
maxLength?: number;
```

Outputs:

```ts
valueChange: EventEmitter<string>;
submitted: EventEmitter<string>;
cleared: EventEmitter<void>;
```

Defaults:

```ts
value = '';
placeholder = 'Ask Neural...';
disabled = false;
loading = false;
size = 'lg';
variant = 'surface';
minRows = 3;
maxRows = 8;
submitLabel = 'Send';
submitIcon = 'arrow-right';
clearable = true;
showCounter = false;
```

Uso esperado:

```html
<n-prompt-input
  placeholder="Describe the video enhancement you want..."
  [(value)]="prompt"
  (submitted)="runPrompt($event)"
/>
```

Con loading:

```html
<n-prompt-input
  [loading]="true"
  value="Enhance this video and reduce noise..."
/>
```

## Comportamiento

Debe:

* Renderizar un `<textarea>` real.
* Tener botón submit real.
* Emitir `submitted` al hacer click en submit.
* Emitir `submitted` con `Ctrl+Enter` o `Cmd+Enter`.
* No emitir si está disabled/loading.
* No emitir si value está vacío o solo espacios.
* Emitir `valueChange` cuando cambia texto.
* Permitir limpiar si `clearable` es true.
* Mostrar counter si `showCounter` es true.
* Respetar `maxLength`.

## Accesibilidad

* Textarea con label/aria-label.
* Botones reales.
* Submit button con `aria-label`.
* Loading debe reflejarse con `aria-busy`.

## Reglas

* No usar editor externo.
* No usar contenteditable.
* No usar browser APIs globales.
* No usar autosize complejo con DOM measurement todavía.
* No usar GSAP.
* SSR-safe.

---

# 4. NChat

Selector:

```html
<n-chat></n-chat>
```

## Objetivo

Componente visual para renderizar una conversación.

Debe aceptar mensajes y renderizarlos usando `NChatMessage`.

## API

Inputs:

```ts
messages?: NAIMessage[];
emptyTitle?: string;
emptyDescription?: string;
showAvatars?: boolean;
showTimestamps?: boolean;
compact?: boolean;
loading?: boolean;
```

Defaults:

```ts
messages = [];
emptyTitle = 'No messages yet';
emptyDescription = 'Start a conversation with Neural.';
showAvatars = true;
showTimestamps = true;
compact = false;
loading = false;
```

Uso esperado:

```html
<n-chat
  [messages]="messages"
  [loading]="isThinking"
/>
```

## Comportamiento

Debe:

* Renderizar lista de mensajes.
* Mostrar empty state si no hay mensajes.
* Mostrar loading state si `loading` es true.
* Usar `NChatMessage` para cada mensaje.
* No hacer scroll automático todavía salvo que sea trivial y SSR-safe.
* No usar DOM manual.
* No conectarse a backend.

---

# 5. NChatMessage

Selector:

```html
<n-chat-message></n-chat-message>
```

## API

Inputs:

```ts
message?: NAIMessage;
role?: NAIMessageRole;
content?: string;
author?: string;
avatar?: string;
timestamp?: string | Date;
status?: NAIStatus;
showAvatar?: boolean;
showTimestamp?: boolean;
compact?: boolean;
```

Defaults:

```ts
role = 'assistant';
content = '';
showAvatar = true;
showTimestamp = true;
compact = false;
```

Uso:

```html
<n-chat-message
  role="assistant"
  content="I can help you enhance this video."
/>
```

Con objeto:

```html
<n-chat-message [message]="message" />
```

## Visual

Roles:

```txt
user       = alineado derecha o destacado
assistant  = alineado izquierda
system     = mensaje compacto/neutral
tool       = mensaje técnico/mono
```

Debe mostrar:

* Avatar opcional.
* Author opcional.
* Timestamp opcional.
* Content.
* Status badge opcional.
* Icono según role si no hay avatar.

## Reglas

* No renderizar HTML sin sanitizar.
* El content debe mostrarse como texto plano por defecto.
* No soportar Markdown todavía.
* No soportar code highlighting todavía.
* No usar `innerHTML`.
* SSR-safe.

---

# 6. NStreamingText

Selector:

```html
<n-streaming-text></n-streaming-text>
```

## Objetivo

Componente visual para mostrar texto en estado “streaming”.

Importante: esta HU no debe implementar streaming real con timers internos obligatorios. El consumidor actualizará el texto.

## API

Tipos:

```ts
export type NStreamingTextState =
  | 'idle'
  | 'streaming'
  | 'complete'
  | 'error';
```

Inputs:

```ts
text?: string;
state?: NStreamingTextState;
cursor?: boolean;
cursorLabel?: string;
mono?: boolean;
```

Defaults:

```ts
text = '';
state = 'idle';
cursor = true;
cursorLabel = 'Streaming';
mono = false;
```

Uso:

```html
<n-streaming-text
  [text]="streamedText"
  state="streaming"
/>
```

## Comportamiento

Debe:

* Mostrar el texto recibido.
* Mostrar cursor visual si `cursor` es true y `state="streaming"`.
* Animar cursor con CSS.
* No crear setInterval.
* No crear setTimeout.
* No simular streaming internamente.
* No usar browser APIs.
* No usar `innerHTML`.

## Reglas

* CSS-only cursor.
* Texto plano.
* SSR-safe.

---

# 7. NVoiceOrb

Selector:

```html
<n-voice-orb></n-voice-orb>
```

## Objetivo

Componente visual para representar estados de voz/agente.

No debe capturar audio real todavía.

No debe usar Web Audio API.

No debe usar Canvas.

## API

Tipos:

```ts
export type NVoiceOrbState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'muted';

export type NVoiceOrbSize =
  | 'sm'
  | 'md'
  | 'lg';
```

Inputs:

```ts
state?: NVoiceOrbState;
size?: NVoiceOrbSize;
label?: string;
interactive?: boolean;
disabled?: boolean;
```

Outputs:

```ts
orbClick: EventEmitter<void>;
```

Defaults:

```ts
state = 'idle';
size = 'md';
interactive = false;
disabled = false;
```

Uso:

```html
<n-voice-orb
  state="listening"
  size="lg"
  label="Listening"
/>
```

Interactivo:

```html
<n-voice-orb
  [interactive]="true"
  [state]="voiceState"
  (orbClick)="toggleVoice()"
/>
```

## Visual

Estados:

```txt
idle       = glow suave
listening  = ring animado CSS
thinking   = pulso lento
speaking   = onda/ring animado CSS
error      = danger glow
muted      = low contrast
```

## Reglas

* Usar solo HTML + CSS.
* No usar Canvas.
* No usar Web Audio.
* No usar microphone APIs.
* No usar GSAP.
* No usar timers.
* Animaciones CSS con `prefers-reduced-motion`.
* SSR-safe.

## Accesibilidad

Si `interactive` es true:

* Renderizar botón real o host button-like con teclado.
* Preferir `<button type="button">`.
* Respetar disabled.
* Emitir `orbClick` solo si no disabled.

Si no es interactive:

* Renderizar elemento visual con label accesible si aplica.

---

# 8. NAIPipeline y NAIPipelineStep

## NAIPipeline

Selector:

```html
<n-ai-pipeline></n-ai-pipeline>
```

## NAIPipelineStep

Selector:

```html
<n-ai-pipeline-step></n-ai-pipeline-step>
```

## Objetivo

Visualizar un pipeline AI: upload, analyze, enhance, validate, export, etc.

Debe funcionar con pasos por input o con content projection.

## API NAIPipeline

Inputs:

```ts
steps?: NAIPipelineStep[];
orientation?: 'vertical' | 'horizontal';
density?: 'comfortable' | 'compact';
showProgress?: boolean;
```

Defaults:

```ts
steps = [];
orientation = 'vertical';
density = 'comfortable';
showProgress = true;
```

Uso con array:

```html
<n-ai-pipeline
  [steps]="pipelineSteps"
/>
```

Uso con proyección:

```html
<n-ai-pipeline>
  <n-ai-pipeline-step
    title="Analyze"
    status="success"
    icon="search"
  />
  <n-ai-pipeline-step
    title="Enhance"
    status="running"
    icon="sparkles"
    [progress]="68"
  />
</n-ai-pipeline>
```

## API NAIPipelineStep

Inputs:

```ts
title?: string;
description?: string;
icon?: string;
status?: NAIPipelineStepStatus;
progress?: number;
metadata?: string;
active?: boolean;
```

Defaults:

```ts
status = 'pending';
progress = undefined;
active = false;
```

## Visual

Debe mostrar:

* Icono o status dot.
* Título.
* Descripción.
* Metadata opcional.
* Progress si existe y status running.
* Conector visual entre pasos.
* Estado visual según status.

Estados:

```txt
pending
running
success
warning
error
skipped
```

## Reglas

* Puede usar `NIcon`.
* Puede usar `NBadge`.
* Puede usar `NProgress`.
* No usar lógica de procesamiento.
* No usar timers.
* No usar Canvas.
* No usar GSAP.
* SSR-safe.

---

# 9. Tokens permitidos

Agregar tokens mínimos si hacen falta:

```css
--n-ai-surface-bg
--n-ai-surface-border
--n-ai-glow
--n-prompt-bg
--n-prompt-border
--n-chat-user-bg
--n-chat-assistant-bg
--n-chat-system-bg
--n-voice-orb-size-sm
--n-voice-orb-size-md
--n-voice-orb-size-lg
--n-pipeline-line
--n-pipeline-step-bg
```

Preferir tokens existentes cuando sea posible.

No agregar tokens masivamente.

---

# 10. Exports públicos

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/package.json
```

Agregar exports:

```txt
./ai
./prompt-input
./chat
./streaming-text
./voice-orb
./ai-pipeline
```

No romper exports existentes.

Cada carpeta debe tener `index.ts`.

---

# 11. Playground — AI Interaction Demo

Actualizar `apps/playground`.

Crear sección:

```txt
AI Interaction MVP
```

Debe mostrar:

```txt
Prompt Input
Chat
Streaming Text
Voice Orb
AI Pipeline
AI Workspace Composition
```

## Datos demo

Agregar datos demo:

```ts
aiMessages = [
  {
    id: '1',
    role: 'system',
    content: 'Neural assistant is ready.',
    timestamp: '10:20',
    status: 'success',
  },
  {
    id: '2',
    role: 'user',
    content: 'Enhance this video and reduce noise.',
    author: 'Anderson',
    timestamp: '10:21',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'I can enhance the video, reduce noise and preserve facial details.',
    author: 'Neural',
    timestamp: '10:21',
    status: 'streaming',
  },
  {
    id: '4',
    role: 'tool',
    content: 'Selected model: Real-ESRGAN x4 + DenoiseNet',
    author: 'Pipeline',
    timestamp: '10:22',
  },
];

pipelineSteps = [
  {
    title: 'Upload',
    description: 'Media file received',
    icon: 'upload',
    status: 'success',
    progress: 100,
  },
  {
    title: 'Analyze',
    description: 'Detecting resolution, noise and motion',
    icon: 'search',
    status: 'success',
    progress: 100,
  },
  {
    title: 'Enhance',
    description: 'Running AI enhancement model',
    icon: 'sparkles',
    status: 'running',
    progress: 68,
    metadata: 'Real-ESRGAN x4',
  },
  {
    title: 'Export',
    description: 'Waiting for enhanced frames',
    icon: 'file-text',
    status: 'pending',
  },
];
```

Ajustar tipos al estado real del repo.

---

# 12. Prompt Input demo

```html
<n-prompt-input
  placeholder="Ask Neural to enhance, analyze or generate..."
  [(value)]="aiPrompt"
  (submitted)="onPromptSubmitted($event)"
/>
```

En el handler demo:

* Agregar mensaje de usuario a `aiMessages`.
* Mostrar toast si `NToastService` existe.
* No llamar backend real.

---

# 13. Chat demo

```html
<n-chat
  [messages]="aiMessages"
  [loading]="isAiThinking"
/>
```

---

# 14. Streaming Text demo

```html
<n-streaming-text
  [text]="streamingDemoText"
  state="streaming"
/>
```

Texto demo:

```ts
streamingDemoText = 'Analyzing frames, estimating noise profile and preparing enhancement pipeline...';
```

---

# 15. Voice Orb demo

```html
<n-voice-orb
  [state]="voiceState"
  size="lg"
  [interactive]="true"
  label="Voice assistant"
  (orbClick)="cycleVoiceState()"
/>
```

Estados demo:

```ts
voiceStates = ['idle', 'listening', 'thinking', 'speaking', 'muted', 'error'];
```

El handler solo cambia el string local.

No usar microphone API.

---

# 16. AI Pipeline demo

```html
<n-ai-pipeline
  [steps]="pipelineSteps"
  orientation="vertical"
/>
```

También mostrar una variante horizontal si el componente lo soporta:

```html
<n-ai-pipeline
  [steps]="pipelineSteps"
  orientation="horizontal"
  density="compact"
/>
```

---

# 17. AI Workspace Composition Demo

Crear una sección final que combine:

* `NShell`
* `NPageHeader`
* `NCommandBar`
* `NPromptInput`
* `NChat`
* `NVoiceOrb`
* `NAIPipeline`
* `NMediaPreview`
* `NFileCard`
* `NMetricCard`
* `NBadge`
* `NChip`
* `NButton`
* `NIcon`

Debe sentirse como un workspace real de AI media processing.

Ejemplo conceptual:

```html
<n-card variant="gradient">
  <n-card-header>
    <n-card-title>
      <n-icon name="sparkles" size="sm" />
      Neural AI Workspace
    </n-card-title>
    <n-card-description>
      Prompt-driven media enhancement workflow.
    </n-card-description>
  </n-card-header>

  <n-card-content>
    <div class="ai-workspace-grid">
      <section>
        <n-chat [messages]="aiMessages" [loading]="isAiThinking" />

        <n-prompt-input
          placeholder="Tell Neural what to do with this media..."
          [(value)]="aiPrompt"
          (submitted)="onPromptSubmitted($event)"
        />
      </section>

      <aside>
        <n-voice-orb
          [state]="voiceState"
          [interactive]="true"
          label="Voice assistant"
          (orbClick)="cycleVoiceState()"
        />

        <n-ai-pipeline [steps]="pipelineSteps" />

        <n-badge variant="success" [dot]="true">
          Model Ready
        </n-badge>

        <n-chip variant="primary" [selected]="true">
          Real-ESRGAN
        </n-chip>
      </aside>
    </div>
  </n-card-content>
</n-card>
```

---

# 18. Toast integration opcional

Si `NToastService` existe, usarlo en el playground:

```ts
onPromptSubmitted(prompt: string) {
  this.toast.info('Prompt submitted', {
    title: 'Neural',
    icon: 'sparkles',
  });
}
```

Si no está disponible, no bloquear la HU.

---

# 19. Documentación

Crear:

```txt
docs/ui/prompt-input.md
docs/ui/chat.md
docs/ui/streaming-text.md
docs/ui/voice-orb.md
docs/ui/ai-pipeline.md
docs/ui/ai.md
```

Actualizar:

```txt
packages/ui/README.md
docs/ui/getting-started.md
docs/ui/implementation-plan.md
docs/ui/component-inventory.md
```

Cada doc debe incluir:

* Estado del componente.
* Import.
* API.
* Ejemplos.
* Accesibilidad.
* SSR safety.
* Limitaciones conocidas.

## prompt-input.md debe explicar

* Submit.
* `Ctrl+Enter` / `Cmd+Enter`.
* Loading.
* Clear.
* Counter.
* No llama backend.

## chat.md debe explicar

* Roles.
* `NChat`.
* `NChatMessage`.
* No renderiza Markdown todavía.
* No usa `innerHTML`.

## streaming-text.md debe explicar

* No hace streaming real.
* Recibe texto actualizado por el consumidor.
* Cursor CSS.
* Sin timers.

## voice-orb.md debe explicar

* Estados visuales.
* No usa micrófono.
* No usa Web Audio.
* CSS-only animation.
* Reduced motion.

## ai-pipeline.md debe explicar

* Steps.
* Status.
* Progress.
* Orientación.
* Sin lógica real de procesamiento.

---

# 20. Tests

Si ya existe test runner configurado, crear pruebas mínimas.

## NPromptInput

* Renderiza textarea.
* Emite valueChange.
* Emite submitted con click.
* Emite submitted con Ctrl+Enter.
* No emite si disabled.
* No emite si loading.
* No emite si value vacío.
* Emite cleared si clearable.

## NChat

* Renderiza mensajes.
* Muestra empty state si no hay mensajes.
* Muestra loading si loading es true.

## NChatMessage

* Renderiza content.
* Aplica role.
* No usa innerHTML.

## NStreamingText

* Renderiza texto.
* Muestra cursor si state streaming.
* No muestra cursor si complete.

## NVoiceOrb

* Aplica state.
* Aplica size.
* Emite orbClick si interactive.
* No emite si disabled.

## NAIPipeline

* Renderiza steps desde input.
* Renderiza content projection si aplica.
* Aplica orientation.

## NAIPipelineStep

* Renderiza title.
* Aplica status.
* Renderiza progress si existe.

Si no hay test runner configurado, no instalar uno solo para esta HU. Documentar que queda pendiente.

---

# 21. Accesibilidad

## NPromptInput

* Textarea real.
* Botones reales.
* Label/aria-label.
* Submit accesible.
* Loading con `aria-busy`.

## NChat

* Contenedor con `role="log"` si aplica.
* No forzar comportamiento live region todavía si puede ser molesto.
* Mensajes legibles secuencialmente.

## NStreamingText

* Texto plano.
* Cursor decorativo con `aria-hidden`.

## NVoiceOrb

* Si interactive, usar `<button type="button">`.
* Si no interactive, usar elemento visual con label si existe.
* Respetar disabled.
* Respetar reduced motion.

## NAIPipeline

* Lista ordenada o semántica equivalente.
* Estados visuales acompañados por texto.

---

# 22. SSR Safety

No usar:

```txt
window
document
localStorage
sessionStorage
matchMedia
Canvas
setInterval
setTimeout
querySelector
getElementById
GSAP
window.lucide
Web Audio API
MediaRecorder
microphone APIs
WebSocket
EventSource
```

Permitido:

* Inputs/outputs.
* Angular templates.
* CSS animations.
* Signals si el repo ya las usa.
* Timers solo en playground si están claramente limpios, pero preferir no usarlos.

---

# 23. Fuera de alcance

No hacer todavía:

```txt
Conexión real con OpenAI/local models
Backend AI client
WebSocket streaming
EventSource streaming
Markdown rendering
Code highlighting
Tool calls reales
Audio real
Micrófono
Speech-to-text
Text-to-speech
Canvas neural graph
GSAP animation
NCalendar
NChart
OV* Oroya Video components
Storybook
SSR package
CLI
Schematics
Adapters
```

---

# 24. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NPromptInput`.
2. Exista `NChat`.
3. Exista `NChatMessage`.
4. Exista `NStreamingText`.
5. Exista `NVoiceOrb`.
6. Exista `NAIPipeline`.
7. Exista `NAIPipelineStep`.
8. Existan tipos compartidos AI si se decidió crearlos.
9. Todos sean standalone Angular components.
10. Todos usen tokens `--n-*`.
11. Todos sean SSR-safe.
12. `NPromptInput` soporte submit y valueChange.
13. `NChat` renderice mensajes por role.
14. `NStreamingText` use cursor CSS sin timers.
15. `NVoiceOrb` use animación CSS sin audio/canvas.
16. `NAIPipeline` renderice pasos y estados.
17. Exports públicos estén actualizados.
18. `package.json` tenga exports secundarios si aplica.
19. Playground tenga demo AI Interaction MVP.
20. Playground tenga AI Workspace Composition Demo.
21. Docs estén creadas/actualizadas.
22. No se haya implementado backend AI.
23. No se haya usado WebSocket/EventSource.
24. No se haya usado audio real.
25. No se haya usado Canvas/GSAP.
26. Build/check disponible pase o se documenten limitaciones.

---

# 25. Validación manual

Debe poder ejecutarse:

```bash
pnpm nx serve playground
```

o el comando real del workspace.

En la UI debe verse:

```txt
Neural Angular Playground
AI Interaction MVP
Prompt Input
Chat
Streaming Text
Voice Orb
AI Pipeline
AI Workspace Composition
```

Validar manualmente:

* Prompt input permite escribir.
* Submit agrega demo message o dispara handler demo.
* Chat muestra mensajes por role.
* Streaming text muestra cursor visual.
* Voice orb cambia estados con click en demo.
* AI pipeline muestra pasos y progreso.
* La composición se siente como workspace AI real.

---

# 26. Resultado esperado

Mostrar resumen con:

```txt
Files created
Files updated
Components created
Types/utilities created
Public API added
Playground AI demo added
Docs added
Tests added or skipped with reason
How to run
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-010 — Crear Motion MVP: provideNeuralMotion, CSS motion utilities y GSAP-safe animation helpers
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add ai interaction primitives"
```
