import { Component, input, numberAttribute } from '@angular/core';

const optionalNumberAttribute = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  return numberAttribute(value);
};

@Component({
  selector: 'n-job-card',
  standalone: true,
  template: `
    <div class="n-job-card">
      <div class="n-job-card__header">
        @if (thumbnail()) {
          <img [src]="thumbnail()" alt="Thumbnail" class="n-job-card__thumbnail" />
        } @else {
          <div class="n-job-card__thumbnail-placeholder"></div>
        }
        <div class="n-job-card__info">
          <h4 class="n-job-card__title">{{ title() }}</h4>
          <span class="n-job-card__subtitle">{{ subtitle() }}</span>
        </div>
        @if (status()) {
          <span
            class="n-job-card__badge"
            [class.n-job-card__badge--primary]="statusType() === 'primary'"
            [class.n-job-card__badge--success]="statusType() === 'success'"
            [class.n-job-card__badge--warning]="statusType() === 'warning'"
            [class.n-job-card__badge--danger]="statusType() === 'danger'"
            [class.n-job-card__badge--neutral]="statusType() === 'neutral'"
          >
            {{ status() }}
          </span>
        }
      </div>

      @if (progress() !== undefined && progress() !== null) {
        <div class="n-job-card__progress-section">
          <div class="n-job-card__progress-header">
            <span class="n-job-card__progress-title">{{ progressLabel() }}</span>
            <span class="n-job-card__progress-pct">{{ progress() }}%</span>
          </div>
          <div class="n-job-card__progress-track">
            <div class="n-job-card__progress-fill" [style.width.%]="progress()">
              <div class="n-job-card__shimmer"></div>
            </div>
          </div>
        </div>
      }

      <div class="n-job-card__content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-job-card {
        border-radius: var(--n-radius-lg);
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-subtle) border-box;
        overflow: hidden;
        width: 100%;
        box-sizing: border-box;
      }

      .n-job-card__header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px 10px;
      }

      .n-job-card__thumbnail,
      .n-job-card__thumbnail-placeholder {
        width: 68px;
        height: 42px;
        border-radius: 6px;
        background: linear-gradient(135deg, #0a082a, #0d1535);
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.06);
        object-fit: cover;
      }

      .n-job-card__info {
        flex: 1;
        min-width: 0;
      }

      .n-job-card__title {
        font-size: var(--n-font-size-13, 13px);
        font-weight: var(--n-font-weight-semibold, 600);
        margin: 0 0 2px 0;
        color: var(--n-text-1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .n-job-card__subtitle {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10, 10px);
        color: var(--n-text-3);
      }

      .n-job-card__badge {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10, 10px);
        padding: 3px 10px;
        border-radius: 99px;
        border: 1px solid transparent;
        white-space: nowrap;
      }

      .n-job-card__badge--primary {
        background: rgba(66, 133, 244, 0.15);
        color: var(--n-color-primary-light, #8ab4f8);
        border-color: rgba(66, 133, 244, 0.25);
      }

      .n-job-card__badge--success {
        background: rgba(52, 168, 83, 0.15);
        color: var(--n-color-success, #81c995);
        border-color: rgba(52, 168, 83, 0.25);
      }

      .n-job-card__badge--warning {
        background: rgba(251, 188, 5, 0.15);
        color: var(--n-color-warning, #fdd663);
        border-color: rgba(251, 188, 5, 0.25);
      }

      .n-job-card__badge--danger {
        background: rgba(234, 67, 53, 0.15);
        color: var(--n-color-danger, #f28b82);
        border-color: rgba(234, 67, 53, 0.25);
      }

      .n-job-card__badge--neutral {
        background: rgba(255, 255, 255, 0.08);
        color: var(--n-text-2);
        border-color: rgba(255, 255, 255, 0.12);
      }

      .n-job-card__progress-section {
        padding: 0 16px 10px;
      }

      .n-job-card__progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      .n-job-card__progress-title {
        font-size: var(--n-font-size-11, 11.5px);
        color: var(--n-text-2);
      }

      .n-job-card__progress-pct {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11, 11px);
        color: var(--n-text-1);
      }

      .n-job-card__progress-track {
        height: 5px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 99px;
        overflow: hidden;
        position: relative;
      }

      .n-job-card__progress-fill {
        height: 100%;
        border-radius: 99px;
        background: linear-gradient(
          90deg,
          var(--n-color-primary, #4f8eff),
          var(--n-color-secondary, #7b5cf6),
          var(--n-color-tertiary, #d946ef)
        );
        position: relative;
        overflow: hidden;
      }

      .n-job-card__shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.18) 50%,
          transparent 100%
        );
        animation: n-job-card-shimmer 1.5s ease-in-out infinite;
      }

      .n-job-card__content {
        margin: 0 16px 14px;
        padding: 10px 12px;
        border: 1px solid var(--n-border-0);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
      }

      .n-job-card__content:empty {
        display: none;
      }

      @keyframes n-job-card-shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(200%);
        }
      }
    `,
  ],
})
export class NJobCard {
  readonly thumbnail = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly status = input<string | undefined>(undefined);
  readonly statusType = input<'primary' | 'success' | 'warning' | 'danger' | 'neutral'>('primary');
  readonly progress = input<number | undefined, unknown>(undefined, {
    transform: optionalNumberAttribute,
  });
  readonly progressLabel = input<string>('');
}
