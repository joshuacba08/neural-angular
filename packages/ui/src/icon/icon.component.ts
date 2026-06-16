import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

import type { NIconName, NIconSize } from './icon.types.js';

const ICON_SIZE_VARS: Record<NIconSize, string> = {
  xs: 'var(--n-icon-size-xs)',
  sm: 'var(--n-icon-size-sm)',
  md: 'var(--n-icon-size-md)',
  lg: 'var(--n-icon-size-lg)',
  xl: 'var(--n-icon-size-xl)',
};

@Component({
  selector: 'n-icon',
  standalone: true,
  imports: [LucideDynamicIcon],
  host: {
    '[attr.data-icon-name]': 'name() || null',
    '[attr.data-icon-size]': 'size()',
    '[style.--n-icon-current-size]': 'iconDimension()',
  },
  template: `
    @if (name()) {
      <svg
        class="n-icon"
        [lucideIcon]="name()"
        [attr.focusable]="'false'"
        [attr.aria-hidden]="decorative() ? 'true' : null"
        [attr.role]="decorative() ? null : 'img'"
        [attr.aria-label]="decorative() ? null : resolvedLabel()"
        [attr.title]="decorative() ? null : resolvedLabel()"
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
        width: var(--n-icon-current-size);
        height: var(--n-icon-current-size);
        min-width: var(--n-icon-current-size);
        color: currentColor;
        line-height: 0;
        transition:
          color var(--n-transition-fast),
          opacity var(--n-transition-fast),
          transform var(--n-transition-fast);
        vertical-align: -0.125em;
      }

      .n-icon {
        display: block;
        width: 100%;
        height: 100%;
        color: currentColor;
        overflow: visible;
        pointer-events: none;
        stroke: currentColor;
      }
    `,
  ],
})
export class NIcon {
  readonly name = input<NIconName | ''>('');
  readonly size = input<NIconSize>('md');
  readonly label = input<string | undefined>(undefined);
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly strokeWidth = input(2, { transform: numberAttribute });

  readonly iconDimension = computed(() => ICON_SIZE_VARS[this.size()]);

  readonly resolvedLabel = computed(() => {
    const explicit = this.label()?.trim();

    if (explicit) {
      return explicit;
    }

    const iconName = this.name().trim();

    if (!iconName) {
      return undefined;
    }

    return iconName
      .split(/[-_]+/g)
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() + part.slice(1))
      .join(' ');
  });
}
