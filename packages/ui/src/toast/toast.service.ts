import { Injectable, Injector, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { NToastComponent } from './toast.component.js';
import { NToastRef } from './toast-ref.js';
import { N_TOAST_DATA } from './toast.tokens.js';
import type { NToastConfig, NToastData, NToastPosition, NToastVariant } from './toast.types.js';

@Injectable({ providedIn: 'root' })
export class NToastService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly toasts: NToastRef[] = [];

  show(message: string, config: NToastConfig = {}): NToastRef {
    const data: NToastData = {
      title: config.title ?? '',
      icon: config.icon ?? this.defaultIcon(config.variant ?? 'neutral'),
      variant: config.variant ?? 'neutral',
      duration: config.duration ?? 4000,
      position: config.position ?? 'bottom-right',
      dismissible: config.dismissible ?? true,
      message,
    };
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      panelClass: 'n-toast-overlay-panel',
      positionStrategy: this.toastPosition(data.position, this.toasts.length),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const toastRef = new NToastRef(overlayRef);
    const portalInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NToastRef, useValue: toastRef },
        { provide: N_TOAST_DATA, useValue: data },
      ],
    });

    this.toasts.push(toastRef);
    overlayRef.detachments().subscribe(() => this.removeToast(toastRef));
    overlayRef.attach(new ComponentPortal(NToastComponent, null, portalInjector));
    toastRef.startAutoDismiss(data.duration);

    return toastRef;
  }

  success(message: string, config: NToastConfig = {}): NToastRef {
    return this.show(message, { ...config, variant: 'success' });
  }

  info(message: string, config: NToastConfig = {}): NToastRef {
    return this.show(message, { ...config, variant: 'info' });
  }

  warning(message: string, config: NToastConfig = {}): NToastRef {
    return this.show(message, { ...config, variant: 'warning' });
  }

  danger(message: string, config: NToastConfig = {}): NToastRef {
    return this.show(message, { ...config, variant: 'danger' });
  }

  dismissAll(): void {
    [...this.toasts].forEach((toast) => toast.dismiss());
  }

  private toastPosition(position: NToastPosition, index: number) {
    const offset = `${16 + index * 88}px`;
    const strategy = this.overlay.position().global();

    if (position.startsWith('top')) {
      strategy.top(offset);
    } else {
      strategy.bottom(offset);
    }

    if (position.endsWith('left')) {
      return strategy.left('16px');
    }

    if (position.endsWith('center')) {
      return strategy.centerHorizontally();
    }

    return strategy.right('16px');
  }

  private defaultIcon(variant: NToastVariant): string {
    if (variant === 'success') {
      return 'circle-check';
    }

    if (variant === 'danger' || variant === 'warning') {
      return 'alert-circle';
    }

    return 'info';
  }

  private removeToast(toastRef: NToastRef): void {
    const index = this.toasts.indexOf(toastRef);

    if (index >= 0) {
      this.toasts.splice(index, 1);
    }
  }
}
