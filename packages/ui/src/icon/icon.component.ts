import { booleanAttribute, Component, input, numberAttribute } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

import type { NIconSize } from './icon.types.js';

@Component({
  selector: 'n-icon',
  standalone: true,
  imports: [LucideDynamicIcon],
  template: `
    @if (name()) {
      <svg
        class="n-icon"
        [class.n-icon--xs]="size() === 'xs'"
        [class.n-icon--sm]="size() === 'sm'"
        [class.n-icon--md]="size() === 'md'"
        [class.n-icon--lg]="size() === 'lg'"
        [class.n-icon--xl]="size() === 'xl'"
        [lucideIcon]="name()"
        [attr.aria-hidden]="decorative() ? 'true' : null"
        [attr.role]="decorative() ? null : 'img'"
        [attr.aria-label]="decorative() ? null : label()"
        [attr.stroke-width]="strokeWidth()"
      />
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: var(--n-icon-size-md);
        height: var(--n-icon-size-md);
        color: currentColor;
        line-height: 0;
        vertical-align: -0.125em;
      }

      :host:has(.n-icon--xs) {
        width: var(--n-icon-size-xs);
        height: var(--n-icon-size-xs);
      }

      :host:has(.n-icon--sm) {
        width: var(--n-icon-size-sm);
        height: var(--n-icon-size-sm);
      }

      :host:has(.n-icon--md) {
        width: var(--n-icon-size-md);
        height: var(--n-icon-size-md);
      }

      :host:has(.n-icon--lg) {
        width: var(--n-icon-size-lg);
        height: var(--n-icon-size-lg);
      }

      :host:has(.n-icon--xl) {
        width: var(--n-icon-size-xl);
        height: var(--n-icon-size-xl);
      }

      .n-icon {
        display: block;
        width: 100%;
        height: 100%;
        color: currentColor;
        stroke: currentColor;
      }
    `,
  ],
})
export class NIcon {
  readonly name = input('');
  readonly size = input<NIconSize>('md');
  readonly label = input<string | undefined>(undefined);
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly strokeWidth = input(2, { transform: numberAttribute });
}
