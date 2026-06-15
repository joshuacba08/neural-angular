import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

import { NEURAL_THEME_CONFIG } from './theme-config.js';
import type { NeuralResolvedThemeName, NeuralThemeName } from './theme.types.js';

@Injectable({ providedIn: 'root' })
export class NeuralThemeService {
  private readonly config = inject(NEURAL_THEME_CONFIG);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly themeState = signal<NeuralThemeName>(this.config.defaultTheme);

  readonly theme = this.themeState.asReadonly();

  initialize(): void {
    const storedTheme = this.readStoredTheme();
    this.applyTheme(storedTheme ?? this.config.defaultTheme, false);
  }

  setTheme(theme: NeuralThemeName): void {
    this.applyTheme(theme, true);
  }

  getTheme(): NeuralThemeName {
    return this.themeState();
  }

  private applyTheme(theme: NeuralThemeName, persist: boolean): void {
    this.themeState.set(theme);

    if (!this.isBrowser) {
      return;
    }

    const resolvedTheme = this.resolveTheme(theme);
    const root = this.document.documentElement;

    root.setAttribute('data-n-theme', resolvedTheme);
    root.classList.toggle('n-theme-dark', resolvedTheme === 'dark');
    root.classList.toggle('n-theme-light', resolvedTheme === 'light');

    if (persist && this.config.storage) {
      this.writeStoredTheme(theme);
    }
  }

  private resolveTheme(theme: NeuralThemeName): NeuralResolvedThemeName {
    if (theme !== 'system') {
      return theme;
    }

    const view = this.document.defaultView;
    const prefersLight = view?.matchMedia?.('(prefers-color-scheme: light)').matches;

    return prefersLight ? 'light' : 'dark';
  }

  private readStoredTheme(): NeuralThemeName | null {
    if (!this.isBrowser || !this.config.storage) {
      return null;
    }

    try {
      const value = this.document.defaultView?.localStorage.getItem(
        this.config.storageKey,
      );

      return this.isThemeName(value) ? value : null;
    } catch {
      return null;
    }
  }

  private writeStoredTheme(theme: NeuralThemeName): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        this.config.storageKey,
        theme,
      );
    } catch {
      // Storage can be unavailable in private browsing or embedded contexts.
    }
  }

  private isThemeName(value: string | null | undefined): value is NeuralThemeName {
    return value === 'dark' || value === 'light' || value === 'system';
  }
}
