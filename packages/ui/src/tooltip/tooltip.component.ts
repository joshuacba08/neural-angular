import { Component, inject } from '@angular/core';

import { N_TOOLTIP_DATA } from './tooltip.tokens.js';

@Component({
  selector: 'n-tooltip',
  standalone: true,
  template: `
    <div
      class="n-tooltip"
      role="tooltip"
      [class]="'n-tooltip--' + (data.position || 'top')"
    >
      {{ data.text }}
      <span class="n-tooltip__arrow" aria-hidden="true"></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-tooltip {
        position: relative;
        max-width: 320px;
        padding: 5px 10px;
        border: 1px solid var(--n-border-2);
        border-radius: 7px;
        background: var(--n-tooltip-bg);
        color: var(--n-text-2);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
        font-size: 11.5px;
        line-height: 1.45;
        white-space: nowrap;
      }

      .n-tooltip__arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        pointer-events: none;
      }

      /* Position variants for arrow */
      .n-tooltip--top .n-tooltip__arrow {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px 5px 0;
        border-color: var(--n-tooltip-bg) transparent transparent;
      }

      .n-tooltip--bottom .n-tooltip__arrow {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 5px 5px;
        border-color: transparent transparent var(--n-tooltip-bg);
      }

      .n-tooltip--left .n-tooltip__arrow {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px 0 5px 5px;
        border-color: transparent transparent transparent var(--n-tooltip-bg);
      }

      .n-tooltip--right .n-tooltip__arrow {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px 5px 5px 0;
        border-color: transparent var(--n-tooltip-bg) transparent transparent;
      }
    `,
  ],
})
export class NTooltipComponent {
  readonly data = inject(N_TOOLTIP_DATA);
}
