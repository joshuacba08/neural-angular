import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import type { ComponentType } from '@angular/cdk/portal';

import { NIcon } from '../icon/icon.component.js';
import type { NOverlayContentContext } from '../overlay/overlay.types.js';
import { NDrawerRef } from './drawer-ref.js';
import { N_DRAWER_CONTAINER_DATA } from './drawer.tokens.js';

let nextDrawerId = 0;

@Component({
  selector: 'n-drawer',
  standalone: true,
  imports: [CdkTrapFocus, NgComponentOutlet, NgTemplateOutlet, NIcon],
  template: `
    <aside
      class="n-drawer"
      [class.n-drawer--left]="data.config.position === 'left'"
      [class.n-drawer--top]="data.config.position === 'top'"
      [class.n-drawer--bottom]="data.config.position === 'bottom'"
      [class.n-drawer--sm]="data.config.size === 'sm'"
      [class.n-drawer--lg]="data.config.size === 'lg'"
      [class.n-drawer--xl]="data.config.size === 'xl'"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="data.config.title ? titleId : null"
      [attr.aria-describedby]="data.config.description ? descriptionId : null"
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="true"
    >
      @if (data.config.title || data.config.description || data.config.showCloseButton) {
        <header class="n-drawer__header">
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
              class="n-drawer__close"
              aria-label="Close drawer"
              (click)="drawerRef.close()"
            >
              <n-icon name="x" size="sm" />
            </button>
          }
        </header>
      }

      <div class="n-drawer__content">
        @if (templateContent) {
          <ng-container
            [ngTemplateOutlet]="templateContent"
            [ngTemplateOutletContext]="contentContext"
          />
        } @else if (componentContent) {
          <ng-container [ngComponentOutlet]="componentContent" />
        }
      </div>
    </aside>
  `,
  styles: [
    `
      :host {
        display: block;
        width: var(--n-drawer-width-md);
        max-width: calc(100vw - 24px);
        height: 100vh;
      }

      .n-drawer {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-left: 1px solid var(--n-overlay-panel-border);
        background: var(--n-overlay-panel-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-overlay-panel-shadow);
      }

      .n-drawer--left {
        border-right: 1px solid var(--n-overlay-panel-border);
        border-left: 0;
      }

      .n-drawer--top,
      .n-drawer--bottom {
        width: 100vw;
        height: min(72vh, var(--n-drawer-width-lg));
        border-left: 0;
      }

      .n-drawer--sm {
        width: var(--n-drawer-width-sm);
      }

      .n-drawer--lg {
        width: var(--n-drawer-width-lg);
      }

      .n-drawer--xl {
        width: var(--n-drawer-width-xl);
      }

      .n-drawer__header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: var(--n-space-4);
        padding: var(--n-space-5);
        border-bottom: 1px solid var(--n-border-1);
      }

      .n-drawer__header h2,
      .n-drawer__header p {
        margin: 0;
      }

      .n-drawer__header h2 {
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-20);
      }

      .n-drawer__header p {
        margin-top: var(--n-space-1);
        color: var(--n-text-2);
        font-size: var(--n-font-size-14);
        line-height: 1.6;
      }

      .n-drawer__close {
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

      .n-drawer__content {
        min-width: 0;
        overflow: auto;
        padding: var(--n-space-5);
      }
    `,
  ],
})
export class NDrawerComponent {
  readonly data = inject(N_DRAWER_CONTAINER_DATA);
  readonly drawerRef = inject(NDrawerRef);
  readonly titleId = `n-drawer-title-${++nextDrawerId}`;
  readonly descriptionId = `n-drawer-description-${nextDrawerId}`;
  readonly templateContent =
    this.data.content instanceof TemplateRef ? this.data.content : null;
  readonly componentContent =
    this.data.content instanceof TemplateRef ? null : (this.data.content as ComponentType<unknown>);
  readonly contentContext: NOverlayContentContext<unknown, NDrawerRef> = {
    $implicit: this.data.config.data,
    data: this.data.config.data,
    ref: this.drawerRef,
  };
}
