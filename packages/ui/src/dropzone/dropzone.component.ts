import { booleanAttribute, Component, computed, input, output, signal } from '@angular/core';

import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import { formatFileSize, matchesAccept } from '../media/media-utils.js';
import type {
  NDropzoneRejectedFile,
  NDropzoneFile,
  NDropzoneRejectReason,
  NDropzoneState,
  NDropzoneVariant,
} from './dropzone.types.js';

type FileInputLike = {
  click(): void;
  value: string;
  files?: ArrayLike<NDropzoneFile> | null;
};

type EventLike = {
  preventDefault?: () => void;
};

type DropEventLike = EventLike & {
  dataTransfer?: {
    files?: ArrayLike<NDropzoneFile> | null;
  };
};

let nextDropzoneId = 0;

@Component({
  selector: 'n-dropzone',
  standalone: true,
  imports: [NButton, NIcon],
  template: `
    <section
      class="n-dropzone"
      [class.n-dropzone--compact]="variant() === 'compact'"
      [class.n-dropzone--media]="variant() === 'media'"
      [class.n-dropzone--dragging]="state() === 'dragging'"
      [class.n-dropzone--disabled]="disabled()"
      [class.n-dropzone--error]="state() === 'error'"
      [attr.aria-disabled]="disabled()"
      [attr.aria-describedby]="descriptionId"
      (dragenter)="handleDragEnter($event)"
      (dragover)="handleDragOver($event)"
      (dragleave)="handleDragLeave($event)"
      (drop)="handleDrop($event)"
    >
      <input
        #fileInput
        class="n-dropzone__input"
        type="file"
        [id]="inputId"
        [accept]="accept() || null"
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="handleInputChange($event, fileInput)"
      />

      <span class="n-dropzone__icon" aria-hidden="true">
        <n-icon [name]="icon()" size="lg" />
      </span>

      <div class="n-dropzone__body">
        <h3>{{ title() }}</h3>
        <p [id]="descriptionId">{{ error() || description() }}</p>
      </div>

      <n-button
        variant="secondary"
        size="sm"
        [disabled]="disabled()"
        (click)="browse(fileInput)"
      >
        {{ browseLabel() }}
      </n-button>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-dropzone {
        display: grid;
        justify-items: center;
        gap: var(--n-space-4);
        padding: var(--n-space-8);
        border: 1px dashed var(--n-dropzone-border);
        border-radius: var(--n-radius-2xl);
        background: var(--n-dropzone-bg);
        color: var(--n-text-1);
        text-align: center;
        transition:
          border-color var(--n-transition-fast),
          background var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-dropzone:hover {
        background: var(--n-dropzone-hover-bg);
      }

      .n-dropzone--dragging {
        border-color: var(--n-dropzone-border-active);
        background: color-mix(in srgb, var(--n-color-primary) 14%, var(--n-dropzone-bg));
        box-shadow: var(--n-focus-ring), var(--n-glow-primary-xs);
      }

      .n-dropzone--error {
        border-color: var(--n-dropzone-border-error);
      }

      .n-dropzone--disabled {
        cursor: not-allowed;
        opacity: 0.58;
      }

      .n-dropzone--compact {
        grid-template-columns: auto minmax(0, 1fr) auto;
        justify-items: start;
        padding: var(--n-space-4);
        text-align: left;
      }

      .n-dropzone--media {
        min-height: 220px;
        background:
          radial-gradient(circle at top, color-mix(in srgb, var(--n-color-primary) 13%, transparent), transparent 42%),
          var(--n-dropzone-bg);
      }

      .n-dropzone__input {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
      }

      .n-dropzone__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-2xl);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
        box-shadow: var(--n-glow-primary-xs);
      }

      .n-dropzone--compact .n-dropzone__icon {
        width: 44px;
        height: 44px;
      }

      .n-dropzone__body {
        display: grid;
        gap: var(--n-space-2);
        max-width: 520px;
      }

      .n-dropzone__body h3,
      .n-dropzone__body p {
        margin: 0;
      }

      .n-dropzone__body h3 {
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-20);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-dropzone__body p {
        color: var(--n-text-2);
        line-height: 1.6;
      }

      .n-dropzone--error .n-dropzone__body p {
        color: var(--n-color-danger);
      }

      @media (max-width: 640px) {
        .n-dropzone--compact {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }
      }
    `,
  ],
})
export class NDropzone {
  readonly inputId = `n-dropzone-${++nextDropzoneId}`;
  readonly descriptionId = `${this.inputId}-description`;

  readonly accept = input<string | undefined>(undefined);
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly maxSize = input<number | undefined>(undefined);
  readonly maxFiles = input<number | undefined>(undefined);
  readonly variant = input<NDropzoneVariant>('default');
  readonly title = input('Drop files here');
  readonly description = input('Drag and drop files or browse from your device.');
  readonly browseLabel = input('Browse files');
  readonly icon = input('upload');
  readonly error = input<string | undefined>(undefined);

  readonly filesSelected = output<NDropzoneFile[]>();
  readonly filesRejected = output<NDropzoneRejectedFile[]>();

  private readonly dragging = signal(false);

  readonly state = computed<NDropzoneState>(() => {
    if (this.disabled()) {
      return 'disabled';
    }

    if (this.error()) {
      return 'error';
    }

    return this.dragging() ? 'dragging' : 'idle';
  });

  browse(inputElement: FileInputLike): void {
    if (this.disabled()) {
      return;
    }

    inputElement.click();
  }

  handleInputChange(event: EventLike, inputElement: FileInputLike): void {
    event.preventDefault?.();
    this.handleFiles(Array.from(inputElement.files ?? []));
    inputElement.value = '';
  }

  handleDragEnter(event: EventLike): void {
    event.preventDefault?.();

    if (!this.disabled()) {
      this.dragging.set(true);
    }
  }

  handleDragOver(event: EventLike): void {
    event.preventDefault?.();
  }

  handleDragLeave(event: EventLike): void {
    event.preventDefault?.();
    this.dragging.set(false);
  }

  handleDrop(event: EventLike): void {
    event.preventDefault?.();
    this.dragging.set(false);
    const files = Array.from((event as DropEventLike).dataTransfer?.files ?? []);
    this.handleFiles(files);
  }

  private handleFiles(files: NDropzoneFile[]): void {
    if (!files.length) {
      return;
    }

    if (this.disabled()) {
      this.filesRejected.emit(
        files.map((file) => this.reject(file, 'disabled', 'Dropzone is disabled.')),
      );
      return;
    }

    const accepted: NDropzoneFile[] = [];
    const rejected: NDropzoneRejectedFile[] = [];
    const maxFiles = this.maxFiles();

    if (maxFiles !== undefined && files.length > maxFiles) {
      rejected.push(
        ...files.map((file) =>
          this.reject(file, 'max-files', `A maximum of ${maxFiles} file(s) is allowed.`),
        ),
      );
    } else {
      for (const file of files) {
        const maxSize = this.maxSize();

        if (!matchesAccept(file, this.accept())) {
          rejected.push(this.reject(file, 'invalid-type', 'File type is not accepted.'));
        } else if (maxSize !== undefined && file.size > maxSize) {
          rejected.push(
            this.reject(file, 'max-size', `File exceeds the ${formatFileSize(maxSize)} limit.`),
          );
        } else {
          accepted.push(file);
        }
      }
    }

    if (accepted.length) {
      this.filesSelected.emit(accepted);
    }

    if (rejected.length) {
      this.filesRejected.emit(rejected);
    }
  }

  private reject(
    file: NDropzoneFile,
    reason: NDropzoneRejectReason,
    message: string,
  ): NDropzoneRejectedFile {
    return { file, reason, message };
  }
}
