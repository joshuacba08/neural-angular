import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideNeuralIcons,
  provideNeuralOverlay,
  provideNeuralTheme,
} from '@neural/angular-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNeuralTheme({
      defaultTheme: 'dark',
      storage: false,
    }),
    provideNeuralIcons(),
    provideNeuralOverlay(),
  ],
};
