import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription, timer } from 'rxjs';

import { connectedPositions } from '../overlay/overlay-utils.js';
import { NTooltipComponent } from './tooltip.component.js';
import { N_TOOLTIP_DATA } from './tooltip.tokens.js';
import type { NTooltipPosition } from './tooltip.types.js';

@Directive({
  selector: '[nTooltip]',
  standalone: true,
})
export class NTooltipDirective implements OnDestroy {
  readonly tooltip = input('', { alias: 'nTooltip' });
  readonly position = input<NTooltipPosition>('top', { alias: 'nTooltipPosition' });
  readonly disabled = input(false, { alias: 'nTooltipDisabled' });
  readonly showDelay = input(120, {
    alias: 'nTooltipShowDelay',
    transform: numberAttribute,
  });
  readonly hideDelay = input(80, {
    alias: 'nTooltipHideDelay',
    transform: numberAttribute,
  });

  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | undefined;
  private showSubscription = new Subscription();
  private hideSubscription = new Subscription();

  @HostListener('mouseenter')
  @HostListener('focusin')
  show(): void {
    if (this.disabled() || !this.tooltip()) {
      return;
    }

    this.clearTimer('hide');
    this.showSubscription = timer(this.showDelay()).subscribe(() => this.attach());
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  hide(): void {
    this.clearTimer('show');
    this.hideSubscription = timer(this.hideDelay()).subscribe(() => this.detach());
  }

  ngOnDestroy(): void {
    this.clearTimer('show');
    this.clearTimer('hide');
    this.detach();
  }

  private attach(): void {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      panelClass: 'n-tooltip-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(connectedPositions(this.position()))
        .withPush(true),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const portalInjector = Injector.create({
      parent: this.injector,
      providers: [{ provide: N_TOOLTIP_DATA, useValue: { text: this.tooltip() } }],
    });

    this.overlayRef.attach(
      new ComponentPortal(NTooltipComponent, this.viewContainerRef, portalInjector),
    );
  }

  private detach(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  private clearTimer(type: 'show' | 'hide'): void {
    if (type === 'show') {
      this.showSubscription.unsubscribe();
      this.showSubscription = new Subscription();
    } else {
      this.hideSubscription.unsubscribe();
      this.hideSubscription = new Subscription();
    }
  }
}
