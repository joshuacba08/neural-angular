# Media Utilities

Status: MVP complete for HU-008.

The media module contains small shared types and pure helpers used by the upload and media preview primitives.

## Import

```ts
import {
  formatFileSize,
  getFileExtension,
  getMediaKindFromFile,
  getMediaKindFromMime,
  matchesAccept,
  type NFileLike,
} from '@neural/angular-ui/media';
```

## API

`NFileLike` describes file metadata without creating a backend upload model. `NMediaKind` covers image, video, audio, document, archive, and unknown. `NUploadStatus` covers idle, uploading, processing, success, warning, and error.

## SSR Safety

The helpers are pure functions. They do not use `window`, `document`, object URLs, Canvas, MediaSource, WebCodecs, or FFmpeg.

## Known Limitations

The helpers only infer media kind from MIME type, filename and extension. They do not inspect file bytes or validate real media contents.

