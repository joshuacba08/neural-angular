import { Component, inject } from '@angular/core';
import {
  NButton,
  NChip,
  NDrawerRef,
  NIcon,
  NProgress,
  NSelect,
  type NSelectOption,
} from '@neural/angular-ui';

@Component({
  selector: 'app-demo-drawer',
  standalone: true,
  imports: [NButton, NChip, NIcon, NProgress, NSelect],
  template: `
    <div class="demo-drawer-panel">
      <n-select label="Render profile" [options]="profileOptions" value="balanced" />

      <div class="demo-chip-row">
        <n-chip selected>GPU</n-chip>
        <n-chip>Batch</n-chip>
        <n-chip>Preview</n-chip>
      </div>

      <n-progress [value]="72" label="Capacity" [showValue]="true" />

      <div class="demo-overlay-actions">
        <n-button variant="ghost" (click)="drawerRef.close('cancel')">Cancel</n-button>
        <n-button (click)="drawerRef.close('saved')">
          <n-icon name="check" size="sm" />
          Save
        </n-button>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-drawer-panel {
        display: grid;
        gap: var(--n-space-5);
      }

      .demo-chip-row,
      .demo-overlay-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-3);
      }

      .demo-overlay-actions {
        justify-content: flex-end;
      }
    `,
  ],
})
export class DemoDrawerComponent {
  readonly drawerRef = inject(NDrawerRef);
  readonly profileOptions: NSelectOption[] = [
    { label: 'Balanced', value: 'balanced' },
    { label: 'Quality', value: 'quality' },
    { label: 'Fast preview', value: 'preview' },
  ];
}
