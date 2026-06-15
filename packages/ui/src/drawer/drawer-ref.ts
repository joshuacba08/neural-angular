import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class NDrawerRef<TResult = unknown> {
  private readonly closed = new Subject<TResult | undefined>();
  private isClosed = false;

  constructor(private readonly overlayRef: OverlayRef) {}

  close(result?: TResult): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.overlayRef.dispose();
    this.closed.next(result);
    this.closed.complete();
  }

  afterClosed(): Observable<TResult | undefined> {
    return this.closed.asObservable();
  }
}
