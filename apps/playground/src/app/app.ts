import { Component, inject } from '@angular/core';
import {
  NAIPipeline,
  NAvatar,
  NBadge,
  NButton,
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardTitle,
  NChat,
  NChip,
  NCommandBar,
  NDataCard,
  NDialogService,
  NDropzone,
  NDrawerService,
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
  NeuralThemeService,
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
  NToastService,
  NTooltipDirective,
  NPopoverDirective,
  NToolbar,
  NVoiceOrb,
  type NAIMessage,
  type NBadgeVariant,
  type NButtonSize,
  type NButtonVariant,
  type NCardVariant,
  type NDataCardItem,
  type NDropzoneFile,
  type NDropzoneRejectedFile,
  type NFileLike,
  type NIconSize,
  type NSelectOption,
  type NTableColumn,
  type NeuralThemeName,
  type NVoiceOrbState,
} from '@neural/angular-ui';
import type { NAIPipelineStep as NAIPipelineStepModel } from '@neural/angular-ui/ai';
import { DemoDialogComponent } from './demos/overlay-demo/demo-dialog.component';
import { DemoDrawerComponent } from './demos/overlay-demo/demo-drawer.component';

@Component({
  imports: [
    NBadge,
    NButton,
    NCard,
    NCardHeader,
    NCardTitle,
    NCardDescription,
    NCardContent,
    NCardFooter,
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
    NAIPipeline,
    NPageHeader,
    NPromptInput,
    NSelect,
    NTextarea,
    NAvatar,
    NProgress,
    NShell,
    NSidebar,
    NSidebarSection,
    NSidebarItem,
    NSpinner,
    NStatCard,
    NStatusDot,
    NStreamingText,
    NTable,
    NTabs,
    NTabItem,
    NTimeline,
    NTimelineItem,
    NTooltipDirective,
    NPopoverDirective,
    NToolbar,
    NVoiceOrb,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly themeService = inject(NeuralThemeService);
  private readonly dialog = inject(NDialogService);
  private readonly drawer = inject(NDrawerService);
  private readonly toast = inject(NToastService);
  private nextAiMessageId = 5;
  private voiceStateIndex = 0;

  readonly theme = this.themeService.theme;
  readonly themeOptions: NeuralThemeName[] = ['dark', 'light', 'system'];
  readonly buttonVariants: NButtonVariant[] = [
    'primary',
    'secondary',
    'ghost',
    'danger',
  ];
  readonly buttonSizes: NButtonSize[] = ['sm', 'md', 'lg'];
  readonly cardVariants: NCardVariant[] = [
    'default',
    'elevated',
    'outlined',
    'gradient',
  ];
  readonly iconNames = [
    'sparkles',
    'settings',
    'search',
    'cpu',
    'play',
    'upload',
    'trash-2',
  ] as const;
  readonly iconSizes: NIconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  readonly badgeVariants: NBadgeVariant[] = [
    'neutral',
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];
  readonly modelOptions: NSelectOption[] = [
    { label: 'Neural Enhance', value: 'enhance' },
    { label: 'Real-ESRGAN', value: 'real-esrgan' },
    { label: 'Vision Preview', value: 'vision-preview' },
  ];
  projectName = 'Neural Playground';
  selectedModel = 'enhance';
  activeLayoutTab = 'overview';
  prompt = '';
  aiPrompt = '';
  isAiThinking = false;
  removedChips = 0;
  imageCompareValue = 56;
  voiceState: NVoiceOrbState = 'idle';

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

  readonly mediaPreviewSrc =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 960 540%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 x2=%221%22 y1=%220%22 y2=%221%22%3E%3Cstop stop-color=%22%234285f4%22/%3E%3Cstop offset=%22.55%22 stop-color=%22%237b5cf6%22/%3E%3Cstop offset=%221%22 stop-color=%22%23d946ef%22/%3E%3C/linearGradient%3E%3CradialGradient id=%22r%22 cx=%22.5%22 cy=%22.42%22 r=%22.55%22%3E%3Cstop stop-color=%22%23ffffff%22 stop-opacity=%22.48%22/%3E%3Cstop offset=%221%22 stop-color=%22%2306060e%22 stop-opacity=%22.2%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width=%22960%22 height=%22540%22 fill=%22%230a0a15%22/%3E%3Cpath d=%22M0 410 C180 300 260 350 430 250 C610 145 690 190 960 80 L960 540 L0 540Z%22 fill=%22url(%23g)%22 opacity=%22.86%22/%3E%3Ccircle cx=%22490%22 cy=%22220%22 r=%22180%22 fill=%22url(%23r)%22/%3E%3Ctext x=%22480%22 y=%22292%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2242%22 font-weight=%22700%22%3EEnhanced Frame%3C/text%3E%3C/svg%3E';
  readonly compareBeforeSrc =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 960 540%22%3E%3Crect width=%22960%22 height=%22540%22 fill=%22%23141426%22/%3E%3Ccircle cx=%22710%22 cy=%22145%22 r=%2290%22 fill=%22%23fbbc05%22 opacity=%22.65%22/%3E%3Cpath d=%22M0 420 C160 350 280 380 410 300 C570 204 700 250 960 150 L960 540 L0 540Z%22 fill=%22%234285f4%22 opacity=%22.42%22/%3E%3Cpath d=%22M0 460 C240 375 355 405 520 320 C700 230 810 280 960 214 L960 540 L0 540Z%22 fill=%22%237b5cf6%22 opacity=%22.36%22/%3E%3Ctext x=%22480%22 y=%22292%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2238%22 font-weight=%22700%22 opacity=%22.78%22%3EOriginal%3C/text%3E%3C/svg%3E';
  readonly compareAfterSrc =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 960 540%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 x2=%221%22 y1=%221%22 y2=%220%22%3E%3Cstop stop-color=%22%234285f4%22/%3E%3Cstop offset=%22.48%22 stop-color=%22%237b5cf6%22/%3E%3Cstop offset=%221%22 stop-color=%22%23d946ef%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22960%22 height=%22540%22 fill=%22%2306060e%22/%3E%3Ccircle cx=%22710%22 cy=%22145%22 r=%22105%22 fill=%22%23fbbc05%22 opacity=%22.9%22/%3E%3Cpath d=%22M0 410 C170 300 290 340 430 250 C590 145 710 190 960 92 L960 540 L0 540Z%22 fill=%22url(%23g)%22 opacity=%22.9%22/%3E%3Cpath d=%22M0 470 C240 360 390 405 560 300 C730 198 825 250 960 190 L960 540 L0 540Z%22 fill=%22%23ffffff%22 opacity=%22.18%22/%3E%3Ctext x=%22480%22 y=%22292%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2238%22 font-weight=%22700%22%3EEnhanced%3C/text%3E%3C/svg%3E';

  readonly modelItems: NDataCardItem[] = [
    { label: 'Type', value: 'Upscale', icon: 'sparkles' },
    { label: 'VRAM', value: '4.2 GB', icon: 'cpu', status: 'info' },
    { label: 'Status', value: 'Installed', icon: 'circle-check', status: 'success' },
  ];

  readonly pipelineItems: NDataCardItem[] = [
    { label: 'Source', value: 'city-night.mp4', icon: 'file-text' },
    { label: 'Model', value: 'Real-ESRGAN', icon: 'sparkles', status: 'info' },
    { label: 'Queue', value: '14 active', icon: 'activity', status: 'warning' },
  ];

  readonly jobColumns: NTableColumn[] = [
    { key: 'name', label: 'Job' },
    { key: 'model', label: 'Model' },
    { key: 'status', label: 'Status' },
    { key: 'progress', label: 'Progress', align: 'end' },
  ];

  readonly jobs = [
    { name: 'city-night.mp4', model: 'Real-ESRGAN', status: 'Running', progress: '68%' },
    { name: 'portrait.mov', model: 'RIFE', status: 'Queued', progress: '0%' },
    { name: 'old-footage.mp4', model: 'DenoiseNet', status: 'Done', progress: '100%' },
  ];
  readonly streamingDemoText =
    'Analyzing frames, estimating noise profile and preparing enhancement pipeline...';
  readonly streamingPatternText = `Basandome en el analisis de los datos del Q3, he identificado tres
patrones clave en el comportamiento de los usuarios:

-> El 68% de las interacciones ocurren entre las 9AM y 2PM
-> Las consultas de codigo aumentaron un 42% mes a mes
-> El tiempo promedio de respuesta se redujo de 2.1s a 0.8s

Esta tendencia sugiere que los usuarios prefieren sesiones de trabajo intensivas con el modelo...`;
  readonly voiceStates: NVoiceOrbState[] = [
    'idle',
    'listening',
    'thinking',
    'speaking',
    'muted',
    'error',
  ];
  readonly voiceStateLabels: Record<NVoiceOrbState, string> = {
    idle: 'Idle',
    listening: 'Escuchar',
    thinking: 'Procesar',
    speaking: 'Responder',
    muted: 'Muted',
    error: 'Error',
  };
  readonly aiPatternMessages: NAIMessage[] = [
    {
      id: 'pattern-1',
      role: 'assistant',
      content:
        '¡Hola! Soy tu asistente Neural. ¿En qué puedo ayudarte hoy? Puedo analizar datos, generar código o responder preguntas complejas.',
      author: 'Neural AI',
      avatar: 'N',
      timestamp: '09:41',
    },
    {
      id: 'pattern-2',
      role: 'user',
      content: 'Necesito que analices los datos de ventas del último trimestre.',
      author: '',
    },
    {
      id: 'pattern-3',
      role: 'assistant',
      content: `Analicé los datos del Q3:

→ Ingresos: $2.4M +18%
→ Unidades: 12,450 +9%
→ Ticket: $192.6 +8%`,
      author: 'Neural AI',
      avatar: 'N',
      timestamp: '09:42',
    },
  ];
  aiMessages: NAIMessage[] = [
    {
      id: '1',
      role: 'system',
      content: 'Neural assistant is ready.',
      timestamp: '10:20',
      status: 'success',
    },
    {
      id: '2',
      role: 'user',
      content: 'Enhance this video and reduce noise.',
      author: 'Anderson',
      timestamp: '10:21',
    },
    {
      id: '3',
      role: 'assistant',
      content:
        'I can enhance the video, reduce noise and preserve facial details.',
      author: 'Neural',
      timestamp: '10:21',
      status: 'streaming',
    },
    {
      id: '4',
      role: 'tool',
      content: 'Selected model: Real-ESRGAN x4 + DenoiseNet',
      author: 'Pipeline',
      timestamp: '10:22',
    },
  ];
  pipelineSteps: NAIPipelineStepModel[] = [
    {
      title: 'Upload',
      description: 'Media file received',
      icon: 'upload',
      status: 'success',
      progress: 100,
    },
    {
      title: 'Analyze',
      description: 'Detecting resolution, noise and motion',
      icon: 'search',
      status: 'success',
      progress: 100,
    },
    {
      title: 'Enhance',
      description: 'Running AI enhancement model',
      icon: 'sparkles',
      status: 'running',
      progress: 68,
      metadata: 'Real-ESRGAN x4',
    },
    {
      title: 'Export',
      description: 'Waiting for enhanced frames',
      icon: 'file-text',
      status: 'pending',
    },
  ];

  readonly surfaces = [
    ['Canvas', '--n-bg-canvas'],
    ['Base', '--n-bg-base'],
    ['Surface 1', '--n-surface-1'],
    ['Surface 2', '--n-surface-2'],
    ['Surface 3', '--n-surface-3'],
    ['Surface 4', '--n-surface-4'],
  ] as const;

  readonly colors = [
    ['Primary', '--n-color-primary'],
    ['Secondary', '--n-color-secondary'],
    ['Tertiary', '--n-color-tertiary'],
    ['Success', '--n-color-success'],
    ['Warning', '--n-color-warning'],
    ['Danger', '--n-color-danger'],
    ['Info', '--n-color-info'],
  ] as const;

  readonly textLevels = [
    ['Text 1', '--n-text-1'],
    ['Text 2', '--n-text-2'],
    ['Text 3', '--n-text-3'],
    ['Text 4', '--n-text-4'],
  ] as const;

  readonly borders = [
    ['Border 0', '--n-border-0'],
    ['Border 1', '--n-border-1'],
    ['Border 2', '--n-border-2'],
    ['Border 3', '--n-border-3'],
  ] as const;

  readonly radii = [
    ['XS', '--n-radius-xs'],
    ['SM', '--n-radius-sm'],
    ['MD', '--n-radius-md'],
    ['LG', '--n-radius-lg'],
    ['XL', '--n-radius-xl'],
    ['Full', '--n-radius-full'],
  ] as const;

  readonly gradients = [
    ['Gemini', '--n-gradient-gemini'],
    ['Primary Secondary', '--n-gradient-primary-secondary'],
    ['Secondary Tertiary', '--n-gradient-secondary-tertiary'],
    ['Surface', '--n-gradient-surface-strong'],
  ] as const;

  readonly elevations = [
    ['Elevation 1', '--n-elevation-1'],
    ['Elevation 2', '--n-elevation-2'],
    ['Elevation 3', '--n-elevation-3'],
  ] as const;

  readonly glows = [
    ['Primary', '--n-glow-primary-md'],
    ['Secondary', '--n-glow-secondary-md'],
    ['Tertiary', '--n-glow-tertiary-md'],
    ['Gradient', '--n-glow-gradient-sm'],
  ] as const;

  readonly spacing = [
    ['1', '--n-space-1'],
    ['2', '--n-space-2'],
    ['4', '--n-space-4'],
    ['8', '--n-space-8'],
    ['12', '--n-space-12'],
    ['16', '--n-space-16'],
  ] as const;

  setTheme(theme: NeuralThemeName): void {
    this.themeService.setTheme(theme);
  }

  handleChipRemoved(): void {
    this.removedChips += 1;
  }

  openDialog(): void {
    this.dialog.open(DemoDialogComponent, {
      title: 'Create project',
      description: 'Configure a new Neural Angular workflow.',
      size: 'md',
      data: { mode: 'create' },
    });
  }

  openDrawer(): void {
    this.drawer.open(DemoDrawerComponent, {
      title: 'Settings',
      description: 'Adjust Neural Angular preferences.',
      position: 'right',
      size: 'md',
    });
  }

  showSuccessToast(): void {
    this.toast.success('Project created successfully.', {
      title: 'Success',
      icon: 'circle-check',
    });
  }

  showDangerToast(): void {
    this.toast.danger('Export failed. Check the render queue.', {
      title: 'Error',
      duration: 6000,
    });
  }

  showInfoToast(): void {
    this.toast.info('Pipeline preview is ready.', {
      title: 'Info',
    });
  }

  onMediaFilesSelected(files: NDropzoneFile[]): void {
    const mappedFiles = files.map((file, index) => ({
      id: `local-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : undefined,
      status: 'idle' as const,
      progress: 0,
    }));

    this.selectedFiles = [...mappedFiles, ...this.selectedFiles];
    this.toast.success(`${files.length} file(s) selected`, {
      title: 'Upload ready',
      icon: 'upload',
    });
  }

  onMediaFilesRejected(files: NDropzoneRejectedFile[]): void {
    this.toast.danger(`${files.length} file(s) rejected`, {
      title: 'Invalid files',
      icon: 'alert-circle',
    });
  }

  removeDemoFile(file: NFileLike): void {
    this.selectedFiles = this.selectedFiles.filter((item) => item !== file);
    this.toast.info(`${file.name} removed`, {
      title: 'File removed',
    });
  }

  previewDemoFile(file: NFileLike): void {
    this.toast.info(`Preview requested for ${file.name}`, {
      title: 'Preview',
      icon: 'eye',
    });
  }

  downloadDemoFile(file: NFileLike): void {
    this.toast.info(`Download requested for ${file.name}`, {
      title: 'Download',
      icon: 'download',
    });
  }

  retryDemoFile(file: NFileLike): void {
    this.selectedFiles = this.selectedFiles.map((item) =>
      item === file
        ? { ...item, status: 'processing', progress: 34, error: undefined }
        : item,
    );
    this.toast.info(`Retrying ${file.name}`, {
      title: 'Retry queued',
      icon: 'rotate-ccw',
    });
  }

  resetMediaDemo(): void {
    this.imageCompareValue = 56;
    this.toast.info('Media workflow reset.', {
      title: 'Reset',
    });
  }

  startMediaProcessing(): void {
    this.toast.success('Processing workflow started.', {
      title: 'Media pipeline',
      icon: 'play',
    });
  }

  onPromptSubmitted(prompt: string): void {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    const userMessage: NAIMessage = {
      id: `${this.nextAiMessageId++}`,
      role: 'user',
      content: trimmedPrompt,
      author: 'Anderson',
      timestamp: 'Now',
    };
    const assistantMessage: NAIMessage = {
      id: `${this.nextAiMessageId++}`,
      role: 'assistant',
      content: `Prompt queued: ${trimmedPrompt}`,
      author: 'Neural',
      timestamp: 'Now',
      status: 'streaming',
    };

    this.aiMessages = [...this.aiMessages, userMessage, assistantMessage];
    this.aiPrompt = '';
    this.isAiThinking = false;

    this.toast.info('Prompt submitted', {
      title: 'Neural',
      icon: 'sparkles',
    });
  }

  cycleVoiceState(): void {
    this.voiceStateIndex = (this.voiceStateIndex + 1) % this.voiceStates.length;
    this.voiceState = this.voiceStates[this.voiceStateIndex];
  }

  setVoiceState(state: NVoiceOrbState): void {
    this.voiceState = state;
    this.voiceStateIndex = this.voiceStates.indexOf(state);
  }

  voiceStateLabel(state: NVoiceOrbState): string {
    return this.voiceStateLabels[state];
  }
}
