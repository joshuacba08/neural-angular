import { booleanAttribute, Component, input, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NChipMode, NChipSize, NChipVariant } from './chip.types.js';

@Component({
  selector: 'n-chip',
  standalone: true,
  imports: [NIcon],
  template: `
    <span
      class="n-chip"
      [class.n-chip--filter]="mode() === 'filter'"
      [class.n-chip--tag]="mode() === 'tag'"
      [class.n-chip--default]="variant() === 'default'"
      [class.n-chip--primary]="variant() === 'primary'"
      [class.n-chip--secondary]="variant() === 'secondary'"
      [class.n-chip--success]="variant() === 'success'"
      [class.n-chip--warning]="variant() === 'warning'"
      [class.n-chip--danger]="variant() === 'danger'"
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
        max-width: 100%;
        border: 1px solid transparent;
        border-radius: var(--n-radius-full);
        font-family: var(--n-font-body);
        font-weight: var(--n-font-weight-medium);
        letter-spacing: 0;
        white-space: nowrap;
        vertical-align: middle;
        transition:
          border-color 150ms ease,
          background 150ms ease,
          color 150ms ease,
          opacity 150ms ease,
          box-shadow 150ms ease;
      }

      /* ── Filter chips (selectable) ── */
      .n-chip--filter {
        gap: 5px;
        height: 30px;
        padding: 0 14px;
        border-color: var(--n-border-1);
        background: var(--n-surface-2);
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        cursor: pointer;
        user-select: none;
      }

      .n-chip--filter.n-chip--sm {
        height: 24px;
        padding: 0 10px;
        font-size: var(--n-font-size-11);
      }

      .n-chip--filter:hover:not(.n-chip--disabled):not(.n-chip--selected) {
        border-color: transparent;
        background:
          var(--n-surface-3) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-chip--filter.n-chip--selected {
        border-color: transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-primary) border-box;
        color: var(--n-color-primary);
      }

      /* ── Tag chips (severity + closable) ── */
      .n-chip--tag {
        gap: 6px;
        padding: 4px 12px;
        font-size: 12.5px;
        line-height: 1.2;
        cursor: default;
      }

      .n-chip--tag.n-chip--default {
        border-color: var(--n-border-2);
        background: rgba(255, 255, 255, 0.07);
        color: var(--n-text-2);
      }

      .n-chip--tag.n-chip--primary {
        border-color: rgba(66, 133, 244, 0.22);
        background: var(--n-color-primary-alpha-10);
        color: var(--n-color-primary-bright);
      }

      .n-chip--tag.n-chip--secondary {
        border-color: rgba(123, 92, 246, 0.22);
        background: var(--n-color-secondary-alpha-10);
        color: var(--n-color-secondary);
      }

      .n-chip--tag.n-chip--success {
        border-color: rgba(52, 168, 83, 0.22);
        background: var(--n-color-success-alpha-10);
        color: var(--n-color-success);
      }

      .n-chip--tag.n-chip--warning {
        border-color: rgba(251, 188, 5, 0.22);
        background: var(--n-color-warning-alpha-10);
        color: var(--n-color-warning);
      }

      .n-chip--tag.n-chip--danger {
        border-color: rgba(234, 67, 53, 0.22);
        background: var(--n-color-danger-alpha-10);
        color: var(--n-color-danger);
      }

      :host(.n-chip-with-avatar) .n-chip--tag {
        padding: 3px 10px 3px 5px;
      }

      .n-chip--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .n-chip__content {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .n-chip__remove {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        opacity: 0.45;
        cursor: pointer;
        transition: opacity 120ms ease;
      }

      .n-chip__remove:hover:not(:disabled) {
        opacity: 1;
      }

      .n-chip__remove:focus-visible {
        opacity: 1;
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 2px;
        border-radius: var(--n-radius-full);
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
  readonly mode = input<NChipMode>('filter');
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
