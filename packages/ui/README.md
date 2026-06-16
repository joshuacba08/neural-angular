# @neural/angular-ui

Angular-first UI system for Neural Angular.

Current status: token foundation, a minimal Angular theme provider, Lucide icon provider, Core UI primitives, forms, feedback, layout/navigation, data display primitives, overlay/feedback primitives, media/upload primitives, and AI interaction primitives.

## Styles

```css
@import "@neural/angular-ui/styles";
```

This bundle includes the design tokens, the dark/light theme layers, and a base
layer that applies the canvas background and typography to `body`.

### Fonts

The `--n-font-*` tokens reference **Plus Jakarta Sans** (display/body) and
**JetBrains Mono** (code). You must load these typefaces yourself, or the system
falls back to `system-ui`.

The most reliable option is a `<link>` in your app's `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

A CSS entry point is also provided for convenience (note: bundlers may inline or
strip remote `@import` rules, so the `<link>` above is preferred):

```css
@import "@neural/angular-ui/styles/fonts";
```

For offline or self-hosted setups, declare your own `@font-face` rules for the
two families instead. The base `body` treatment is also available standalone via
`@neural/angular-ui/styles/base`.

## Theme

```ts
import { provideNeuralTheme } from '@neural/angular-ui';

export const appConfig = {
  providers: [
    provideNeuralTheme({
      defaultTheme: 'dark',
      storage: false,
    }),
  ],
};
```

```html
<body data-n-theme="dark">
```

The provider applies `data-n-theme` to the document element in the browser. The dark theme is the primary theme for now. The light theme file exists as an explicit placeholder because the imported design reference is dark-only.

## Icons

```ts
import { provideNeuralIcons } from '@neural/angular-ui';

export const appConfig = {
  providers: [provideNeuralIcons()],
};
```

`provideNeuralIcons` registers a curated Lucide set through `@lucide/angular`. It does not use global scripts or `window.lucide`.

## Components

```ts
import {
  NAvatar,
  NAIPipeline,
  NBadge,
  NButton,
  NCard,
  NChat,
  NChip,
  NCommandBar,
  NDataCard,
  NDropzone,
  NEmptyState,
  NFileCard,
  NIcon,
  NImageCompare,
  NInput,
  NMediaPreview,
  NMetricCard,
  NPageHeader,
  NPromptInput,
  NProgress,
  NSelect,
  NShell,
  NSidebar,
  NSidebarItem,
  NSidebarSection,
  NSpinner,
  NStatCard,
  NStatusDot,
  NStreamingText,
  NTable,
  NTabItem,
  NTabs,
  NTextarea,
  NTimeline,
  NTimelineItem,
  NToolbar,
  NVoiceOrb,
} from '@neural/angular-ui';
```

Secondary entry points are available in the workspace:

```ts
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
import { NIcon } from '@neural/angular-ui/icon';
import { NBadge } from '@neural/angular-ui/badge';
import { NChip } from '@neural/angular-ui/chip';
import { NInput } from '@neural/angular-ui/input';
import { NTextarea } from '@neural/angular-ui/textarea';
import { NSelect } from '@neural/angular-ui/select';
import { NAvatar } from '@neural/angular-ui/avatar';
import { NProgress } from '@neural/angular-ui/progress';
import { NSpinner } from '@neural/angular-ui/spinner';
import { NEmptyState } from '@neural/angular-ui/empty-state';
import { NStatusDot } from '@neural/angular-ui/status-dot';
import { NShell } from '@neural/angular-ui/shell';
import { NSidebar } from '@neural/angular-ui/sidebar';
import { NToolbar } from '@neural/angular-ui/toolbar';
import { NTabs } from '@neural/angular-ui/tabs';
import { NPageHeader } from '@neural/angular-ui/page-header';
import { NCommandBar } from '@neural/angular-ui/command-bar';
import { NStatCard } from '@neural/angular-ui/stat-card';
import { NMetricCard } from '@neural/angular-ui/metric-card';
import { NDataCard } from '@neural/angular-ui/data-card';
import { NTimeline } from '@neural/angular-ui/timeline';
import { NTable } from '@neural/angular-ui/table';
import { provideNeuralOverlay } from '@neural/angular-ui/overlay';
import { NDialogService } from '@neural/angular-ui/dialog';
import { NDrawerService } from '@neural/angular-ui/drawer';
import { NToastService } from '@neural/angular-ui/toast';
import { NTooltipDirective } from '@neural/angular-ui/tooltip';
import { NPopoverDirective } from '@neural/angular-ui/popover';
import { NDropzone } from '@neural/angular-ui/dropzone';
import { NFileCard } from '@neural/angular-ui/file-card';
import { NImageCompare } from '@neural/angular-ui/image-compare';
import { NMediaPreview } from '@neural/angular-ui/media-preview';
import { NAIPipeline } from '@neural/angular-ui/ai-pipeline';
import { NChat } from '@neural/angular-ui/chat';
import { formatFileSize, type NFileLike } from '@neural/angular-ui/media';
import { NPromptInput } from '@neural/angular-ui/prompt-input';
import { NStreamingText } from '@neural/angular-ui/streaming-text';
import { NVoiceOrb } from '@neural/angular-ui/voice-orb';
```

```html
<n-button variant="primary">Primary</n-button>
<n-icon name="sparkles" />
<n-badge variant="success" [dot]="true">Ready</n-badge>
<n-chip variant="primary" [selected]="true">Angular</n-chip>
<n-input label="Email" placeholder="you@example.com" />
<n-progress [value]="64" label="Processing" [showValue]="true" />
<n-avatar name="Neural Angular" status="online" />

<n-card variant="gradient" [interactive]="true">
  <n-card-header>
    <n-card-title>Project status</n-card-title>
    <n-card-description>Current build health</n-card-description>
  </n-card-header>

  <n-card-content>
    Everything is running correctly.
  </n-card-content>

  <n-card-footer>
    <n-button size="sm">Open</n-button>
  </n-card-footer>
</n-card>

<n-shell>
  <n-sidebar>
    <n-sidebar-section label="Core">
      <n-sidebar-item icon="home" label="Overview" [active]="true" />
    </n-sidebar-section>
  </n-sidebar>

  <div nShellContent>
    <n-toolbar>
      <div nToolbarEnd>
        <n-button size="sm">New</n-button>
      </div>
    </n-toolbar>

    <n-page-header title="Neural Layout" description="First app layout primitives." />

    <n-tabs [(value)]="activeTab">
      <n-tab-item value="overview" label="Overview" />
    </n-tabs>

    <n-command-bar align="between">
      <n-chip selected>Angular 22</n-chip>
      <n-button size="sm">Run</n-button>
    </n-command-bar>
  </div>
</n-shell>

<n-stat-card label="Jobs processed" value="128" icon="activity" trend="up" trendValue="12%" />
<n-metric-card title="Enhancement Queue" value="14" icon="cpu" [progress]="64" />
<n-data-card title="Real-ESRGAN x4" description="Video enhancement model" icon="sparkles" [items]="modelItems" />
<n-timeline>
  <n-timeline-item title="Upload completed" time="10:24" icon="upload" status="success" />
</n-timeline>
<n-table [columns]="jobColumns" [data]="jobs" />

<n-button nTooltip="Run enhancement pipeline">Run</n-button>
<n-button [nPopover]="popoverTpl">More actions</n-button>

<n-dropzone
  accept="image/*,video/*"
  [multiple]="true"
  title="Upload media"
  description="Drop videos or images to start processing."
/>
<n-file-card [file]="file" [previewable]="true" [removable]="true" />
<n-media-preview kind="image" src="assets/demo/frame.jpg" alt="Preview frame" />
<n-image-compare
  beforeSrc="assets/demo/before.jpg"
  afterSrc="assets/demo/after.jpg"
  [(value)]="compareValue"
/>
<n-chat [messages]="messages" />
<n-prompt-input [(value)]="prompt" (submitted)="runPrompt($event)" />
<n-streaming-text [text]="streamedText" state="streaming" />
<n-voice-orb [state]="voiceState" [interactive]="true" />
<n-ai-pipeline [steps]="pipelineSteps" />
```

## Overlays

Register the CDK overlay provider once in application config:

```ts
import { provideNeuralOverlay } from '@neural/angular-ui';

export const appConfig = {
  providers: [provideNeuralOverlay()],
};
```

`NDialogService`, `NDrawerService`, and `NToastService` are root services. `NTooltipDirective` and `NPopoverDirective` are standalone directives.

## Token Prefixes

Public tokens use the stable `--n-*` prefix. Imported `--nn-*` names are compatibility aliases only and should not be treated as the final public API.

## Not Implemented Yet

- Motion provider
- SSR helpers
- Router-aware navigation
- Mobile drawer
- Advanced table sorting/filtering
- Pagination and virtual scroll
- Advanced menu semantics and command palette
- Real upload backend, object URL previews, thumbnail extraction, Canvas, FFmpeg, and WebCodecs
- Backend AI clients, WebSocket/EventSource streaming, Markdown rendering, audio capture, and speech APIs

## Next

- Motion MVP
