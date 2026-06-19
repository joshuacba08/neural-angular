import { Component, input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'n-step',
  standalone: true,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
})
export class NStep {
  readonly label = input.required<string>();
  readonly icon = input.required<string>(); // icon for upcoming/inactive state
  readonly completedIcon = input<string>('check');
  readonly activeIcon = input<string>('sparkles');

  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;
}
