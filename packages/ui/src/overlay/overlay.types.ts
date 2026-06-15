import type { ConnectedPosition } from '@angular/cdk/overlay';

export type NOverlayPosition = 'top' | 'bottom' | 'left' | 'right';

export type NOverlayPanelClass = string | string[] | undefined;

export interface NOverlayContentContext<TData = unknown, TRef = unknown> {
  $implicit: TData | undefined;
  data: TData | undefined;
  ref: TRef;
}

export type NOverlayConnectedPosition = ConnectedPosition;
