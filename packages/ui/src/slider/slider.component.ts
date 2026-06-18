import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';

import type { NSliderColor } from './slider.types.js';

@Component({
  selector: 'n-slider',
  standalone: true,
  template: `
    <div class="n-slider" [class.n-slider--disabled]="disabled()">
      @if (label() || showValue()) {
        <div class="n-slider__header">
          @if (label()) {
            <span class="n-slider__label">{{ label() }}</span>
          }
          @if (showValue()) {
            <span class="n-slider__value">{{ value() }}</span>
          }
        </div>
      }

      <input
        type="range"
        class="n-slider__input"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        [style.background]="trackGradient()"
        (input)="handleInput($event)"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-slider {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .n-slider__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      .n-slider__label {
        font-size: var(--n-font-size-12, 12px);
        color: var(--n-text-2);
        font-weight: var(--n-font-weight-medium, 500);
      }

      .n-slider__value {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11, 11px);
        color: var(--n-text-1);
        font-weight: var(--n-font-weight-semibold, 600);
      }

      .n-slider__input {
        width: 100%;
        height: 3px;
        border-radius: 99px;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        outline: none;
        margin: 8px 0;
        transition: opacity var(--n-transition-fast);
      }

      /* Webkit / Blink */
      .n-slider__input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ffffff;
        border: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        transition: transform var(--n-transition-fast);
      }

      .n-slider__input::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }

      /* Firefox */
      .n-slider__input::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ffffff;
        border: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        transition: transform var(--n-transition-fast);
      }

      .n-slider__input::-moz-range-thumb:hover {
        transform: scale(1.2);
      }

      .n-slider--disabled {
        opacity: 0.5;
      }

      .n-slider--disabled .n-slider__input {
        cursor: not-allowed;
      }
    `,
  ],
})
export class NSlider {
  readonly label = input<string | undefined>(undefined);
  readonly value = input(0, { transform: numberAttribute });
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly showValue = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly color = input<NSliderColor>('primary');

  readonly valueChange = output<number>();

  readonly trackGradient = computed(() => {
    const minVal = this.min();
    const maxVal = this.max();
    const val = this.value();
    const pct = maxVal > minVal ? ((val - minVal) / (maxVal - minVal)) * 100 : 0;

    let colorStr = 'var(--n-color-primary)';
    if (this.color() === 'secondary') {
      colorStr = 'var(--n-color-secondary)';
    } else if (this.color() === 'tertiary') {
      colorStr = 'var(--n-color-tertiary)';
    }

    return `linear-gradient(90deg, ${colorStr} ${pct}%, rgba(255, 255, 255, 0.08) ${pct}%)`;
  });

  handleInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const val = Number(el.value);
    this.valueChange.emit(val);
  }
}
