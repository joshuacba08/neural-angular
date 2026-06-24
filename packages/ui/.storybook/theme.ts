import { create } from 'storybook/theming/create';

/**
 * Neural Angular Storybook theme.
 *
 * Mirrors the design system's Gemini dark visual language so the Storybook
 * chrome (manager sidebar, toolbar) and the autodocs pages stay cohesive with
 * the dark components instead of falling back to Storybook's default light UI.
 */
export const neuralTheme = create({
  base: 'dark',

  brandTitle: 'Neural Angular UI Docs',
  brandImage: '/brand/neural-angular-ui-logo.svg',
  brandTarget: '_self',

  // Gemini accents
  colorPrimary: '#4285f4',
  colorSecondary: '#7b5cf6',

  // Surfaces — canvas to base
  appBg: '#0a0a15',
  appContentBg: '#06060e',
  appPreviewBg: '#06060e',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 12,

  // Typography
  fontBase: '"Plus Jakarta Sans", "Google Sans", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", "Cascadia Code", monospace',

  // Text
  textColor: 'rgba(255, 255, 255, 0.92)',
  textInverseColor: '#06060e',
  textMutedColor: 'rgba(255, 255, 255, 0.58)',

  // Toolbar / nav
  barTextColor: 'rgba(255, 255, 255, 0.58)',
  barSelectedColor: '#669df6',
  barHoverColor: '#8ab4f8',
  barBg: '#0f0f1c',

  // Form inputs
  inputBg: '#141426',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: 'rgba(255, 255, 255, 0.92)',
  inputBorderRadius: 8,
});
