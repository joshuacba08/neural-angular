import { Component, computed, input } from '@angular/core';
import type { NDonutSegment } from './data-card.types.js';

@Component({
  selector: 'n-donut-chart',
  standalone: true,
  template: `
    <div class="n-donut-chart">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style="flex-shrink: 0;"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="n-dn-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4285F4" />
            <stop offset="100%" stop-color="#7B5CF6" />
          </linearGradient>
          <linearGradient id="n-dn-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7B5CF6" />
            <stop offset="100%" stop-color="#D946EF" />
          </linearGradient>
        </defs>

        <!-- Underlay / Track -->
        <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="14" />

        <!-- Segment circles -->
        @for (seg of computedSegments(); track seg.label) {
          <circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            [attr.stroke]="seg.strokeColor"
            stroke-width="14"
            stroke-linecap="round"
            stroke-dasharray="276.5"
            [attr.stroke-dashoffset]="seg.strokeDashoffset"
            [attr.transform]="seg.transform"
            [attr.opacity]="seg.strokeOpacity"
          />
        }

        <!-- Center labels -->
        @if (centerValue()) {
          <text
            x="60"
            y="56"
            text-anchor="middle"
            font-family="'JetBrains Mono', monospace"
            font-size="14"
            font-weight="700"
            fill="rgba(255, 255, 255, 0.88)"
          >
            {{ centerValue() }}
          </text>
        }
        @if (centerLabel()) {
          <text
            x="60"
            y="69"
            text-anchor="middle"
            font-family="'JetBrains Mono', monospace"
            font-size="8"
            fill="rgba(255, 255, 255, 0.3)"
          >
            {{ centerLabel() }}
          </text>
        }
      </svg>

      <!-- Legend -->
      <div class="n-donut-chart__legend">
        @for (seg of computedSegments(); track seg.label) {
          <div class="n-donut-chart__legend-item">
            <div class="n-donut-chart__dot" [class]="seg.legendDotClass"></div>
            <div class="n-donut-chart__legend-content">
              <div class="n-donut-chart__legend-label" [class.n-donut-chart__legend-label--muted]="seg.color === 'neutral'">
                {{ seg.label }}
              </div>
              @if (seg.displayValue) {
                <div class="n-donut-chart__legend-value">
                  {{ seg.displayValue }} &middot; {{ seg.value }}%
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-donut-chart {
        display: flex;
        gap: 22px;
        align-items: center;
        flex-wrap: wrap;
      }

      .n-donut-chart__legend {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .n-donut-chart__legend-item {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .n-donut-chart__dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .n-donut-chart__dot--blue-violet {
        background: linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%);
      }

      .n-donut-chart__dot--violet-pink {
        background: linear-gradient(135deg, #7b5cf6 0%, #d946ef 100%);
        opacity: 0.6;
      }

      .n-donut-chart__dot--neutral {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .n-donut-chart__legend-content {
        display: flex;
        flex-direction: column;
      }

      .n-donut-chart__legend-label {
        font-size: var(--n-font-size-13, 13px);
        color: var(--n-text-1, rgba(255, 255, 255, 0.92));
        line-height: 1.3;
      }

      .n-donut-chart__legend-label--muted {
        opacity: 0.45;
      }

      .n-donut-chart__legend-value {
        font-family: var(--n-font-mono, monospace);
        font-size: var(--n-font-size-10, 10px);
        color: var(--n-text-3, rgba(255, 255, 255, 0.34));
        line-height: 1.4;
      }
    `,
  ],
})
export class NDonutChart {
  readonly segments = input<ReadonlyArray<NDonutSegment>>([]);
  readonly centerValue = input<string>('');
  readonly centerLabel = input<string>('');

  readonly computedSegments = computed(() => {
    const segs = this.segments();
    let accumulatedPercentage = 0;
    const totalCircumference = 2 * Math.PI * 44; // ~276.46

    return segs.map((segment) => {
      const percentage = segment.value;
      const strokeDashoffset = totalCircumference * (1 - percentage / 100);
      const rotation = -90 + (accumulatedPercentage / 100) * 360;

      accumulatedPercentage += percentage;

      let strokeColor = 'rgba(255,255,255,0.06)';
      let legendDotClass = 'n-donut-chart__dot--neutral';
      let strokeOpacity = '1.0';

      if (segment.color === 'blue-violet') {
        strokeColor = 'url(#n-dn-a)';
        legendDotClass = 'n-donut-chart__dot--blue-violet';
      } else if (segment.color === 'violet-pink') {
        strokeColor = 'url(#n-dn-b)';
        legendDotClass = 'n-donut-chart__dot--violet-pink';
        strokeOpacity = '0.55';
      }

      return {
        ...segment,
        strokeDashoffset,
        transform: `rotate(${rotation} 60 60)`,
        strokeColor,
        strokeOpacity,
        legendDotClass,
      };
    });
  });
}
