import { Component, input } from '@angular/core';

import type { NSkeletonShape } from './skeleton.types.js';

@Component({
  selector: 'n-skeleton',
  standalone: true,
  template: ``,
  host: {
    class: 'n-skeleton',
    '[class.n-skeleton--circle]': "shape() === 'circle'",
    '[class.n-skeleton--text]': "shape() === 'text'",
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.border-radius]': 'radius()',
    '[attr.aria-hidden]': "'true'",
  },
  styles: [
    `
      :host {
        display: block;
        border-radius: 6px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.04) 0%,
          rgba(255, 255, 255, 0.09) 50%,
          rgba(255, 255, 255, 0.04) 100%
        );
        background-size: 200% 100%;
        animation: n-skeleton-wave 1.4s ease-in-out infinite;
      }

      :host(.n-skeleton--circle) {
        border-radius: 50%;
      }

      :host(.n-skeleton--text) {
        height: 9px;
        border-radius: 6px;
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          animation: none;
        }
      }

      @keyframes n-skeleton-wave {
        0% {
          background-position: 200% 0;
        }

        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
})
export class NSkeleton {
  readonly shape = input<NSkeletonShape>('rect');
  readonly width = input<string | undefined>(undefined);
  readonly height = input<string | undefined>(undefined);
  readonly radius = input<string | undefined>(undefined);
}
