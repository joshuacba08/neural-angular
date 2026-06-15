import { Component, computed, input } from '@angular/core';

import { NStatusDot } from '../status-dot/status-dot.component.js';
import type { NAvatarShape, NAvatarSize, NAvatarStatus } from './avatar.types.js';

@Component({
  selector: 'n-avatar',
  standalone: true,
  imports: [NStatusDot],
  template: `
    <span
      class="n-avatar"
      [class.n-avatar--sm]="size() === 'sm'"
      [class.n-avatar--md]="size() === 'md'"
      [class.n-avatar--lg]="size() === 'lg'"
      [class.n-avatar--xl]="size() === 'xl'"
      [class.n-avatar--rounded]="shape() === 'rounded'"
      [attr.aria-label]="alt() || name() || null"
    >
      @if (src()) {
        <img class="n-avatar__image" [src]="src()" [alt]="alt() || name() || ''" />
      } @else {
        <span class="n-avatar__initials" aria-hidden="true">{{ initials() }}</span>
      }

      @if (status()) {
        <n-status-dot class="n-avatar__status" [status]="status()!" />
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
      }

      .n-avatar {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-full);
        background: var(--n-avatar-bg);
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-weight: var(--n-font-weight-bold);
        box-shadow: inset 0 1px 0 var(--n-border-1);
      }

      .n-avatar--sm {
        width: 32px;
        height: 32px;
        font-size: var(--n-font-size-12);
      }

      .n-avatar--md {
        width: 40px;
        height: 40px;
        font-size: var(--n-font-size-14);
      }

      .n-avatar--lg {
        width: 52px;
        height: 52px;
        font-size: var(--n-font-size-16);
      }

      .n-avatar--xl {
        width: 68px;
        height: 68px;
        font-size: var(--n-font-size-20);
      }

      .n-avatar--rounded {
        border-radius: var(--n-radius-lg);
      }

      .n-avatar__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .n-avatar__initials {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .n-avatar__status {
        position: absolute;
        right: -1px;
        bottom: -1px;
      }
    `,
  ],
})
export class NAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string | undefined>(undefined);
  readonly name = input('');
  readonly size = input<NAvatarSize>('md');
  readonly shape = input<NAvatarShape>('circle');
  readonly status = input<NAvatarStatus>(null);

  readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/).filter(Boolean);

    if (!parts.length) {
      return '?';
    }

    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  });
}
