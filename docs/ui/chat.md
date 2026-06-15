# NChat y NChatMessage

## Estado

MVP implementado.

## Import

```ts
import { NChat, NChatMessage } from '@neural/angular-ui/chat';
```

## API

`NChat` recibe:

- `messages`
- `emptyTitle`
- `emptyDescription`
- `showAvatars`
- `showTimestamps`
- `compact`
- `loading`

`NChatMessage` soporta:

- `message`
- `role`
- `content`
- `author`
- `avatar`
- `timestamp`
- `status`
- `showAvatar`
- `showTimestamp`
- `compact`

## Ejemplos

```html
<n-chat [messages]="messages" [loading]="isThinking" />
```

```html
<n-chat-message
  role="assistant"
  content="I can help you enhance this video."
/>
```

## Roles

- `user`: alineado a la derecha.
- `assistant`: alineado a la izquierda.
- `system`: compacto y neutral.
- `tool`: técnico y monoespaciado.

## Accesibilidad

- `NChat` usa `role="log"` para la conversación.
- Los mensajes se leen como texto plano y secuencial.

## SSR Safety

- No hace scroll manual.
- No usa `innerHTML`.
- No renderiza Markdown.

## Limitaciones conocidas

- No hay autoscroll.
- No hay tool calls reales.
- No hay resaltado de código ni Markdown.
