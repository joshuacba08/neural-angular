import { importProvidersFrom, type EnvironmentProviders } from '@angular/core';
import { OverlayModule, type ConnectedPosition } from '@angular/cdk/overlay';

import type { NOverlayPanelClass, NOverlayPosition } from './overlay.types.js';

export function provideNeuralOverlay(): EnvironmentProviders {
  return importProvidersFrom(OverlayModule);
}

export function normalizePanelClass(
  baseClass: string,
  panelClass?: NOverlayPanelClass,
): string[] {
  return [baseClass, ...(Array.isArray(panelClass) ? panelClass : panelClass ? [panelClass] : [])];
}

export function connectedPositions(position: NOverlayPosition): ConnectedPosition[] {
  const positions: Record<NOverlayPosition, ConnectedPosition[]> = {
    top: [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      },
    ],
    bottom: [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 8,
      },
    ],
    left: [
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -8,
      },
    ],
    right: [
      {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: 8,
      },
    ],
  };

  return [
    ...positions[position],
    ...positions.bottom,
    ...positions.top,
    ...positions.right,
    ...positions.left,
  ];
}
