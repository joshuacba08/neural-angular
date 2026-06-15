import { Component, inject } from '@angular/core';
import {
  NAvatar,
  NBadge,
  NButton,
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardTitle,
  NChip,
  NCommandBar,
  NDataCard,
  NDialogService,
  NDrawerService,
  NEmptyState,
  NIcon,
  NInput,
  NMetricCard,
  NPageHeader,
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
  type NBadgeVariant,
  type NButtonSize,
  type NButtonVariant,
  type NCardVariant,
  type NDataCardItem,
  type NIconSize,
  type NSelectOption,
  type NTableColumn,
  type NeuralThemeName,
} from '@neural/angular-ui';
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
    NChip,
    NCommandBar,
    NDataCard,
    NEmptyState,
    NIcon,
    NInput,
    NMetricCard,
    NPageHeader,
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
    NTable,
    NTabs,
    NTabItem,
    NTimeline,
    NTimelineItem,
    NTooltipDirective,
    NPopoverDirective,
    NToolbar,
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
  removedChips = 0;

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
}
