import { booleanAttribute, Component, computed, input } from '@angular/core';

import type {
  NAIMessage,
  NAIMessageRole,
  NAIStatus,
} from '../ai/ai.types.js';
import { NBadge } from '../badge/badge.component.js';
import type { NBadgeVariant } from '../badge/badge.types.js';
import { NIcon } from '../icon/icon.component.js';

const roleLabels: Record<NAIMessageRole, string> = {
  user: 'You',
  assistant: 'Neural',
  system: 'System',
  tool: 'Tool',
};

const roleIcons: Record<NAIMessageRole, string> = {
  user: 'user',
  assistant: 'sparkles',
  system: 'info',
  tool: 'command',
};

@Component({
  selector: 'n-chat-message',
  standalone: true,
  imports: [NBadge, NIcon],
  template: `
    <article
      class="n-chat-message"
      [class.n-chat-message--user]="resolvedRole() === 'user'"
      [class.n-chat-message--assistant]="resolvedRole() === 'assistant'"
      [class.n-chat-message--system]="resolvedRole() === 'system'"
      [class.n-chat-message--tool]="resolvedRole() === 'tool'"
      [class.n-chat-message--compact]="compact()"
    >
      <div class="n-chat-message__bubble">
        @if (showHeader()) {
          <div class="n-chat-message__header">
            @if (showAvatarForRole()) {
              <span class="n-chat-message__avatar" aria-hidden="true">
                @if (avatarIsImage()) {
                  <img [src]="resolvedAvatar() ?? ''" [alt]="resolvedAuthor()" />
                } @else if (avatarText()) {
                  <span>{{ avatarText() }}</span>
                } @else {
                  <n-icon [name]="roleIcon()" size="xs" />
                }
              </span>
            }

            @if (resolvedAuthor()) {
              <strong>{{ resolvedAuthor() }}</strong>
            }

            @if (showTimestamp() && resolvedTimestamp()) {
              <time>{{ formattedTimestamp() }}</time>
            }

            @if (resolvedStatus()) {
              <n-badge [variant]="statusVariant()" size="sm">
                {{ resolvedStatus() }}
              </n-badge>
            }
          </div>
        }

        <p class="n-chat-message__content">{{ resolvedContent() }}</p>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-chat-message {
        display: block;
        width: fit-content;
        max-width: 88%;
      }

      .n-chat-message--user {
        align-self: flex-end;
        margin-left: auto;
      }

      .n-chat-message--assistant,
      .n-chat-message--tool {
        align-self: flex-start;
      }

      .n-chat-message--system {
        align-self: center;
        max-width: 100%;
        width: min(100%, 38rem);
      }

      .n-chat-message__bubble {
        display: grid;
        gap: var(--n-space-2);
        padding: 13px 17px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-2xl);
        font-size: var(--n-font-size-14);
        line-height: 1.55;
        background:
          linear-gradient(var(--n-chat-assistant-bg), var(--n-chat-assistant-bg)) padding-box,
          var(--n-chat-border-assistant) border-box;
      }

      .n-chat-message--user .n-chat-message__bubble {
        background:
          linear-gradient(var(--n-chat-user-bg), var(--n-chat-user-bg)) padding-box,
          var(--n-chat-border-user) border-box;
        border-radius: var(--n-radius-2xl) var(--n-radius-2xl) var(--n-radius-xs)
          var(--n-radius-2xl);
      }

      .n-chat-message--assistant .n-chat-message__bubble {
        border-radius: var(--n-radius-2xl) var(--n-radius-2xl) var(--n-radius-2xl)
          var(--n-radius-xs);
      }

      .n-chat-message--system .n-chat-message__bubble {
        width: 100%;
        justify-items: center;
        text-align: center;
        background:
          linear-gradient(var(--n-chat-system-bg), var(--n-chat-system-bg)) padding-box,
          var(--n-gradient-border-subtle) border-box;
        border-radius: var(--n-radius-xl);
      }

      .n-chat-message--tool .n-chat-message__bubble {
        background:
          linear-gradient(color-mix(in srgb, var(--n-surface-2) 96%, transparent), color-mix(in srgb, var(--n-surface-2) 96%, transparent))
            padding-box,
          var(--n-gradient-border-subtle) border-box;
      }

      .n-chat-message--compact .n-chat-message__bubble {
        padding: 11px 14px;
      }

      .n-chat-message__header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }

      .n-chat-message__avatar {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        overflow: hidden;
        border-radius: 6px;
        background: var(--n-gradient-gemini);
        color: #fff;
      }

      .n-chat-message--tool .n-chat-message__avatar {
        background: color-mix(in srgb, var(--n-color-secondary) 16%, var(--n-surface-3));
        color: var(--n-color-secondary-bright);
      }

      .n-chat-message__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .n-chat-message__avatar span {
        font-family: var(--n-font-display);
        font-size: 9px;
        font-weight: 800;
      }

      .n-chat-message__header strong {
        background: var(--n-gradient-gemini);
        color: transparent;
        background-clip: text;
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-11);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-chat-message--tool .n-chat-message__header strong {
        color: var(--n-text-1);
        background: none;
        font-family: var(--n-font-body);
      }

      .n-chat-message__header time {
        margin-left: auto;
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: 9px;
      }

      .n-chat-message__content {
        margin: 0;
        color: var(--n-text-1);
        font-size: inherit;
        line-height: inherit;
        white-space: pre-wrap;
      }

      .n-chat-message--tool .n-chat-message__content {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-12);
        color: var(--n-text-2);
      }

      .n-chat-message--system .n-chat-message__content {
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
      }
    `,
  ],
})
export class NChatMessage {
  readonly message = input<NAIMessage | undefined>(undefined);
  readonly role = input<NAIMessageRole>('assistant');
  readonly content = input('');
  readonly author = input<string | undefined>(undefined);
  readonly avatar = input<string | undefined>(undefined);
  readonly timestamp = input<string | Date | undefined>(undefined);
  readonly status = input<NAIStatus | undefined>(undefined);
  readonly showAvatar = input(true, { transform: booleanAttribute });
  readonly showTimestamp = input(true, { transform: booleanAttribute });
  readonly compact = input(false, { transform: booleanAttribute });

  readonly resolvedRole = computed(() => this.message()?.role ?? this.role());
  readonly resolvedContent = computed(
    () => this.message()?.content ?? this.content(),
  );
  readonly resolvedAuthor = computed(
    () => this.message()?.author ?? this.author() ?? roleLabels[this.resolvedRole()],
  );
  readonly resolvedAvatar = computed(() => this.message()?.avatar ?? this.avatar());
  readonly resolvedTimestamp = computed(
    () => this.message()?.timestamp ?? this.timestamp(),
  );
  readonly resolvedStatus = computed(
    () => this.message()?.status ?? this.status(),
  );
  readonly showAvatarForRole = computed(() => {
    if (!this.showAvatar()) {
      return false;
    }

    const role = this.resolvedRole();

    return role === 'assistant' || role === 'tool';
  });
  readonly avatarIsImage = computed(() => {
    const value = this.resolvedAvatar();

    if (!value) {
      return false;
    }

    return (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('data:') ||
      value.startsWith('/')
    );
  });
  readonly avatarText = computed(() => {
    const value = this.resolvedAvatar();

    if (!value || this.avatarIsImage()) {
      return '';
    }

    return value.trim().slice(0, 2).toUpperCase();
  });
  readonly formattedTimestamp = computed(() => {
    const value = this.resolvedTimestamp();

    if (!value) {
      return '';
    }

    return value instanceof Date ? value.toISOString() : value;
  });
  readonly showHeader = computed(() => {
    const role = this.resolvedRole();

    if (role === 'user' || role === 'system') {
      return false;
    }

    return (
      this.showAvatarForRole() ||
      !!this.resolvedAuthor() ||
      (this.showTimestamp() && !!this.resolvedTimestamp()) ||
      !!this.resolvedStatus()
    );
  });

  roleIcon(): string {
    return roleIcons[this.resolvedRole()];
  }

  statusVariant(): NBadgeVariant {
    switch (this.resolvedStatus()) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'running':
      case 'streaming':
      case 'thinking':
        return 'info';
      default:
        return 'neutral';
    }
  }
}
