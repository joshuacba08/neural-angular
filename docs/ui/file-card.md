# NFileCard

Status: MVP complete for HU-008.

`NFileCard` displays selected, uploaded, or processed file metadata with status, progress and optional actions.

## Import

```ts
import { NFileCard, type NFileLike } from '@neural/angular-ui/file-card';
```

## Basic Usage

```html
<n-file-card
  [file]="file"
  [removable]="true"
  [previewable]="true"
  [downloadable]="true"
  (removed)="removeFile(file)"
  (preview)="previewFile(file)"
  (download)="downloadFile(file)"
/>
```

## API

Inputs: `file`, `name`, `size`, `type`, `extension`, `status`, `progress`, `error`, `variant`, `removable`, `downloadable`, and `previewable`.

Outputs: `removed`, `download`, `preview`, and `retry`.

Statuses: `idle`, `uploading`, `processing`, `success`, `warning`, and `error`.

## Accessibility

All actions are rendered as real buttons with visible text and icons. File status is displayed through `NBadge`; progress uses `NProgress`.

## SSR Safety

The card only renders metadata and emits events. It does not download files, open object URLs, inspect files, or use browser globals.

## Known Limitations

Preview and download are emitted actions only. Real preview routing, browser downloads, retry workflows, and backend integration remain app-level concerns.

