import { Injectable, Injector, TemplateRef, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, type ComponentType } from '@angular/cdk/portal';

import { normalizePanelClass } from '../overlay/overlay-utils.js';
import { N_DIALOG_CONTAINER_DATA, N_DIALOG_DATA } from './dialog.tokens.js';
import { NDialogComponent } from './dialog.component.js';
import { NDialogRef } from './dialog-ref.js';
import type { NDialogConfig, NDialogContainerData } from './dialog.types.js';

@Injectable({ providedIn: 'root' })
export class NDialogService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  open<TData = unknown, TResult = unknown>(
    componentOrTemplate: ComponentType<unknown> | TemplateRef<unknown>,
    config: NDialogConfig<TData> = {},
  ): NDialogRef<TResult> {
    const dialogConfig = {
      title: config.title,
      description: config.description,
      data: config.data,
      size: config.size ?? 'md',
      closeOnBackdropClick: config.closeOnBackdropClick ?? true,
      closeOnEscape: config.closeOnEscape ?? true,
      showCloseButton: config.showCloseButton ?? true,
      panelClass: config.panelClass,
    };

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'n-overlay-backdrop',
      panelClass: normalizePanelClass('n-dialog-overlay-panel', dialogConfig.panelClass),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });
    const dialogRef = new NDialogRef<TResult>(overlayRef);
    const data: NDialogContainerData<TData> = {
      config: dialogConfig,
      content: componentOrTemplate,
    };
    const portalInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NDialogRef, useValue: dialogRef },
        { provide: N_DIALOG_CONTAINER_DATA, useValue: data },
        { provide: N_DIALOG_DATA, useValue: dialogConfig.data },
      ],
    });

    overlayRef.attach(new ComponentPortal(NDialogComponent, null, portalInjector));

    if (dialogConfig.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => dialogRef.close());
    }

    if (dialogConfig.closeOnEscape) {
      overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          dialogRef.close();
        }
      });
    }

    return dialogRef;
  }
}
