import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'n-listbox',
  standalone: true,
  template: `
    <div class="nn-listbox">
      @for (option of options(); track $index) {
        @let isSel = isSelected(option);
        <div class="nn-lb-item" [class.on]="isSel" (click)="selectOption(option)">
          <div class="nn-lb-check">
            @if (isSel) {
              <span class="nn-lb-check-mark">✓</span>
            }
          </div>
          <span>{{ getLabel(option) }}</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .nn-listbox {
        border-radius: var(--n-radius-md);
        border: 1px solid var(--n-field-border);
        background: var(--n-surface-2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      .nn-lb-item {
        padding: 9px 14px;
        font-size: 13px;
        color: var(--n-text-2);
        cursor: pointer;
        transition: background 120ms;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid var(--n-border-0);
        box-sizing: border-box;
      }

      .nn-lb-item:last-child {
        border-bottom: none;
      }

      .nn-lb-item:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--n-text-1);
      }

      .nn-lb-item.on {
        background: rgba(66, 133, 244, 0.1);
        color: var(--n-color-primary-bright);
      }

      .nn-lb-check {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        border: 1.5px solid var(--n-border-2);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 150ms;
        box-sizing: border-box;
      }

      .nn-lb-item.on .nn-lb-check {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%));
        border-color: transparent;
      }

      .nn-lb-check-mark {
        font-size: 9px;
        color: #fff;
        font-weight: 700;
        line-height: 1;
      }
    `,
  ],
})
export class NListbox {
  readonly options = input<any[]>([]);
  readonly field = input<string | undefined>(undefined);
  readonly multiple = input<boolean>(false);

  readonly value = model<any>(null);
  readonly select = output<any>();

  selectOption(option: any): void {
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? [...this.value()] : [];
      const index = current.findIndex((item) => this.isEqual(item, option));

      if (index === -1) {
        current.push(option);
      } else {
        current.splice(index, 1);
      }

      this.value.set(current);
      this.select.emit(current);
    } else {
      const isSel = this.isEqual(this.value(), option);
      const newVal = isSel ? null : option;
      this.value.set(newVal);
      this.select.emit(newVal);
    }
  }

  isSelected(option: any): boolean {
    const val = this.value();
    if (this.multiple()) {
      return Array.isArray(val) ? val.some((item) => this.isEqual(item, option)) : false;
    }
    return this.isEqual(val, option);
  }

  getLabel(item: any): string {
    if (item && typeof item === 'object') {
      const f = this.field();
      return f ? item[f] : JSON.stringify(item);
    }
    return String(item ?? '');
  }

  private isEqual(a: any, b: any): boolean {
    if (a && typeof a === 'object' && b && typeof b === 'object') {
      const f = this.field();
      if (f) return a[f] === b[f];
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }
}
