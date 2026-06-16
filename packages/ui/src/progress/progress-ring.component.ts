import { booleanAttribute, Component, computed, input, numberAttribute } from '@angular/core';

import type { NProgressRingSize, NProgressRingVariant } from './progress.types.js';

let progressRingId = 0;

@Component({
  selector: 'n-progress-ring',
  standalone: true,
  template: `
    <figure
      class="n-progress-ring"
      [class.n-progress-ring--orbital]="size() === 'orbital'"
      [class.n-progress-ring--sm]="size() === 'sm'"
      [class.n-progress-ring--md]="size() === 'md'"
      [class.n-progress-ring--lg]="size() === 'lg'"
      [class.n-progress-ring--success]="isSuccess()"
      [class.n-progress-ring--spinning]="indeterminate()"
      role="progressbar"
      [attr.aria-label]="label() || metric() || null"
      [attr.aria-valuemin]="indeterminate() ? null : 0"
      [attr.aria-valuemax]="indeterminate() ? null : 100"
      [attr.aria-valuenow]="indeterminate() ? null : percent()"
    >
      <svg
        class="n-progress-ring__svg"
        [attr.width]="svgSize()"
        [attr.height]="svgSize()"
        [attr.viewBox]="viewBox()"
        aria-hidden="true"
      >
        @if (!isSuccess()) {
          <defs>
            <linearGradient [attr.id]="gradientId()" x1="0" y1="0" x2="1" y2="0">
              @for (stop of gradientStops(); track stop.offset) {
                <stop [attr.offset]="stop.offset" [attr.stop-color]="stop.color" />
              }
            </linearGradient>
          </defs>
        }

        <circle
          class="n-progress-ring__track"
          [attr.cx]="center()"
          [attr.cy]="center()"
          [attr.r]="radius()"
          fill="none"
          [attr.stroke-width]="strokeWidth()"
        />

        <circle
          class="n-progress-ring__arc"
          [class.n-progress-ring__arc--success]="isSuccess()"
          [attr.cx]="center()"
          [attr.cy]="center()"
          [attr.r]="radius()"
          fill="none"
          [attr.stroke]="stroke()"
          [attr.stroke-width]="strokeWidth()"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference()"
          [attr.stroke-dashoffset]="dashOffset()"
        />
      </svg>

      @if (usesOverlay()) {
        <div class="n-progress-ring__overlay">
          <span class="n-progress-ring__metric-value">{{ percent() }}%</span>
          @if (metric()) {
            <span class="n-progress-ring__metric-label">{{ metric() }}</span>
          }
        </div>
      } @else if (showValue() && !indeterminate() && !isSuccess()) {
        <span class="n-progress-ring__value-fallback">{{ percent() }}%</span>
      }

      @if (caption()) {
        <figcaption class="n-progress-ring__caption">{{ caption() }}</figcaption>
      }
    </figure>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .n-progress-ring {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin: 0;
      }

      .n-progress-ring__svg {
        display: block;
        transform: rotate(-90deg);
      }

      .n-progress-ring--spinning .n-progress-ring__svg {
        animation: n-progress-ring-spin 0.75s linear infinite;
      }

      .n-progress-ring__track {
        stroke: rgba(255, 255, 255, 0.06);
      }

      .n-progress-ring--orbital .n-progress-ring__track {
        stroke: rgba(255, 255, 255, 0.05);
      }

      .n-progress-ring__arc--success {
        stroke: var(--n-color-success);
      }

      .n-progress-ring__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        pointer-events: none;
      }

      .n-progress-ring__metric-value {
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 1;
      }

      .n-progress-ring__metric-label {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 8.5px;
        line-height: 1.2;
        text-transform: uppercase;
      }

      .n-progress-ring__value-fallback {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.88);
        font-family: var(--n-font-mono);
        font-size: 15px;
        font-weight: 700;
        pointer-events: none;
      }

      .n-progress-ring--md .n-progress-ring__value-fallback {
        font-size: 10px;
      }

      .n-progress-ring--sm .n-progress-ring__value-fallback {
        display: none;
      }

      .n-progress-ring__caption {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 9px;
        line-height: 1.2;
        text-align: center;
      }

      .n-progress-ring--success .n-progress-ring__caption {
        color: var(--n-color-success);
        font-size: 11px;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-progress-ring--spinning .n-progress-ring__svg {
          animation: none;
        }
      }

      @keyframes n-progress-ring-spin {
        to {
          transform: rotate(270deg);
        }
      }
    `,
  ],
})
export class NProgressRing {
  private readonly instanceId = `n-progress-ring-${++progressRingId}`;

  readonly value = input(0, { transform: numberAttribute });
  readonly variant = input<NProgressRingVariant>('primary');
  readonly size = input<NProgressRingSize>('lg');
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly showValue = input(true, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly metric = input<string | undefined>(undefined);
  readonly caption = input<string | undefined>(undefined);

  readonly percent = computed(() => Math.min(Math.max(Math.round(this.value()), 0), 100));

  readonly isSuccess = computed(() => this.variant() === 'success');

  readonly usesOverlay = computed(
    () => this.size() === 'orbital' || this.metric() !== undefined,
  );

  readonly svgSize = computed(() => {
    switch (this.size()) {
      case 'orbital':
        return 100;
      case 'sm':
        return 40;
      case 'md':
        return 56;
      default:
        return 76;
    }
  });

  readonly viewBox = computed(() => {
    if (this.size() === 'orbital') {
      return '0 0 36 36';
    }

    return `0 0 ${this.svgSize()} ${this.svgSize()}`;
  });

  readonly center = computed(() => {
    if (this.size() === 'orbital') {
      return 18;
    }

    return this.svgSize() / 2;
  });

  readonly strokeWidth = computed(() => {
    switch (this.size()) {
      case 'orbital':
        return 6;
      case 'sm':
        return 3.5;
      case 'md':
        return 5;
      default:
        return 6;
    }
  });

  readonly radius = computed(() => {
    switch (this.size()) {
      case 'orbital':
        return 15;
      case 'sm':
        return 15;
      case 'md':
        return 22;
      default:
        return 30;
    }
  });

  readonly circumference = computed(() => 2 * Math.PI * this.radius());

  readonly dashOffset = computed(() => {
    if (this.indeterminate()) {
      return this.circumference() * 0.75;
    }

    if (this.isSuccess()) {
      return 0;
    }

    return this.circumference() * (1 - this.percent() / 100);
  });

  readonly gradientId = computed(() => `${this.instanceId}-gradient`);

  readonly gradientStops = computed(() => {
    switch (this.variant()) {
      case 'secondary':
        return [
          { offset: '0%', color: '#7b5cf6' },
          { offset: '100%', color: '#d946ef' },
        ];
      case 'gemini':
        return [
          { offset: '0%', color: '#4285f4' },
          { offset: '50%', color: '#7b5cf6' },
          { offset: '100%', color: '#d946ef' },
        ];
      case 'success-blue':
        return [
          { offset: '0%', color: '#34a853' },
          { offset: '100%', color: '#4285f4' },
        ];
      default:
        return [
          { offset: '0%', color: '#4285f4' },
          { offset: '100%', color: '#7b5cf6' },
        ];
    }
  });

  readonly stroke = computed(() =>
    this.isSuccess() ? 'var(--n-color-success)' : `url(#${this.gradientId()})`,
  );
}
