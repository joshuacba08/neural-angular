import { Component, inject } from '@angular/core';
import {
  NButton,
  NDialogRef,
  NIcon,
  NInput,
  NTextarea,
} from '@neural/angular-ui';

@Component({
  selector: 'app-demo-dialog',
  standalone: true,
  imports: [NButton, NIcon, NInput, NTextarea],
  template: `
    <div class="demo-overlay-form">
      <n-input label="Project name" placeholder="Neural launch" />
      <n-textarea
        label="Description"
        placeholder="Describe the workflow..."
        [rows]="4"
      />

      <div class="demo-overlay-actions">
        <n-button variant="ghost" (click)="dialogRef.close('cancel')">Cancel</n-button>
        <n-button (click)="dialogRef.close('confirm')">
          <n-icon name="check" size="sm" />
          Confirm
        </n-button>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-overlay-form {
        display: grid;
        gap: var(--n-space-4);
      }

      .demo-overlay-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--n-space-3);
      }
    `,
  ],
})
export class DemoDialogComponent {
  readonly dialogRef = inject(NDialogRef);
}
