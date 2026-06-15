import { booleanAttribute, Component, computed, input, numberAttribute, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NImageCompareBeforeMode, NImageCompareOrientation } from './image-compare.types.js';

@Component({
  selector: 'n-image-compare',
  standalone: true,
  imports: [NIcon],
  template: `
    <figure
      class="n-image-compare"
      [class.n-image-compare--vertical]="orientation() === 'vertical'"
      [class.n-image-compare--disabled]="disabled()"
    >
      <div class="n-image-compare__stage">
        <img
          class="n-image-compare__image n-image-compare__image--after"
          [src]="afterSrc()"
          [alt]="afterAlt()"
        />
        @if (resolvedBeforeMode() === 'filter') {
          <span
            class="n-image-compare__filter"
            aria-hidden="true"
            [style.clip-path]="clipPath()"
          ></span>
        } @else {
          <img
            class="n-image-compare__image n-image-compare__image--before"
            [src]="beforeSrc()"
            [alt]="beforeAlt()"
            [style.clip-path]="clipPath()"
          />
        }

        <span
          class="n-image-compare__divider"
          aria-hidden="true"
          [style.left.%]="orientation() === 'horizontal' ? clampedValue() : null"
          [style.top.%]="orientation() === 'vertical' ? clampedValue() : null"
        >
          <span class="n-image-compare__handle">
            <n-icon name="chevrons-left-right" size="xs" />
          </span>
        </span>

        @if (showLabels()) {
          <span class="n-image-compare__label n-image-compare__label--before">
            {{ beforeLabel() }}
          </span>
          <span class="n-image-compare__label n-image-compare__label--after">
            {{ afterLabel() }}
          </span>
        }

        <input
          class="n-image-compare__range"
          type="range"
          min="0"
          max="100"
          [value]="clampedValue()"
          [disabled]="disabled()"
          aria-label="Image comparison position"
          (input)="handleInput($event)"
        />
      </div>
    </figure>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-image-compare {
        margin: 0;
      }

      .n-image-compare__stage {
        position: relative;
        overflow: hidden;
        min-height: 260px;
        aspect-ratio: 16 / 9;
        border: 1px solid var(--n-media-preview-border);
        border-radius: var(--n-radius-2xl);
        background: var(--n-media-preview-bg);
        cursor: col-resize;
        isolation: isolate;
        user-select: none;
      }

      .n-image-compare__image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .n-image-compare__image--before {
        z-index: 2;
      }

      .n-image-compare__filter {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        backdrop-filter: saturate(0.18) contrast(0.78) brightness(0.6) blur(1px);
        background: rgba(0, 0, 15, 0.1);
      }

      .n-image-compare__divider {
        position: absolute;
        z-index: 3;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        background: var(--n-image-compare-handle-border);
        box-shadow: 0 0 12px color-mix(in srgb, var(--n-image-compare-handle-border) 32%, transparent);
        pointer-events: none;
      }

      .n-image-compare--vertical .n-image-compare__divider {
        right: 0;
        left: 0;
        width: auto;
        height: 2px;
        transform: translateY(-50%);
      }

      .n-image-compare__handle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 38px;
        height: 38px;
        border-radius: var(--n-radius-full);
        background: var(--n-image-compare-handle-bg);
        color: rgba(0, 0, 0, 0.72);
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .n-image-compare__label {
        position: absolute;
        z-index: 4;
        top: var(--n-space-3);
        display: inline-flex;
        align-items: center;
        gap: var(--n-space-1);
        padding: 3px 10px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-full);
        backdrop-filter: blur(8px);
        color: var(--n-text-1);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
        font-weight: var(--n-font-weight-semibold);
        line-height: 1.2;
        pointer-events: none;
      }

      .n-image-compare__label--before {
        left: var(--n-space-3);
        background: rgba(0, 0, 0, 0.58);
        border-color: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.72);
      }

      .n-image-compare__label--after {
        right: var(--n-space-3);
        background: color-mix(in srgb, var(--n-color-primary) 24%, transparent);
        border-color: color-mix(in srgb, var(--n-color-primary) 42%, var(--n-border-1));
        color: var(--n-color-primary-light);
      }

      .n-image-compare__range {
        position: absolute;
        inset: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        margin: 0;
        cursor: col-resize;
        opacity: 0;
      }

      .n-image-compare__stage:has(.n-image-compare__range:focus-visible) {
        box-shadow: var(--n-focus-ring);
      }

      .n-image-compare--disabled {
        opacity: 0.62;
      }

      .n-image-compare--disabled .n-image-compare__stage {
        cursor: not-allowed;
      }

      .n-image-compare--disabled .n-image-compare__range {
        cursor: not-allowed;
      }
    `,
  ],
})
export class NImageCompare {
  readonly beforeSrc = input('');
  readonly afterSrc = input('');
  readonly beforeAlt = input('Before image');
  readonly afterAlt = input('After image');
  readonly beforeMode = input<NImageCompareBeforeMode>('image');
  readonly value = input(50, { transform: numberAttribute });
  readonly orientation = input<NImageCompareOrientation>('horizontal');
  readonly showLabels = input(true, { transform: booleanAttribute });
  readonly beforeLabel = input('Before');
  readonly afterLabel = input('After');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly valueChange = output<number>();

  readonly clampedValue = computed(() => Math.min(Math.max(this.value(), 0), 100));
  readonly resolvedBeforeMode = computed<NImageCompareBeforeMode>(() => {
    if (this.beforeMode() === 'filter') {
      return 'filter';
    }

    return this.beforeSrc() && this.beforeSrc() !== this.afterSrc() ? 'image' : 'filter';
  });
  readonly clipPath = computed(() => {
    const hidden = 100 - this.clampedValue();

    if (this.orientation() === 'vertical') {
      return `inset(0 0 ${hidden}% 0)`;
    }

    return `inset(0 ${hidden}% 0 0)`;
  });

  handleInput(event: Event): void {
    const source = event as unknown as { target?: { valueAsNumber?: number; value?: string } };
    const value = source.target?.valueAsNumber ?? Number(source.target?.value ?? this.clampedValue());

    this.valueChange.emit(Math.min(Math.max(value, 0), 100));
  }
}
