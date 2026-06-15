import { booleanAttribute, Component, input, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NChipSize, NChipVariant } from './chip.types.js';

@Component({
  selector: 'n-chip',
  standalone: true,
  imports: [NIcon],
  template: `
    <span
      class="n-chip"
      [class.n-chip--default]="variant() === 'default'"
      [class.n-chip--primary]="variant() === 'primary'"
      [class.n-chip--secondary]="variant() === 'secondary'"
      [class.n-chip--sm]="size() === 'sm'"
      [class.n-chip--md]="size() === 'md'"
      [class.n-chip--selected]="selected()"
      [class.n-chip--disabled]="disabled()"
    >
      <span class="n-chip__content">
        <ng-content />
      </span>

      @if (removable()) {
        <button
          type="button"
          class="n-chip__remove"
          aria-label="Remove chip"
          [disabled]="disabled()"
          (click)="handleRemove()"
        >
          <n-icon name="x" size="xs" />
        </button>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      .n-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--n-space-2);
        max-width: 100%;
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-full);
        background: color-mix(in srgb, var(--n-surface-3) 88%, transparent);
        color: var(--n-text-1);
        font-family: var(--n-font-body);
        font-weight: var(--n-font-weight-medium);
        letter-spacing: 0;
        transition:
          border-color var(--n-transition-fast),
          background var(--n-transition-fast),
          color var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-chip--sm {
        min-height: 28px;
        padding: 0 var(--n-space-2) 0 var(--n-space-3);
        font-size: var(--n-font-size-12);
      }

      .n-chip--md {
        min-height: 34px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-chip--primary {
        border-color: color-mix(in srgb, var(--n-color-primary) 24%, var(--n-border-1));
        background: var(--n-color-primary-alpha-10);
      }

      .n-chip--secondary {
        border-color: color-mix(in srgb, var(--n-color-secondary) 24%, var(--n-border-1));
        background: var(--n-color-secondary-alpha-10);
      }

      .n-chip--selected {
        border-color: color-mix(in srgb, var(--n-color-primary) 60%, var(--n-border-2));
        color: var(--n-text-1);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--n-color-primary) 36%, transparent);
      }

      .n-chip--disabled {
        opacity: 0.5;
      }

      .n-chip__content {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .n-chip__remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        margin-right: calc(var(--n-space-1) * -1);
        border: 0;
        border-radius: var(--n-radius-full);
        background: transparent;
        color: currentColor;
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          color var(--n-transition-fast);
      }

      .n-chip__remove:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 12%, transparent);
      }

      .n-chip__remove:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 2px;
      }

      .n-chip__remove:disabled {
        cursor: not-allowed;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-chip,
        .n-chip__remove {
          transition: none;
        }
      }
    `,
  ],
})
export class NChip {
  readonly variant = input<NChipVariant>('default');
  readonly size = input<NChipSize>('md');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly removable = input(false, { transform: booleanAttribute });
  readonly removed = output<void>();

  handleRemove(): void {
    if (!this.disabled()) {
      this.removed.emit();
    }
  }
}
