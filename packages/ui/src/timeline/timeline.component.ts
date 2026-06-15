import { booleanAttribute, Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NTimelineDensity, NTimelineItemStatus } from './timeline.types.js';

@Component({
  selector: 'n-timeline',
  standalone: true,
  template: `
    <ol class="n-timeline" [class.n-timeline--compact]="density() === 'compact'">
      <ng-content />
    </ol>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-timeline {
        display: grid;
        gap: var(--n-space-4);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .n-timeline--compact {
        gap: var(--n-space-2);
      }
    `,
  ],
})
export class NTimeline {
  readonly density = input<NTimelineDensity>('comfortable');
}

@Component({
  selector: 'n-timeline-item',
  standalone: true,
  imports: [NIcon],
  template: `
    <li
      class="n-timeline-item"
      [class.n-timeline-item--active]="active()"
      [class.n-timeline-item--success]="status() === 'success'"
      [class.n-timeline-item--warning]="status() === 'warning'"
      [class.n-timeline-item--danger]="status() === 'danger'"
      [class.n-timeline-item--info]="status() === 'info'"
      [class.n-timeline-item--running]="status() === 'running'"
      [class.n-timeline-item--pending]="status() === 'pending'"
    >
      <span class="n-timeline-item__rail" aria-hidden="true">
        <span class="n-timeline-item__dot">
          @if (icon()) {
            <n-icon [name]="icon() ?? ''" size="xs" />
          }
        </span>
      </span>

      <div class="n-timeline-item__body">
        <div class="n-timeline-item__header">
          @if (title()) {
            <h3>{{ title() }}</h3>
          }
          @if (time()) {
            <time>{{ time() }}</time>
          }
        </div>
        @if (description()) {
          <p>{{ description() }}</p>
        }
        <ng-content />
      </div>
    </li>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-timeline-item {
        --n-timeline-status: var(--n-text-3);

        position: relative;
        display: grid;
        grid-template-columns: var(--n-timeline-dot-size) minmax(0, 1fr);
        gap: var(--n-space-3);
        min-width: 0;
      }

      .n-timeline-item--success {
        --n-timeline-status: var(--n-color-success);
      }

      .n-timeline-item--warning {
        --n-timeline-status: var(--n-color-warning);
      }

      .n-timeline-item--danger {
        --n-timeline-status: var(--n-color-danger);
      }

      .n-timeline-item--info,
      .n-timeline-item--running {
        --n-timeline-status: var(--n-color-info);
      }

      .n-timeline-item--pending {
        --n-timeline-status: var(--n-text-3);
      }

      .n-timeline-item__rail {
        position: relative;
        display: flex;
        justify-content: center;
      }

      .n-timeline-item__rail::after {
        position: absolute;
        top: var(--n-timeline-dot-size);
        bottom: calc(var(--n-space-4) * -1);
        left: 50%;
        width: 1.5px;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--n-timeline-status) 40%, transparent),
          color-mix(in srgb, var(--n-timeline-status) 24%, transparent),
          transparent
        );
        transform: translateX(-50%);
        content: '';
      }

      :host:last-child .n-timeline-item__rail::after {
        display: none;
      }

      .n-timeline-item__dot {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--n-timeline-dot-size);
        height: var(--n-timeline-dot-size);
        border: 1px solid color-mix(in srgb, var(--n-timeline-status) 54%, var(--n-border-1));
        border-radius: var(--n-radius-full);
        background: color-mix(in srgb, var(--n-timeline-status) 16%, var(--n-surface-2));
        color: var(--n-timeline-status);
      }

      .n-timeline-item--running .n-timeline-item__dot,
      .n-timeline-item--active .n-timeline-item__dot {
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--n-timeline-status) 12%, transparent);
      }

      .n-timeline-item__body {
        min-width: 0;
        padding-bottom: var(--n-space-2);
      }

      .n-timeline-item__header {
        display: flex;
        justify-content: space-between;
        gap: var(--n-space-3);
      }

      .n-timeline-item__header h3,
      .n-timeline-item__body p {
        margin: 0;
      }

      .n-timeline-item__header h3 {
        color: var(--n-text-1);
        font-size: var(--n-font-size-14);
        line-height: 1.4;
      }

      .n-timeline-item__header time {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 0.59375rem;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }

      .n-timeline-item__body p {
        margin-top: var(--n-space-1);
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.6;
      }
    `,
  ],
})
export class NTimelineItem {
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly time = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly status = input<NTimelineItemStatus>('neutral');
  readonly active = input(false, { transform: booleanAttribute });
}
