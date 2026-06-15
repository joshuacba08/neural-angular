import type { NStatusDotStatus } from '../status-dot/status-dot.types.js';

export type NAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type NAvatarShape = 'circle' | 'rounded';
export type NAvatarStatus = Extract<
  NStatusDotStatus,
  'online' | 'offline' | 'busy' | 'away'
> | null;
