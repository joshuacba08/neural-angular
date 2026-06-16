import { Component, input } from '@angular/core';

import type { NSpinnerMode, NSpinnerSize, NSpinnerVariant } from './spinner.types.js';

let spinnerId = 0;

@Component({
  selector: 'n-spinner',
  standalone: true,
  template: `
    <span
      class="n-spinner"
      [class.n-spinner--sm]="size() === 'sm'"
      [class.n-spinner--md]="size() === 'md'"
      [class.n-spinner--lg]="size() === 'lg'"
      [class.n-spinner--primary]="variant() === 'primary'"
      [class.n-spinner--neutral]="variant() === 'neutral'"
      [class.n-spinner--success]="variant() === 'success'"
      [class.n-spinner--danger]="variant() === 'danger'"
      [class.n-spinner--dots]="mode() === 'dots'"
      [attr.role]="label() ? 'status' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      @if (mode() === 'dots') {
        <span class="n-spinner__dots" aria-hidden="true">
          <span class="n-spinner__dot"></span>
          <span class="n-spinner__dot"></span>
          <span class="n-spinner__dot"></span>
        </span>
      } @else {
        <svg
          class="n-spinner__svg"
          [attr.width]="svgSize()"
          [attr.height]="svgSize()"
          [attr.viewBox]="viewBox()"
          aria-hidden="true"
        >
          <defs>
            <linearGradient [attr.id]="gradientId" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#4285f4" />
              <stop offset="100%" stop-color="#d946ef" />
            </linearGradient>
          </defs>
          <circle
            class="n-spinner__track"
            [attr.cx]="center()"
            [attr.cy]="center()"
            [attr.r]="radius()"
            fill="none"
            [attr.stroke-width]="strokeWidth()"
          />
          <circle
            class="n-spinner__arc"
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
      }

      @if (label()) {
        <span class="n-spinner__sr">{{ label() }}</span>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
      }

      .n-spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--n-color-primary);
      }

      .n-spinner--neutral {
        color: var(--n-text-2);
      }

      .n-spinner--success {
        color: var(--n-color-success);
      }

      .n-spinner--danger {
        color: var(--n-color-danger);
      }

      .n-spinner--sm {
        width: 28px;
        height: 28px;
      }

      .n-spinner--md,
      .n-spinner--lg {
        width: 40px;
        height: 40px;
      }

      .n-spinner__svg {
        animation: n-spinner-spin 0.75s linear infinite;
      }

      .n-spinner__track {
        stroke: rgba(255, 255, 255, 0.07);
      }

      .n-spinner--neutral .n-spinner__track {
        stroke: rgba(255, 255, 255, 0.1);
      }

      .n-spinner--success .n-spinner__arc {
        stroke: var(--n-color-success);
      }

      .n-spinner--danger .n-spinner__arc {
        stroke: var(--n-color-danger);
      }

      .n-spinner--neutral .n-spinner__arc {
        stroke: currentColor;
      }

      .n-spinner__dots {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .n-spinner__dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        animation: n-spinner-dot-bounce 0.8s ease-in-out infinite alternate;
      }

      .n-spinner__dot:nth-child(2) {
        animation-delay: 140ms;
      }

      .n-spinner__dot:nth-child(3) {
        animation-delay: 280ms;
      }

      .n-spinner__sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-spinner__svg,
        .n-spinner__dot {
          animation: none;
        }
      }

      @keyframes n-spinner-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes n-spinner-dot-bounce {
        from {
          opacity: 0.2;
          transform: translateY(3px);
        }

        to {
          opacity: 1;
          transform: translateY(-3px);
        }
      }
    `,
  ],
})
export class NSpinner {
  private readonly instanceId = `n-spinner-${++spinnerId}`;

  readonly size = input<NSpinnerSize>('md');
  readonly variant = input<NSpinnerVariant>('primary');
  readonly mode = input<NSpinnerMode>('ring');
  readonly label = input<string | undefined>(undefined);

  readonly svgSize = () => (this.size() === 'sm' ? 28 : 40);
  readonly center = () => this.svgSize() / 2;
  readonly radius = () => (this.size() === 'sm' ? 10 : 15);
  readonly strokeWidth = () => (this.size() === 'sm' ? 3 : 3.5);

  circumference(): number {
    return 2 * Math.PI * this.radius();
  }

  dashOffset(): number {
    return this.circumference() * 0.75;
  }

  viewBox(): string {
    return `0 0 ${this.svgSize()} ${this.svgSize()}`;
  }

  readonly gradientId = `${this.instanceId}-gradient`;

  stroke(): string {
    if (this.variant() === 'success' || this.variant() === 'danger' || this.variant() === 'neutral') {
      return 'currentColor';
    }

    return `url(#${this.gradientId})`;
  }
}
