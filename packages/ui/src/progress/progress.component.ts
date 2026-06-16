import { booleanAttribute, Component, computed, input, numberAttribute } from '@angular/core';

import type { NProgressIndeterminateMode, NProgressSize, NProgressVariant } from './progress.types.js';

@Component({
  selector: 'n-progress',
  standalone: true,
  template: `
    <div class="n-progress">
      @if (label() || showValue()) {
        <div class="n-progress__meta">
          @if (label()) {
            <span class="n-progress__label">{{ label() }}</span>
          }
          @if (showValue() && !isSegmented()) {
            <span
              class="n-progress__value"
              [class.n-progress__value--gradient]="valueUsesGradient()"
              [class.n-progress__value--muted]="indeterminate()"
            >
              {{ indeterminate() ? '—' : percent() + '%' }}
            </span>
          }
        </div>
      }

      @if (isSegmented()) {
        <div
          class="n-progress__segments"
          [class.n-progress__segments--xs]="size() === 'xs'"
          [class.n-progress__segments--sm]="size() === 'sm'"
          [class.n-progress__segments--md]="size() === 'md'"
          [class.n-progress__segments--lg]="size() === 'lg'"
          role="progressbar"
          [attr.aria-label]="label() || null"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="totalSteps()"
          [attr.aria-valuenow]="clampedStep()"
        >
          @for (segment of segmentIndexes(); track segment) {
            <span
              class="n-progress__segment"
              [class.n-progress__segment--filled]="segment < clampedStep()"
              [class.n-progress__segment--gemini]="variant() === 'gemini' && segment < clampedStep()"
              [class.n-progress__segment--gemini-full]="variant() === 'gemini-full' && segment < clampedStep()"
              [class.n-progress__segment--primary]="variant() === 'primary' && segment < clampedStep()"
              [class.n-progress__segment--secondary]="variant() === 'secondary' && segment < clampedStep()"
              [class.n-progress__segment--success-blue]="variant() === 'success-blue' && segment < clampedStep()"
              [class.n-progress__segment--success]="variant() === 'success' && segment < clampedStep()"
              [class.n-progress__segment--warning]="variant() === 'warning' && segment < clampedStep()"
              [class.n-progress__segment--danger]="variant() === 'danger' && segment < clampedStep()"
            ></span>
          }
        </div>
      } @else {
        <div
          class="n-progress__track"
          [class.n-progress__track--xs]="size() === 'xs'"
          [class.n-progress__track--sm]="size() === 'sm'"
          [class.n-progress__track--md]="size() === 'md'"
          [class.n-progress__track--lg]="size() === 'lg'"
          [class.n-progress__track--indeterminate]="indeterminate()"
          role="progressbar"
          [attr.aria-label]="label() || null"
          [attr.aria-valuemin]="indeterminate() ? null : 0"
          [attr.aria-valuemax]="indeterminate() ? null : max()"
          [attr.aria-valuenow]="indeterminate() ? null : clampedValue()"
        >
          @if (indeterminate()) {
            @if (indeterminateMode() === 'bar') {
              <span
                class="n-progress__indeterminate-bar"
                [class.n-progress__indeterminate-bar--gemini]="variant() === 'gemini' || variant() === 'gemini-full'"
                [class.n-progress__indeterminate-bar--gemini-full]="variant() === 'gemini-full'"
                [class.n-progress__indeterminate-bar--primary]="variant() === 'primary'"
                [class.n-progress__indeterminate-bar--secondary]="variant() === 'secondary'"
                [class.n-progress__indeterminate-bar--success]="variant() === 'success'"
                [class.n-progress__indeterminate-bar--success-blue]="variant() === 'success-blue'"
                [class.n-progress__indeterminate-bar--warning]="variant() === 'warning'"
                [class.n-progress__indeterminate-bar--danger]="variant() === 'danger'"
              ></span>
            } @else {
              <span
                class="n-progress__indeterminate"
                [class.n-progress__indeterminate--gemini]="variant() === 'gemini'"
                [class.n-progress__indeterminate--gemini-full]="variant() === 'gemini-full'"
                [class.n-progress__indeterminate--primary]="variant() === 'primary'"
                [class.n-progress__indeterminate--secondary]="variant() === 'secondary'"
                [class.n-progress__indeterminate--success]="variant() === 'success'"
                [class.n-progress__indeterminate--success-blue]="variant() === 'success-blue'"
                [class.n-progress__indeterminate--warning]="variant() === 'warning'"
                [class.n-progress__indeterminate--danger]="variant() === 'danger'"
              ></span>
            }
          } @else {
            <span
              class="n-progress__fill"
              [class.n-progress__fill--gemini]="variant() === 'gemini'"
              [class.n-progress__fill--gemini-full]="variant() === 'gemini-full'"
              [class.n-progress__fill--primary]="variant() === 'primary'"
              [class.n-progress__fill--secondary]="variant() === 'secondary'"
              [class.n-progress__fill--success]="variant() === 'success'"
              [class.n-progress__fill--success-blue]="variant() === 'success-blue'"
              [class.n-progress__fill--warning]="variant() === 'warning'"
              [class.n-progress__fill--danger]="variant() === 'danger'"
              [class.n-progress__fill--shimmer]="showShimmer()"
              [style.width.%]="percent()"
            >
              @if (showShimmer()) {
                <span class="n-progress__shimmer" aria-hidden="true"></span>
              }
            </span>
          }
        </div>
      }

      @if (hint()) {
        <div class="n-progress__footer">
          @if (hint()) {
            <span class="n-progress__hint">{{ hint() }}</span>
          }
          @if (showValue()) {
            <span class="n-progress__footer-value">{{ percent() }}%</span>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-progress {
        display: grid;
        gap: 6px;
      }

      .n-progress__meta,
      .n-progress__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--n-space-3);
      }

      .n-progress__label {
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        font-weight: var(--n-font-weight-medium);
        line-height: 1.35;
      }

      .n-progress__value,
      .n-progress__footer-value {
        color: var(--n-color-primary-bright);
        font-family: var(--n-font-mono);
        font-size: 11px;
        font-weight: var(--n-font-weight-semibold);
        line-height: 1;
      }

      .n-progress__hint {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        line-height: 1.4;
      }

      .n-progress__track,
      .n-progress__segments {
        position: relative;
        width: 100%;
      }

      .n-progress__track {
        overflow: hidden;
        border-radius: var(--n-radius-full);
        background: var(--n-progress-bg);
      }

      .n-progress__value--gradient {
        background: var(--n-progress-fill-primary);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .n-progress__value--muted {
        color: var(--n-text-3);
        background: none;
        -webkit-text-fill-color: var(--n-text-3);
      }

      .n-progress__track--xs {
        height: 4px;
      }

      .n-progress__track--sm {
        height: 5px;
      }

      .n-progress__track--md {
        height: 9px;
      }

      .n-progress__track--lg {
        height: 10px;
        background: rgba(255, 255, 255, 0.05);
      }

      .n-progress__fill {
        position: relative;
        display: block;
        height: 100%;
        overflow: hidden;
        border-radius: inherit;
        transition: width var(--n-transition-base);
      }

      .n-progress__fill--gemini {
        background: var(--n-progress-fill-gemini);
      }

      .n-progress__fill--gemini-full {
        background: var(--n-progress-fill-gemini-full);
      }

      .n-progress__fill--primary {
        background: var(--n-progress-fill-primary);
      }

      .n-progress__fill--secondary {
        background: var(--n-progress-fill-secondary);
      }

      .n-progress__fill--success {
        background: var(--n-color-success);
      }

      .n-progress__fill--success-blue {
        background: var(--n-progress-fill-success-blue);
      }

      .n-progress__fill--warning {
        background: var(--n-color-warning);
      }

      .n-progress__fill--danger {
        background: var(--n-color-danger);
      }

      .n-progress__shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
        animation: n-progress-shimmer 1.6s ease-in-out infinite;
      }

      .n-progress__indeterminate {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        animation: n-progress-indeterminate-slide 1.4s ease-in-out infinite;
        transform-origin: left center;
      }

      .n-progress__indeterminate--gemini {
        background: var(--n-progress-fill-gemini);
      }

      .n-progress__indeterminate--gemini-full {
        background: var(--n-progress-fill-gemini-full);
      }

      .n-progress__indeterminate--primary,
      .n-progress__indeterminate--secondary {
        background: var(--n-progress-fill-primary);
      }

      .n-progress__indeterminate--secondary {
        background: var(--n-progress-fill-secondary);
      }

      .n-progress__indeterminate--success {
        background: var(--n-color-success);
      }

      .n-progress__indeterminate--success-blue {
        background: var(--n-progress-fill-success-blue);
      }

      .n-progress__indeterminate--warning {
        background: var(--n-color-warning);
      }

      .n-progress__indeterminate--danger {
        background: var(--n-color-danger);
      }

      .n-progress__segments {
        display: flex;
        gap: 4px;
      }

      .n-progress__indeterminate-bar {
        width: 40%;
        height: 100%;
        border-radius: inherit;
        animation: n-progress-indeterminate-bar 1.4s ease-in-out infinite;
      }

      .n-progress__indeterminate-bar--gemini,
      .n-progress__indeterminate-bar--gemini-full {
        background: var(--n-progress-fill-gemini-full);
      }

      .n-progress__indeterminate-bar--primary {
        background: var(--n-progress-fill-primary);
      }

      .n-progress__indeterminate-bar--secondary {
        background: var(--n-progress-fill-secondary);
      }

      .n-progress__indeterminate-bar--success {
        background: var(--n-color-success);
      }

      .n-progress__indeterminate-bar--success-blue {
        background: var(--n-progress-fill-success-blue);
      }

      .n-progress__indeterminate-bar--warning {
        background: var(--n-color-warning);
      }

      .n-progress__indeterminate-bar--danger {
        background: var(--n-color-danger);
      }

      .n-progress__segments--xs .n-progress__segment {
        height: 4px;
      }

      .n-progress__segments--sm .n-progress__segment {
        height: 5px;
      }

      .n-progress__segments--md .n-progress__segment {
        height: 9px;
      }

      .n-progress__segments--lg .n-progress__segment {
        height: 10px;
      }

      .n-progress__segment {
        flex: 1;
        border-radius: var(--n-radius-full);
        background: rgba(255, 255, 255, 0.08);
      }

      .n-progress__segment--gemini.n-progress__segment--filled {
        background: var(--n-progress-fill-gemini);
      }

      .n-progress__segment--gemini-full.n-progress__segment--filled {
        background: var(--n-progress-fill-gemini-full);
      }

      .n-progress__segment--success-blue.n-progress__segment--filled {
        background: var(--n-progress-fill-success-blue);
      }

      .n-progress__segment--primary.n-progress__segment--filled {
        background: var(--n-progress-fill-primary);
      }

      .n-progress__segment--secondary.n-progress__segment--filled {
        background: var(--n-progress-fill-secondary);
      }

      .n-progress__segment--success.n-progress__segment--filled {
        background: var(--n-color-success);
      }

      .n-progress__segment--warning.n-progress__segment--filled {
        background: var(--n-color-warning);
      }

      .n-progress__segment--danger.n-progress__segment--filled {
        background: var(--n-color-danger);
      }

      @media (prefers-reduced-motion: reduce) {
        .n-progress__fill {
          transition: none;
        }

        .n-progress__shimmer,
        .n-progress__indeterminate,
        .n-progress__indeterminate-bar {
          animation: none;
        }
      }

      @keyframes n-progress-shimmer {
        from {
          transform: translateX(-100%);
        }

        to {
          transform: translateX(220%);
        }
      }

      @keyframes n-progress-indeterminate-slide {
        0% {
          left: -50%;
          right: 100%;
        }

        60% {
          left: 100%;
          right: -50%;
        }

        100% {
          left: 100%;
          right: -50%;
        }
      }
      @keyframes n-progress-indeterminate-bar {
        0% {
          margin-left: -40%;
        }

        100% {
          margin-left: 100%;
        }
      }
    `,
  ],
})
export class NProgress {
  readonly value = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly variant = input<NProgressVariant>('primary');
  readonly size = input<NProgressSize>('sm');
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly indeterminateMode = input<NProgressIndeterminateMode>('fill');
  readonly label = input<string | undefined>(undefined);
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly hint = input<string | undefined>(undefined);
  readonly shimmer = input<boolean | undefined>(undefined);
  readonly step = input(0, { transform: numberAttribute });
  readonly totalSteps = input(0, { transform: numberAttribute });

  readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), Math.max(this.max(), 1)),
  );

  readonly percent = computed(() =>
    Math.round((this.clampedValue() / Math.max(this.max(), 1)) * 100),
  );

  readonly isSegmented = computed(() => this.totalSteps() > 1);

  readonly clampedStep = computed(() =>
    Math.min(Math.max(this.step(), 0), Math.max(this.totalSteps(), 1)),
  );

  readonly segmentIndexes = computed(() =>
    Array.from({ length: Math.max(this.totalSteps(), 0) }, (_, index) => index),
  );

  readonly showShimmer = computed(() => {
    if (this.shimmer() !== undefined) {
      return this.shimmer();
    }

    const variant = this.variant();
    return (
      (variant === 'gemini' || variant === 'gemini-full') &&
      !this.indeterminate() &&
      !this.isSegmented()
    );
  });

  readonly valueUsesGradient = computed(() => {
    const variant = this.variant();
    return (
      variant === 'gemini' ||
      variant === 'gemini-full' ||
      variant === 'primary' ||
      variant === 'secondary'
    );
  });
}
