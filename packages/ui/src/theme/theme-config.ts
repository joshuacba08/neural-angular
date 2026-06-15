import { InjectionToken } from '@angular/core';

import type { NeuralThemeConfig } from './theme.types.js';

export const NEURAL_DEFAULT_THEME_CONFIG = {
  defaultTheme: 'dark',
  storage: false,
  storageKey: 'neural-theme',
} as const satisfies Required<NeuralThemeConfig>;

export const NEURAL_THEME_CONFIG = new InjectionToken<
  Required<NeuralThemeConfig>
>('NEURAL_THEME_CONFIG', {
  providedIn: 'root',
  factory: () => NEURAL_DEFAULT_THEME_CONFIG,
});

export function normalizeNeuralThemeConfig(
  config: NeuralThemeConfig = {},
): Required<NeuralThemeConfig> {
  return {
    ...NEURAL_DEFAULT_THEME_CONFIG,
    ...config,
  };
}
