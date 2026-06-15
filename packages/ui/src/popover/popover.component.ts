import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';

import { N_POPOVER_DATA } from './popover.tokens.js';

@Component({
  selector: 'n-popover',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <section class="n-popover">
      @if (templateContent) {
        <ng-container [ngTemplateOutlet]="templateContent" />
      } @else {
        <p>{{ textContent }}</p>
      }
    </section>
  `,
  styles: [
    `
      .n-popover {
        min-width: 180px;
        max-width: min(320px, calc(100vw - 32px));
        padding: var(--n-space-3);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-lg);
        background: var(--n-popover-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-overlay-panel-shadow);
      }

      .n-popover p {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.6;
      }
    `,
  ],
})
export class NPopoverComponent {
  readonly data = inject(N_POPOVER_DATA);
  readonly templateContent =
    this.data.content instanceof TemplateRef ? this.data.content : null;
  readonly textContent =
    this.data.content instanceof TemplateRef ? '' : this.data.content;
}
