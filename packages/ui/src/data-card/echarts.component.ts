import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  inject,
  input,
  effect,
  DestroyRef,
} from '@angular/core';
import { NeuralThemeService } from '../theme/theme.service.js';

@Component({
  selector: 'n-echarts',
  standalone: true,
  template: `
    <div #chartContainer class="n-echarts__container" [style.height]="height()"></div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .n-echarts__container {
        width: 100%;
        min-width: 100px;
      }
    `,
  ],
})
export class NECharts {
  readonly options = input<any>({});
  readonly height = input<string>('200px');
  readonly theme = input<'light' | 'dark' | undefined>(undefined);

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLDivElement>;

  private readonly themeService = inject(NeuralThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private chartInstance: any = null;
  private resizeObserver: ResizeObserver | null = null;
  private echartsModule: any = null;

  constructor() {
    afterNextRender(async () => {
      this.echartsModule = await import('echarts');
      this.initChart();

      effect(() => {
        const opt = this.options();
        if (this.chartInstance && opt) {
          this.chartInstance.setOption(opt, true);
        }
      });

      effect(() => {
        this.themeService.theme();
        this.theme();
        if (this.chartInstance) {
          this.reinitChart();
        }
      });

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          this.chartInstance?.resize();
        });
        this.resizeObserver.observe(this.chartContainer.nativeElement);
      }

      this.destroyRef.onDestroy(() => {
        this.resizeObserver?.disconnect();
        this.chartInstance?.dispose();
      });
    });
  }

  private getResolvedTheme(): 'light' | 'dark' {
    const inputTheme = this.theme();
    if (inputTheme) {
      return inputTheme;
    }

    const currentTheme = this.themeService.theme();
    if (currentTheme !== 'system') {
      return currentTheme as 'light' | 'dark';
    }

    const root = this.document.documentElement;
    if (root.classList.contains('n-theme-light')) {
      return 'light';
    }
    return 'dark';
  }

  private initChart(): void {
    if (!this.echartsModule || !this.chartContainer) return;
    const resolvedTheme = this.getResolvedTheme();

    this.chartInstance = this.echartsModule.init(
      this.chartContainer.nativeElement,
      resolvedTheme
    );

    const opt = this.options();
    if (opt) {
      this.chartInstance.setOption(opt, true);
    }
  }

  private reinitChart(): void {
    if (!this.chartInstance || !this.echartsModule) return;
    this.chartInstance.dispose();
    this.initChart();
  }
}
