import { Component, input } from '@angular/core';

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
              <a
                [href]="item.url || 'javascript:void(0)'"
                class="n-breadcrumb__link"
                [class.n-breadcrumb__link--disabled]="item.disabled"
              >
                @if (item.icon) {
                  <n-icon
                    [name]="item.icon"
                    [size]="item.icon === 'house' || item.icon === 'home' ? 'xs' : 'sm'"
                    style="width: 13px; height: 13px;"
                  />
                }
                @if (item.label) {
                  <span>{{ item.label }}</span>
                }
              </a>

              <span class="n-breadcrumb__separator" aria-hidden="true">
                @if (separator() === 'chevron') {
                  <n-icon name="chevron-right" size="xs" style="width: 11px; height: 11px;" />
                } @else {
                  <n-icon name="slash" size="xs" style="width: 11px; height: 11px;" />
                }
              </span>
            } @else {
              <span
                class="n-breadcrumb__current"
                [class.n-breadcrumb__current--gradient]="activeGradient()"
              >
                @if (item.icon) {
                  <n-icon [name]="item.icon" size="sm" style="width: 13px; height: 13px;" />
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
        background: var(--n-gradient-gemini, linear-gradient(135deg, #4f8eff, #7b5cf6, #d946ef, #f43f5e));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .n-breadcrumb__separator {
        color: var(--n-text-4, #555577);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    `,
  ],
})
export class NBreadcrumb {
  readonly items = input.required<NBreadcrumbItem[]>();
  readonly separator = input<'chevron' | 'slash'>('chevron');
  readonly activeGradient = input(false);
}
