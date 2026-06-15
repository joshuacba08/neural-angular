import { InjectionToken } from '@angular/core';

import type { NDrawerContainerData } from './drawer.types.js';

export const N_DRAWER_CONTAINER_DATA = new InjectionToken<NDrawerContainerData>(
  'N_DRAWER_CONTAINER_DATA',
);

export const N_DRAWER_DATA = new InjectionToken<unknown>('N_DRAWER_DATA');
