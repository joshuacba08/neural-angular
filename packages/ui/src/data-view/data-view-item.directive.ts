import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[nGridItem]',
  standalone: true,
})
export class NGridItem {
  readonly templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[nListItem]',
  standalone: true,
})
export class NListItem {
  readonly templateRef = inject(TemplateRef);
}
