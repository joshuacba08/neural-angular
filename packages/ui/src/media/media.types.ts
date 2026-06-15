export type NMediaKind = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'unknown';

export type NUploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'warning' | 'error';

export interface NFileLike {
  id?: string;
  name: string;
  size?: number;
  type?: string;
  extension?: string;
  url?: string;
  previewUrl?: string;
  status?: NUploadStatus;
  progress?: number;
  error?: string;
}

