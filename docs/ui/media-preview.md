# NMediaPreview

Status: MVP complete for HU-008.

`NMediaPreview` renders a simple preview for image, video, audio, or generic file URLs.

## Import

```ts
import { NMediaPreview } from '@neural/angular-ui/media-preview';
```

## Basic Usage

```html
<n-media-preview
  src="assets/demo/frame.jpg"
  kind="image"
  alt="Video frame preview"
  title="Enhanced frame"
  description="Preview generated from the selected media."
/>
```

## API

Inputs: `src`, `kind`, `alt`, `poster`, `title`, `description`, `fit`, `ratio`, `controls`, `muted`, `autoplay`, `loop`, `icon`, `emptyTitle`, and `emptyDescription`.

Kinds: `auto`, `image`, `video`, `audio`, and `file`.

Fits: `contain` and `cover`.

Ratios: `square`, `video`, `wide`, and `auto`.

## Accessibility

Images use `alt`. Video and audio use native controls by default. Empty and file fallback states render readable text.

## SSR Safety

The component only renders by URL/string. It does not create object URLs, decode media, extract thumbnails, use Canvas, MediaSource, WebCodecs, or browser globals.

## Known Limitations

The component does not process files, generate previews from local `File` objects, or extract video frames.

