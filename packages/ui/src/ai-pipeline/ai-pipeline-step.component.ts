import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import type { NAIPipelineStepStatus } from '../ai/ai.types.js';
import { NBadge } from '../badge/badge.component.js';
import type { NBadgeVariant } from '../badge/badge.types.js';
import { NIcon } from '../icon/icon.component.js';
import { NProgress } from '../progress/progress.component.js';
import type { NProgressVariant } from '../progress/progress.types.js';
import type {
  NAIPipelineDensity,
  NAIPipelineOrientation,
} from './ai-pipeline.types.js';

const optionalNumberAttribute = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  return numberAttribute(value as number | string);
};

@Component({
  selector: 'n-ai-pipeline-step',
  standalone: true,
  imports: [NBadge, NIcon, NProgress],
  template: `
    <li
      class="n-ai-pipeline-step"
      [class.n-ai-pipeline-step--horizontal]="resolvedOrientation() === 'horizontal'"
      [class.n-ai-pipeline-step--compact]="resolvedDensity() === 'compact'"
      [class.n-ai-pipeline-step--pending]="status() === 'pending'"
      [class.n-ai-pipeline-step--running]="isRunning()"
      [class.n-ai-pipeline-step--success]="status() === 'success'"
      [class.n-ai-pipeline-step--warning]="status() === 'warning'"
      [class.n-ai-pipeline-step--error]="status() === 'error'"
      [class.n-ai-pipeline-step--skipped]="status() === 'skipped'"
    >
      <span class="n-ai-pipeline-step__marker" aria-hidden="true">
        <span class="n-ai-pipeline-step__marker-core">
          @if (icon()) {
            <n-icon [name]="icon() ?? ''" size="xs" />
          }
        </span>
      </span>

      <div class="n-ai-pipeline-step__body">
        <div class="n-ai-pipeline-step__header">
          <div class="n-ai-pipeline-step__copy">
            @if (title()) {
              <h3>{{ title() }}</h3>
            }
            @if (metadata()) {
              <p class="n-ai-pipeline-step__meta">{{ metadata() }}</p>
            }
          </div>

          <n-badge [variant]="statusVariant()" size="sm">
            {{ status() }}
          </n-badge>
        </div>

        @if (description()) {
          <p class="n-ai-pipeline-step__description">{{ description() }}</p>
        }

        @if (resolvedShowProgress() && progress() !== undefined && isRunning()) {
          <n-progress
            [value]="progress() ?? 0"
            [variant]="progressVariant()"
            size="sm"
            [showValue]="true"
          />
        }
      </div>

      @if (resolvedShowConnector()) {
        <span class="n-ai-pipeline-step__connector" aria-hidden="true"></span>
      }
    </li>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-ai-pipeline-step {
        --n-ai-pipeline-status-color: var(--n-text-3);

        position: relative;
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: var(--n-space-3);
        min-width: 0;
      }

      .n-ai-pipeline-step--horizontal {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
      }

      .n-ai-pipeline-step--compact {
        gap: var(--n-space-2);
      }

      .n-ai-pipeline-step--success {
        --n-ai-pipeline-status-color: var(--n-color-success);
      }

      .n-ai-pipeline-step--warning {
        --n-ai-pipeline-status-color: var(--n-color-warning);
      }

      .n-ai-pipeline-step--error {
        --n-ai-pipeline-status-color: var(--n-color-danger);
      }

      .n-ai-pipeline-step--running {
        --n-ai-pipeline-status-color: var(--n-color-primary-bright);
      }

      .n-ai-pipeline-step__marker {
        position: relative;
        display: inline-flex;
        align-items: flex-start;
        justify-content: center;
      }

      .n-ai-pipeline-step__marker-core {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: 2px solid
          color-mix(in srgb, var(--n-ai-pipeline-status-color) 70%, var(--n-border-1));
        border-radius: var(--n-radius-full);
        background: color-mix(
          in srgb,
          var(--n-ai-pipeline-status-color) 14%,
          var(--n-pipeline-step-bg)
        );
        color: var(--n-ai-pipeline-status-color);
      }

      .n-ai-pipeline-step--running .n-ai-pipeline-step__marker-core {
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--n-ai-pipeline-status-color) 14%, transparent);
        animation: n-ai-pipeline-pulse 1.5s ease-in-out infinite;
      }

      .n-ai-pipeline-step__body {
        display: grid;
        gap: var(--n-space-2);
        min-width: 0;
        padding: var(--n-space-2) var(--n-space-3) var(--n-space-2) 0;
        border-radius: var(--n-radius-lg);
        background: transparent;
      }

      .n-ai-pipeline-step--horizontal .n-ai-pipeline-step__body {
        width: 100%;
        padding: 0;
      }

      .n-ai-pipeline-step__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--n-space-3);
      }

      .n-ai-pipeline-step--horizontal .n-ai-pipeline-step__header {
        flex-direction: column;
        align-items: center;
      }

      .n-ai-pipeline-step__copy {
        min-width: 0;
      }

      .n-ai-pipeline-step__copy h3,
      .n-ai-pipeline-step__description,
      .n-ai-pipeline-step__meta {
        margin: 0;
      }

      .n-ai-pipeline-step__copy h3 {
        color: var(--n-text-1);
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-ai-pipeline-step__meta {
        margin-top: 2px;
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
      }

      .n-ai-pipeline-step__description {
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.55;
      }

      .n-ai-pipeline-step__connector {
        position: absolute;
        left: 11px;
        top: 28px;
        bottom: calc(var(--n-space-4) * -1);
        width: 2px;
        border-radius: var(--n-radius-full);
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--n-ai-pipeline-status-color) 44%, transparent),
          var(--n-pipeline-line)
        );
      }

      .n-ai-pipeline-step--horizontal .n-ai-pipeline-step__connector {
        top: 11px;
        right: calc(var(--n-space-5) * -1);
        bottom: auto;
        left: calc(50% + 16px);
        width: auto;
        height: 2px;
        background: linear-gradient(
          90deg,
          color-mix(in srgb, var(--n-ai-pipeline-status-color) 44%, transparent),
          var(--n-pipeline-line)
        );
      }

      .n-ai-pipeline-step--compact .n-ai-pipeline-step__connector {
        bottom: calc(var(--n-space-3) * -1);
      }

      @media (prefers-reduced-motion: reduce) {
        .n-ai-pipeline-step--running .n-ai-pipeline-step__marker-core {
          animation: none;
        }
      }

      @keyframes n-ai-pipeline-pulse {
        0%,
        100% {
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--n-ai-pipeline-status-color) 10%, transparent);
        }

        50% {
          box-shadow: 0 0 0 10px color-mix(in srgb, var(--n-ai-pipeline-status-color) 16%, transparent);
        }
      }
    `,
  ],
})
export class NAIPipelineStep {
  private readonly contextOrientation = signal<NAIPipelineOrientation>('vertical');
  private readonly contextDensity = signal<NAIPipelineDensity>('comfortable');
  private readonly contextShowProgress = signal(true);
  private readonly contextShowConnector = signal(true);
  private readonly usePipelineContext = signal(false);

  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly status = input<NAIPipelineStepStatus>('pending');
  readonly progress = input<number | undefined>(undefined, {
    transform: optionalNumberAttribute,
  });
  readonly metadata = input<string | undefined>(undefined);
  readonly active = input(false, { transform: booleanAttribute });
  readonly orientation = input<NAIPipelineOrientation>('vertical');
  readonly density = input<NAIPipelineDensity>('comfortable');
  readonly showProgress = input(true, { transform: booleanAttribute });
  readonly showConnector = input(true, { transform: booleanAttribute });

  readonly resolvedOrientation = computed(() =>
    this.usePipelineContext() ? this.contextOrientation() : this.orientation(),
  );
  readonly resolvedDensity = computed(() =>
    this.usePipelineContext() ? this.contextDensity() : this.density(),
  );
  readonly resolvedShowProgress = computed(() =>
    this.usePipelineContext() ? this.contextShowProgress() : this.showProgress(),
  );
  readonly resolvedShowConnector = computed(() =>
    this.usePipelineContext() ? this.contextShowConnector() : this.showConnector(),
  );
  readonly isRunning = computed(
    () => this.active() || this.status() === 'running',
  );

  applyPipelineContext(context: {
    orientation: NAIPipelineOrientation;
    density: NAIPipelineDensity;
    showProgress: boolean;
    showConnector: boolean;
  }): void {
    this.usePipelineContext.set(true);
    this.contextOrientation.set(context.orientation);
    this.contextDensity.set(context.density);
    this.contextShowProgress.set(context.showProgress);
    this.contextShowConnector.set(context.showConnector);
  }

  statusVariant(): NBadgeVariant {
    switch (this.status()) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'running':
        return 'info';
      case 'skipped':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  progressVariant(): NProgressVariant {
    switch (this.status()) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
