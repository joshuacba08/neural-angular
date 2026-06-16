import { Component, computed, input } from '@angular/core';

import type {
  NAvatarShape,
  NAvatarSize,
  NAvatarStatus,
  NAvatarVariant,
} from './avatar.types.js';

@Component({
  selector: 'n-avatar',
  standalone: true,
  template: `
    <span
      class="n-avatar"
      [class.n-avatar--xs]="size() === 'xs'"
      [class.n-avatar--sm]="size() === 'sm'"
      [class.n-avatar--md]="size() === 'md'"
      [class.n-avatar--lg]="size() === 'lg'"
      [class.n-avatar--xl]="size() === 'xl'"
      [class.n-avatar--rounded]="shape() === 'rounded'"
      [class.n-avatar--away]="resolvedStatus() === 'away'"
      [attr.aria-label]="alt() || name() || null"
    >
      <span
        class="n-avatar__surface"
        [class.n-avatar--blue-violet]="variant() === 'blue-violet'"
        [class.n-avatar--violet-pink]="variant() === 'violet-pink'"
        [class.n-avatar--gemini]="variant() === 'gemini'"
        [class.n-avatar--surface]="variant() === 'surface'"
      >
        @if (src()) {
          <img class="n-avatar__image" [src]="src()" [alt]="alt() || name() || ''" />
        } @else {
          <span class="n-avatar__content">
            <ng-content />
            @if (showInitials()) {
              <span class="n-avatar__initials" aria-hidden="true">{{ initials() }}</span>
            }
          </span>
        }
      </span>

      @if (resolvedStatus()) {
        <span
          class="n-avatar__status"
          [class.n-avatar__status--online]="resolvedStatus() === 'online'"
          [class.n-avatar__status--active]="resolvedStatus() === 'active'"
          [class.n-avatar__status--away]="resolvedStatus() === 'away'"
          [class.n-avatar__status--offline]="resolvedStatus() === 'offline'"
          aria-hidden="true"
        ></span>
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
        flex-shrink: 0;
        font-family: var(--n-font-display);
        font-weight: var(--n-font-weight-bold);
        color: #fff;
      }

      .n-avatar__surface {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: inherit;
      }

      .n-avatar--xs,
      .n-avatar--xs .n-avatar__surface {
        width: 24px;
        height: 24px;
        font-size: 0.5625rem;
      }

      .n-avatar--sm,
      .n-avatar--sm .n-avatar__surface {
        width: 32px;
        height: 32px;
        font-size: 0.71875rem;
      }

      .n-avatar--md,
      .n-avatar--md .n-avatar__surface {
        width: 40px;
        height: 40px;
        font-size: var(--n-font-size-14);
      }

      .n-avatar--lg,
      .n-avatar--lg .n-avatar__surface {
        width: 56px;
        height: 56px;
        font-size: 1.1875rem;
      }

      .n-avatar--xl,
      .n-avatar--xl .n-avatar__surface {
        width: 72px;
        height: 72px;
        font-size: var(--n-font-size-24);
      }

      .n-avatar,
      .n-avatar__surface {
        border-radius: var(--n-radius-full);
      }

      .n-avatar--blue-violet {
        background: var(--n-gradient-primary-secondary);
      }

      .n-avatar--violet-pink {
        background: var(--n-gradient-secondary-tertiary);
      }

      .n-avatar--gemini {
        background: var(--n-gradient-gemini);
      }

      .n-avatar--surface {
        border: 1px solid var(--n-border-2);
        background: var(--n-surface-3);
        color: var(--n-text-2);
      }

      :host-context(n-avatar-group) .n-avatar__surface {
        box-shadow: 0 0 0 2.5px var(--n-bg-canvas);
      }

      .n-avatar--rounded,
      .n-avatar--rounded .n-avatar__surface {
        border-radius: var(--n-radius-lg);
      }

      .n-avatar--away {
        opacity: 0.55;
      }

      .n-avatar__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .n-avatar__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }

      .n-avatar__initials {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .n-avatar__status {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 10px;
        height: 10px;
        border-radius: var(--n-radius-full);
        box-shadow: 0 0 0 2px var(--n-bg-canvas);
      }

      .n-avatar__status--online {
        background: var(--n-color-success);
      }

      .n-avatar__status--active {
        background: var(--n-color-primary);
      }

      .n-avatar__status--away,
      .n-avatar__status--offline {
        background: var(--n-text-4);
      }
    `,
  ],
})
export class NAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string | undefined>(undefined);
  readonly name = input('');
  readonly size = input<NAvatarSize>('md');
  readonly variant = input<NAvatarVariant>('blue-violet');
  readonly shape = input<NAvatarShape>('circle');
  readonly status = input<NAvatarStatus>(null);

  readonly resolvedStatus = computed(() => {
    const value = this.status();

    if (value === 'busy') {
      return 'active';
    }

    return value;
  });

  readonly showInitials = computed(
    () => !this.src() && this.name().trim().length > 0,
  );

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
