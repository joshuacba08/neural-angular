import { Injectable, Injector, TemplateRef, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, type ComponentType } from '@angular/cdk/portal';

import { normalizePanelClass } from '../overlay/overlay-utils.js';
import { NDrawerComponent } from './drawer.component.js';
import { NDrawerRef } from './drawer-ref.js';
import { N_DRAWER_CONTAINER_DATA, N_DRAWER_DATA } from './drawer.tokens.js';
import type { NDrawerConfig, NDrawerContainerData, NDrawerPosition } from './drawer.types.js';

@Injectable({ providedIn: 'root' })
export class NDrawerService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  open<TData = unknown, TResult = unknown>(
    componentOrTemplate: ComponentType<unknown> | TemplateRef<unknown>,
    config: NDrawerConfig<TData> = {},
  ): NDrawerRef<TResult> {
    const drawerConfig = {
      title: config.title,
      description: config.description,
      data: config.data,
      position: config.position ?? 'right',
      size: config.size ?? 'md',
      closeOnBackdropClick: config.closeOnBackdropClick ?? true,
      closeOnEscape: config.closeOnEscape ?? true,
      showCloseButton: config.showCloseButton ?? true,
      panelClass: config.panelClass,
    };
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'n-overlay-backdrop',
      panelClass: normalizePanelClass('n-drawer-overlay-panel', drawerConfig.panelClass),
      positionStrategy: this.drawerPosition(drawerConfig.position),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });
    const drawerRef = new NDrawerRef<TResult>(overlayRef);
    const data: NDrawerContainerData<TData> = {
      config: drawerConfig,
      content: componentOrTemplate,
    };
    const portalInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NDrawerRef, useValue: drawerRef },
        { provide: N_DRAWER_CONTAINER_DATA, useValue: data },
        { provide: N_DRAWER_DATA, useValue: drawerConfig.data },
      ],
    });

    overlayRef.attach(new ComponentPortal(NDrawerComponent, null, portalInjector));

    if (drawerConfig.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => drawerRef.close());
    }

    if (drawerConfig.closeOnEscape) {
      overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          drawerRef.close();
        }
      });
    }

    return drawerRef;
  }

  private drawerPosition(position: NDrawerPosition) {
    const strategy = this.overlay.position().global();

    if (position === 'left') {
      return strategy.left('0').top('0').bottom('0');
    }

    if (position === 'top') {
      return strategy.top('0').left('0').right('0');
    }

    if (position === 'bottom') {
      return strategy.bottom('0').left('0').right('0');
    }

    return strategy.right('0').top('0').bottom('0');
  }
}
