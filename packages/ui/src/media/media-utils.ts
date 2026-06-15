import type { NMediaKind } from './media.types.js';

type FileCandidate = {
  name?: string;
  size?: number;
  type?: string;
};

export function formatFileSize(size?: number): string {
  if (!Number.isFinite(size) || size === undefined || size < 0) {
    return 'Unknown size';
  }

  if (size === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const;
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** index;

  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

export function getFileExtension(name?: string): string {
  if (!name || !name.includes('.')) {
    return '';
  }

  return name.split('.').pop()?.toLowerCase() ?? '';
}

export function getMediaKindFromMime(type?: string): NMediaKind {
  if (!type) {
    return 'unknown';
  }

  if (type.startsWith('image/')) {
    return 'image';
  }

  if (type.startsWith('video/')) {
    return 'video';
  }

  if (type.startsWith('audio/')) {
    return 'audio';
  }

  if (
    type.includes('zip') ||
    type.includes('rar') ||
    type.includes('tar') ||
    type.includes('7z') ||
    type.includes('archive')
  ) {
    return 'archive';
  }

  if (type.includes('pdf') || type.includes('text') || type.includes('document')) {
    return 'document';
  }

  return 'unknown';
}

export function getMediaKindFromFile(file: FileCandidate): NMediaKind {
  const mimeKind = getMediaKindFromMime(file.type);

  if (mimeKind !== 'unknown') {
    return mimeKind;
  }

  const extension = getFileExtension(file.name);

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(extension)) {
    return 'image';
  }

  if (['mp4', 'mov', 'm4v', 'webm', 'avi', 'mkv'].includes(extension)) {
    return 'video';
  }

  if (['mp3', 'wav', 'ogg', 'm4a', 'flac'].includes(extension)) {
    return 'audio';
  }

  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return 'archive';
  }

  if (['pdf', 'txt', 'md', 'doc', 'docx', 'csv', 'json'].includes(extension)) {
    return 'document';
  }

  return 'unknown';
}

export function matchesAccept(file: FileCandidate, accept?: string): boolean {
  if (!accept?.trim()) {
    return true;
  }

  const fileType = file.type?.toLowerCase() ?? '';
  const extension = getFileExtension(file.name);

  return accept
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith('.')) {
        return extension === rule.slice(1);
      }

      if (rule.endsWith('/*')) {
        return fileType.startsWith(`${rule.slice(0, -1)}`);
      }

      return fileType === rule;
    });
}

