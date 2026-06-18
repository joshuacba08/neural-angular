# NDropzone

Status: MVP complete for HU-008.

`NDropzone` is a standalone upload selection primitive with a native file input, browse button, and drag/drop handlers. It validates accepted types, maximum file size, maximum file count, and disabled state, then emits selected or rejected files.

## Import

```ts
import { NDropzone, type NDropzoneRejectedFile } from '@neural/angular-ui/dropzone';
```

## Basic Usage

```html
<n-dropzone
  accept="image/*,video/*"
  [multiple]="true"
  [maxSize]="500 * 1024 * 1024"
  [maxFiles]="4"
  title="Upload media"
  description="Drop videos or images to start processing."
  browseLabel="Select media"
  (filesSelected)="onFilesSelected($event)"
  (filesRejected)="onFilesRejected($event)"
/>
```

## API

Inputs: `accept`, `multiple`, `disabled`, `dragActive`, `maxSize`, `maxFiles`, `variant`, `title`, `description`, `accentLabel`, `dragTitle`, `browseLabel`, `icon`, `error`, and `files`.

Outputs: `filesSelected` and `filesRejected`. Use `[(files)]` to control the selected-file summary state.

Rejected reasons: `invalid-type`, `max-size`, `max-files`, and `disabled`.

Because this workspace intentionally compiles without DOM libs, the public selected-file type is `NDropzoneFile`, a structural file-compatible type with `name`, `size`, and `type`.

## Accessibility

The component renders a real `<input type="file">` and a real button for browse. Users are not forced to rely on drag and drop.

## SSR Safety

Drag/drop and file input data are only read from user events. The component does not use `window`, `document`, selectors, object URLs, or upload services.

## Known Limitations

`NDropzone` does not upload files, create previews, generate thumbnails, chunk files, or talk to a backend.

