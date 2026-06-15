import {
  ENVIRONMENT_INITIALIZER,
  type EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';

import {
  NEURAL_THEME_CONFIG,
  normalizeNeuralThemeConfig,
} from './theme-config.js';
import { NeuralThemeService } from './theme.service.js';
import type { NeuralThemeConfig } from './theme.types.js';

export function provideNeuralTheme(
  config: NeuralThemeConfig = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NEURAL_THEME_CONFIG,
      useValue: normalizeNeuralThemeConfig(config),
    },
    NeuralThemeService,
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(NeuralThemeService).initialize();
      },
    },
  ]);
}
