import { Directive, effect, ElementRef, inject, input, OnDestroy, Renderer2 } from '@angular/core';

import type { NBadgeVariant } from './badge.types.js';

@Directive({
  selector: '[nBadge]',
  standalone: true,
})
export class NBadgeDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly badgeValue = input<string | number | boolean | null | undefined>(undefined, { alias: 'nBadge' });
  readonly badgeVariant = input<NBadgeVariant>('danger', { alias: 'nBadgeVariant' });

  private badgeElement: any = null;

  constructor() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    effect(() => {
      this.updateBadge(this.badgeValue(), this.badgeVariant());
    });
  }

  ngOnDestroy(): void {
    this.removeBadge();
  }

  private updateBadge(value: string | number | boolean | null | undefined, variant: NBadgeVariant): void {
    if (value === null || value === undefined || value === false || value === 0 || value === '0' || value === '') {
      this.removeBadge();
      return;
    }

    if (!this.badgeElement) {
      this.badgeElement = this.renderer.createElement('span');
      this.renderer.appendChild(this.el.nativeElement, this.badgeElement);
    }

    this.renderer.setAttribute(this.badgeElement, 'class', 'n-badge-notification');

    if (value === true) {
      this.renderer.addClass(this.badgeElement, 'n-badge-notification--dot');
      this.badgeElement.textContent = '';
    } else {
      this.renderer.removeClass(this.badgeElement, 'n-badge-notification--dot');
      this.badgeElement.textContent = String(value);
    }

    this.renderer.addClass(this.badgeElement, `n-badge-notification--${variant}`);
  }

  private removeBadge(): void {
    if (this.badgeElement) {
      this.renderer.removeChild(this.el.nativeElement, this.badgeElement);
      this.badgeElement = null;
    }
  }
}
