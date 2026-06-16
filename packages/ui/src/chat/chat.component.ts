import { booleanAttribute, Component, input } from '@angular/core';

import type { NAIMessage } from '../ai/ai.types.js';
import { NEmptyState } from '../empty-state/empty-state.component.js';
import type { NChatSurface } from './chat.types.js';
import { NChatMessage } from './chat-message.component.js';

@Component({
  selector: 'n-chat',
  standalone: true,
  imports: [NChatMessage, NEmptyState],
  template: `
    <section
      class="n-chat"
      [class.n-chat--compact]="compact()"
      [class.n-chat--inline]="surface() === 'inline'"
      [attr.aria-busy]="loading() ? 'true' : null"
    >
      @if (messages().length > 0) {
        <div class="n-chat__log" role="log">
          @for (message of messages(); track message.id ?? $index) {
            <n-chat-message
              [message]="message"
              [showAvatar]="showAvatars()"
              [showTimestamp]="showTimestamps()"
              [compact]="compact()"
            />
          }
        </div>
      } @else {
        <n-empty-state
          variant="neutral"
          icon="sparkles"
          [title]="emptyTitle()"
          [description]="emptyDescription()"
        />
      }

      @if (loading()) {
        <div class="n-chat__typing" aria-label="Assistant is responding">
          <span class="n-chat__typing-dot"></span>
          <span class="n-chat__typing-dot"></span>
          <span class="n-chat__typing-dot"></span>
        </div>
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-chat {
        display: grid;
        gap: var(--n-space-4);
        padding: var(--n-space-4);
        border: 1px solid var(--n-ai-surface-border);
        border-radius: var(--n-radius-xl);
        background: var(--n-ai-surface-bg);
        box-shadow: var(--n-elevation-1);
      }

      .n-chat--inline {
        gap: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }

      .n-chat--compact {
        gap: var(--n-space-3);
        padding: var(--n-space-3);
      }

      .n-chat--inline.n-chat--compact {
        gap: 0;
        padding: 0;
      }

      .n-chat__log {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 540px;
      }

      .n-chat--compact .n-chat__log {
        gap: 10px;
      }

      .n-chat__typing {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        width: fit-content;
        padding: 13px 17px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-2xl) var(--n-radius-2xl) var(--n-radius-2xl)
          var(--n-radius-xs);
        background:
          linear-gradient(var(--n-chat-assistant-bg), var(--n-chat-assistant-bg)) padding-box,
          var(--n-chat-border-assistant) border-box;
      }

      .n-chat__typing-dot {
        width: 7px;
        height: 7px;
        border-radius: var(--n-radius-full);
        background: var(--n-color-secondary);
        animation: n-chat-typing 1s ease-in-out infinite;
      }

      .n-chat__typing-dot:nth-child(2) {
        animation-delay: 120ms;
      }

      .n-chat__typing-dot:nth-child(3) {
        animation-delay: 240ms;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-chat__typing-dot {
          animation: none;
        }
      }

      @keyframes n-chat-typing {
        0%,
        80%,
        100% {
          transform: translateY(0);
          opacity: 0.48;
        }

        40% {
          transform: translateY(-2px);
          opacity: 1;
        }
      }
    `,
  ],
})
export class NChat {
  readonly messages = input<readonly NAIMessage[]>([]);
  readonly emptyTitle = input('No messages yet');
  readonly emptyDescription = input('Start a conversation with Neural.');
  readonly showAvatars = input(true, { transform: booleanAttribute });
  readonly showTimestamps = input(true, { transform: booleanAttribute });
  readonly compact = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly surface = input<NChatSurface>('card');
}
