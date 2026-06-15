import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

import { connectedPositions } from '../overlay/overlay-utils.js';
import { NPopoverComponent } from './popover.component.js';
import { N_POPOVER_DATA } from './popover.tokens.js';
import type { NPopoverContent, NPopoverPosition, NPopoverTrigger } from './popover.types.js';

@Directive({
  selector: '[nPopover]',
  standalone: true,
})
export class NPopoverDirective implements OnDestroy {
  readonly content = input<NPopoverContent>('', { alias: 'nPopover' });
  readonly position = input<NPopoverPosition>('bottom', { alias: 'nPopoverPosition' });
  readonly disabled = input(false, { alias: 'nPopoverDisabled' });
  readonly trigger = input<NPopoverTrigger>('click', { alias: 'nPopoverTrigger' });

  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | undefined;
  private subscriptions = new Subscription();

  @HostListener('click')
  handleClick(): void {
    if (this.trigger() === 'click') {
      this.toggle();
    }
  }

  @HostListener('mouseenter')
  handleMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.open();
    }
  }

  @HostListener('mouseleave')
  handleMouseLeave(): void {
    if (this.trigger() === 'hover') {
      this.close();
    }
  }

  @HostListener('focusin')
  handleFocusIn(): void {
    if (this.trigger() === 'focus') {
      this.open();
    }
  }

  @HostListener('focusout')
  handleFocusOut(): void {
    if (this.trigger() === 'focus') {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  open(): void {
    if (this.disabled() || !this.content() || this.overlayRef?.hasAttached()) {
      return;
    }

    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.overlayRef = this.overlay.create({
      hasBackdrop: this.trigger() === 'click',
      backdropClass: 'n-overlay-transparent-backdrop',
      panelClass: 'n-popover-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(connectedPositions(this.position()))
        .withPush(true),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const portalInjector = Injector.create({
      parent: this.injector,
      providers: [{ provide: N_POPOVER_DATA, useValue: { content: this.content() } }],
    });

    this.overlayRef.attach(
      new ComponentPortal(NPopoverComponent, this.viewContainerRef, portalInjector),
    );
    this.subscriptions.add(this.overlayRef.backdropClick().subscribe(() => this.close()));
    this.subscriptions.add(
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      }),
    );
  }

  close(): void {
    this.subscriptions.unsubscribe();
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  private toggle(): void {
    if (this.overlayRef?.hasAttached()) {
      this.close();
    } else {
      this.open();
    }
  }
}
