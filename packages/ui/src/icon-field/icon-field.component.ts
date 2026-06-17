import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';

import { NInputIcon } from './input-icon.directive.js';

@Component({
  selector: 'n-icon-field',
  standalone: true,
  template: `
    <div
      class="n-icon-field"
      [class.n-icon-field--prefix]="hasPrefix()"
      [class.n-icon-field--suffix]="hasSuffix()"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 100%;
      }

      .n-icon-field {
        position: relative;
        width: 100%;
      }

      :host ::ng-deep input {
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        letter-spacing: 0;
        outline: none;
        height: 44px;
        box-sizing: border-box;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      :host ::ng-deep input:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      :host ::ng-deep input:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      /* Prefix styling */
      .n-icon-field--prefix ::ng-deep input {
        padding-left: 38px !important;
      }

      .n-icon-field--prefix ::ng-deep [nInputIcon] {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--n-text-3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Suffix styling */
      .n-icon-field--suffix ::ng-deep input {
        padding-right: 38px !important;
      }

      .n-icon-field--suffix ::ng-deep [nInputIcon] {
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--n-text-3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class NIconField implements AfterContentInit {
  @ContentChildren(NInputIcon, { descendants: true }) icons!: QueryList<NInputIcon>;

  hasPrefix(): boolean {
    return this.icons ? this.icons.some((icon) => icon.position() === 'prefix') : false;
  }

  hasSuffix(): boolean {
    return this.icons ? this.icons.some((icon) => icon.position() === 'suffix') : false;
  }

  ngAfterContentInit(): void {
    // Force change detection
  }
}
