import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideNeuralTheme } from '@neural/angular-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNeuralTheme({
      defaultTheme: 'dark',
      storage: false,
    }),
  ],
};
