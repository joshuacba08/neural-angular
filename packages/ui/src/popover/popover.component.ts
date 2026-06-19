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
        padding: 16px;
        border: 1px solid transparent;
        border-radius: 14px;
        background:
          linear-gradient(rgba(20, 20, 38, 0.88), rgba(15, 15, 28, 0.92)) padding-box,
          var(--n-gradient-border-primary) border-box;
        backdrop-filter: blur(16px);
        color: var(--n-text-1);
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5);
      }

      .n-popover p {
        margin: 0;
        color: var(--n-text-2);
        font-size: 11.5px;
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
