export type NTableDensity = 'comfortable' | 'compact';
export type NTableVariant = 'default' | 'bordered' | 'surface';

export interface NTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  align?: 'start' | 'center' | 'end';
  width?: string;
  format?: (value: unknown, row: T) => string;
}
