import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NIconSize } from '../icon/icon.types.js';
import type { NVoiceOrbSize, NVoiceOrbState } from './voice-orb.types.js';

@Component({
  selector: 'n-voice-orb',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-voice-orb">
      @if (interactive()) {
        <button
          type="button"
          class="n-voice-orb__control"
          [class.n-voice-orb__control--sm]="size() === 'sm'"
          [class.n-voice-orb__control--md]="size() === 'md'"
          [class.n-voice-orb__control--lg]="size() === 'lg'"
          [class.n-voice-orb__control--idle]="state() === 'idle'"
          [class.n-voice-orb__control--listening]="state() === 'listening'"
          [class.n-voice-orb__control--thinking]="state() === 'thinking'"
          [class.n-voice-orb__control--speaking]="state() === 'speaking'"
          [class.n-voice-orb__control--error]="state() === 'error'"
          [class.n-voice-orb__control--muted]="state() === 'muted'"
          [disabled]="disabled()"
          [attr.aria-label]="ariaLabel()"
          (click)="handleClick()"
        >
          <span class="n-voice-orb__ring n-voice-orb__ring--primary" aria-hidden="true"></span>
          <span class="n-voice-orb__ring n-voice-orb__ring--secondary" aria-hidden="true"></span>
          <span class="n-voice-orb__core">
            <n-icon name="mic" [size]="iconSize()" />
          </span>
        </button>
      } @else {
        <div
          class="n-voice-orb__control"
          [class.n-voice-orb__control--sm]="size() === 'sm'"
          [class.n-voice-orb__control--md]="size() === 'md'"
          [class.n-voice-orb__control--lg]="size() === 'lg'"
          [class.n-voice-orb__control--idle]="state() === 'idle'"
          [class.n-voice-orb__control--listening]="state() === 'listening'"
          [class.n-voice-orb__control--thinking]="state() === 'thinking'"
          [class.n-voice-orb__control--speaking]="state() === 'speaking'"
          [class.n-voice-orb__control--error]="state() === 'error'"
          [class.n-voice-orb__control--muted]="state() === 'muted'"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          <span class="n-voice-orb__ring n-voice-orb__ring--primary" aria-hidden="true"></span>
          <span class="n-voice-orb__ring n-voice-orb__ring--secondary" aria-hidden="true"></span>
          <span class="n-voice-orb__core">
            <n-icon name="mic" [size]="iconSize()" />
          </span>
        </div>
      }

      <div class="n-voice-orb__meta">
        @if (label()) {
          <span class="n-voice-orb__label">{{ label() }}</span>
        }
        <span class="n-voice-orb__state">{{ stateCaption() }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .n-voice-orb {
        display: inline-grid;
        justify-items: center;
        gap: var(--n-space-6);
      }

      .n-voice-orb__control {
        --n-voice-orb-size: var(--n-voice-orb-size-md);
        --n-voice-orb-ring-primary-inset: -9px;
        --n-voice-orb-ring-secondary-inset: -5px;
        --n-voice-orb-ring-primary-blur: 10px;
        --n-voice-orb-ring-secondary-blur: 7px;
        --n-voice-orb-core-inset: 8px;
        --n-voice-orb-ring-primary-opacity: 0.6;

        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--n-voice-orb-size);
        height: var(--n-voice-orb-size);
        padding: 0;
        border: 0;
        border-radius: var(--n-radius-full);
        background: transparent;
        color: rgba(255, 255, 255, 0.88);
        cursor: default;
        transform-origin: center;
      }

      button.n-voice-orb__control {
        cursor: pointer;
      }

      .n-voice-orb__control--sm {
        --n-voice-orb-size: var(--n-voice-orb-size-sm);
        --n-voice-orb-ring-primary-inset: -5px;
        --n-voice-orb-ring-secondary-inset: -3px;
        --n-voice-orb-ring-primary-blur: 6px;
        --n-voice-orb-ring-secondary-blur: 4px;
        --n-voice-orb-core-inset: 5px;
      }

      .n-voice-orb__control--md {
        --n-voice-orb-size: var(--n-voice-orb-size-md);
      }

      .n-voice-orb__control--lg {
        --n-voice-orb-size: var(--n-voice-orb-size-lg);
        --n-voice-orb-ring-primary-inset: -12px;
        --n-voice-orb-ring-secondary-inset: -6px;
        --n-voice-orb-ring-primary-blur: 12px;
        --n-voice-orb-ring-secondary-blur: 7px;
        --n-voice-orb-core-inset: 10px;
      }

      .n-voice-orb__control:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 6px;
      }

      .n-voice-orb__control:disabled {
        cursor: not-allowed;
        opacity: 0.48;
      }

      .n-voice-orb__ring,
      .n-voice-orb__core {
        position: absolute;
        border-radius: var(--n-radius-full);
      }

      .n-voice-orb__ring {
        inset: 0;
      }

      .n-voice-orb__ring--primary {
        inset: var(--n-voice-orb-ring-primary-inset);
        background: var(--n-voice-orb-gradient-primary);
        filter: blur(var(--n-voice-orb-ring-primary-blur));
        opacity: var(--n-voice-orb-ring-primary-opacity);
        animation: n-voice-orb-rotate-primary 3s linear infinite;
      }

      .n-voice-orb__ring--secondary {
        inset: var(--n-voice-orb-ring-secondary-inset);
        background: var(--n-voice-orb-gradient-secondary);
        filter: blur(var(--n-voice-orb-ring-secondary-blur));
        opacity: 0.45;
        animation: n-voice-orb-rotate-secondary 4.5s linear infinite;
      }

      .n-voice-orb__core {
        inset: var(--n-voice-orb-core-inset);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--n-voice-orb-core-bg);
        z-index: 1;
      }

      .n-voice-orb__meta {
        display: grid;
        justify-items: center;
        gap: var(--n-space-1);
      }

      .n-voice-orb__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-voice-orb__state {
        background: var(--n-gradient-primary-secondary);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .n-voice-orb__control--idle {
        animation: n-voice-orb-idle 4s ease-in-out infinite;
      }

      .n-voice-orb__control--listening {
        --n-voice-orb-ring-primary-opacity: 0.85;
        animation: n-voice-orb-listening 1.8s ease-in-out infinite;
      }

      .n-voice-orb__control--thinking {
        --n-voice-orb-ring-primary-opacity: 0.92;
        animation: n-voice-orb-thinking 1s ease-in-out infinite;
      }

      .n-voice-orb__control--speaking {
        --n-voice-orb-ring-primary-opacity: 0.75;
        animation: n-voice-orb-speaking 2.2s ease-in-out infinite;
      }

      .n-voice-orb__control--error .n-voice-orb__ring--primary {
        background: conic-gradient(
          from 0deg,
          var(--n-color-danger),
          #f43f5e,
          var(--n-color-danger),
          #f43f5e,
          var(--n-color-danger)
        );
        --n-voice-orb-ring-primary-opacity: 0.72;
      }

      .n-voice-orb__control--error .n-voice-orb__ring--secondary {
        opacity: 0.28;
      }

      .n-voice-orb__control--muted {
        opacity: 0.5;
      }

      .n-voice-orb__control--muted .n-voice-orb__ring--primary,
      .n-voice-orb__control--muted .n-voice-orb__ring--secondary {
        animation-play-state: paused;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-voice-orb__ring--primary,
        .n-voice-orb__ring--secondary,
        .n-voice-orb__control--idle,
        .n-voice-orb__control--listening,
        .n-voice-orb__control--thinking,
        .n-voice-orb__control--speaking {
          animation: none;
        }
      }

      @keyframes n-voice-orb-rotate-primary {
        to {
          transform: rotate(1turn);
        }
      }

      @keyframes n-voice-orb-rotate-secondary {
        to {
          transform: rotate(-1turn);
        }
      }

      @keyframes n-voice-orb-idle {
        0%,
        100% {
          transform: scale(1);
        }

        50% {
          transform: scale(0.97);
        }
      }

      @keyframes n-voice-orb-listening {
        0%,
        100% {
          transform: scale(1);
        }

        20% {
          transform: scale(1.08);
        }

        40% {
          transform: scale(0.97);
        }

        60% {
          transform: scale(1.08);
        }
      }

      @keyframes n-voice-orb-thinking {
        0%,
        100% {
          transform: scale(1);
        }

        25% {
          transform: scale(1.04);
        }

        50% {
          transform: scale(0.98);
        }

        75% {
          transform: scale(1.04);
        }
      }

      @keyframes n-voice-orb-speaking {
        0%,
        100% {
          transform: scale(1);
        }

        25% {
          transform: scale(1.06);
        }

        50% {
          transform: scale(0.95);
        }

        75% {
          transform: scale(1.06);
        }
      }
    `,
  ],
})
export class NVoiceOrb {
  readonly state = input<NVoiceOrbState>('idle');
  readonly size = input<NVoiceOrbSize>('md');
  readonly label = input<string | undefined>(undefined);
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly orbClick = output<void>();

  readonly iconSize = computed<NIconSize>(() => {
    switch (this.size()) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'xl';
      default:
        return 'lg';
    }
  });

  readonly ariaLabel = computed(() => {
    const label = this.label();

    if (label) {
      return `${label} · ${this.stateLabel()}`;
    }

    return `Voice orb · ${this.stateLabel()}`;
  });

  stateCaption(): string {
    const caption = this.stateLabel();

    if (this.interactive()) {
      return `${caption} · clic para cambiar`;
    }

    return caption;
  }

  stateLabel(): string {
    switch (this.state()) {
      case 'listening':
        return 'Escuchando';
      case 'thinking':
        return 'Procesando';
      case 'speaking':
        return 'Respondiendo';
      case 'error':
        return 'Error';
      case 'muted':
        return 'Silenciado';
      default:
        return 'Idle';
    }
  }

  handleClick(): void {
    if (!this.interactive() || this.disabled()) {
      return;
    }

    this.orbClick.emit();
  }
}
