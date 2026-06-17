import { Component } from '@angular/core';

@Component({
  selector: 'n-input-group-addon',
  standalone: true,
  template: `
    <div class="n-input-group-addon">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: stretch;
      }

      .n-input-group-addon {
        display: flex;
        align-items: center;
        padding: 0 var(--n-space-3, 12px);
        background: var(--n-surface-3);
        border: 1px solid var(--n-border-1);
        color: var(--n-text-3);
        font-size: 13px;
        white-space: nowrap;
        box-sizing: border-box;
      }
    `,
  ],
})
export class NInputGroupAddon {}
