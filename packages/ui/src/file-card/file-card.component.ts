import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { NBadge } from '../badge/badge.component.js';
import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import { formatFileSize, getFileExtension, getMediaKindFromFile } from '../media/media-utils.js';
import { NProgress } from '../progress/progress.component.js';
import type { NBadgeVariant } from '../badge/badge.types.js';
import type { NFileCardStatus, NFileCardVariant, NFileLike } from './file-card.types.js';

@Component({
  selector: 'n-file-card',
  standalone: true,
  imports: [NBadge, NButton, NIcon, NProgress],
  template: `
    <article
      class="n-file-card"
      [class.n-file-card--compact]="variant() === 'compact'"
      [class.n-file-card--detailed]="variant() === 'detailed'"
      [class.n-file-card--error]="resolvedStatus() === 'error'"
    >
      <span class="n-file-card__icon" aria-hidden="true">
        <n-icon [name]="fileIcon()" size="md" />
      </span>

      <div class="n-file-card__body">
        <div class="n-file-card__header">
          <div class="n-file-card__title-group">
            <h3>{{ resolvedName() }}</h3>
            <p>{{ fileMeta() }}</p>
          </div>

          <n-badge [variant]="statusVariant()" size="sm" [dot]="true">
            {{ statusLabel() }}
          </n-badge>
        </div>

        @if (showProgress()) {
          <n-progress
            [value]="resolvedProgress()"
            [variant]="progressVariant()"
            size="sm"
            [label]="progressLabel()"
            [showValue]="true"
          />
        }

        @if (resolvedError()) {
          <p class="n-file-card__error">{{ resolvedError() }}</p>
        }
      </div>

      @if (hasActions()) {
        <div class="n-file-card__actions" aria-label="File actions">
          @if (previewable()) {
            <n-button variant="ghost" size="sm" (click)="preview.emit()">
              <n-icon name="eye" size="sm" />
              Preview
            </n-button>
          }

          @if (downloadable()) {
            <n-button variant="ghost" size="sm" (click)="download.emit()">
              <n-icon name="download" size="sm" />
              Download
            </n-button>
          }

          @if (resolvedStatus() === 'error') {
            <n-button variant="secondary" size="sm" (click)="retry.emit()">
              <n-icon name="rotate-ccw" size="sm" />
              Retry
            </n-button>
          }

          @if (removable()) {
            <n-button variant="ghost" size="sm" (click)="removed.emit()">
              <n-icon name="trash-2" size="sm" />
              Remove
            </n-button>
          }
        </div>
      }
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-file-card {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: var(--n-space-4);
        align-items: start;
        padding: var(--n-space-4);
        border: 1px solid var(--n-file-card-border);
        border-radius: var(--n-radius-xl);
        background: var(--n-file-card-bg);
        color: var(--n-text-1);
      }

      .n-file-card--detailed {
        grid-template-columns: auto minmax(0, 1fr) auto;
      }

      .n-file-card--compact {
        gap: var(--n-space-3);
        padding: var(--n-space-3);
      }

      .n-file-card--error {
        border-color: color-mix(in srgb, var(--n-color-danger) 42%, var(--n-file-card-border));
      }

      .n-file-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-lg);
        background: color-mix(in srgb, var(--n-color-primary) 10%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
      }

      .n-file-card__body {
        display: grid;
        gap: var(--n-space-3);
        min-width: 0;
      }

      .n-file-card__header {
        display: flex;
        gap: var(--n-space-3);
        align-items: start;
        justify-content: space-between;
        min-width: 0;
      }

      .n-file-card__title-group {
        min-width: 0;
      }

      .n-file-card__title-group h3,
      .n-file-card__title-group p,
      .n-file-card__error {
        margin: 0;
      }

      .n-file-card__title-group h3 {
        overflow: hidden;
        color: var(--n-text-1);
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-semibold);
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .n-file-card__title-group p,
      .n-file-card__error {
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-file-card__error {
        color: var(--n-color-danger);
      }

      .n-file-card__actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-2);
        grid-column: 1 / -1;
      }

      .n-file-card--detailed .n-file-card__actions {
        grid-column: auto;
        justify-content: flex-end;
      }

      @media (max-width: 760px) {
        .n-file-card,
        .n-file-card--detailed {
          grid-template-columns: auto minmax(0, 1fr);
        }

        .n-file-card--detailed .n-file-card__actions {
          grid-column: 1 / -1;
          justify-content: flex-start;
        }
      }
    `,
  ],
})
export class NFileCard {
  readonly file = input<NFileLike | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly size = input<number | undefined>(undefined);
  readonly type = input<string | undefined>(undefined);
  readonly extension = input<string | undefined>(undefined);
  readonly status = input<NFileCardStatus | undefined>(undefined);
  readonly progress = input<number | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly variant = input<NFileCardVariant>('default');
  readonly removable = input(false, { transform: booleanAttribute });
  readonly downloadable = input(false, { transform: booleanAttribute });
  readonly previewable = input(false, { transform: booleanAttribute });

  readonly removed = output<void>();
  readonly download = output<void>();
  readonly preview = output<void>();
  readonly retry = output<void>();

  readonly resolvedName = computed(() => this.name() ?? this.file()?.name ?? 'Untitled file');
  readonly resolvedSize = computed(() => this.size() ?? this.file()?.size);
  readonly resolvedType = computed(() => this.type() ?? this.file()?.type);
  readonly resolvedExtension = computed(
    () => this.extension() ?? this.file()?.extension ?? getFileExtension(this.resolvedName()),
  );
  readonly resolvedStatus = computed<NFileCardStatus>(
    () => this.status() ?? this.file()?.status ?? 'idle',
  );
  readonly resolvedProgress = computed(() =>
    Math.min(Math.max(this.progress() ?? this.file()?.progress ?? 0, 0), 100),
  );
  readonly resolvedError = computed(() => this.error() ?? this.file()?.error ?? '');
  readonly fileMeta = computed(() => {
    const parts = [
      this.resolvedExtension() ? this.resolvedExtension().toUpperCase() : undefined,
      this.resolvedType(),
      formatFileSize(this.resolvedSize()),
    ].filter(Boolean);

    return parts.join(' · ');
  });
  readonly showProgress = computed(() =>
    ['uploading', 'processing'].includes(this.resolvedStatus()),
  );
  readonly hasActions = computed(
    () => this.previewable() || this.downloadable() || this.removable() || this.resolvedStatus() === 'error',
  );

  fileIcon(): string {
    const kind = getMediaKindFromFile({
      name: this.resolvedName(),
      type: this.resolvedType(),
    });

    if (kind === 'image') {
      return 'file-image';
    }

    if (kind === 'video') {
      return 'file-video';
    }

    if (kind === 'audio') {
      return 'file-audio';
    }

    if (kind === 'archive') {
      return 'archive';
    }

    return 'file-text';
  }

  statusLabel(): string {
    const labels: Record<NFileCardStatus, string> = {
      idle: 'Idle',
      uploading: 'Uploading',
      processing: 'Processing',
      success: 'Ready',
      warning: 'Warning',
      error: 'Error',
    };

    return labels[this.resolvedStatus()];
  }

  statusVariant(): NBadgeVariant {
    const variants: Record<NFileCardStatus, NBadgeVariant> = {
      idle: 'neutral',
      uploading: 'info',
      processing: 'primary',
      success: 'success',
      warning: 'warning',
      error: 'danger',
    };

    return variants[this.resolvedStatus()];
  }

  progressVariant(): 'primary' | 'success' | 'warning' | 'danger' {
    if (this.resolvedStatus() === 'error') {
      return 'danger';
    }

    if (this.resolvedStatus() === 'warning') {
      return 'warning';
    }

    if (this.resolvedStatus() === 'success') {
      return 'success';
    }

    return 'primary';
  }

  progressLabel(): string {
    return this.resolvedStatus() === 'uploading' ? 'Uploading' : 'Processing';
  }
}

