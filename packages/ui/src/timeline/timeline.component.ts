import { booleanAttribute, Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type {
  NTimelineDensity,
  NTimelineItemStatus,
  NTimelineTimeAlign,
} from './timeline.types.js';

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
        gap: var(--n-space-5);
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
        <div
          class="n-timeline-item__header"
          [class.n-timeline-item__header--inline]="timeAlign() === 'inline'"
        >
          @if (timeAlign() === 'inline') {
            <div class="n-timeline-item__title-row">
              @if (title()) {
                <h3>{{ title() }}</h3>
              }
              @if (time()) {
                <time [class.n-timeline-item__time--accent]="timeAccent()">{{ time() }}</time>
              }
            </div>
          } @else {
            @if (title()) {
              <h3>{{ title() }}</h3>
            }
            @if (time()) {
              <time [class.n-timeline-item__time--accent]="timeAccent()">{{ time() }}</time>
            }
          }
        </div>
        @if (description()) {
          <p>{{ description() }}</p>
        }
        <div class="n-timeline-item__slot">
          <ng-content />
        </div>
      </div>
    </li>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      @keyframes n-timeline-node-glow {
        0%,
        100% {
          box-shadow: 0 0 6px color-mix(in srgb, var(--n-timeline-status) 30%, transparent);
        }

        50% {
          box-shadow:
            0 0 16px color-mix(in srgb, var(--n-timeline-status) 55%, transparent),
            0 0 28px color-mix(in srgb, var(--n-timeline-status) 18%, transparent);
        }
      }

      .n-timeline-item {
        --n-timeline-status: var(--n-text-3);
        --n-timeline-connector-span: var(--n-space-5);

        position: relative;
        display: grid;
        grid-template-columns: var(--n-timeline-dot-size) minmax(0, 1fr);
        gap: var(--n-space-3);
        min-width: 0;
      }

      :host-context(.n-timeline--compact) .n-timeline-item {
        --n-timeline-connector-span: var(--n-space-2);
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

      .n-timeline-item--info {
        --n-timeline-status: var(--n-color-info);
      }

      .n-timeline-item--running {
        --n-timeline-status: var(--n-color-primary);
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
        bottom: calc(var(--n-timeline-connector-span) * -1);
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
        border: 1.5px solid color-mix(in srgb, var(--n-timeline-status) 54%, var(--n-border-1));
        border-radius: var(--n-radius-full);
        background: color-mix(in srgb, var(--n-timeline-status) 16%, var(--n-surface-2));
        color: var(--n-timeline-status);
      }

      .n-timeline-item--running .n-timeline-item__dot {
        color: var(--n-color-primary-bright);
        animation: n-timeline-node-glow 1.5s ease-in-out infinite;
      }

      .n-timeline-item--active:not(.n-timeline-item--running) .n-timeline-item__dot {
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--n-timeline-status) 12%, transparent);
      }

      .n-timeline-item__body {
        min-width: 0;
        padding-top: 3px;
      }

      .n-timeline-item__header {
        display: flex;
        justify-content: space-between;
        gap: var(--n-space-3);
      }

      .n-timeline-item__header--inline {
        justify-content: flex-start;
      }

      .n-timeline-item__title-row {
        display: flex;
        align-items: baseline;
        gap: var(--n-space-2);
        min-width: 0;
      }

      .n-timeline-item__header h3,
      .n-timeline-item__body p {
        margin: 0;
      }

      .n-timeline-item__header h3 {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-medium);
        line-height: 1.4;
      }

      .n-timeline-item__header time {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 0.59375rem;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }

      .n-timeline-item__time--accent {
        color: var(--n-color-primary-bright);
      }

      .n-timeline-item__body p {
        margin-top: 3px;
        color: var(--n-text-3);
        font-size: var(--n-font-size-12);
        line-height: 1.6;
      }

      .n-timeline-item__slot {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-2);
        margin-top: 7px;
      }

      .n-timeline-item__slot:empty {
        display: none;
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
  readonly timeAlign = input<NTimelineTimeAlign>('end');
  readonly timeAccent = input(false, { transform: booleanAttribute });
  readonly active = input(false, { transform: booleanAttribute });
}
