export type NeuralThemeName = 'dark' | 'light' | 'system';

export interface NeuralThemeConfig {
  defaultTheme?: NeuralThemeName;
  storage?: boolean;
  storageKey?: string;
}

export type NeuralResolvedThemeName = Exclude<NeuralThemeName, 'system'>;
