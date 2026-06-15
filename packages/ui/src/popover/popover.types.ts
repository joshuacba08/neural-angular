import type { TemplateRef } from '@angular/core';

export type NPopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type NPopoverTrigger = 'click' | 'hover' | 'focus';

export type NPopoverContent = TemplateRef<unknown> | string;

export interface NPopoverData {
  content: NPopoverContent;
}
