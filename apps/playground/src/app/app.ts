import { Component, inject } from '@angular/core';
import {
  NAvatar,
  NDataCard,
  NBarChart,
  NDonutChart,
  NSparkline,
  NECharts,
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
  NGlowCard,
  NGradientRing,
  NPopoverDirective,
  NTooltipDirective,
  NSpeedDial,
  NSpeedDialItem,
  NBreadcrumb,
  NStepper,
  NStep,
  type NBreadcrumbItem,
  type NSelectOption,
  type NTableColumn,
  type NeuralThemeName,
  type NDonutSegment,
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
    NDataCard,
    NBarChart,
    NDonutChart,
    NSparkline,
    NECharts,
    NGlowCard,
    NGradientRing,
    NPopoverDirective,
    NTooltipDirective,
    NSpeedDial,
    NSpeedDialItem,
    NBreadcrumb,
    NStepper,
    NStep,
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

  readonly gpuHistory = [55, 70, 100, 72, 60, 100, 85, 68, 100, 80, 58, 100, 75, 100, 85, 100];
  readonly gpuLabels = { start: '−2 min', end: 'now' };
  readonly vramSegments: NDonutSegment[] = [
    { label: 'Model Active', value: 78, displayValue: '9.4 GB', color: 'blue-violet' },
    { label: 'Overhead', value: 10, displayValue: '1.2 GB', color: 'violet-pink' },
    { label: 'Free', value: 12, displayValue: '1.4 GB', color: 'neutral' },
  ];
  readonly sparklinePoints = [22, 18, 20, 15, 16, 10, 8, 12, 6];

  readonly echartsOptions = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 15, 28, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      textStyle: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 11 }
    },
    grid: {
      top: '15px',
      bottom: '5px',
      left: '0px',
      right: '0px',
      containLabel: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        name: 'VRAM Usage (GB)',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#7B5CF6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(123, 92, 246, 0.4)' },
              { offset: 1, color: 'rgba(123, 92, 246, 0.0)' }
            ]
          }
        },
        data: [4.2, 5.8, 6.1, 5.4, 7.8, 8.4, 9.4, 8.9, 9.2, 9.4]
      }
    ]
  };

  activeTab = 'overview';
  selectedModel = 'enhance';

  readonly breadcrumbChevronItems: NBreadcrumbItem[] = [
    { icon: 'home', url: '#' },
    { label: 'Projects', url: '#' },
    { label: 'Anime Collection', url: '#' },
    { label: 'Episode 12' },
  ];
  readonly breadcrumbSlashItems: NBreadcrumbItem[] = [
    { label: 'Dashboard', url: '#' },
    { label: 'Queue', url: '#' },
    { label: 'Processing' },
  ];
  currentStep = 2;

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSpeedDialAction(action: string): void {
    alert(`${action} clicked!`);
  }

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
