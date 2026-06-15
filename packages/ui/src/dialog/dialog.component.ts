import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import type { ComponentType } from '@angular/cdk/portal';

import { NIcon } from '../icon/icon.component.js';
import type { NOverlayContentContext } from '../overlay/overlay.types.js';
import { N_DIALOG_CONTAINER_DATA } from './dialog.tokens.js';
import { NDialogRef } from './dialog-ref.js';

let nextDialogId = 0;

@Component({
  selector: 'n-dialog',
  standalone: true,
  imports: [CdkTrapFocus, NgComponentOutlet, NgTemplateOutlet, NIcon],
  template: `
    <section
      class="n-dialog"
      [class.n-dialog--sm]="data.config.size === 'sm'"
      [class.n-dialog--lg]="data.config.size === 'lg'"
      [class.n-dialog--xl]="data.config.size === 'xl'"
      [class.n-dialog--fullscreen]="data.config.size === 'fullscreen'"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="data.config.title ? titleId : null"
      [attr.aria-describedby]="data.config.description ? descriptionId : null"
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="true"
    >
      @if (data.config.title || data.config.description || data.config.showCloseButton) {
        <header class="n-dialog__header">
          <div>
            @if (data.config.title) {
              <h2 [id]="titleId">{{ data.config.title }}</h2>
            }
            @if (data.config.description) {
              <p [id]="descriptionId">{{ data.config.description }}</p>
            }
          </div>

          @if (data.config.showCloseButton) {
            <button
              type="button"
              class="n-dialog__close"
              aria-label="Close dialog"
              (click)="dialogRef.close()"
            >
              <n-icon name="x" size="sm" />
            </button>
          }
        </header>
      }

      <div class="n-dialog__content">
        @if (templateContent) {
          <ng-container
            [ngTemplateOutlet]="templateContent"
            [ngTemplateOutletContext]="contentContext"
          />
        } @else if (componentContent) {
          <ng-container [ngComponentOutlet]="componentContent" />
        }
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(calc(100vw - 32px), var(--n-dialog-width-md));
        max-height: calc(100vh - 32px);
      }

      .n-dialog {
        display: grid;
        max-height: calc(100vh - 32px);
        overflow: hidden;
        border: 1px solid var(--n-overlay-panel-border);
        border-radius: var(--n-radius-2xl);
        background: var(--n-overlay-panel-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-overlay-panel-shadow);
      }

      .n-dialog--sm {
        width: min(calc(100vw - 32px), var(--n-dialog-width-sm));
      }

      .n-dialog--lg {
        width: min(calc(100vw - 32px), var(--n-dialog-width-lg));
      }

      .n-dialog--xl {
        width: min(calc(100vw - 32px), var(--n-dialog-width-xl));
      }

      .n-dialog--fullscreen {
        width: calc(100vw - 32px);
        height: calc(100vh - 32px);
      }

      .n-dialog__header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: var(--n-space-4);
        align-items: start;
        padding: var(--n-space-5);
        border-bottom: 1px solid var(--n-border-1);
      }

      .n-dialog__header h2,
      .n-dialog__header p {
        margin: 0;
      }

      .n-dialog__header h2 {
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-20);
      }

      .n-dialog__header p {
        margin-top: var(--n-space-1);
        color: var(--n-text-2);
        font-size: var(--n-font-size-14);
        line-height: 1.6;
      }

      .n-dialog__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-full);
        background: transparent;
        color: var(--n-text-2);
        cursor: pointer;
      }

      .n-dialog__close:hover,
      .n-dialog__close:focus-visible {
        border-color: var(--n-border-2);
        color: var(--n-text-1);
      }

      .n-dialog__content {
        min-width: 0;
        overflow: auto;
        padding: var(--n-space-5);
      }
    `,
  ],
})
export class NDialogComponent {
  readonly data = inject(N_DIALOG_CONTAINER_DATA);
  readonly dialogRef = inject(NDialogRef);
  readonly titleId = `n-dialog-title-${++nextDialogId}`;
  readonly descriptionId = `n-dialog-description-${nextDialogId}`;
  readonly templateContent =
    this.data.content instanceof TemplateRef ? this.data.content : null;
  readonly componentContent =
    this.data.content instanceof TemplateRef ? null : (this.data.content as ComponentType<unknown>);
  readonly contentContext: NOverlayContentContext<unknown, NDialogRef> = {
    $implicit: this.data.config.data,
    data: this.data.config.data,
    ref: this.dialogRef,
  };
}
