export const NEURAL_COLOR_TOKENS = [
  '--n-color-primary',
  '--n-color-primary-bright',
  '--n-color-secondary',
  '--n-color-tertiary',
  '--n-color-success',
  '--n-color-warning',
  '--n-color-danger',
  '--n-color-info',
] as const;

export const NEURAL_SURFACE_TOKENS = [
  '--n-bg-canvas',
  '--n-bg-base',
  '--n-surface-1',
  '--n-surface-2',
  '--n-surface-3',
  '--n-surface-4',
] as const;

export const NEURAL_TEXT_TOKENS = [
  '--n-text-1',
  '--n-text-2',
  '--n-text-3',
  '--n-text-4',
] as const;

export const NEURAL_RADIUS_TOKENS = [
  '--n-radius-none',
  '--n-radius-xs',
  '--n-radius-sm',
  '--n-radius-md',
  '--n-radius-lg',
  '--n-radius-xl',
  '--n-radius-2xl',
  '--n-radius-3xl',
  '--n-radius-full',
] as const;

export const NEURAL_MOTION_TOKENS = [
  '--n-ease-standard',
  '--n-ease-decelerate',
  '--n-ease-spring',
  '--n-duration-fast',
  '--n-duration-base',
  '--n-duration-slow',
  '--n-transition-fast',
  '--n-transition-base',
  '--n-transition-slow',
] as const;

export type NeuralColorToken = (typeof NEURAL_COLOR_TOKENS)[number];
export type NeuralSurfaceToken = (typeof NEURAL_SURFACE_TOKENS)[number];
export type NeuralTextToken = (typeof NEURAL_TEXT_TOKENS)[number];
export type NeuralRadiusToken = (typeof NEURAL_RADIUS_TOKENS)[number];
export type NeuralMotionToken = (typeof NEURAL_MOTION_TOKENS)[number];
