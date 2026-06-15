import { booleanAttribute, Component, computed, input } from '@angular/core';

import { NEmptyState } from '../empty-state/empty-state.component.js';
import { NIcon } from '../icon/icon.component.js';
import { getMediaKindFromFile } from '../media/media-utils.js';
import type { NMediaPreviewFit, NMediaPreviewKind, NMediaPreviewRatio } from './media-preview.types.js';

@Component({
  selector: 'n-media-preview',
  standalone: true,
  imports: [NEmptyState, NIcon],
  template: `
    <figure
      class="n-media-preview"
      [class.n-media-preview--square]="ratio() === 'square'"
      [class.n-media-preview--video]="ratio() === 'video'"
      [class.n-media-preview--wide]="ratio() === 'wide'"
      [class.n-media-preview--auto]="ratio() === 'auto'"
    >
      <div class="n-media-preview__stage">
        @if (!src()) {
          <n-empty-state
            [icon]="icon()"
            [title]="emptyTitle()"
            [description]="emptyDescription()"
          />
        } @else if (resolvedKind() === 'image') {
          <img
            class="n-media-preview__asset"
            [class.n-media-preview__asset--cover]="fit() === 'cover'"
            [src]="src()"
            [alt]="alt() || title() || 'Media preview'"
          />
        } @else if (resolvedKind() === 'video') {
          <video
            class="n-media-preview__asset"
            [class.n-media-preview__asset--cover]="fit() === 'cover'"
            [src]="src()"
            [poster]="poster() || null"
            [controls]="controls()"
            [muted]="muted()"
            [autoplay]="autoplay()"
            [loop]="loop()"
          ></video>
        } @else if (resolvedKind() === 'audio') {
          <div class="n-media-preview__audio">
            <span class="n-media-preview__audio-icon" aria-hidden="true">
              <n-icon name="file-audio" size="xl" />
            </span>
            <audio [src]="src()" [controls]="controls()" [autoplay]="autoplay()" [loop]="loop()"></audio>
          </div>
        } @else {
          <div class="n-media-preview__file">
            <span class="n-media-preview__file-icon" aria-hidden="true">
              <n-icon [name]="icon()" size="xl" />
            </span>
            <strong>{{ title() || 'File preview' }}</strong>
            <span>{{ description() || 'Preview unavailable for this file type.' }}</span>
          </div>
        }
      </div>

      @if (title() || description()) {
        <figcaption class="n-media-preview__caption">
          @if (title()) {
            <strong>{{ title() }}</strong>
          }
          @if (description()) {
            <span>{{ description() }}</span>
          }
        </figcaption>
      }
    </figure>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-media-preview {
        display: grid;
        gap: var(--n-space-3);
        margin: 0;
      }

      .n-media-preview__stage {
        display: grid;
        place-items: center;
        overflow: hidden;
        min-height: 220px;
        border: 1px solid var(--n-media-preview-border);
        border-radius: var(--n-radius-2xl);
        background:
          radial-gradient(circle at top, color-mix(in srgb, var(--n-color-secondary) 10%, transparent), transparent 48%),
          var(--n-media-preview-bg);
      }

      .n-media-preview--square .n-media-preview__stage {
        aspect-ratio: 1;
      }

      .n-media-preview--video .n-media-preview__stage {
        aspect-ratio: 16 / 9;
      }

      .n-media-preview--wide .n-media-preview__stage {
        aspect-ratio: 21 / 9;
      }

      .n-media-preview--auto .n-media-preview__stage {
        aspect-ratio: auto;
      }

      .n-media-preview__asset {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .n-media-preview__asset--cover {
        object-fit: cover;
      }

      .n-media-preview__audio,
      .n-media-preview__file {
        display: grid;
        justify-items: center;
        gap: var(--n-space-4);
        width: min(100%, 520px);
        padding: var(--n-space-6);
        text-align: center;
      }

      .n-media-preview__audio audio {
        width: 100%;
      }

      .n-media-preview__audio-icon,
      .n-media-preview__file-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-2xl);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
      }

      .n-media-preview__file strong,
      .n-media-preview__caption strong {
        color: var(--n-text-1);
        font-size: var(--n-font-size-14);
      }

      .n-media-preview__file span,
      .n-media-preview__caption span {
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.5;
      }

      .n-media-preview__caption {
        display: grid;
        gap: var(--n-space-1);
      }
    `,
  ],
})
export class NMediaPreview {
  readonly src = input<string | undefined>(undefined);
  readonly kind = input<NMediaPreviewKind>('auto');
  readonly alt = input<string | undefined>(undefined);
  readonly poster = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly fit = input<NMediaPreviewFit>('contain');
  readonly ratio = input<NMediaPreviewRatio>('video');
  readonly controls = input(true, { transform: booleanAttribute });
  readonly muted = input(false, { transform: booleanAttribute });
  readonly autoplay = input(false, { transform: booleanAttribute });
  readonly loop = input(false, { transform: booleanAttribute });
  readonly icon = input('file-text');
  readonly emptyTitle = input('No preview available');
  readonly emptyDescription = input('Select a media file to preview it.');

  readonly resolvedKind = computed<Exclude<NMediaPreviewKind, 'auto'>>(() => {
    if (this.kind() !== 'auto') {
      return this.kind() as Exclude<NMediaPreviewKind, 'auto'>;
    }

    const kind = getMediaKindFromFile({ name: this.src(), type: undefined });

    if (kind === 'image' || kind === 'video' || kind === 'audio') {
      return kind;
    }

    return 'file';
  });
}

