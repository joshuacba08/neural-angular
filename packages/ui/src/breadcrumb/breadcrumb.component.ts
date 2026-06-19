import { Component, input, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NBreadcrumbItem } from './breadcrumb.types.js';

@Component({
  selector: 'n-breadcrumb',
  standalone: true,
  imports: [NIcon],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="n-breadcrumb">
        @for (item of items(); track $index; let isLast = $last) {
          <li class="n-breadcrumb__item">
            @if (!isLast) {
              @if (isNavigable(item)) {
                <a
                  [href]="item.url!"
                  class="n-breadcrumb__link"
                  [class.n-breadcrumb__link--disabled]="item.disabled"
                  (click)="onItemClick($event, item, $index)"
                >
                  @if (item.icon) {
                    <n-icon
                      [name]="resolveIcon(item.icon)"
                      [size]="isHomeIcon(item.icon) ? 'xs' : 'sm'"
                      style="width: 13px; height: 13px;"
                    />
                  }
                  @if (item.label) {
                    <span>{{ item.label }}</span>
                  }
                </a>
              } @else {
                <button
                  type="button"
                  class="n-breadcrumb__link"
                  [class.n-breadcrumb__link--disabled]="item.disabled"
                  [disabled]="item.disabled"
                  (click)="onItemClick($event, item, $index)"
                >
                  @if (item.icon) {
                    <n-icon
                      [name]="resolveIcon(item.icon)"
                      [size]="isHomeIcon(item.icon) ? 'xs' : 'sm'"
                      style="width: 13px; height: 13px;"
                    />
                  }
                  @if (item.label) {
                    <span>{{ item.label }}</span>
                  }
                </button>
              }

              <span class="n-breadcrumb__separator" aria-hidden="true">
                @switch (separator()) {
                  @case ('chevron') {
                    <n-icon name="chevron-right" size="xs" style="width: 11px; height: 11px;" />
                  }
                  @case ('slash') {
                    <n-icon name="slash" size="xs" style="width: 11px; height: 11px;" />
                  }
                  @case ('dot') {
                    <span class="n-breadcrumb__dot"></span>
                  }
                }
              </span>
            } @else {
              <span
                class="n-breadcrumb__current"
                [class.n-breadcrumb__current--gradient]="activeGradient()"
                aria-current="page"
              >
                @if (item.icon) {
                  <n-icon
                    [name]="resolveIcon(item.icon)"
                    [size]="isHomeIcon(item.icon) ? 'xs' : 'sm'"
                    style="width: 13px; height: 13px;"
                  />
                }
                @if (item.label) {
                  <span>{{ item.label }}</span>
                }
              </span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-breadcrumb {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .n-breadcrumb__item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .n-breadcrumb__link {
        font-size: var(--n-font-size-13, 13px);
        color: var(--n-text-3, #8f8fbf);
        text-decoration: none;
        cursor: pointer;
        transition: color var(--n-transition-fast, 120ms);
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      button.n-breadcrumb__link {
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        text-align: inherit;
      }

      .n-breadcrumb__link:hover:not(.n-breadcrumb__link--disabled) {
        color: var(--n-color-primary-bright, #4285f4);
      }

      .n-breadcrumb__link--disabled {
        color: var(--n-text-4, #555577);
        cursor: not-allowed;
        pointer-events: none;
      }

      .n-breadcrumb__current {
        font-size: var(--n-font-size-13, 13px);
        color: var(--n-text-1, #ffffff);
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .n-breadcrumb__current--gradient {
        font-weight: 600;
        background: var(--n-progress-fill-primary);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }

      .n-breadcrumb__separator {
        color: var(--n-text-4, #555577);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .n-breadcrumb__dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--n-text-4, #555577);
        display: inline-block;
      }
    `,
  ],
})
export class NBreadcrumb {
  readonly items = input.required<NBreadcrumbItem[]>();
  readonly separator = input<'chevron' | 'slash' | 'dot'>('chevron');
  readonly activeGradient = input(false);
  readonly itemClick = output<{ item: NBreadcrumbItem; index: number; event: Event }>();

  isNavigable(item: NBreadcrumbItem): boolean {
    if (item.disabled) {
      return false;
    }

    const url = item.url?.trim();
    if (!url) {
      return false;
    }

    return url !== '#' && url !== 'javascript:void(0)' && !url.startsWith('javascript:');
  }

  onItemClick(event: Event, item: NBreadcrumbItem, index: number): void {
    if (!this.isNavigable(item)) {
      event.preventDefault();
    }

    this.itemClick.emit({ item, index, event });
  }

  resolveIcon(icon: string): string {
    return icon === 'house' ? 'home' : icon;
  }

  isHomeIcon(icon: string): boolean {
    return icon === 'house' || icon === 'home';
  }
}
