export type NToastVariant = 'neutral' | 'success' | 'info' | 'warning' | 'danger';

export type NToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface NToastConfig {
  title?: string;
  icon?: string;
  variant?: NToastVariant;
  duration?: number;
  position?: NToastPosition;
  dismissible?: boolean;
}

export interface NToastData extends Required<NToastConfig> {
  message: string;
}
