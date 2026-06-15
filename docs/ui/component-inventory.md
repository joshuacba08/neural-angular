# Component Inventory

## Core UI Candidates

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Theme provider | `NThemeProvider` | `nn-tokens.css`, `Neural Angular.html` | High | Foundation | Apply theme class, token CSS, dark mode strategy |
| Tokens | `NTokens` or CSS entry | `nn-tokens.css` | High | Foundation | Token foundation should come before components |
| Button | `NButton` | `components.html` | Complete | Core UI | Filled, gradient, ghost, sizes, loading, full width |
| Card | `NCard` | `components.html` | Complete | Core UI | Surfaces, gradient border, hover/elevation pattern |
| Icon | `NIcon` | all HTML files | Complete | Core UI | Lucide dynamic icon integration with curated provider |
| Badge | `NBadge` | `components.html`, `data-patterns.html` | Complete | Core UI | Status pills, notification dots, semantic badges |
| Chip | `NChip` | `components.html` | Complete | Core UI | Filter chips, inline chips, removable action |

## Form Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Input | `NInput` | `components.html` | Complete | Forms | Native input with label, hint, error, and value output |
| Textarea | `NTextarea` | `components.html` | Complete | Forms | Native textarea with resize control |
| Select | `NSelect` | `components.html` | Complete | Forms | Native select; custom dropdown remains out of scope |
| Toggle | `NToggle` | `components.html` | Medium | Forms | Includes switch and toggle button patterns |
| Checkbox | `NCheckbox` or Material checkbox theme | `components.html` | Medium | Forms | Prefer Material/CDK accessibility |
| Radio | `NRadio` or Material radio theme | `components.html` | Medium | Forms | Prefer Material/CDK accessibility |
| Advanced form controls | Material themed controls | `components.html` | Low | Forms | Float label, OTP, autocomplete, multiselect, listbox, rating, knob |

## Navigation Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Tabs | `NTabs` | `components.html` | Complete | Navigation | Simple local-state tabs with badge support and active states |
| App bar | `NToolbar` | `components.html`, app prototypes | Complete | Navigation | Top-level projected actions and title layout |
| Sidebar | `NSidebar` | multiple files | Complete | Navigation | Brand, sections, items, optional footer, no router coupling |
| Bottom navigation | `NBottomNav` | `components.html` | Low | Navigation | Useful for PWA/mobile shells |
| Breadcrumb | `NBreadcrumb` | `components.html` | Low | Navigation | Later navigation helper |

## Feedback Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Progress | `NProgress` | `components.html`, `ai-patterns.html` | Complete | Feedback | Linear determinate and CSS-only indeterminate progress |
| Spinner | `NSpinner` | `components.html` | Complete | Feedback | CSS-only loading indicator |
| Skeleton | `NSkeleton` | `components.html` | Medium | Feedback | Loading placeholders |
| Status dot | `NStatusDot` | `components.html` | Complete | Feedback | Pulse and inline status states |
| Alert / message | `NMessage` | `components.html` | Low | Feedback | Success, info, warning, error variants |
| Toast | `NToast` | `components.html`, app prototypes | Complete | Feedback | CDK overlay toast service with semantic variants |

## Overlay Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Dialog | `NDialog` | `components.html` | Complete | Overlay | CDK overlay, portal content, ESC/backdrop close, focus trap |
| Drawer | `NDrawer` | `components.html` | Complete | Overlay | CDK overlay side sheet with focus trap |
| Popover | `NPopover` | `components.html` | Complete | Overlay | CDK positioned string/template popover |
| Tooltip | `NTooltip` | `components.html` | Complete | Overlay | CDK positioned text tooltip for hover/focus |
| Command palette | `NCommandPalette` | `components.html` | Low | Overlay | Useful, but not first MVP |

## Data Display Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Stat card | `NStatCard` | `components.html`, `data-patterns.html` | Complete | Data display | KPI values, trend indicators |
| Avatar | `NAvatar` | `components.html` | Complete | Data display | Initials/image avatar with optional status |
| Empty state | `NEmptyState` | `components.html` | Complete | Data display | Icon, title, description, and projected actions |
| Metric card | `NMetricCard` | `components.html` | Complete | Data display | Dashboard metric pattern with optional progress |
| Data card | `NDataCard` | `components.html` | Complete | Data display | Entity metadata card with label/value rows |
| Table | `NTable` | `components.html`, `data-patterns.html` | Complete | Data display | Semantic table MVP without advanced grid behavior |
| Timeline | `NTimeline` | `components.html` | Complete | Data display | Activity feed and processing pipeline pattern |
| Calendar | `NCalendar` or Material date/calendar theme | `data-patterns.html` | Low | Data display | Later phase |
| Chart | `NChart` | `data-patterns.html` | Experimental | Data display | Requires chart strategy, Canvas/SVG decisions |

## AI Pattern Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Voice orb | `NVoiceOrb` | `ai-patterns.html` | Experimental | AI pattern | Animated states and voice UI |
| Waveform | `NWaveform` | `ai-patterns.html` | Experimental | AI pattern | Canvas/audio stream concerns |
| Chat interface | `NChat` | `ai-patterns.html` | Medium | AI pattern | Could compose bubbles, prompt input, streaming |
| Prompt input | `NPromptInput` | `ai-patterns.html` | Medium | AI pattern | Strong future candidate |
| Neural canvas | `NNeuralCanvas` | `ai-patterns.html` | Experimental | AI pattern | Canvas/browser-only rendering |
| Streaming text | `NStreamingText` | `ai-patterns.html` | Experimental | AI pattern | Timed text updates and hydration concerns |
| AI pipeline | `NAIPipeline` | `ai-patterns.html` | Experimental | AI pattern | Animated status graph |
| GPU widget | `NGpuWidget` | `ai-patterns.html` | Low | AI pattern | Product/dashboard adjacent |

## Media / Video Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Before / after compare | `NImageCompare` | `components.html` | Complete | Media | Native range-based before/after image comparison |
| File card | `NFileCard` | `components.html`, `Oroya Video.html` | Complete | Media | File metadata, status, progress, and emitted actions |
| Media preview | `NMediaPreview` | `components.html`, `Oroya Video.html` | Complete | Media | URL-based image/video/audio/file preview fallback |
| Carousel / gallery | `NCarousel`, `NGalleria` | `components.html` | Low | Media | Later phase |
| Dropzone | `NDropzone` | `components.html`, `Oroya Video.html` | Complete | Media | Native file input and drag/drop selection without upload backend |

## Oroya Video Specific Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| OVSplitCompare | `OVSplitCompare` | `Oroya Components.html` | Product-specific | Oroya Video | Keep out of base UI |
| OVVideoPreview | `OVVideoPreview` | `Oroya Components.html` | Product-specific | Oroya Video | Product/media preview |
| OVProcessingPipeline | `OVProcessingPipeline` | `Oroya Components.html` | Product-specific | Oroya Video | Product workflow visualization |
| OVGpuMonitor | `OVGpuMonitor` | `Oroya Components.html` | Product-specific | Oroya Video | Product dashboard widget |
| OVModelCard | `OVModelCard` | `Oroya Components.html` | Product-specific | Oroya Video | Product model selector/card |
| OVJobProgress | `OVJobProgress` | `Oroya Components.html` | Product-specific | Oroya Video | Product processing status |

## App Shell / Layout Patterns

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Shell | `NShell` | `Oroya App.html`, `Oroya Video.html`, shared nav demos | Complete | Layout | Sidebar + toolbar + content architecture |
| Page header | `NPageHeader` | app prototypes | Complete | Layout | Eyebrow, title, description, icon, and actions |
| Command bar | `NCommandBar` | app prototypes | Complete | Layout | Horizontal quick action and filter strip |
| Split view | `NSplitView` | `components.html` | Low | Layout | Horizontal and three-pane layouts |
| Inspector panel | `NInspector` | `components.html` | Low | Layout | Collapsible sections and tool panels |
| Dashboard layout | app-level pattern | `Oroya App.html` | Low | Layout | Reference for examples, not base component initially |

## Experimental / Visual FX

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Glow card | `NGlowCard` or card variant | `components.html` | Experimental | Visual FX | Could be a variant, not a separate first component |
| Gradient text | CSS utility | `components.html` | Low | Visual FX | Token utility candidate |
| Animated gradient ring | `NGradientRing` | `components.html` | Experimental | Visual FX | Animation and reduced-motion handling required |
| Neural graph effects | `NNeuralCanvas` | `ai-patterns.html`, `Oroya App.html` | Experimental | Visual FX | Canvas/browser-only |
