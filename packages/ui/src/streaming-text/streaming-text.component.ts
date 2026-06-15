import { booleanAttribute, Component, input } from '@angular/core';

import type { NStreamingTextState, NStreamingTextSurface } from './streaming-text.types.js';

@Component({
  selector: 'n-streaming-text',
  standalone: true,
  template: `
    <div
      class="n-streaming-text"
      [class.n-streaming-text--streaming]="state() === 'streaming'"
      [class.n-streaming-text--complete]="state() === 'complete'"
      [class.n-streaming-text--error]="state() === 'error'"
      [class.n-streaming-text--mono]="mono()"
      [class.n-streaming-text--inline]="surface() === 'inline'"
      [attr.aria-live]="state() === 'streaming' ? 'polite' : null"
    >
      <p class="n-streaming-text__content">
        {{ text() }}
        @if (cursor() && state() === 'streaming') {
          <span class="n-streaming-text__cursor" aria-hidden="true"></span>
          <span class="n-streaming-text__sr-only">{{ cursorLabel() }}</span>
        }
      </p>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-streaming-text {
        padding: var(--n-space-4);
        border: 1px solid transparent;
        border-radius: var(--n-radius-xl);
        background:
          linear-gradient(var(--n-ai-surface-bg), var(--n-ai-surface-bg)) padding-box,
          var(--n-gradient-border-subtle) border-box;
        box-shadow: var(--n-elevation-1);
      }

      .n-streaming-text--streaming {
        box-shadow: var(--n-ai-glow), var(--n-elevation-1);
      }

      .n-streaming-text--inline {
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }

      .n-streaming-text--inline.n-streaming-text--streaming,
      .n-streaming-text--inline.n-streaming-text--complete,
      .n-streaming-text--inline.n-streaming-text--error {
        border: 0;
        box-shadow: none;
        background: transparent;
      }

      .n-streaming-text--complete {
        border-color: color-mix(in srgb, var(--n-color-success) 24%, var(--n-border-1));
      }

      .n-streaming-text--error {
        border-color: color-mix(in srgb, var(--n-color-danger) 28%, var(--n-border-1));
        background: color-mix(in srgb, var(--n-color-danger) 6%, var(--n-ai-surface-bg));
      }

      .n-streaming-text--mono .n-streaming-text__content {
        font-family: var(--n-font-mono);
      }

      .n-streaming-text__content {
        min-height: 3.3em;
        color: var(--n-text-1);
        font-size: var(--n-font-size-15);
        line-height: 1.65;
        white-space: pre-wrap;
      }

      .n-streaming-text__cursor {
        display: inline-block;
        width: 2px;
        height: 1.1em;
        margin-left: 2px;
        background: var(--n-color-secondary-bright);
        vertical-align: text-bottom;
        animation: n-streaming-text-blink 1s step-end infinite;
      }

      .n-streaming-text__sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-streaming-text__cursor {
          animation: none;
        }
      }

      @keyframes n-streaming-text-blink {
        0%,
        100% {
          opacity: 1;
        }

        50% {
          opacity: 0;
        }
      }
    `,
  ],
})
export class NStreamingText {
  readonly text = input('');
  readonly state = input<NStreamingTextState>('idle');
  readonly surface = input<NStreamingTextSurface>('card');
  readonly cursor = input(true, { transform: booleanAttribute });
  readonly cursorLabel = input('Streaming');
  readonly mono = input(false, { transform: booleanAttribute });
}
