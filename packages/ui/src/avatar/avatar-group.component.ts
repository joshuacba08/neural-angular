import { Component } from '@angular/core';

@Component({
  selector: 'n-avatar-group',
  standalone: true,
  template: `
    <div class="n-avatar-group" role="group">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .n-avatar-group {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }

      .n-avatar-group > :not(:first-child) {
        margin-right: -10px;
      }
    `,
  ],
})
export class NAvatarGroup {}
