import { CdkConnectedOverlay, CdkOverlayOrigin, type ConnectedPosition } from '@angular/cdk/overlay';
import { booleanAttribute, Component, computed, input, output, signal } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NSelectOption, NSelectSize } from './select.types.js';

type NResolvedSelectOption = NSelectOption & {
  readonly placeholder?: boolean;
};

type NSelectTriggerLike = {
  getBoundingClientRect(): {
    width: number;
  };
};

type NSelectKeyboardEventLike = {
  key?: string;
  preventDefault?: () => void;
};

let nextSelectId = 0;

@Component({
  selector: 'n-select',
  standalone: true,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, NIcon],
  template: `
    <div
      class="n-select-field"
      [class.n-select-field--sm]="size() === 'sm'"
      [class.n-select-field--md]="size() === 'md'"
      [class.n-select-field--lg]="size() === 'lg'"
      [class.n-select-field--open]="open()"
      [class.n-select-field--invalid]="!!error()"
      [class.n-select-field--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-select-field__label" [id]="labelId" [for]="triggerId">{{ label() }}</label>
      }

      <div class="n-select-field__shell" cdkOverlayOrigin #origin="cdkOverlayOrigin">
        <button
          #trigger
          type="button"
          class="n-select-field__control"
          [id]="triggerId"
          role="combobox"
          [disabled]="disabled()"
          [attr.aria-controls]="listboxId"
          [attr.aria-describedby]="descriptionId()"
          [attr.aria-expanded]="open()"
          [attr.aria-haspopup]="'listbox'"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-labelledby]="label() ? labelId : null"
          [attr.aria-required]="required() ? 'true' : null"
          [attr.aria-activedescendant]="open() && activeIndex() >= 0 ? optionId(activeIndex()) : null"
          (click)="toggleOpen(trigger)"
          (keydown)="handleTriggerKeydown($event, trigger)"
        >
          <span
            class="n-select-field__value"
            [class.n-select-field__value--placeholder]="showPlaceholder()"
          >
            {{ displayLabel() }}
          </span>
          <n-icon class="n-select-field__icon" name="chevron-down" size="sm" />
        </button>
      </div>

      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayHasBackdrop]="true"
        [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
        [cdkConnectedOverlayPositions]="overlayPositions"
        (backdropClick)="close()"
        (detach)="close()"
      >
        <div
          class="n-select-field__panel"
          [id]="listboxId"
          role="listbox"
          [style.width.px]="panelWidth()"
        >
          @for (option of resolvedOptions(); track option.value; let index = $index) {
            <button
              type="button"
              class="n-select-field__option"
              [id]="optionId(index)"
              role="option"
              [disabled]="option.disabled"
              [class.n-select-field__option--active]="activeIndex() === index"
              [class.n-select-field__option--selected]="isSelected(option)"
              [class.n-select-field__option--placeholder]="option.placeholder"
              [attr.aria-selected]="isSelected(option)"
              (click)="selectOption(option)"
              (pointerenter)="setActiveIndex(index)"
            >
              <span>{{ option.label }}</span>
              @if (isSelected(option) && !option.placeholder) {
                <n-icon name="check" size="xs" />
              }
            </button>
          }
        </div>
      </ng-template>

      @if (error()) {
        <p class="n-select-field__message n-select-field__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-select-field__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-select-field {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-select-field__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-select-field__shell {
        position: relative;
      }

      .n-select-field__control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--n-space-3);
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-surface-2);
        color: var(--n-text-1);
        font: inherit;
        letter-spacing: 0;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-select-field__control:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-select-field--open .n-select-field__control,
      .n-select-field__control:focus-visible {
        border: 1.5px solid transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-focus-ring);
      }

      .n-select-field--sm .n-select-field__control {
        min-height: 34px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-select-field--md .n-select-field__control {
        min-height: 44px;
        padding: 0 14px;
        font-size: var(--n-font-size-14);
      }

      .n-select-field--lg .n-select-field__control {
        min-height: 50px;
        padding: 0 var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-select-field__value {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .n-select-field__value--placeholder {
        color: var(--n-text-2);
      }

      .n-select-field__icon {
        flex-shrink: 0;
        color: var(--n-text-2);
        transition:
          color var(--n-transition-fast),
          transform var(--n-transition-fast);
      }

      .n-select-field--open .n-select-field__icon {
        color: var(--n-text-1);
        transform: rotate(180deg);
      }

      .n-select-field__panel {
        display: grid;
        gap: 4px;
        max-height: min(280px, 40vh);
        overflow: auto;
        padding: 6px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-subtle) border-box;
        box-shadow: var(--n-elevation-4), var(--n-glow-primary-xs);
        backdrop-filter: blur(18px);
      }

      .n-select-field__option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--n-space-3);
        width: 100%;
        min-height: 40px;
        padding: 0 10px;
        border: 0;
        border-radius: var(--n-radius-sm);
        background: transparent;
        color: var(--n-text-1);
        font: inherit;
        font-size: var(--n-font-size-13);
        text-align: left;
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          color var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-select-field__option--placeholder {
        color: var(--n-text-2);
      }

      .n-select-field__option:hover:not(:disabled),
      .n-select-field__option--active {
        background: rgba(255, 255, 255, 0.05);
      }

      .n-select-field__option--selected {
        background: color-mix(in srgb, var(--n-color-primary) 14%, transparent);
        color: var(--n-color-primary-light);
      }

      .n-select-field__option:disabled {
        cursor: not-allowed;
        opacity: 0.42;
      }

      .n-select-field--invalid .n-select-field__control {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-select-field--invalid.n-select-field--open .n-select-field__control,
      .n-select-field--invalid .n-select-field__control:focus-visible {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          linear-gradient(
              135deg,
              color-mix(in srgb, var(--n-color-danger) 70%, transparent),
              color-mix(in srgb, var(--n-color-danger) 30%, var(--n-color-primary))
            )
            border-box;
      }

      .n-select-field--disabled {
        opacity: 0.58;
      }

      .n-select-field__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-select-field__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NSelect {
  readonly selectId = `n-select-${++nextSelectId}`;
  readonly triggerId = `${this.selectId}-trigger`;
  readonly labelId = `${this.selectId}-label`;
  readonly listboxId = `${this.selectId}-listbox`;
  readonly messageId = `${this.selectId}-message`;
  readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ];

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly value = input('');
  readonly options = input<readonly NSelectOption[]>([]);
  readonly size = input<NSelectSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly valueChange = output<string>();

  private readonly activeIndexState = signal(-1);
  private readonly openState = signal(false);
  private readonly panelWidthState = signal(0);

  readonly open = this.openState.asReadonly();
  readonly panelWidth = this.panelWidthState.asReadonly();
  readonly activeIndex = this.activeIndexState.asReadonly();
  readonly resolvedOptions = computed<readonly NResolvedSelectOption[]>(() => {
    const items: NResolvedSelectOption[] = [];

    if (this.placeholder()) {
      items.push({
        label: this.placeholder() ?? '',
        value: '',
        disabled: this.required(),
        placeholder: true,
      });
    }

    items.push(...this.options());

    return items;
  });
  readonly selectedIndex = computed(() =>
    this.resolvedOptions().findIndex((option) => option.value === this.value()),
  );
  readonly selectedOption = computed(() => {
    const index = this.selectedIndex();
    return index >= 0 ? this.resolvedOptions()[index] : undefined;
  });
  readonly showPlaceholder = computed(
    () => this.value() === '' && !!this.placeholder(),
  );
  readonly displayLabel = computed(() => {
    if (this.selectedOption()) {
      return this.selectedOption()!.label;
    }

    if (this.placeholder()) {
      return this.placeholder()!;
    }

    return this.options()[0]?.label ?? '';
  });

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  optionId(index: number): string {
    return `${this.selectId}-option-${index}`;
  }

  isSelected(option: NResolvedSelectOption): boolean {
    return option.value === this.value();
  }

  setActiveIndex(index: number): void {
    if (index < 0 || index >= this.resolvedOptions().length) {
      return;
    }

    if (this.resolvedOptions()[index]?.disabled) {
      return;
    }

    this.activeIndexState.set(index);
  }

  toggleOpen(trigger: NSelectTriggerLike): void {
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.close();
      return;
    }

    this.openMenu(trigger);
  }

  close(): void {
    this.openState.set(false);
    this.activeIndexState.set(-1);
  }

  selectOption(option: NResolvedSelectOption): void {
    if (option.disabled) {
      return;
    }

    this.valueChange.emit(option.value);
    this.close();
  }

  handleTriggerKeydown(event: NSelectKeyboardEventLike, trigger: NSelectTriggerLike): void {
    if (this.disabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault?.();
        if (!this.open()) {
          this.openMenu(trigger);
        } else {
          this.moveActive(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault?.();
        if (!this.open()) {
          this.openMenu(trigger, this.lastEnabledIndex());
        } else {
          this.moveActive(-1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault?.();
        if (!this.open()) {
          this.openMenu(trigger);
        } else {
          this.selectActiveOption();
        }
        break;
      case 'Escape':
        if (this.open()) {
          event.preventDefault?.();
          this.close();
        }
        break;
      case 'Tab':
        this.close();
        break;
      default:
        break;
    }
  }

  private openMenu(trigger: NSelectTriggerLike, preferredIndex?: number): void {
    this.syncPanelWidth(trigger);
    this.openState.set(true);

    const fallbackIndex =
      preferredIndex ??
      (this.selectedIndex() >= 0 && !this.resolvedOptions()[this.selectedIndex()]?.disabled
        ? this.selectedIndex()
        : this.firstEnabledIndex());

    this.activeIndexState.set(fallbackIndex);
  }

  private selectActiveOption(): void {
    const index = this.activeIndex();
    if (index < 0) {
      return;
    }

    const option = this.resolvedOptions()[index];
    if (!option || option.disabled) {
      return;
    }

    this.selectOption(option);
  }

  private moveActive(step: 1 | -1): void {
    const options = this.resolvedOptions();
    if (!options.length) {
      return;
    }

    let index = this.activeIndex();
    const startIndex = index;

    if (index < 0) {
      index = step > 0 ? -1 : options.length;
    }

    do {
      index = (index + step + options.length) % options.length;
      const option = options[index];
      if (!option?.disabled) {
        this.activeIndexState.set(index);
        return;
      }
    } while (index !== startIndex && options.length > 1);
  }

  private firstEnabledIndex(): number {
    return this.resolvedOptions().findIndex((option) => !option.disabled);
  }

  private lastEnabledIndex(): number {
    const options = this.resolvedOptions();

    for (let index = options.length - 1; index >= 0; index -= 1) {
      if (!options[index]?.disabled) {
        return index;
      }
    }

    return -1;
  }

  private syncPanelWidth(trigger: NSelectTriggerLike): void {
    const nextWidth = Math.ceil(trigger.getBoundingClientRect().width);

    if (nextWidth > 0) {
      this.panelWidthState.set(nextWidth);
    }
  }
}
