import { Component, input, output, signal } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-command-palette-item',
  standalone: true,
  imports: [NIcon],
  template: `
    @if (visible()) {
      <div
        class="cmd-item"
        [class.on]="active()"
        (click)="triggerAction()"
      >
        @if (icon()) {
          <n-icon [name]="icon()!" class="cmd-item__icon" size="sm" [style.color]="iconColor() ?? null" />
        }
        <div class="cmd-item__body">
          <div class="cmd-item__title">{{ label() }}</div>
          @if (description()) {
            <div class="cmd-item__desc">{{ description() }}</div>
          }
        </div>
        @if (shortcut()) {
          <kbd class="cmd-kb">{{ shortcut() }}</kbd>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .cmd-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 120ms;
        box-sizing: border-box;
      }

      .cmd-item:hover,
      .cmd-item.on {
        background: linear-gradient(90deg, rgba(66, 133, 244, 0.1), rgba(123, 92, 246, 0.06), transparent);
      }

      .cmd-item__icon {
        flex-shrink: 0;
        width: 13px;
        height: 13px;
      }

      .cmd-item__body {
        flex: 1;
        min-width: 0;
      }

      .cmd-item__title {
        font-size: 13px;
        color: var(--n-text-1);
        line-height: 1.4;
      }

      .cmd-item__desc {
        font-size: 10.5px;
        color: var(--n-text-3);
        margin-top: 1px;
        line-height: 1.3;
      }

      .cmd-kb {
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        padding: 2px 6px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--n-border-2);
        color: var(--n-text-3);
        white-space: nowrap;
        flex-shrink: 0;
        line-height: 1;
      }
    `,
  ],
})
export class NCommandPaletteItem {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly iconColor = input<string | undefined>(undefined);
  readonly shortcut = input<string | undefined>(undefined);

  readonly trigger = output<{ value: string; label: string }>();

  readonly visible = signal(true);
  readonly active = signal(false);

  triggerAction(): void {
    this.trigger.emit({ value: this.value(), label: this.label() });
  }
}
