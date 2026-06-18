import { booleanAttribute, Component, computed, input, model, output, signal } from '@angular/core';

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
      [class.n-dropzone--pattern]="isPatternLayout()"
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
        <n-icon [name]="resolvedIcon()" [size]="resolvedIconSize()" />
      </span>

      @if (isPatternLayout()) {
        <div class="n-dropzone__body">
          @if (state() === 'dragging') {
            <p class="n-dropzone__lead n-dropzone__lead--accent">{{ dragTitle() }}</p>
          } @else if (state() === 'filled') {
            <p class="n-dropzone__lead n-dropzone__lead--success">{{ resolvedFilledLabel() }}</p>
          } @else if (state() === 'error') {
            <p class="n-dropzone__lead">{{ title() }}</p>
            <p [id]="descriptionId" class="n-dropzone__detail n-dropzone__detail--error">
              {{ resolvedDescription() }}
            </p>
          } @else {
            <p class="n-dropzone__lead">
              {{ title() }}
              @if (accentLabel()) {
                <span class="n-dropzone__accent">{{ accentLabel() }}</span>
              }
            </p>
            @if (description()) {
              <p [id]="descriptionId" class="n-dropzone__detail">{{ description() }}</p>
            }
          }
        </div>
      } @else {
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
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-dropzone {
        position: relative;
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

      .n-dropzone:focus-within {
        border-color: var(--n-dropzone-border-active);
        box-shadow: var(--n-focus-ring);
      }

      .n-dropzone--pattern {
        gap: 5px;
        min-height: 80px;
        padding: 12px 16px;
        border-width: 1.5px;
        border-color: rgba(255, 255, 255, 0.13);
        border-radius: 10px;
      }

      .n-dropzone--pattern:hover {
        background: rgba(255, 255, 255, 0.02);
      }

      .n-dropzone--pattern .n-dropzone__icon {
        width: auto;
        height: auto;
        border: none;
        background: transparent;
        color: var(--n-text-2);
        opacity: 0.28;
      }

      .n-dropzone--pattern .n-dropzone__body {
        gap: 0;
      }

      .n-dropzone--pattern .n-dropzone__lead {
        margin: 0;
        color: var(--n-text-3);
        font-size: 0.71875rem;
        line-height: 1.45;
      }

      .n-dropzone--pattern .n-dropzone__accent {
        color: var(--n-color-primary-light);
      }

      .n-dropzone--pattern .n-dropzone__detail {
        margin: 0;
        color: var(--n-text-3);
        font-size: var(--n-font-size-12);
        line-height: 1.45;
      }

      .n-dropzone--pattern .n-dropzone__detail--error {
        color: var(--n-color-danger);
      }

      .n-dropzone--dragging {
        border-color: var(--n-dropzone-border-active);
        background: color-mix(in srgb, var(--n-color-primary) 14%, var(--n-dropzone-bg));
        box-shadow: var(--n-focus-ring), var(--n-glow-primary-xs);
      }

      .n-dropzone--pattern.n-dropzone--dragging {
        border-color: rgba(66, 133, 244, 0.55);
        background: rgba(66, 133, 244, 0.07);
        box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.08);
      }

      .n-dropzone--pattern.n-dropzone--dragging .n-dropzone__icon {
        opacity: 1;
        color: var(--n-color-primary-light);
      }

      .n-dropzone--pattern .n-dropzone__lead--accent {
        color: var(--n-color-primary-light);
      }

      .n-dropzone--filled {
        border-style: solid;
        border-color: color-mix(in srgb, var(--n-color-success) 60%, transparent);
        background: color-mix(in srgb, var(--n-color-success) 10%, transparent);
      }

      .n-dropzone--pattern.n-dropzone--filled {
        border-color: rgba(52, 168, 83, 0.6);
        background: rgba(52, 168, 83, 0.06);
      }

      .n-dropzone--pattern.n-dropzone--filled .n-dropzone__icon {
        opacity: 1;
        color: var(--n-color-success);
      }

      .n-dropzone--pattern .n-dropzone__lead--success {
        color: var(--n-color-success);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11);
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
        align-items: center;
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

      .n-dropzone--compact .n-dropzone__action {
        justify-self: end;
      }

      @media (max-width: 640px) {
        .n-dropzone--compact {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }

        .n-dropzone--compact .n-dropzone__action {
          justify-self: center;
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
  readonly dragActive = input(false, { transform: booleanAttribute });
  readonly maxSize = input<number | undefined>(undefined);
  readonly maxFiles = input<number | undefined>(undefined);
  readonly variant = input<NDropzoneVariant>('default');
  readonly title = input('Drop files here');
  readonly description = input('');
  readonly accentLabel = input('Browse Files');
  readonly dragTitle = input('Drop to add video');
  readonly browseLabel = input('Browse files');
  readonly icon = input('upload-cloud');
  readonly error = input<string | undefined>(undefined);
  readonly files = model<NDropzoneFile[]>([]);

  readonly filesSelected = output<NDropzoneFile[]>();
  readonly filesRejected = output<NDropzoneRejectedFile[]>();

  private readonly dragging = signal(false);

  readonly isPatternLayout = computed(() => this.variant() === 'default');

  readonly state = computed<NDropzoneState>(() => {
    if (this.disabled()) {
      return 'disabled';
    }

    if (this.error()) {
      return 'error';
    }

    if (this.dragActive() || this.dragging()) {
      return 'dragging';
    }

    if (this.files().length) {
      return 'filled';
    }

    return 'idle';
  });

  readonly resolvedIcon = computed(() => (this.state() === 'filled' ? 'circle-check' : this.icon()));
  readonly resolvedIconSize = computed(() => (this.isPatternLayout() ? 'md' : 'lg'));
  readonly resolvedFilledLabel = computed(() => {
    const selected = this.files();

    if (selected.length === 1) {
      return `${selected[0]?.name ?? 'Selected file'} · ${formatFileSize(selected[0]?.size)}`;
    }

    return `${selected.length} files selected · ${formatFileSize(selected.reduce((sum, file) => sum + file.size, 0))}`;
  });
  readonly resolvedTitle = computed(() => {
    if (this.state() === 'filled') {
      return this.resolvedFilledLabel();
    }

    return this.title();
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
    const dropped = Array.from((event as DropEventLike).dataTransfer?.files ?? []);
    this.handleFiles(dropped);
  }

  private handleFiles(incoming: NDropzoneFile[]): void {
    if (!incoming.length) {
      return;
    }

    if (this.disabled()) {
      this.filesRejected.emit(
        incoming.map((file) => this.reject(file, 'disabled', 'Dropzone is disabled.')),
      );
      return;
    }

    const accepted: NDropzoneFile[] = [];
    const rejected: NDropzoneRejectedFile[] = [];
    const maxFiles = this.maxFiles();

    if (maxFiles !== undefined && incoming.length > maxFiles) {
      rejected.push(
        ...incoming.map((file) =>
          this.reject(file, 'max-files', `A maximum of ${maxFiles} file(s) is allowed.`),
        ),
      );
    } else {
      for (const file of incoming) {
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
      this.files.set(accepted);
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
