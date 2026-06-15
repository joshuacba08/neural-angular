import { Component, inject } from '@angular/core';

import { N_TOOLTIP_DATA } from './tooltip.tokens.js';

@Component({
  selector: 'n-tooltip',
  standalone: true,
  template: `<div class="n-tooltip" role="tooltip">{{ data.text }}</div>`,
  styles: [
    `
      .n-tooltip {
        max-width: 260px;
        padding: var(--n-space-2) var(--n-space-3);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-md);
        background: var(--n-tooltip-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }
    `,
  ],
})
export class NTooltipComponent {
  readonly data = inject(N_TOOLTIP_DATA);
}
