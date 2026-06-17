import { Directive, input } from '@angular/core';

@Directive({
  selector: '[nInputIcon]',
  standalone: true,
})
export class NInputIcon {
  readonly position = input<'prefix' | 'suffix'>('prefix');
}
