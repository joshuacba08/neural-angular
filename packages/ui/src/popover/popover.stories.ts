import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import { NPopoverDirective } from './popover.directive.js';
import { NTooltipDirective } from '../tooltip/tooltip.directive.js';

const meta: Meta = {
  title: 'Display & FX/Panel & Popover',
  decorators: [
    moduleMetadata({
      imports: [NPopoverDirective, NTooltipDirective, NButton, NIcon, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

const metricRow = (label: string, value: string, valueStyle = '') => `
  <div style="display:flex;justify-content:space-between;gap:12px">
    <span style="font-size:11px;color:var(--n-text-3)">${label}</span>
    <span style="font-family:var(--n-font-mono);font-size:10.5px;${valueStyle}">${value}</span>
  </div>
`;

export const DesignSystem: Story = {
  name: 'Glass Panels & Tooltips',
  render: () => ({
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start">
        <div class="n-glass-panel">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <n-icon name="info" size="sm" style="color:var(--n-color-primary-light)" />
            <span style="font-size:12px;font-weight:600">Model Info</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${metricRow('Name', 'Real-ESRGAN x4')}
            ${metricRow('Size', '2.3 GB')}
            ${metricRow('VRAM', '8 GB req.', 'color:var(--n-color-warning)')}
            ${metricRow('Version', 'v1.2 ✓', 'color:var(--n-color-success)')}
          </div>
          <div style="height:1px;background:var(--n-border-0);margin:10px 0"></div>
          <n-button variant="secondary" size="sm" style="width:100%">Switch Model</n-button>
        </div>

        <div style="display:flex;flex-direction:column;gap:28px">
          <div style="position:relative;width:fit-content;padding-top:44px">
            <n-button variant="secondary" size="sm">Export frame</n-button>
            <div
              class="n-tooltip n-tooltip--top"
              style="position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);pointer-events:none"
            >
              Save current frame as PNG
              <span class="n-tooltip__arrow" aria-hidden="true"></span>
            </div>
          </div>

          <div class="n-ctx-menu">
            <div class="n-ctx-item n-ctx-item--active">
              <n-icon name="play" size="sm" />
              <span>Process Now</span>
            </div>
            <div class="n-ctx-item">
              <n-icon name="link" size="sm" />
              <span>Duplicate Job</span>
            </div>
            <div class="n-ctx-item">
              <n-icon name="upload" size="sm" />
              <span>Move to Top</span>
            </div>
            <div style="height:1px;background:var(--n-border-0);margin:3px 0"></div>
            <div class="n-ctx-item n-ctx-item--danger">
              <n-icon name="trash-2" size="sm" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const PopoverBasic: Story = {
  name: 'Popover Basic',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;justify-content:center;height:150px">
        <n-button nPopover="Save current frame as PNG." nPopoverPosition="top">
          Popover Top
        </n-button>
        <n-button nPopover="Model metadata and quick actions." nPopoverPosition="bottom" nPopoverTrigger="click">
          Popover Bottom (Click)
        </n-button>
        <n-button nPopover="Hover to reveal more details." nPopoverPosition="right" nPopoverTrigger="hover">
          Popover Right (Hover)
        </n-button>
      </div>
    `,
  }),
};

export const PopoverTemplate: Story = {
  name: 'Popover Template',
  render: () => ({
    template: `
      <div style="display:flex;justify-content:center;align-items:center;height:180px">
        <n-button [nPopover]="popoverContent" nPopoverPosition="bottom" nPopoverTrigger="click">
          Model Info
        </n-button>

        <ng-template #popoverContent>
          <div class="n-glass-panel" style="min-width:220px;padding:14px 16px;box-shadow:none">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
              <n-icon name="info" size="sm" style="color:var(--n-color-primary-light)" />
              <span style="font-size:12px;font-weight:600">Real-ESRGAN x4</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${metricRow('VRAM', '8 GB req.', 'color:var(--n-color-warning)')}
              ${metricRow('Version', 'v1.2 ✓', 'color:var(--n-color-success)')}
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

export const Tooltips: Story = {
  name: 'Tooltips & Arrows',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;justify-content:center;height:150px">
        <n-button nTooltip="Save current frame as PNG" nTooltipPosition="top">
          Tooltip Top
        </n-button>
        <n-button nTooltip="Tooltip on bottom" nTooltipPosition="bottom">
          Tooltip Bottom
        </n-button>
        <n-button nTooltip="Tooltip on left" nTooltipPosition="left">
          Tooltip Left
        </n-button>
        <n-button nTooltip="Tooltip on right" nTooltipPosition="right">
          Tooltip Right
        </n-button>
      </div>
    `,
  }),
};

export const GlassPanel: Story = {
  name: 'Glass Panel',
  render: () => ({
    template: `
      <div style="display:flex;justify-content:center;padding:40px;background:radial-gradient(circle at top right, rgba(123, 92, 246, 0.15), transparent 60%)">
        <div class="n-glass-panel">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <n-icon name="info" size="sm" style="color:var(--n-color-primary-light)" />
            <span style="font-size:12px;font-weight:600">Model Info</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${metricRow('Name', 'Real-ESRGAN x4')}
            ${metricRow('Size', '2.3 GB')}
            ${metricRow('VRAM', '8 GB req.', 'color:var(--n-color-warning)')}
            ${metricRow('Version', 'v1.2 ✓', 'color:var(--n-color-success)')}
          </div>
          <div style="height:1px;background:var(--n-border-0);margin:10px 0"></div>
          <n-button variant="secondary" size="sm" style="width:100%">Switch Model</n-button>
        </div>
      </div>
    `,
  }),
};

export const ContextMenu: Story = {
  name: 'Context Menu',
  render: () => ({
    template: `
      <div style="display:flex;justify-content:center;align-items:center;height:260px">
        <div class="n-ctx-menu">
          <div class="n-ctx-item n-ctx-item--active">
            <n-icon name="play" size="sm" />
            <span>Process Now</span>
          </div>
          <div class="n-ctx-item">
            <n-icon name="link" size="sm" />
            <span>Duplicate Job</span>
          </div>
          <div class="n-ctx-item">
            <n-icon name="upload" size="sm" />
            <span>Move to Top</span>
          </div>
          <div style="height:1px;background:var(--n-border-0);margin:3px 0"></div>
          <div class="n-ctx-item n-ctx-item--danger">
            <n-icon name="trash-2" size="sm" />
            <span>Delete</span>
          </div>
        </div>
      </div>
    `,
  }),
};
