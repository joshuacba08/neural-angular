import { OverlayRef } from '@angular/cdk/overlay';
import { Subscription, timer } from 'rxjs';

export class NToastRef {
  private timerSubscription = new Subscription();

  constructor(private readonly overlayRef: OverlayRef) {}

  dismiss(): void {
    this.timerSubscription.unsubscribe();
    this.timerSubscription = new Subscription();
    this.overlayRef.dispose();
  }

  startAutoDismiss(duration: number): void {
    if (duration <= 0) {
      return;
    }

    this.timerSubscription.unsubscribe();
    this.timerSubscription = timer(duration).subscribe(() => this.dismiss());
  }
}
