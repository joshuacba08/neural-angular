import { Component, inject } from '@angular/core';
import {
  NeuralThemeService,
  type NeuralThemeName,
} from '@neural/angular-ui';

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly themeService = inject(NeuralThemeService);

  readonly theme = this.themeService.theme;
  readonly themeOptions: NeuralThemeName[] = ['dark', 'light', 'system'];

  readonly surfaces = [
    ['Canvas', '--n-bg-canvas'],
    ['Base', '--n-bg-base'],
    ['Surface 1', '--n-surface-1'],
    ['Surface 2', '--n-surface-2'],
    ['Surface 3', '--n-surface-3'],
    ['Surface 4', '--n-surface-4'],
  ] as const;

  readonly colors = [
    ['Primary', '--n-color-primary'],
    ['Secondary', '--n-color-secondary'],
    ['Tertiary', '--n-color-tertiary'],
    ['Success', '--n-color-success'],
    ['Warning', '--n-color-warning'],
    ['Danger', '--n-color-danger'],
    ['Info', '--n-color-info'],
  ] as const;

  readonly textLevels = [
    ['Text 1', '--n-text-1'],
    ['Text 2', '--n-text-2'],
    ['Text 3', '--n-text-3'],
    ['Text 4', '--n-text-4'],
  ] as const;

  readonly borders = [
    ['Border 0', '--n-border-0'],
    ['Border 1', '--n-border-1'],
    ['Border 2', '--n-border-2'],
    ['Border 3', '--n-border-3'],
  ] as const;

  readonly radii = [
    ['XS', '--n-radius-xs'],
    ['SM', '--n-radius-sm'],
    ['MD', '--n-radius-md'],
    ['LG', '--n-radius-lg'],
    ['XL', '--n-radius-xl'],
    ['Full', '--n-radius-full'],
  ] as const;

  readonly gradients = [
    ['Gemini', '--n-gradient-gemini'],
    ['Primary Secondary', '--n-gradient-primary-secondary'],
    ['Secondary Tertiary', '--n-gradient-secondary-tertiary'],
    ['Surface', '--n-gradient-surface-strong'],
  ] as const;

  readonly elevations = [
    ['Elevation 1', '--n-elevation-1'],
    ['Elevation 2', '--n-elevation-2'],
    ['Elevation 3', '--n-elevation-3'],
  ] as const;

  readonly glows = [
    ['Primary', '--n-glow-primary-md'],
    ['Secondary', '--n-glow-secondary-md'],
    ['Tertiary', '--n-glow-tertiary-md'],
    ['Gradient', '--n-glow-gradient-sm'],
  ] as const;

  readonly spacing = [
    ['1', '--n-space-1'],
    ['2', '--n-space-2'],
    ['4', '--n-space-4'],
    ['8', '--n-space-8'],
    ['12', '--n-space-12'],
    ['16', '--n-space-16'],
  ] as const;

  setTheme(theme: NeuralThemeName): void {
    this.themeService.setTheme(theme);
  }
}
