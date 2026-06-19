import { Component, input, output, signal } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'button[n-speed-dial-item], div[n-speed-dial-item]',
  standalone: true,
  imports: [NIcon],
  host: {
    'class': 'n-speed-dial-item',
    '[class.vis]': 'visible()',
    '[class.n-speed-dial-item--radial]': 'radial()',
    '[class.n-speed-dial-item--danger]': `tone() === 'danger'`,
    '[class.n-speed-dial-item--primary]': `tone() === 'primary'`,
    '[class.n-speed-dial-item--violet]': `tone() === 'violet'`,
    '[attr.title]': 'title()',
    '[style.transition-delay]': 'delay()',
    '[style.transform]': 'resolvedTransform()',
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',
    '(click)': 'handleClick($event)',
  },
  template: `
    <n-icon [name]="icon()" size="sm" />
  `,
  styles: [
    `
      :host {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--n-surface-3, #141428);
        border: 1px solid var(--n-border-2, rgba(255, 255, 255, 0.08));
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--n-elevation-2);
        color: var(--n-text-2);
        transition:
          all 200ms cubic-bezier(0.4, 0, 0.2, 1),
          opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
          transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
        opacity: 0;
        transform: translateY(10px) scale(0.8);
        pointer-events: none;
        box-sizing: border-box;
      }

      :host.vis {
        opacity: 1;
        transform: none;
        pointer-events: auto;
      }

      :host.vis:not(.n-speed-dial-item--radial):hover {
        transform: scale(1.1);
      }

      :host(.n-speed-dial-item--radial) {
        z-index: 1;
      }

      :host(.n-speed-dial-item--radial:hover) {
        z-index: 10;
      }

      :host(.n-speed-dial-item--danger) {
        color: var(--n-color-danger, #ea4335);
      }

      :host(.n-speed-dial-item--primary) {
        color: var(--n-color-primary-light, #6ba3f7);
      }

      :host(.n-speed-dial-item--violet) {
        color: var(--n-color-secondary, #7b5cf6);
      }

      :host:hover {
        background: var(--n-surface-4, #1c1c38);
        border-color: var(--n-color-primary-bright, #4285F4);
        color: var(--n-text-1);
      }
    `,
  ],
})
export class NSpeedDialItem {
  readonly icon = input.required<string>();
  readonly title = input<string>('');
  readonly tone = input<'default' | 'danger' | 'primary' | 'violet'>('default');
  readonly clickItem = output<Event>();

  readonly visible = signal(false);
  readonly radial = signal(false);
  readonly hovered = signal(false);
  readonly delay = signal('0ms');
  readonly transformStyle = signal<string | null>(null);

  resolvedTransform(): string | null {
    const base = this.transformStyle();
    if (base) {
      if (!this.hovered()) {
        return base;
      }
      return base.replace(/scale\([\d.]+\)/, 'scale(1.1)');
    }

    if (this.hovered() && this.visible()) {
      return 'scale(1.1)';
    }

    return null;
  }

  handleClick(event: Event): void {
    event.stopPropagation();
    this.clickItem.emit(event);
  }
}
