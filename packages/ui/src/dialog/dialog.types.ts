import type { TemplateRef } from '@angular/core';
import type { ComponentType } from '@angular/cdk/portal';

export type NDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface NDialogConfig<TData = unknown> {
  title?: string;
  description?: string;
  data?: TData;
  size?: NDialogSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  panelClass?: string | string[];
}

export type NDialogContent = ComponentType<unknown> | TemplateRef<unknown>;

export type NResolvedDialogConfig<TData = unknown> = Omit<
  NDialogConfig<TData>,
  'size' | 'closeOnBackdropClick' | 'closeOnEscape' | 'showCloseButton'
> & {
  size: NDialogSize;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  showCloseButton: boolean;
};

export interface NDialogContainerData<TData = unknown> {
  config: NResolvedDialogConfig<TData>;
  content: NDialogContent;
}
