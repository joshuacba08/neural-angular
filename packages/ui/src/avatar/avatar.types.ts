export type NAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type NAvatarVariant =
  | 'blue-violet'
  | 'violet-pink'
  | 'gemini'
  | 'surface';

/** @deprecated Use `circle` only. Rounded squares are not part of the design reference. */
export type NAvatarShape = 'circle' | 'rounded';

export type NAvatarStatus =
  | 'online'
  | 'active'
  | 'away'
  | 'offline'
  /** @deprecated Use `active` instead. */
  | 'busy'
  | null;
