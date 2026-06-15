# HU-008 — Crear Media/Upload MVP: NDropzone, NFileCard, NImageCompare y NMediaPreview

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

Ahora vamos a crear el primer bloque Media/Upload MVP.

Esta HU implementa:

```txt
NDropzone
NFileCard
NImageCompare
NMediaPreview
```

Estos componentes deben servir como base para apps tipo:

```txt
Oroya Video
AI media tools
Dashboards de procesamiento
Apps de upload/análisis
Herramientas de comparación antes/después
```

Pero **no crear todavía componentes `OV*` específicos de Oroya Video**.

---

## Historia de Usuario

Como desarrollador de Neural Angular,
quiero tener componentes básicos para subir archivos, visualizar archivos, comparar imágenes y previsualizar media,
para poder construir flujos reales de upload/procesamiento sin crear todavía componentes específicos de producto.

---

## Objetivo principal

Crear un MVP de componentes media/upload para `@neural/angular-ui`.

Al terminar esta HU, el playground debe poder mostrar:

* Una zona de upload drag & drop.
* Cards de archivos.
* Previsualización básica de imagen/video/audio.
* Comparador antes/después con slider.
* Una composición tipo “media processing workflow”.
* Integración con componentes existentes como `NButton`, `NIcon`, `NBadge`, `NChip`, `NProgress`, `NCard`, `NToast`.

---

# 1. Componentes a crear

Crear estructura:

```txt
packages/ui/src/dropzone/
packages/ui/src/file-card/
packages/ui/src/image-compare/
packages/ui/src/media-preview/
```

Cada carpeta debe seguir la convención usada por el resto del UI kit:

```txt
*.component.ts
*.component.html
*.component.scss
*.types.ts
index.ts
```

Estructura esperada:

```txt
packages/ui/src/dropzone/
├─ dropzone.component.ts
├─ dropzone.component.html
├─ dropzone.component.scss
├─ dropzone.types.ts
└─ index.ts

packages/ui/src/file-card/
├─ file-card.component.ts
├─ file-card.component.html
├─ file-card.component.scss
├─ file-card.types.ts
└─ index.ts

packages/ui/src/image-compare/
├─ image-compare.component.ts
├─ image-compare.component.html
├─ image-compare.component.scss
├─ image-compare.types.ts
└─ index.ts

packages/ui/src/media-preview/
├─ media-preview.component.ts
├─ media-preview.component.html
├─ media-preview.component.scss
├─ media-preview.types.ts
└─ index.ts
```

---

# 2. Shared media types

Crear, si ayuda a evitar duplicación:

```txt
packages/ui/src/media/
```

Con:

```txt
packages/ui/src/media/
├─ media.types.ts
├─ media-utils.ts
└─ index.ts
```

Esto es opcional, pero recomendado si los componentes comparten tipos.

Tipos sugeridos:

```ts
export type NMediaKind =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'archive'
  | 'unknown';

export type NUploadStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'warning'
  | 'error';

export interface NFileLike {
  id?: string;
  name: string;
  size?: number;
  type?: string;
  extension?: string;
  url?: string;
  previewUrl?: string;
  status?: NUploadStatus;
  progress?: number;
  error?: string;
}
```

Reglas:

* No crear una librería interna gigante.
* Mantener los tipos simples.
* No crear lógica de backend.
* No crear servicio de upload real todavía.

---

# 3. NDropzone

Selector:

```html
<n-dropzone></n-dropzone>
```

## Objetivo

Componente para seleccionar archivos con input nativo y drag & drop.

Debe ser útil para imágenes, videos, audio, documentos y archivos generales.

## API

Tipos:

```ts
export type NDropzoneVariant = 'default' | 'compact' | 'media';
export type NDropzoneState = 'idle' | 'dragging' | 'disabled' | 'error';
```

Inputs:

```ts
accept?: string;
multiple?: boolean;
disabled?: boolean;
maxSize?: number;
maxFiles?: number;
variant?: NDropzoneVariant;
title?: string;
description?: string;
browseLabel?: string;
icon?: string;
error?: string;
```

Outputs:

```ts
filesSelected: EventEmitter<File[]>;
filesRejected: EventEmitter<NDropzoneRejectedFile[]>;
```

Tipo de rechazo:

```ts
export type NDropzoneRejectReason =
  | 'invalid-type'
  | 'max-size'
  | 'max-files'
  | 'disabled';

export interface NDropzoneRejectedFile {
  file: File;
  reason: NDropzoneRejectReason;
  message: string;
}
```

Defaults sugeridos:

```ts
multiple = false;
disabled = false;
variant = 'default';
title = 'Drop files here';
description = 'Drag and drop files or browse from your device.';
browseLabel = 'Browse files';
icon = 'upload';
```

## Uso esperado

```html
<n-dropzone
  accept="image/*,video/*"
  [multiple]="true"
  [maxSize]="500 * 1024 * 1024"
  title="Upload media"
  description="Drop videos or images to start processing."
  (filesSelected)="onFilesSelected($event)"
  (filesRejected)="onFilesRejected($event)"
/>
```

## Comportamiento

Debe:

* Renderizar un `<input type="file">` real.
* Permitir abrir el file picker con click o botón.
* Soportar dragenter, dragover, dragleave y drop.
* Prevenir comportamiento default del navegador durante drag/drop.
* Validar `disabled`.
* Validar `maxFiles`.
* Validar `maxSize`.
* Validar `accept` de forma básica.
* Emitir archivos aceptados.
* Emitir archivos rechazados con reason y message.
* Resetear input después de seleccionar para permitir elegir el mismo archivo otra vez.

## Accesibilidad

Debe:

* Ser usable con teclado.
* Tener botón real para browse.
* Tener label/description visibles.
* No depender solo de drag & drop.
* Mostrar error si existe.
* Usar estados visuales claros.

## SSR Safety

Drag/drop y File API solo deben usarse como respuesta a eventos del usuario en browser.

No usar:

```txt
window
document
querySelector
getElementById
```

Si se necesita limpiar input, usar template reference local de Angular, no DOM global.

---

# 4. NFileCard

Selector:

```html
<n-file-card></n-file-card>
```

## Objetivo

Mostrar un archivo seleccionado, subido o procesado con metadata, estado, progreso y acciones.

## API

Tipos:

```ts
export type NFileCardVariant = 'default' | 'compact' | 'detailed';

export type NFileCardStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'warning'
  | 'error';
```

Inputs:

```ts
file?: NFileLike;
name?: string;
size?: number;
type?: string;
extension?: string;
status?: NFileCardStatus;
progress?: number;
error?: string;
variant?: NFileCardVariant;
removable?: boolean;
downloadable?: boolean;
previewable?: boolean;
```

Outputs:

```ts
removed: EventEmitter<void>;
download: EventEmitter<void>;
preview: EventEmitter<void>;
retry: EventEmitter<void>;
```

Uso esperado:

```html
<n-file-card
  [file]="file"
  status="uploading"
  [progress]="64"
  [removable]="true"
  (removed)="removeFile(file)"
/>
```

O:

```html
<n-file-card
  name="city-night.mp4"
  [size]="734003200"
  type="video/mp4"
  status="processing"
  [progress]="48"
  [previewable]="true"
/>
```

## Visual

Debe mostrar:

* Icono según tipo de archivo.
* Nombre.
* Tamaño formateado.
* Tipo/extensión si existe.
* Badge/status.
* Progress si `uploading` o `processing`.
* Error message si `status="error"` o `error` existe.
* Acciones opcionales:

  * preview
  * download
  * retry
  * remove

## Reglas

* Usar `NIcon`.
* Usar `NBadge`.
* Usar `NProgress`.
* Usar `NButton` para acciones si aplica.
* No usar backend.
* No descargar realmente archivos; solo emitir evento `download`.
* No abrir preview real; solo emitir evento `preview`.
* No crear lógica de upload real.

---

# 5. NImageCompare

Selector:

```html
<n-image-compare></n-image-compare>
```

## Objetivo

Comparador visual antes/después para imágenes.

Debe ser útil para:

```txt
AI upscaling
Before / after enhancement
Image restoration
Video frame comparison
Design comparison
```

## API

Inputs:

```ts
beforeSrc: string;
afterSrc: string;
beforeAlt?: string;
afterAlt?: string;
value?: number;
orientation?: 'horizontal' | 'vertical';
showLabels?: boolean;
beforeLabel?: string;
afterLabel?: string;
disabled?: boolean;
```

Outputs:

```ts
valueChange: EventEmitter<number>;
```

Defaults:

```ts
value = 50;
orientation = 'horizontal';
showLabels = true;
beforeLabel = 'Before';
afterLabel = 'After';
disabled = false;
```

Uso esperado:

```html
<n-image-compare
  beforeSrc="/assets/demo/before.jpg"
  afterSrc="/assets/demo/after.jpg"
  beforeAlt="Original image"
  afterAlt="Enhanced image"
  [(value)]="compareValue"
/>
```

## Comportamiento

Debe:

* Mostrar dos imágenes superpuestas.
* Permitir mover un slider/range.
* Usar `<input type="range">` para accesibilidad y simplicidad.
* Reflejar `value` entre 0 y 100.
* Emitir `valueChange`.
* Soportar orientación horizontal.
* Orientación vertical puede implementarse si es sencilla; si no, dejar documentado como parcial.

## Accesibilidad

Debe:

* Usar input range real.
* Tener `aria-label`.
* Mantener `alt` para imágenes.
* Funcionar con teclado gracias al range nativo.

## Reglas

* No usar Canvas.
* No usar pointer events custom complejos todavía.
* No usar GSAP.
* No usar browser APIs.
* Todo debe ser CSS + Angular binding.
* No usar imágenes externas obligatorias.

---

# 6. NMediaPreview

Selector:

```html
<n-media-preview></n-media-preview>
```

## Objetivo

Previsualización simple de media: imagen, video, audio o fallback de archivo.

## API

Tipos:

```ts
export type NMediaPreviewKind =
  | 'auto'
  | 'image'
  | 'video'
  | 'audio'
  | 'file';

export type NMediaPreviewFit =
  | 'contain'
  | 'cover';

export type NMediaPreviewRatio =
  | 'square'
  | 'video'
  | 'wide'
  | 'auto';
```

Inputs:

```ts
src?: string;
kind?: NMediaPreviewKind;
alt?: string;
poster?: string;
title?: string;
description?: string;
fit?: NMediaPreviewFit;
ratio?: NMediaPreviewRatio;
controls?: boolean;
muted?: boolean;
autoplay?: boolean;
loop?: boolean;
icon?: string;
emptyTitle?: string;
emptyDescription?: string;
```

Defaults:

```ts
kind = 'auto';
fit = 'contain';
ratio = 'video';
controls = true;
muted = false;
autoplay = false;
loop = false;
emptyTitle = 'No preview available';
emptyDescription = 'Select a media file to preview it.';
```

Uso esperado:

```html
<n-media-preview
  src="/assets/demo/video.mp4"
  kind="video"
  title="Preview"
  description="Enhanced output"
/>
```

Imagen:

```html
<n-media-preview
  src="/assets/demo/frame.jpg"
  kind="image"
  alt="Video frame preview"
/>
```

Audio:

```html
<n-media-preview
  src="/assets/demo/audio.mp3"
  kind="audio"
  title="Audio preview"
/>
```

Fallback:

```html
<n-media-preview
  title="archive.zip"
  description="Preview unavailable"
/>
```

## Comportamiento

Debe:

* Renderizar `<img>` si es image.
* Renderizar `<video>` si es video.
* Renderizar `<audio>` si es audio.
* Mostrar fallback con `NEmptyState` si no hay `src`.
* Mostrar fallback de file si `kind="file"` o tipo desconocido.
* Usar `poster` en video si existe.
* Usar `controls` según input.
* No crear object URLs todavía dentro del componente, salvo que sea implementado con limpieza correcta y explícita.

## Reglas

* No procesar archivos.
* No extraer thumbnails.
* No decodificar video.
* No usar Canvas.
* No usar MediaSource.
* No usar WebCodecs.
* No usar FFmpeg.
* No usar browser APIs directas.
* Solo preview por URL/string.

---

# 7. Utilidades permitidas

Crear utilidades pequeñas si son útiles:

```ts
formatFileSize(size?: number): string;
getMediaKindFromMime(type?: string): NMediaKind;
getFileExtension(name?: string): string;
matchesAccept(file: File, accept?: string): boolean;
```

Ubicación sugerida:

```txt
packages/ui/src/media/media-utils.ts
```

Reglas:

* Deben ser funciones puras.
* No usar browser APIs globales.
* Testeables.
* Exportar solo si tiene sentido público.

---

# 8. Tokens permitidos

Agregar tokens mínimos si hacen falta:

```css
--n-dropzone-bg
--n-dropzone-border
--n-dropzone-border-active
--n-dropzone-border-error
--n-dropzone-hover-bg

--n-file-card-bg
--n-file-card-border

--n-media-preview-bg
--n-media-preview-border

--n-image-compare-handle-bg
--n-image-compare-handle-border
```

No agregar tokens masivamente.

Preferir tokens existentes cuando sea posible.

---

# 9. Exports públicos

Actualizar:

```txt
packages/ui/src/index.ts
packages/ui/package.json
```

Agregar exports:

```txt
./dropzone
./file-card
./image-compare
./media-preview
./media
```

No romper exports existentes.

Cada carpeta debe tener `index.ts`.

---

# 10. Playground — Media/Upload Demo

Actualizar `apps/playground`.

Crear una nueva vista o sección:

```txt
Media / Upload MVP
```

Debe mostrar:

```txt
Dropzone
Selected Files
File Cards
Media Preview
Image Compare
Media Workflow Composition
```

## Datos demo

Agregar datos demo:

```ts
selectedFiles: NFileLike[] = [
  {
    id: '1',
    name: 'city-night.mp4',
    size: 734003200,
    type: 'video/mp4',
    extension: 'mp4',
    status: 'processing',
    progress: 68,
  },
  {
    id: '2',
    name: 'portrait-before.jpg',
    size: 5242880,
    type: 'image/jpeg',
    extension: 'jpg',
    status: 'success',
    progress: 100,
  },
  {
    id: '3',
    name: 'broken-export.mov',
    size: 104857600,
    type: 'video/quicktime',
    extension: 'mov',
    status: 'error',
    progress: 21,
    error: 'Encoding failed',
  },
];
```

Ajustar tipos al estado real del repo.

## Dropzone demo

```html
<n-dropzone
  accept="image/*,video/*"
  [multiple]="true"
  title="Upload media"
  description="Drop videos or images to start processing."
  browseLabel="Select media"
  (filesSelected)="onMediaFilesSelected($event)"
  (filesRejected)="onMediaFilesRejected($event)"
/>
```

## File cards demo

```html
<div class="media-file-grid">
  <n-file-card
    *ngFor="let file of selectedFiles"
    [file]="file"
    [removable]="true"
    [previewable]="true"
    (removed)="removeDemoFile(file)"
    (preview)="previewDemoFile(file)"
  />
</div>
```

Si el proyecto usa control flow nuevo de Angular, usar `@for`.

## Media preview demo

```html
<n-media-preview
  src="assets/demo/media-preview.jpg"
  kind="image"
  alt="Demo image preview"
  title="Enhanced frame"
  description="Preview generated from the selected media."
/>
```

Si no existe asset demo, usar fallback sin `src` y documentar que se puede agregar asset después.

## Image compare demo

Usar assets demo si existen. Si no existen, crear una demo con gradientes/placeholders dentro del playground o documentar limitación.

Preferencia:

```html
<n-image-compare
  beforeSrc="assets/demo/before.jpg"
  afterSrc="assets/demo/after.jpg"
  beforeAlt="Original frame"
  afterAlt="Enhanced frame"
  beforeLabel="Original"
  afterLabel="Enhanced"
  [(value)]="imageCompareValue"
/>
```

Si no hay assets:

* No descargar imágenes externas.
* No depender de internet.
* Crear placeholders locales simples si el repo lo permite.
* O dejar el componente demo usando fallback y documentar que requiere assets.

## Workflow composition demo

Crear una card o layout que combine:

* `NDropzone`
* `NFileCard`
* `NMediaPreview`
* `NImageCompare`
* `NProgress`
* `NBadge`
* `NChip`
* `NButton`
* `NIcon`
* `NToast` si está disponible

Ejemplo conceptual:

```html
<n-card variant="gradient">
  <n-card-header>
    <n-card-title>
      <n-icon name="upload" size="sm" />
      Media enhancement workflow
    </n-card-title>
    <n-card-description>
      Upload, preview and compare AI-enhanced media.
    </n-card-description>
  </n-card-header>

  <n-card-content>
    <n-dropzone
      accept="image/*,video/*"
      [multiple]="true"
      title="Drop media"
      description="Images and videos are supported."
      (filesSelected)="onMediaFilesSelected($event)"
    />

    <n-progress
      [value]="68"
      label="Processing"
      [showValue]="true"
    />

    <n-badge variant="success" [dot]="true">
      GPU Ready
    </n-badge>

    <n-chip variant="primary" [selected]="true">
      Real-ESRGAN
    </n-chip>
  </n-card-content>

  <n-card-footer>
    <n-button variant="ghost">
      Reset
    </n-button>

    <n-button>
      <n-icon name="play" size="sm" />
      Start processing
    </n-button>
  </n-card-footer>
</n-card>
```

---

# 11. Toast integration opcional

Si `NToastService` existe de HU-007, usarlo en playground:

```ts
onMediaFilesSelected(files: File[]) {
  this.toast.success(`${files.length} file(s) selected`, {
    title: 'Upload ready',
    icon: 'upload',
  });
}

onMediaFilesRejected(files: NDropzoneRejectedFile[]) {
  this.toast.danger(`${files.length} file(s) rejected`, {
    title: 'Invalid files',
    icon: 'alert-circle',
  });
}
```

Si `NToastService` no existe o no quedó disponible, no bloquear esta HU. Documentar limitación.

---

# 12. Documentación

Crear:

```txt
docs/ui/dropzone.md
docs/ui/file-card.md
docs/ui/image-compare.md
docs/ui/media-preview.md
docs/ui/media.md
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

## dropzone.md debe explicar

* Drag & drop.
* File input fallback.
* `accept`.
* `multiple`.
* `maxSize`.
* `maxFiles`.
* Rejected files.
* No realiza upload real.

## file-card.md debe explicar

* Cómo mostrar archivo.
* Estados.
* Progress.
* Acciones emitidas.
* No descarga ni preview real por sí mismo.

## image-compare.md debe explicar

* Before/after.
* Uso con input range.
* Limitaciones.
* No usa Canvas.

## media-preview.md debe explicar

* Image/video/audio/file.
* No crea object URLs.
* No procesa archivos.

---

# 13. Tests

Si ya existe test runner configurado, crear pruebas mínimas.

## NDropzone

* Renderiza title y description.
* Renderiza input file.
* Respeta disabled.
* Emite filesSelected con archivos válidos.
* Emite filesRejected si se supera maxFiles.
* Emite filesRejected si se supera maxSize.
* Valida accept de forma básica.

## NFileCard

* Renderiza nombre.
* Renderiza tamaño formateado.
* Renderiza status.
* Renderiza progress si aplica.
* Emite removed.
* Emite preview.
* Emite download.
* Emite retry.

## NImageCompare

* Renderiza before/after images.
* Renderiza range.
* Aplica value.
* Emite valueChange.
* Respeta disabled.

## NMediaPreview

* Renderiza img para image.
* Renderiza video para video.
* Renderiza audio para audio.
* Renderiza empty state sin src.
* Renderiza fallback para file/unknown.

## Media utils

* `formatFileSize`.
* `getMediaKindFromMime`.
* `getFileExtension`.
* `matchesAccept`.

Si no hay test runner configurado, no instalar uno solo para esta HU. Documentar que queda pendiente.

---

# 14. Accesibilidad

## NDropzone

* Debe funcionar con botón/input nativo.
* No depender solo de drag & drop.
* Mostrar focus visible.
* No esconder input de forma que rompa accesibilidad.
* Asociar texto descriptivo si es viable.

## NFileCard

* Acciones deben ser botones reales.
* Botones con labels accesibles.
* No usar divs clickeables.

## NImageCompare

* Usar `<input type="range">`.
* Imágenes con `alt`.
* Label accesible para slider.

## NMediaPreview

* Imagen con `alt`.
* Video/audio con `controls` según input.
* Fallback legible.

---

# 15. SSR Safety

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
```

Permitido:

* `File` como tipo o dato recibido por eventos del input/drop.
* Drag/drop event handlers.
* Template references locales.
* Angular bindings.
* CSS.

No crear object URLs en esta HU salvo que se haga con guards browser-only y cleanup correcto. Preferencia: no hacerlo aún.

---

# 16. Fuera de alcance

No hacer todavía:

```txt
Upload real a backend
Chunk upload
Resumable upload
Web workers
FFmpeg
WebCodecs
Canvas processing
Video frame extraction
Thumbnail generation
Drag sorting
File manager avanzado
NCalendar
NChart
NVoiceOrb
NPromptInput
Oroya Video components OV*
Image editor
Timeline editor de video
Storybook
SSR package
CLI
Schematics
Adapters
```

---

# 17. Criterios de aceptación

La HU estará completa cuando:

1. Exista `NDropzone`.
2. Exista `NFileCard`.
3. Exista `NImageCompare`.
4. Exista `NMediaPreview`.
5. Existan tipos media compartidos si se decidió crearlos.
6. Todos sean standalone Angular components.
7. Todos usen tokens `--n-*`.
8. Todos sean SSR-safe.
9. `NDropzone` soporte input file y drag/drop.
10. `NDropzone` emita filesSelected y filesRejected.
11. `NFileCard` muestre metadata, status, progress y acciones.
12. `NImageCompare` use input range real.
13. `NMediaPreview` soporte image/video/audio/file fallback.
14. Exports públicos estén actualizados.
15. `package.json` tenga exports secundarios si aplica.
16. Playground tenga demo Media/Upload MVP.
17. Playground tenga workflow composition demo.
18. Docs estén creadas/actualizadas.
19. No se hayan creado componentes `OV*`.
20. No se haya implementado upload real.
21. No se haya usado Canvas/FFmpeg/WebCodecs.
22. Build/check disponible pase o se documenten limitaciones.

---

# 18. Validación manual

Debe poder ejecutarse:

```bash
pnpm nx serve playground
```

o el comando real del workspace.

En la UI debe verse:

```txt
Neural Angular Playground
Media / Upload MVP
Dropzone
Selected Files
File Cards
Media Preview
Image Compare
Media Workflow Composition
```

Validar manualmente:

* Click en dropzone abre selector de archivos.
* Drag/drop aplica estado visual.
* Archivos válidos emiten evento.
* Archivos inválidos muestran rechazo o disparan feedback.
* File cards muestran metadata y progreso.
* Image compare permite mover slider.
* Media preview muestra fallback si no hay src.
* La composición se ve como flujo real de media/AI processing.

---

# 19. Resultado esperado

Mostrar resumen con:

```txt
Files created
Files updated
Components created
Types/utilities created
Public API added
Playground media demo added
Docs added
Tests added or skipped with reason
How to run
Known limitations
Recommended next HU
```

La siguiente HU recomendada debe ser:

```txt
HU-009 — Crear AI Interaction MVP: NPromptInput, NChat, NStreamingText, NVoiceOrb y NAIPipeline
```

---

## Commit sugerido

```bash
git add .
git commit -m "feat(ui): add media and upload primitives"
```
