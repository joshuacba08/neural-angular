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
  NStatCard,
  NStatusDot,
  NTable,
  NTabItem,
  NTabs,
  NTextarea,
  NToolbar,
  NeuralThemeService,
  type NSelectOption,
  type NTableColumn,
  type NeuralThemeName,
} from '@neural/angular-ui';

@Component({
  imports: [
    NAvatar,
    NBadge,
    NButton,
    NCard,
    NCardContent,
    NCardDescription,
    NCardFooter,
    NCardHeader,
    NCardTitle,
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
    NStatCard,
    NStatusDot,
    NTable,
    NTabItem,
    NTabs,
    NTextarea,
    NToolbar,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly themeService = inject(NeuralThemeService);

  readonly theme = this.themeService.theme;
  readonly themeOptions: NeuralThemeName[] = ['dark', 'light', 'system'];
  readonly modelOptions: NSelectOption[] = [
    { label: 'Neural Enhance', value: 'enhance' },
    { label: 'Real-ESRGAN', value: 'real-esrgan' },
    { label: 'Vision Preview', value: 'vision-preview' },
  ];
  readonly jobColumns: NTableColumn[] = [
    { key: 'name', label: 'Job' },
    { key: 'model', label: 'Model' },
    { key: 'status', label: 'Status' },
    { key: 'progress', label: 'Progress', align: 'end' },
  ];
  readonly jobs = [
    {
      name: 'city-night.mp4',
      model: 'Real-ESRGAN',
      status: 'Running',
      progress: '68%',
    },
    {
      name: 'portrait.mov',
      model: 'RIFE',
      status: 'Queued',
      progress: '0%',
    },
    {
      name: 'old-footage.mp4',
      model: 'DenoiseNet',
      status: 'Done',
      progress: '100%',
    },
  ];

  activeTab = 'overview';
  selectedModel = 'enhance';

  setTheme(theme: NeuralThemeName): void {
    this.themeService.setTheme(theme);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setSelectedModel(model: string): void {
    this.selectedModel = model;
  }
}
