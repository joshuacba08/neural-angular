import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'n-sparkline',
  standalone: true,
  template: `
    <div class="n-sparkline">
      <svg
        width="100%"
        height="26"
        viewBox="0 0 160 26"
        preserveAspectRatio="none"
        style="display: block;"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="n-sp-bv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#4285F4" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#7B5CF6" />
          </linearGradient>
          <linearGradient id="n-sp-vp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7B5CF6" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#D946EF" />
          </linearGradient>
          <linearGradient id="n-sp-gg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#4F8EFF" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#F43F5E" />
          </linearGradient>
        </defs>

        @if (pointsString()) {
          <polyline
            [attr.points]="pointsString()"
            fill="none"
            [attr.stroke]="strokeUrl()"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }
      </svg>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-sparkline {
        width: 100%;
        height: 26px;
      }
    `,
  ],
})
export class NSparkline {
  readonly points = input<readonly number[]>([]);
  readonly variant = input<'primary' | 'accent' | 'gemini'>('primary');

  readonly pointsString = computed(() => {
    const pts = this.points();
    const n = pts.length;
    if (n < 2) return '';

    const max = Math.max(...pts);
    const min = Math.min(...pts);
    const range = max - min;
    const svgWidth = 160;
    const svgHeight = 26;
    const padding = 4;
    const drawHeight = svgHeight - 2 * padding; // 18

    return pts
      .map((val, i) => {
        const x = i * (svgWidth / (n - 1));
        const y = range > 0
          ? (svgHeight - padding - ((val - min) / range) * drawHeight)
          : (svgHeight / 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  readonly strokeUrl = computed(() => {
    switch (this.variant()) {
      case 'accent':
        return 'url(#n-sp-vp)';
      case 'gemini':
        return 'url(#n-sp-gg)';
      default:
        return 'url(#n-sp-bv)';
    }
  });
}
