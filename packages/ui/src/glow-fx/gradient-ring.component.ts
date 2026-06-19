import { Component, input } from '@angular/core';

@Component({
  selector: 'n-gradient-ring',
  standalone: true,
  template: `
    <div
      class="n-gradient-ring"
      [class.n-gradient-ring--gemini]="variant() === 'gemini'"
      [class.n-gradient-ring--primary]="variant() === 'primary'"
      [class.n-gradient-ring--secondary]="variant() === 'secondary'"
      [class.n-gradient-ring--cyan]="variant() === 'cyan'"
      [style.--ring-size]="size()"
      [style.--ring-inner-size]="innerSize()"
      [style.--ring-duration]="duration()"
    >
      <div class="n-gradient-ring__inner">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .n-gradient-ring {
        --ring-size: 80px;
        --ring-inner-size: calc(var(--ring-size) - 14px);
        --ring-duration: 3s;
        --ring-blur: 16px;
        --ring-thickness: 3px;
        position: relative;
        width: var(--ring-size);
        height: var(--ring-size);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Base gradient fallback */
      .n-gradient-ring {
        --n-ring-gradient: var(--n-gradient-gemini);
      }

      .n-gradient-ring--gemini {
        --n-ring-gradient: var(--n-gradient-gemini);
      }

      .n-gradient-ring--primary {
        --n-ring-gradient: var(--n-gradient-primary-secondary);
      }

      .n-gradient-ring--secondary {
        --n-ring-gradient: var(--n-gradient-secondary-tertiary);
      }

      .n-gradient-ring--cyan {
        --n-ring-gradient: var(--n-gradient-primary-cyan);
      }

      .n-gradient-ring::before {
        content: '';
        position: absolute;
        inset: calc(-1 * var(--ring-thickness));
        border-radius: 50%;
        background: var(--n-ring-gradient);
        animation: ring-spin var(--ring-duration) linear infinite;
        z-index: 0;
      }

      .n-gradient-ring::after {
        content: '';
        position: absolute;
        inset: calc(-1 * var(--ring-thickness));
        border-radius: 50%;
        background: var(--n-ring-gradient);
        filter: blur(var(--ring-blur));
        opacity: 0.55;
        animation: ring-spin var(--ring-duration) linear infinite;
        z-index: 0;
      }

      .n-gradient-ring__inner {
        width: var(--ring-inner-size);
        height: var(--ring-inner-size);
        border-radius: 50%;
        background: var(--n-surface-2, #0f0f1c);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
      }

      @keyframes ring-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class NGradientRing {
  readonly variant = input<'gemini' | 'primary' | 'secondary' | 'cyan'>('gemini');
  readonly size = input('80px');
  readonly innerSize = input<string | undefined>(undefined);
  readonly duration = input('3s');
}
