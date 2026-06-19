import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'n-bar-chart',
  standalone: true,
  template: `
    <div class="n-bar-chart">
      <svg
        width="100%"
        [attr.height]="height()"
        viewBox="0 0 320 64"
        preserveAspectRatio="none"
        style="display: block; overflow: visible;"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="n-dc-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4285F4" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#4285F4" stop-opacity="0.2" />
          </linearGradient>
        </defs>

        @if (gridLines()) {
          <line x1="0" y1="16" x2="320" y2="16" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
          <line x1="0" y1="32" x2="320" y2="32" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
          <line x1="0" y1="48" x2="320" y2="48" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
        }

        @for (bar of computedBars(); track $index) {
          <rect
            [attr.x]="bar.x"
            [attr.y]="bar.y"
            [attr.width]="bar.width"
            [attr.height]="bar.height"
            [attr.rx]="bar.rx"
            fill="url(#n-dc-b)"
            [attr.opacity]="bar.opacity"
          />
        }
      </svg>

      @if (labels(); as range) {
        <div class="n-bar-chart__labels">
          <span class="n-bar-chart__label-item">{{ range.start }}</span>
          <span class="n-bar-chart__label-item">{{ range.end }}</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-bar-chart {
        display: grid;
        width: 100%;
      }

      .n-bar-chart__labels {
        display: flex;
        justify-content: space-between;
        margin-top: var(--n-space-2, 8px);
      }

      .n-bar-chart__label-item {
        color: var(--n-text-4, rgba(255, 255, 255, 0.16));
        font-family: var(--n-font-mono, monospace);
        font-size: var(--n-font-size-10, 10px);
        font-weight: var(--n-font-weight-medium, 500);
        line-height: 1.2;
      }
    `,
  ],
})
export class NBarChart {
  readonly data = input<readonly number[]>([]);
  readonly height = input<number>(64);
  readonly gridLines = input<boolean>(true);
  readonly labels = input<{ start: string; end: string } | undefined>(undefined);

  readonly computedBars = computed(() => {
    const vals = this.data();
    const n = vals.length;
    const svgWidth = 320;
    const svgHeight = 64;

    if (n === 0) return [];

    const step = svgWidth / n;
    const barWidth = Math.max(2, step * 0.8);
    const rx = Math.min(3, barWidth / 4);

    return vals.map((val, i) => {
      const heightVal = Math.max(2, (val / 100) * svgHeight);
      const y = svgHeight - heightVal;
      const x = i * step + (step - barWidth) / 2;

      const opacity = n > 1 ? 0.55 + 0.45 * (i / (n - 1)) : 1.0;

      return {
        x,
        y,
        width: barWidth,
        height: heightVal,
        rx,
        opacity,
      };
    });
  });
}
