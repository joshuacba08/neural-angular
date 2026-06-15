import type { TemplateRef } from '@angular/core';
import type { ComponentType } from '@angular/cdk/portal';

export type NDrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type NDrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface NDrawerConfig<TData = unknown> {
  title?: string;
  description?: string;
  data?: TData;
  position?: NDrawerPosition;
  size?: NDrawerSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  panelClass?: string | string[];
}

export type NDrawerContent = ComponentType<unknown> | TemplateRef<unknown>;

export type NResolvedDrawerConfig<TData = unknown> = Omit<
  NDrawerConfig<TData>,
  'position' | 'size' | 'closeOnBackdropClick' | 'closeOnEscape' | 'showCloseButton'
> & {
  position: NDrawerPosition;
  size: NDrawerSize;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  showCloseButton: boolean;
};

export interface NDrawerContainerData<TData = unknown> {
  config: NResolvedDrawerConfig<TData>;
  content: NDrawerContent;
}
