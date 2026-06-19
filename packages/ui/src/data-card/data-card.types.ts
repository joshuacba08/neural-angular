export type NDataCardVariant = 'default' | 'outlined' | 'gradient';
export type NDataCardDensity = 'comfortable' | 'compact';

export interface NDataCardItem {
  label: string;
  value: string | number;
  icon?: string;
  status?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export interface NDonutSegment {
  label: string;
  value: number;
  displayValue?: string;
  color?: 'blue-violet' | 'violet-pink' | 'neutral' | string;
}

