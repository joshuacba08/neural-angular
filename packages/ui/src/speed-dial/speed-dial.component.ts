import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  effect,
  input,
  model,
  numberAttribute,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NSpeedDialItem } from './speed-dial-item.component.js';

@Component({
  selector: 'n-speed-dial',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-speed-dial" [class.n-speed-dial--open]="open()">
      <div
        class="n-speed-dial__actions"
        [class.n-speed-dial__actions--linear]="type() === 'linear'"
        [class.n-speed-dial__actions--semi]="type() === 'semi'"
        [class.n-speed-dial__actions--radial]="type() === 'radial'"
        [class.n-speed-dial__actions--up]="direction() === 'up'"
        [class.n-speed-dial__actions--down]="direction() === 'down'"
        [class.n-speed-dial__actions--left]="direction() === 'left'"
        [class.n-speed-dial__actions--right]="direction() === 'right'"
      >
        <ng-content />
      </div>

      <button
        class="n-speed-dial__btn"
        [class.n-speed-dial__btn--primary]="buttonVariant() === 'primary'"
        [class.n-speed-dial__btn--gemini]="buttonVariant() === 'gemini'"
        [class.n-speed-dial__btn--secondary]="buttonVariant() === 'secondary'"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
      >
        <n-icon [name]="open() ? activeIcon() : icon()" size="md" />
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        position: relative;
      }

      .n-speed-dial {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .n-speed-dial__btn {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
          background-color 200ms;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        color: #fff;
        box-sizing: border-box;
      }

      .n-speed-dial__btn:hover {
        transform: scale(1.08);
      }

      .n-speed-dial__btn--primary {
        background: var(--n-progress-fill-primary);
        box-shadow: 0 4px 14px rgba(66, 133, 244, 0.4);
      }

      .n-speed-dial__btn--gemini {
        background: var(--n-gradient-gemini, linear-gradient(135deg, #4f8eff, #7b5cf6, #d946ef, #f43f5e));
        box-shadow: 0 4px 16px rgba(123, 92, 246, 0.45);
      }

      .n-speed-dial__btn--secondary {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: var(--n-elevation-2);
        color: var(--n-text-1);
      }

      .n-speed-dial__btn--secondary:hover {
        background: rgba(255, 255, 255, 0.12);
      }

      /* Actions container - Linear layout */
      .n-speed-dial__actions--linear {
        display: flex;
        gap: 8px;
        align-items: center;
        position: absolute;
        pointer-events: none;
        z-index: 1;
      }

      .n-speed-dial__actions--linear.n-speed-dial__actions--up {
        flex-direction: column-reverse;
        bottom: 100%;
        padding-bottom: 8px;
      }

      .n-speed-dial__actions--linear.n-speed-dial__actions--down {
        flex-direction: column;
        top: 100%;
        padding-top: 8px;
      }

      .n-speed-dial__actions--linear.n-speed-dial__actions--left {
        flex-direction: row-reverse;
        right: 100%;
        padding-right: 8px;
      }

      .n-speed-dial__actions--linear.n-speed-dial__actions--right {
        flex-direction: row;
        left: 100%;
        padding-left: 8px;
      }

      .n-speed-dial__actions--semi {
        position: absolute;
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        width: 192px;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
      }

      /* Actions container - Radial layout */
      .n-speed-dial__actions--radial {
        position: absolute;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1;
      }

      .n-speed-dial__actions--radial ::ng-deep .n-speed-dial-item {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: 0;
      }
    `,
  ],
})
export class NSpeedDial implements AfterContentInit {
  readonly icon = input<string>('plus');
  readonly activeIcon = input<string>('x');
  readonly buttonVariant = input<'primary' | 'gemini' | 'secondary'>('primary');
  readonly type = input<'linear' | 'semi' | 'radial'>('linear');
  readonly direction = input<'up' | 'down' | 'left' | 'right'>('up');
  readonly radius = input(80, { transform: numberAttribute });
  readonly stagger = input(80, { transform: numberAttribute });

  readonly open = model(false);

  @ContentChildren(NSpeedDialItem) items!: QueryList<NSpeedDialItem>;

  constructor() {
    effect(() => {
      this.open();
      this.type();
      this.direction();
      this.radius();
      this.stagger();
      this.updateChildren();
    });
  }

  ngAfterContentInit(): void {
    // Re-layout if children list changes dynamically
    this.items.changes.subscribe(() => {
      this.updateChildren();
    });
  }

  toggle(): void {
    this.open.set(!this.open());
  }

  private updateChildren(): void {
    if (!this.items) {
      return;
    }

    const list = this.items.toArray();
    const isOpen = this.open();
    const layout = this.type();
    const isRadial = layout === 'radial';
    const dir = this.direction();
    const radVal = this.radius();
    const delayStep = this.stagger();

    list.forEach((item, index) => {
      item.radial.set(isRadial);

      // Set visibility state
      item.visible.set(isOpen);

      const delayMs = isOpen
        ? index * delayStep
        : (list.length - 1 - index) * delayStep;
      item.delay.set(`${delayMs}ms`);

      // 2. Calculate Radial Positions if type is radial
      if (isRadial) {
        const count = list.length;
        if (count === 1) {
          const angle =
            dir === 'up'
              ? 90
              : dir === 'down'
                ? 270
                : dir === 'left'
                  ? 180
                  : 0;
          const rad = (angle * Math.PI) / 180;
          const x = Math.round(radVal * Math.cos(rad));
          const y = Math.round(radVal * Math.sin(rad));
          item.transformStyle.set(
            isOpen
              ? `translate(calc(-50% + ${x}px), calc(-50% - ${y}px)) scale(1)`
              : `translate(-50%, -50%) scale(0.8)`,
          );
        } else {
          // Map directions to start and end angles
          let startAngle = 180;
          let endAngle = 0;
          if (dir === 'down') {
            startAngle = 180;
            endAngle = 360;
          } else if (dir === 'left') {
            startAngle = 90;
            endAngle = 270;
          } else if (dir === 'right') {
            startAngle = 90;
            endAngle = -90;
          }

          const delta = (endAngle - startAngle) / (count - 1);
          const angle = startAngle + index * delta;
          const rad = (angle * Math.PI) / 180;
          const x = Math.round(radVal * Math.cos(rad));
          const y = Math.round(radVal * Math.sin(rad));

          item.transformStyle.set(
            isOpen
              ? `translate(calc(-50% + ${x}px), calc(-50% - ${y}px)) scale(1)`
              : `translate(-50%, -50%) scale(0.8)`,
          );
        }
      } else {
        // Clear transformStyle so linear CSS overrides can take place
        item.transformStyle.set(null);
      }
    });
  }
}
