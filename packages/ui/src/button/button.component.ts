import { booleanAttribute, Component, computed, input } from '@angular/core';

import type {
  NButtonSize,
  NButtonType,
  NButtonVariant,
} from './button.types.js';

@Component({
  selector: 'n-button',
  standalone: true,
  template: `
    <button
      class="n-button"
      [class.n-button--primary]="variant() === 'primary'"
      [class.n-button--gemini]="variant() === 'gemini'"
      [class.n-button--accent]="variant() === 'accent'"
      [class.n-button--danger]="variant() === 'danger'"
      [class.n-button--outline]="variant() === 'outline'"
      [class.n-button--outline-gemini]="variant() === 'outline-gemini'"
      [class.n-button--tonal]="variant() === 'tonal'"
      [class.n-button--tonal-violet]="variant() === 'tonal-violet'"
      [class.n-button--ghost]="variant() === 'ghost'"
      [class.n-button--secondary]="variant() === 'secondary'"
      [class.n-button--sm]="size() === 'sm'"
      [class.n-button--md]="size() === 'md'"
      [class.n-button--lg]="size() === 'lg'"
      [class.n-button--xl]="size() === 'xl'"
      [class.n-button--full]="fullWidth()"
      [class.n-button--ico]="iconOnly()"
      [class.n-button--loading]="loading()"
      [type]="type()"
      [disabled]="isDisabled()"
      [attr.aria-busy]="loading() ? 'true' : null"
      [attr.aria-label]="iconOnly() ? ariaLabel() : null"
    >
      @if (loading()) {
        <span class="n-button__loader" aria-hidden="true"></span>
      }
      <span class="n-button__content" [class.n-button__content--hidden]="loading()">
        <ng-content />
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        max-width: 100%;
      }

      :host:has(.n-button--full) {
        display: block;
        width: 100%;
      }

      .n-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--n-space-2);
        width: auto;
        max-width: 100%;
        height: 40px;
        padding: 0 22px;
        border: none;
        border-radius: var(--n-radius-full);
        font-family: var(--n-font-body);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: 0.01em;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        transition: all var(--n-duration-base) var(--n-ease-standard);
      }

      .n-button--sm {
        height: 32px;
        padding: 0 14px;
        font-size: 0.71875rem;
      }

      .n-button--md {
        height: 40px;
        padding: 0 22px;
        font-size: var(--n-font-size-13);
      }

      .n-button--lg {
        height: 48px;
        padding: 0 28px;
        font-size: 0.90625rem;
      }

      .n-button--xl {
        height: 56px;
        padding: 0 36px;
        font-size: 0.96875rem;
      }

      .n-button--ico {
        width: 40px;
        padding: 0;
        border-radius: 50%;
      }

      .n-button--ico.n-button--sm {
        width: 32px;
      }

      .n-button--ico.n-button--lg {
        width: 48px;
      }

      .n-button--ico.n-button--xl {
        width: 56px;
      }

      .n-button--full {
        width: 100%;
      }

      .n-button--primary {
        background: var(--n-gradient-primary-secondary);
        color: #fff;
        box-shadow: 0 2px 12px rgba(66, 133, 244, 0.3);
      }

      .n-button--primary:hover:not(:disabled) {
        filter: brightness(1.12);
        box-shadow: var(--n-glow-primary-md);
      }

      .n-button--gemini {
        background: var(--n-gradient-gemini);
        color: #fff;
        box-shadow: var(--n-glow-gradient-sm);
      }

      .n-button--gemini:hover:not(:disabled) {
        filter: brightness(1.1);
      }

      .n-button--accent {
        background: var(--n-gradient-secondary-tertiary);
        color: #fff;
        box-shadow: 0 2px 12px rgba(123, 92, 246, 0.28);
      }

      .n-button--accent:hover:not(:disabled) {
        filter: brightness(1.12);
        box-shadow: var(--n-glow-secondary-md);
      }

      .n-button--danger {
        background: var(--n-color-danger);
        color: #fff;
      }

      .n-button--danger:hover:not(:disabled) {
        filter: brightness(1.1);
        box-shadow: var(--n-glow-danger-sm);
      }

      .n-button--outline {
        border: 1px solid transparent;
        background:
          transparent padding-box,
          var(--n-gradient-primary-secondary) border-box;
        color: var(--n-color-primary);
      }

      .n-button--outline:hover:not(:disabled) {
        background:
          rgba(66, 133, 244, 0.08) padding-box,
          var(--n-gradient-primary-secondary) border-box;
      }

      .n-button--outline-gemini {
        border: 1px solid transparent;
        background:
          transparent padding-box,
          var(--n-gradient-gemini) border-box;
        color: var(--n-text-1);
      }

      .n-button--outline-gemini:hover:not(:disabled) {
        background:
          var(--n-gradient-surface-strong) padding-box,
          var(--n-gradient-gemini) border-box;
      }

      .n-button--tonal {
        border: 1px solid rgba(66, 133, 244, 0.18);
        background: var(--n-color-primary-alpha-10);
        color: var(--n-color-primary);
      }

      .n-button--tonal:hover:not(:disabled) {
        background: color-mix(in srgb, var(--n-color-primary) 15%, transparent);
        box-shadow: var(--n-glow-primary-xs);
      }

      .n-button--tonal-violet {
        border: 1px solid rgba(123, 92, 246, 0.18);
        background: var(--n-color-secondary-alpha-10);
        color: var(--n-color-secondary);
      }

      .n-button--tonal-violet:hover:not(:disabled) {
        background: color-mix(in srgb, var(--n-color-secondary) 15%, transparent);
        box-shadow: var(--n-glow-secondary-sm);
      }

      .n-button--ghost {
        border: 1px solid var(--n-border-1);
        background: transparent;
        color: var(--n-color-primary-bright);
      }

      .n-button--ghost:hover:not(:disabled) {
        border-color: rgba(66, 133, 244, 0.25);
        background: var(--n-color-primary-alpha-10);
      }

      .n-button--secondary {
        border: 1px solid var(--n-border-1);
        background: transparent;
        color: var(--n-text-2);
      }

      .n-button--secondary:hover:not(:disabled) {
        color: var(--n-text-1);
        background: rgba(255, 255, 255, 0.05);
      }

      .n-button:not(:disabled):active {
        transform: scale(0.96);
      }

      .n-button:focus-visible {
        outline: 2px solid var(--n-color-primary);
        outline-offset: 3px;
      }

      .n-button:disabled {
        cursor: not-allowed;
        opacity: 0.3;
        pointer-events: none;
      }

      .n-button__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--n-space-2);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .n-button__content--hidden {
        opacity: 0;
      }

      .n-button__loader {
        position: absolute;
        width: 13px;
        height: 13px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        border-top-color: #fff;
        border-radius: var(--n-radius-full);
        animation: n-button-spin 0.65s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-button {
          transition: none;
        }

        .n-button__loader {
          animation: none;
        }
      }

      @keyframes n-button-spin {
        to {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class NButton {
  readonly variant = input<NButtonVariant>('primary');
  readonly size = input<NButtonSize>('md');
  readonly type = input<NButtonType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | null>(null);

  readonly isDisabled = computed(() => this.disabled() || this.loading());
}
