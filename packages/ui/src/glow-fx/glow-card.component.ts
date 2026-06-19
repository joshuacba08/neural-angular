import { Component, input } from '@angular/core';

@Component({
  selector: 'n-glow-card',
  standalone: true,
  template: `
    <div
      class="n-glow-card"
      [class.n-glow-card--blue]="variant() === 'blue'"
      [class.n-glow-card--pink]="variant() === 'pink'"
      [class.n-glow-card--gemini]="variant() === 'gemini'"
    >
      <div class="n-glow-card__orb" aria-hidden="true"></div>
      <div class="n-glow-card__content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-glow-card {
        padding: 22px;
        border-radius: var(--n-radius-xl, 14px);
        position: relative;
        overflow: hidden;
        border: 1px solid transparent;
      }

      .n-glow-card--blue {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-glow-card--pink {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-glow-card--gemini {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-glow-gradient-sm, 0 0 16px rgba(123, 92, 246, 0.15));
      }

      .n-glow-card__orb {
        position: absolute;
        width: 110px;
        height: 110px;
        pointer-events: none;
        z-index: 0;
      }

      .n-glow-card--blue .n-glow-card__orb {
        top: -30px;
        right: -30px;
        background: radial-gradient(circle, rgba(66, 133, 244, 0.32), transparent 70%);
      }

      .n-glow-card--pink .n-glow-card__orb {
        bottom: -30px;
        left: -30px;
        background: radial-gradient(circle, rgba(217, 70, 239, 0.26), transparent 70%);
      }

      .n-glow-card--gemini .n-glow-card__orb {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 130px;
        height: 70px;
        background: radial-gradient(ellipse, rgba(66, 133, 244, 0.18), rgba(217, 70, 239, 0.12), transparent 70%);
      }

      .n-glow-card__content {
        position: relative;
        z-index: 1;
      }
    `,
  ],
})
export class NGlowCard {
  readonly variant = input<'blue' | 'pink' | 'gemini'>('blue');
}
