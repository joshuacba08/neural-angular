import { InjectionToken } from '@angular/core';

import type { NDialogContainerData } from './dialog.types.js';

export const N_DIALOG_CONTAINER_DATA = new InjectionToken<NDialogContainerData>(
  'N_DIALOG_CONTAINER_DATA',
);

export const N_DIALOG_DATA = new InjectionToken<unknown>('N_DIALOG_DATA');
