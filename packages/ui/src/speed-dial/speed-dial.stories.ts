import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NSpeedDial } from './speed-dial.component.js';
import { NSpeedDialItem } from './speed-dial-item.component.js';

const meta: Meta<NSpeedDial> = {
  title: 'Actions & Menus/SpeedDial',
  component: NSpeedDial,
  decorators: [
    moduleMetadata({
      imports: [NSpeedDial, NSpeedDialItem, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
  argTypes: {
    icon: {
      description: 'Main button icon name when closed.',
      control: 'text',
      table: {
        category: 'Inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'plus' },
      },
    },
    activeIcon: {
      description: 'Main button icon name when open.',
      control: 'text',
      table: {
        category: 'Inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'x' },
      },
    },
    buttonVariant: {
      description: 'FAB visual style theme.',
      control: 'select',
      options: ['primary', 'gemini', 'secondary'],
      table: {
        category: 'Inputs',
        type: { summary: "'primary' | 'gemini' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    type: {
      description: 'Item positioning layout type.',
      control: 'select',
      options: ['linear', 'semi', 'radial'],
      table: {
        category: 'Inputs',
        type: { summary: "'linear' | 'semi' | 'radial'" },
        defaultValue: { summary: 'linear' },
      },
    },
    direction: {
      description: 'Spread direction of items.',
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      table: {
        category: 'Inputs',
        type: { summary: "'up' | 'down' | 'left' | 'right'" },
        defaultValue: { summary: 'up' },
      },
    },
    radius: {
      description: 'Radius in px for radial layout.',
      control: 'number',
      table: {
        category: 'Inputs',
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    stagger: {
      description: 'Stagger transition delay step in milliseconds.',
      control: 'number',
      table: {
        category: 'Inputs',
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    open: {
      description: 'Whether the speed dial action list is open.',
      control: 'boolean',
      table: {
        category: 'Model',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    icon: 'plus',
    activeIcon: 'x',
    buttonVariant: 'primary',
    type: 'linear',
    direction: 'up',
    radius: 80,
    stagger: 80,
    open: true,
  },
};

export default meta;
type Story = StoryObj<NSpeedDial>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; align-items: flex-end; height: 260px; padding-bottom: 20px;">
        <n-speed-dial
          [icon]="icon"
          [activeIcon]="activeIcon"
          [buttonVariant]="buttonVariant"
          [type]="type"
          [direction]="direction"
          [radius]="radius"
          [stagger]="stagger"
          [(open)]="open"
        >
          <button n-speed-dial-item icon="trash-2" tone="danger" title="Delete"></button>
          <button n-speed-dial-item icon="external-link" title="Share"></button>
          <button n-speed-dial-item icon="download" title="Download"></button>
          <button n-speed-dial-item icon="code" title="Edit"></button>
        </n-speed-dial>
      </div>
    `,
  }),
};

const labelStyle =
  'font-family:var(--n-font-mono);font-size:9.5px;color:var(--n-text-3);text-align:center;letter-spacing:0.04em';

export const DesignSystem: Story = {
  name: 'Design System',
  render: () => ({
    template: `
      <div style="display:flex;gap:48px;justify-content:center;align-items:flex-end;min-height:280px;padding:24px 16px 32px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="${labelStyle};margin:0">Linear · Open</div>
          <n-speed-dial icon="plus" activeIcon="x" buttonVariant="primary" type="linear" direction="up" [open]="true">
            <button n-speed-dial-item icon="trash-2" tone="danger" title="Delete"></button>
            <button n-speed-dial-item icon="external-link" title="Share"></button>
            <button n-speed-dial-item icon="download" title="Download"></button>
            <button n-speed-dial-item icon="code" title="Edit"></button>
          </n-speed-dial>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="${labelStyle};margin:0">Semi-circle · Up</div>
          <n-speed-dial icon="zap" activeIcon="x" buttonVariant="primary" type="semi" [stagger]="60" [open]="true">
            <button n-speed-dial-item icon="cpu" tone="primary" title="Compute"></button>
            <button n-speed-dial-item icon="activity" title="Analyze"></button>
            <button n-speed-dial-item icon="sparkles" tone="violet" title="Enhance"></button>
            <button n-speed-dial-item icon="settings" title="Settings"></button>
          </n-speed-dial>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="${labelStyle};margin:0">Click to open</div>
          <n-speed-dial icon="plus" activeIcon="x" buttonVariant="primary" type="linear" direction="up">
            <button n-speed-dial-item icon="activity" title="Analytics"></button>
            <button n-speed-dial-item icon="download" title="Export"></button>
            <button n-speed-dial-item icon="settings" title="Settings"></button>
          </n-speed-dial>
        </div>
      </div>
    `,
  }),
};

export const LinearUp: Story = {
  name: 'Linear Up (Click)',
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; align-items: flex-end; height: 260px; padding-bottom: 20px;">
        <n-speed-dial icon="plus" activeIcon="x" buttonVariant="primary" type="linear" direction="up">
          <button n-speed-dial-item icon="trash-2" tone="danger" title="Delete" (clickItem)="onAction('Delete')"></button>
          <button n-speed-dial-item icon="external-link" title="Share" (clickItem)="onAction('Share')"></button>
          <button n-speed-dial-item icon="download" title="Download" (clickItem)="onAction('Download')"></button>
          <button n-speed-dial-item icon="code" title="Edit" (clickItem)="onAction('Edit')"></button>
        </n-speed-dial>
      </div>
    `,
    props: {
      onAction: (name: string) => alert(`${name} action clicked!`),
    },
  }),
};

export const SemiCircleUp: Story = {
  name: 'Semi-circle Up',
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; align-items: flex-end; height: 260px; padding-bottom: 20px;">
        <n-speed-dial icon="zap" activeIcon="x" buttonVariant="primary" type="semi" [stagger]="60" [open]="true">
          <button n-speed-dial-item icon="cpu" tone="primary" title="Compute" (clickItem)="onAction('Compute')"></button>
          <button n-speed-dial-item icon="activity" title="Analyze" (clickItem)="onAction('Analyze')"></button>
          <button n-speed-dial-item icon="sparkles" tone="violet" title="Enhance" (clickItem)="onAction('Enhance')"></button>
          <button n-speed-dial-item icon="settings" title="Settings" (clickItem)="onAction('Settings')"></button>
        </n-speed-dial>
      </div>
    `,
    props: {
      onAction: (name: string) => alert(`${name} action clicked!`),
    },
  }),
};

export const RadialUp: Story = {
  name: 'Radial Arc Up',
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; align-items: flex-end; height: 260px; padding-bottom: 20px;">
        <n-speed-dial icon="zap" activeIcon="x" buttonVariant="primary" type="radial" direction="up" [radius]="80" [stagger]="60">
          <button n-speed-dial-item icon="cpu" tone="primary" title="Compute" (clickItem)="onAction('Compute')"></button>
          <button n-speed-dial-item icon="activity" title="Analyze" (clickItem)="onAction('Analyze')"></button>
          <button n-speed-dial-item icon="sparkles" tone="violet" title="Enhance" (clickItem)="onAction('Enhance')"></button>
          <button n-speed-dial-item icon="settings" title="Settings" (clickItem)="onAction('Settings')"></button>
        </n-speed-dial>
      </div>
    `,
    props: {
      onAction: (name: string) => alert(`${name} action clicked!`),
    },
  }),
};

export const LinearRight: Story = {
  name: 'Linear Right',
  render: () => ({
    template: `
      <div style="display: flex; justify-content: flex-start; align-items: center; height: 120px; padding-left: 20px;">
        <n-speed-dial icon="plus" activeIcon="x" buttonVariant="secondary" type="linear" direction="right">
          <button n-speed-dial-item icon="activity" title="Analytics" (clickItem)="onAction('Analytics')"></button>
          <button n-speed-dial-item icon="download" title="Export" (clickItem)="onAction('Export')"></button>
          <button n-speed-dial-item icon="settings" title="Settings" (clickItem)="onAction('Settings')"></button>
        </n-speed-dial>
      </div>
    `,
    props: {
      onAction: (name: string) => alert(`${name} action clicked!`),
    },
  }),
};
