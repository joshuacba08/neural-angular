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
| Input | `NInput` or Material input theme | `components.html` | Medium | Forms | Text input, search, textarea, select; should align with Reactive Forms |
| Toggle | `NToggle` | `components.html` | Medium | Forms | Includes switch and toggle button patterns |
| Checkbox | `NCheckbox` or Material checkbox theme | `components.html` | Medium | Forms | Prefer Material/CDK accessibility |
| Radio | `NRadio` or Material radio theme | `components.html` | Medium | Forms | Prefer Material/CDK accessibility |
| Advanced form controls | Material themed controls | `components.html` | Low | Forms | Float label, OTP, autocomplete, multiselect, listbox, rating, knob |

## Navigation Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Tabs | `NTabs` or Material tabs theme | `components.html` | Medium | Navigation | Badge support and active states |
| App bar | `NToolbar` | `components.html`, app prototypes | Medium | Navigation | Top-level actions and title layout |
| Sidebar | `NSidebar` | multiple files | Medium | Navigation | Appears in design system and app prototypes |
| Bottom navigation | `NBottomNav` | `components.html` | Low | Navigation | Useful for PWA/mobile shells |
| Breadcrumb | `NBreadcrumb` | `components.html` | Low | Navigation | Later navigation helper |

## Feedback Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Progress | `NProgress` | `components.html`, `ai-patterns.html` | Medium | Feedback | Linear, circular, orbital, indeterminate |
| Spinner | `NSpinner` | `components.html` | Medium | Feedback | Dot spinner and loading indicators |
| Skeleton | `NSkeleton` | `components.html` | Medium | Feedback | Loading placeholders |
| Status dot | `NStatusDot` | `components.html` | Medium | Feedback | Pulse and inline status states |
| Alert / message | `NMessage` | `components.html` | Low | Feedback | Success, info, warning, error variants |
| Toast | `NToast` | `components.html`, app prototypes | Low | Feedback | Needs overlay/a11y design |

## Overlay Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Dialog | `NDialog` or Material dialog theme | `components.html` | Medium | Overlay | Confirm and form dialog patterns |
| Drawer | `NDrawer` | `components.html` | Low | Overlay | Should use CDK overlay/focus management |
| Popover | `NPopover` | `components.html` | Low | Overlay | Needs CDK positioning |
| Tooltip | `NTooltip` or Material tooltip theme | `components.html` | Low | Overlay | Prefer accessible tooltip behavior |
| Command palette | `NCommandPalette` | `components.html` | Low | Overlay | Useful, but not first MVP |

## Data Display Components

| Candidate | Suggested Angular Name | Source file | Priority | Category | Notes |
|---|---|---|---|---|---|
| Stat card | `NStatCard` | `components.html`, `data-patterns.html` | Medium | Data display | KPI values, trend indicators |
| Metric card | `NMetricCard` | `components.html` | Medium | Data display | Dashboard metric pattern |
| Data card | `NDataCard` | `components.html` | Medium | Data display | Bar/donut/GPU visual patterns |
| Table | `NTable` or Material table theme | `components.html`, `data-patterns.html` | Medium | Data display | Sortable rows, states, paginator |
| Timeline | `NTimeline` | `components.html` | Low | Data display | Activity feed pattern |
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
| Before / after compare | `NImageCompare` | `components.html` | Experimental | Media | Drag behavior and pointer events |
| Carousel / gallery | `NCarousel`, `NGalleria` | `components.html` | Low | Media | Later phase |
| Dropzone | `NDropzone` | `components.html`, `Oroya Video.html` | Medium | Media | Useful but needs forms/file handling design |

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
| Shell | `NShell` | `Oroya App.html`, `Oroya Video.html`, shared nav demos | Medium | Layout | Sidebar + topbar + content architecture |
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
