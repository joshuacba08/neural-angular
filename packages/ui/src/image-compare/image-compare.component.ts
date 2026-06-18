import { booleanAttribute, Component, computed, input, model } from '@angular/core';

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
      <div
        class="n-image-compare__stage"
        tabindex="0"
        role="slider"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="100"
        [attr.aria-valuenow]="clampedValue()"
        [attr.aria-label]="'Image comparison position'"
        [attr.aria-orientation]="orientation()"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp($event)"
        (pointercancel)="onPointerUp($event)"
        (keydown)="onKeyDown($event)"
      >
        <img
          class="n-image-compare__image n-image-compare__image--after"
          [src]="afterSrc()"
          [alt]="afterAlt()"
        />
        @if (resolvedBeforeMode() === 'filter') {
          <img
            class="n-image-compare__image n-image-compare__image--before n-image-compare__image--filtered"
            [src]="afterSrc()"
            alt=""
            aria-hidden="true"
            [style.clip-path]="clipPath()"
          />
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
          <span
            class="n-image-compare__handle"
            [class.n-image-compare__handle--vertical]="orientation() === 'vertical'"
          >
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
        touch-action: none;
        user-select: none;
      }

      .n-image-compare__stage:focus-visible {
        box-shadow: var(--n-focus-ring);
        outline: none;
      }

      .n-image-compare__image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }

      .n-image-compare__image--before {
        z-index: 2;
      }

      .n-image-compare__image--filtered {
        filter: saturate(0.18) contrast(0.78) brightness(0.6) blur(1px);
      }

      .n-image-compare--vertical .n-image-compare__stage {
        cursor: row-resize;
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
        top: auto;
        right: 0;
        bottom: auto;
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

      .n-image-compare__handle--vertical {
        transform: translate(-50%, -50%) rotate(90deg);
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

      .n-image-compare--disabled {
        opacity: 0.62;
      }

      .n-image-compare--disabled .n-image-compare__stage {
        cursor: not-allowed;
        pointer-events: none;
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
  readonly value = model(50);
  readonly orientation = input<NImageCompareOrientation>('horizontal');
  readonly showLabels = input(true, { transform: booleanAttribute });
  readonly beforeLabel = input('Before');
  readonly afterLabel = input('After');
  readonly disabled = input(false, { transform: booleanAttribute });

  private dragging = false;

  readonly clampedValue = computed(() => {
    const raw = Number(this.value());
    const resolved = Number.isFinite(raw) ? raw : 50;

    return Math.min(Math.max(resolved, 0), 100);
  });
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

  onPointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0) {
      return;
    }

    this.dragging = true;
    event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture(event.pointerId);
    this.updateFromPointer(event);
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.updateFromPointer(event);
    event.preventDefault();
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;

    if (event.currentTarget instanceof HTMLElement && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const step = event.shiftKey ? 10 : 2;
    let next = this.clampedValue();

    if (this.orientation() === 'vertical') {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        next -= step;
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        next += step;
      } else {
        return;
      }
    } else if (event.key === 'ArrowLeft') {
      next -= step;
    } else if (event.key === 'ArrowRight') {
      next += step;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = 100;
    } else {
      return;
    }

    event.preventDefault();
    this.value.set(Math.min(Math.max(next, 0), 100));
  }

  private updateFromPointer(event: PointerEvent): void {
    const stage = event.currentTarget;

    if (!(stage instanceof HTMLElement)) {
      return;
    }

    const rect = stage.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const ratio =
      this.orientation() === 'vertical'
        ? (event.clientY - rect.top) / rect.height
        : (event.clientX - rect.left) / rect.width;

    const next = Math.min(Math.max(ratio * 100, 4), 96);

    this.value.set(next);
  }
}
