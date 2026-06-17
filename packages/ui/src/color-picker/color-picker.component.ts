import { Component, model, output } from '@angular/core';

@Component({
  selector: 'n-color-picker',
  standalone: true,
  template: `
    <div class="n-color-picker">
      <div class="n-color-picker__title">Color Picker</div>

      <!-- Grid of Swatches -->
      <div class="n-color-picker__grid">
        @for (color of swatches; track color) {
          @let isSel = isSelected(color);
          <div
            class="cp-sw"
            [class.sel]="isSel"
            [style.background]="color"
            (click)="selectColor(color)"
          ></div>
        }
      </div>

      <!-- Hex Input Group -->
      <div class="n-color-picker__input-group">
        <span class="n-color-picker__addon">#</span>
        <input
          #hexInput
          type="text"
          [value]="value() || '4285F4'"
          (input)="onHexInput(hexInput.value)"
          maxlength="6"
          class="n-color-picker__input"
        />
      </div>

      <!-- Color Preview -->
      <div
        class="n-color-picker__preview"
        [style.background]="'#' + (value() || '4285F4')"
      ></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        min-width: 192px;
        box-sizing: border-box;
      }

      .n-color-picker {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-subtle, var(--n-gradient-border)) border-box;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        padding: 16px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
      }

      .n-color-picker__title {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: var(--n-text-3);
        margin-bottom: 10px;
      }

      .n-color-picker__grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-bottom: 10px;
      }

      .cp-sw {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        cursor: pointer;
        transition: transform 0.15s;
        box-sizing: border-box;
      }

      .cp-sw:hover {
        transform: scale(1.15);
      }

      .cp-sw.sel {
        outline: 2px solid rgba(66, 133, 244, 0.7);
        outline-offset: 2px;
      }

      .n-color-picker__input-group {
        display: flex;
        align-items: stretch;
      }

      .n-color-picker__addon {
        display: flex;
        align-items: center;
        padding: 0 10px;
        background: var(--n-surface-3);
        border: 1px solid var(--n-border-1);
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 11px;
        flex-shrink: 0;
        white-space: nowrap;
        border-top-left-radius: var(--n-radius-md);
        border-bottom-left-radius: var(--n-radius-md);
      }

      .n-color-picker__input {
        flex: 1;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-left: 0;
        border-top-right-radius: var(--n-radius-md);
        border-bottom-right-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font-family: var(--n-font-mono);
        font-size: 13px;
        letter-spacing: 0.04em;
        outline: none;
        height: 32px;
        padding: 0 8px;
        box-sizing: border-box;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast);
      }

      .n-color-picker__input:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-color-picker__input:focus-visible {
        border-color: var(--n-field-border-focus);
      }

      .n-color-picker__preview {
        margin-top: 9px;
        height: 28px;
        border-radius: 8px;
        transition: background 0.2s;
        box-sizing: border-box;
        border: 1px solid var(--n-border-1);
      }
    `,
  ],
})
export class NColorPicker {
  readonly value = model<string>('4285F4');
  readonly change = output<string>();

  readonly swatches = [
    '#EA4335',
    '#FBBC05',
    '#34A853',
    '#4285F4',
    '#7B5CF6',
    '#D946EF',
    '#F43F5E',
    '#06B6D4',
    '#F97316',
    '#10B981',
    '#FFFFFF',
    '#888888',
    '#222222',
    '#000000',
  ];

  selectColor(hex: string): void {
    const raw = hex.replace('#', '');
    this.value.set(raw);
    this.change.emit(raw);
  }

  onHexInput(val: string): void {
    const cleaned = val.replace(/[^0-9a-fA-F]/g, '').substring(0, 6);
    this.value.set(cleaned);
    this.change.emit(cleaned);
  }

  isSelected(color: string): boolean {
    const rawColor = color.replace('#', '').toLowerCase();
    const rawVal = (this.value() || '').toLowerCase();
    return rawColor === rawVal;
  }
}
