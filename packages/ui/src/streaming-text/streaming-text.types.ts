export type NStreamingTextState =
  | 'idle'
  | 'streaming'
  | 'complete'
  | 'error';

export type NStreamingTextSurface = 'card' | 'inline';
