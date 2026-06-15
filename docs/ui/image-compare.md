# NImageCompare

Status: MVP complete for HU-008.

`NImageCompare` is a before/after image comparison primitive for AI upscaling, restoration, frame comparison, and design comparison.

## Import

```ts
import { NImageCompare } from '@neural/angular-ui/image-compare';
```

## Basic Usage

```html
<n-image-compare
  beforeSrc="assets/demo/before.jpg"
  afterSrc="assets/demo/after.jpg"
  beforeAlt="Original frame"
  afterAlt="Enhanced frame"
  beforeLabel="Original"
  afterLabel="Enhanced"
  [(value)]="compareValue"
/>
```

## API

Inputs: `beforeSrc`, `afterSrc`, `beforeAlt`, `afterAlt`, `beforeMode`, `value`, `orientation`, `showLabels`, `beforeLabel`, `afterLabel`, and `disabled`.

`beforeMode="image"` renders a split between two image sources. `beforeMode="filter"` uses a `backdrop-filter` overlay over the after image, matching the design-system Before / After pattern for degraded original previews without duplicating the visible asset.

Output: `valueChange`.

## Accessibility

The control uses a native `<input type="range">`, so keyboard interaction is handled by the browser. Both images keep `alt` text.

## SSR Safety

The component is CSS and Angular binding only. It does not use Canvas, pointer-event gesture code, GSAP, object URLs, or browser globals.

## Known Limitations

Horizontal and vertical clipping are supported, but there is no custom drag handle behavior beyond the native range input.
