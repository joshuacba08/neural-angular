export type NDropzoneVariant = 'default' | 'compact' | 'media';
export type NDropzoneState = 'idle' | 'dragging' | 'filled' | 'disabled' | 'error';

export type NDropzoneRejectReason = 'invalid-type' | 'max-size' | 'max-files' | 'disabled';

export interface NDropzoneFile {
  name: string;
  size: number;
  type: string;
}

export interface NDropzoneRejectedFile {
  file: NDropzoneFile;
  reason: NDropzoneRejectReason;
  message: string;
}
