import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'n-select-button',
  standalone: true,
  template: `
    <div class="nn-selbtn">
      @for (option of options(); track option) {
        @let isSel = isSelected(option);
        <button
          type="button"
          class="nn-selbtn-item"
          [class.on]="isSel"
          (click)="toggleOption(option)"
        >
          {{ getLabel(option) }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        box-sizing: border-box;
      }

      .nn-selbtn {
        display: flex;
        background: rgba(0, 0, 0, 0.25);
        padding: 3px;
        border-radius: 10px;
        gap: 3px;
        width: fit-content;
        box-sizing: border-box;
      }

      .nn-selbtn-item {
        padding: 6px 16px;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        font-family: var(--n-font-body);
        font-size: 12px;
        font-weight: 500;
        transition: all 160ms;
        background: transparent;
        color: var(--n-text-3);
        outline: none;
      }

      .nn-selbtn-item:hover {
        color: var(--n-text-2);
      }

      .nn-selbtn-item.on {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-primary, var(--n-gradient-border)) border-box;
        border: 1px solid transparent;
        color: var(--n-color-primary-bright);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class NSelectButton {
  readonly options = input<any[]>([]);
  readonly field = input<string | undefined>(undefined);
  readonly multiple = input<boolean>(false);

  readonly value = model<any>(null);
  readonly select = output<any>();

  toggleOption(option: any): void {
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
