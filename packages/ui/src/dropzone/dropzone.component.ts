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
      [class.n-dropzone--filled]="state() === 'filled'"
      [class.n-dropzone--disabled]="disabled()"
      [class.n-dropzone--error]="state() === 'error'"
      [attr.aria-disabled]="disabled()"
      [attr.aria-describedby]="descriptionId"
      (click)="browse(fileInput)"
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
        <n-icon [name]="resolvedIcon()" size="lg" />
      </span>

      <div class="n-dropzone__body">
        <h3>{{ resolvedTitle() }}</h3>
        <p [id]="descriptionId">{{ resolvedDescription() }}</p>
      </div>

      <n-button
        class="n-dropzone__action"
        variant="secondary"
        size="sm"
        [disabled]="disabled()"
        (click)="$event.stopPropagation(); browse(fileInput)"
      >
        {{ resolvedBrowseLabel() }}
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
        gap: var(--n-space-3);
        min-height: 96px;
        padding: var(--n-space-4);
        border: 1px dashed var(--n-dropzone-border);
        border-radius: var(--n-radius-lg);
        background: rgba(255, 255, 255, 0.015);
        color: var(--n-text-1);
        text-align: center;
        cursor: pointer;
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

      .n-dropzone--filled {
        border-style: solid;
        border-color: color-mix(in srgb, var(--n-color-success) 60%, transparent);
        background: color-mix(in srgb, var(--n-color-success) 10%, transparent);
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
        padding: var(--n-space-8);
        border-radius: var(--n-radius-2xl);
        background:
          radial-gradient(circle at top, color-mix(in srgb, var(--n-color-primary) 13%, transparent), transparent 42%),
          var(--n-dropzone-bg);
      }

      .n-dropzone--media .n-dropzone__icon {
        width: 56px;
        height: 56px;
        border-radius: var(--n-radius-2xl);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
        box-shadow: var(--n-glow-primary-xs);
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
        width: 44px;
        height: 44px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-lg);
        background: transparent;
        color: var(--n-text-2);
      }

      .n-dropzone--dragging .n-dropzone__icon {
        color: var(--n-color-primary-bright);
      }

      .n-dropzone--filled .n-dropzone__icon {
        border-color: color-mix(in srgb, var(--n-color-success) 32%, transparent);
        background: color-mix(in srgb, var(--n-color-success) 10%, transparent);
        color: var(--n-color-success);
      }

      .n-dropzone__body {
        display: grid;
        gap: var(--n-space-1);
        max-width: 520px;
      }

      .n-dropzone__body h3,
      .n-dropzone__body p {
        margin: 0;
      }

      .n-dropzone__body h3 {
        font-size: 0.71875rem;
        font-weight: var(--n-font-weight-medium);
        line-height: 1.4;
      }

      .n-dropzone__body p {
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-dropzone--filled .n-dropzone__body h3 {
        color: var(--n-color-success);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11);
      }

      .n-dropzone--filled .n-dropzone__body p {
        color: rgba(255, 255, 255, 0.5);
      }

      .n-dropzone--media .n-dropzone__body {
        gap: var(--n-space-2);
      }

      .n-dropzone--media .n-dropzone__body h3 {
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-20);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-dropzone--media .n-dropzone__body p {
        font-size: var(--n-font-size-14);
        line-height: 1.6;
      }

      .n-dropzone--error .n-dropzone__body p {
        color: var(--n-color-danger);
      }

      .n-dropzone__action {
        justify-self: center;
      }

      .n-dropzone:not(.n-dropzone--media) .n-dropzone__action {
        display: none;
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
  private readonly selectedFiles = signal<ReadonlyArray<NDropzoneFile>>([]);

  readonly state = computed<NDropzoneState>(() => {
    if (this.disabled()) {
      return 'disabled';
    }

    if (this.error()) {
      return 'error';
    }

    if (this.dragging()) {
      return 'dragging';
    }

    if (this.selectedFiles().length) {
      return 'filled';
    }

    return 'idle';
  });

  readonly resolvedIcon = computed(() => (this.state() === 'filled' ? 'circle-check' : this.icon()));
  readonly resolvedTitle = computed(() => {
    if (this.state() !== 'filled') {
      return this.title();
    }

    const files = this.selectedFiles();
    if (files.length === 1) {
      return `${files[0]?.name ?? 'Selected file'} · ${formatFileSize(files[0]?.size)}`;
    }

    return `${files.length} files selected · ${formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}`;
  });
  readonly resolvedDescription = computed(() => {
    if (this.error()) {
      return this.error() ?? '';
    }

    if (this.state() !== 'filled') {
      return this.description();
    }

    return 'Drop more files or browse again to replace the current selection.';
  });
  readonly resolvedBrowseLabel = computed(() => (this.state() === 'filled' ? 'Replace files' : this.browseLabel()));

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
      this.selectedFiles.set(accepted);
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
