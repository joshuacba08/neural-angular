import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NTable, NTemplate } from './table.component.js';
import { NBadge } from '../badge/badge.component.js';
import { NIcon } from '../icon/icon.component.js';

const designSystemData = [
  { id: 1, name: 'Anime Episode 12.mp4', model: 'Real-ESRGAN x4', resolution: '1080p → 4K', frames: '22,080', status: 'Processing', eta: '1h 42m' },
  { id: 2, name: 'Cinematic Short.mp4', model: 'Real-ESRGAN x2', resolution: '720p → 4K', frames: '12,540', status: 'Done', eta: '—' },
  { id: 3, name: 'Interview Footage.mp4', model: 'GFPGAN v1.3', resolution: '1080p → 4K', frames: '32,160', status: 'Queued', eta: '4h 20m' },
  { id: 4, name: 'Documentary.mp4', model: 'SwinIR', resolution: '480p → 4K', frames: '48,240', status: 'Failed', eta: '—' },
];

const dummyColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'model', label: 'Model' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'frames', label: 'Frames', align: 'end' as const },
  { key: 'status', label: 'Status' },
];

const designSystemColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'model', label: 'Model' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'frames', label: 'Frames' },
  { key: 'status', label: 'Status' },
  { key: 'eta', label: 'ETA' },
  { key: 'actions', label: '', width: '32px' },
];

const dummyData = [
  { id: 1, name: 'Anime Episode 12.mp4', model: 'Real-ESRGAN x4', resolution: '1080p → 4K', frames: '22,080', status: 'Processing' },
  { id: 2, name: 'Cinematic Short.mp4', model: 'Real-ESRGAN x2', resolution: '720p → 4K', frames: '12,540', status: 'Done' },
  { id: 3, name: 'Interview Footage.mp4', model: 'GFPGAN v1.3', resolution: '1080p → 4K', frames: '32,160', status: 'Queued' },
  { id: 4, name: 'Documentary.mp4', model: 'SwinIR', resolution: '480p → 4K', frames: '48,240', status: 'Failed' },
  { id: 5, name: 'Music Video.mp4', model: 'Real-ESRGAN x4', resolution: '1080p → 4K', frames: '18,300', status: 'Done' },
  { id: 6, name: 'B-Roll Clip.mp4', model: 'Real-ESRGAN x2', resolution: '1080p → 4K', frames: '5,400', status: 'Processing' },
];

const meta: Meta<NTable> = {
  title: 'Components/Table',
  component: NTable,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NTable, NTemplate, NBadge, NIcon],
    }),
  ],
  argTypes: {
    density: {
      description: 'Density spacing of the table cells.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'comfortable | compact' },
        defaultValue: { summary: 'comfortable' },
      },
      options: ['comfortable', 'compact'],
    },
    variant: {
      description: 'Visual variants of the table border.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'default | bordered | surface' },
        defaultValue: { summary: 'default' },
      },
      options: ['default', 'bordered', 'surface'],
    },
    sortable: {
      description: 'Enables sorting indicators on columns by default.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectionMode: {
      description: 'Row selection mode.',
      control: 'select',
      table: {
        category: 'Behavior',
        type: { summary: 'single | multiple | null' },
        defaultValue: { summary: 'null' },
      },
      options: ['single', 'multiple', 'none'],
      mapping: { none: null },
    },
    paginator: {
      description: 'Enables pagination controls and client-side data slicing.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    density: 'comfortable',
    variant: 'default',
    sortable: true,
    selectionMode: null,
    paginator: false,
    columns: dummyColumns,
    data: dummyData,
  },
};

export default meta;

type Story = StoryObj<NTable>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-table
        [columns]="columns"
        [data]="data"
        [density]="density"
        [variant]="variant"
        [sortable]="sortable"
        [selectionMode]="selectionMode"
        [paginator]="paginator"
        [rows]="10"
        [first]="0"
      >
        <ng-template nTemplate="status" let-value>
          @if (value === 'Done') {
            <n-badge variant="success">Done</n-badge>
          } @else if (value === 'Processing') {
            <n-badge variant="info">Processing</n-badge>
          } @else if (value === 'Failed') {
            <n-badge variant="danger">Failed</n-badge>
          } @else {
            <n-badge variant="neutral">Queued</n-badge>
          }
        </ng-template>
      </n-table>
    `,
  }),
};

export const Basic: Story = {
  args: {
    sortable: false,
    paginator: false,
    selectionMode: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-table [columns]="columns" [data]="data" [sortable]="false" [paginator]="false">
        <ng-template nTemplate="status" let-value>
          @if (value === 'Done') {
            <n-badge variant="success">Done</n-badge>
          } @else if (value === 'Processing') {
            <n-badge variant="info">Processing</n-badge>
          } @else if (value === 'Failed') {
            <n-badge variant="danger">Failed</n-badge>
          } @else {
            <n-badge variant="neutral">Queued</n-badge>
          }
        </ng-template>
      </n-table>
    `,
  }),
};

export const Sortable: Story = {
  args: {
    sortable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-table [columns]="columns" [data]="data" [sortable]="true">
        <ng-template nTemplate="status" let-value>
          @if (value === 'Done') {
            <n-badge variant="success">Done</n-badge>
          } @else if (value === 'Processing') {
            <n-badge variant="info">Processing</n-badge>
          } @else if (value === 'Failed') {
            <n-badge variant="danger">Failed</n-badge>
          } @else {
            <n-badge variant="neutral">Queued</n-badge>
          }
        </ng-template>
      </n-table>
    `,
  }),
};

export const Selectable: Story = {
  args: {
    selectionMode: 'multiple',
  },
  render: (args) => ({
    props: args,
    template: `
      <n-table [columns]="columns" [data]="data" selectionMode="multiple">
        <ng-template nTemplate="status" let-value>
          @if (value === 'Done') {
            <n-badge variant="success">Done</n-badge>
          } @else if (value === 'Processing') {
            <n-badge variant="info">Processing</n-badge>
          } @else if (value === 'Failed') {
            <n-badge variant="danger">Failed</n-badge>
          } @else {
            <n-badge variant="neutral">Queued</n-badge>
          }
        </ng-template>
      </n-table>
    `,
  }),
};

export const Paged: Story = {
  args: {
    paginator: true,
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-table [columns]="columns" [data]="data" [paginator]="true" [rows]="3">
        <ng-template nTemplate="status" let-value>
          @if (value === 'Done') {
            <n-badge variant="success">Done</n-badge>
          } @else if (value === 'Processing') {
            <n-badge variant="info">Processing</n-badge>
          } @else if (value === 'Failed') {
            <n-badge variant="danger">Failed</n-badge>
          } @else {
            <n-badge variant="neutral">Queued</n-badge>
          }
        </ng-template>
      </n-table>
    `,
  }),
};

export const DesignSystem: Story = {
  args: {
    columns: designSystemColumns,
    data: designSystemData,
  },
  render: (args) => ({
    props: {
      ...args,
      selection: [args.data![0]],
    },
    template: `
      <div style="padding:0;overflow:hidden;border-radius:var(--n-radius-xl);background:var(--n-surface-1)">
        <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--n-border-1)">
          <div class="n-input-group" style="flex:1;max-width:260px;background:var(--n-surface-2);border-radius:8px;padding:6px 12px;display:flex;align-items:center;gap:8px">
            <n-icon name="search" size="xs" style="color:var(--n-text-3)"></n-icon>
            <input type="search" placeholder="Search jobs..." style="background:transparent;border:none;color:var(--n-text-1);font-size:12.5px;outline:none;width:100%" />
          </div>
          <div style="flex-shrink:0;background:var(--n-surface-2);border-radius:8px;padding:4px;display:flex;gap:4px">
            <button style="background:var(--n-gradient-primary-secondary);border:none;color:#fff;border-radius:4px;padding:4px 12px;font-size:12px;font-weight:500;cursor:pointer">All</button>
            <button style="background:transparent;border:none;color:var(--n-text-2);border-radius:4px;padding:4px 12px;font-size:12px;font-weight:500;cursor:pointer">Done</button>
            <button style="background:transparent;border:none;color:var(--n-text-2);border-radius:4px;padding:4px 12px;font-size:12px;font-weight:500;cursor:pointer">Running</button>
          </div>
        </div>
        <n-table 
          [columns]="columns" 
          [data]="data" 
          [sortable]="true"
          selectionMode="multiple"
          [selection]="selection"
          [paginator]="true"
          [rows]="10"
          variant="surface"
        >
          <ng-template nTemplate="name" let-value>
            <span style="font-weight:500;color:var(--n-text-1)">{{ value }}</span>
          </ng-template>
          <ng-template nTemplate="model" let-value>
            <span style="font-family:var(--n-font-mono);font-size:11px">{{ value }}</span>
          </ng-template>
          <ng-template nTemplate="resolution" let-value>
            <span style="font-family:var(--n-font-mono);font-size:11px">{{ value }}</span>
          </ng-template>
          <ng-template nTemplate="frames" let-value>
            <span style="font-family:var(--n-font-mono);font-size:11px">{{ value }}</span>
          </ng-template>
          <ng-template nTemplate="status" let-value>
            @if (value === 'Done') {
              <n-badge variant="success">{{ value }}</n-badge>
            } @else if (value === 'Processing') {
              <n-badge variant="primary">{{ value }}</n-badge>
            } @else if (value === 'Failed') {
              <n-badge variant="danger">{{ value }}</n-badge>
            } @else {
              <n-badge variant="neutral">{{ value }}</n-badge>
            }
          </ng-template>
          <ng-template nTemplate="eta" let-value>
            <span style="font-family:var(--n-font-mono);font-size:11px;color:var(--n-text-3)">{{ value }}</span>
          </ng-template>
          <ng-template nTemplate="actions" let-value>
            <button style="background:transparent;border:none;cursor:pointer;color:var(--n-text-3);padding:4px">
              <n-icon name="more-horizontal" size="xs" />
            </button>
          </ng-template>
        </n-table>
      </div>
    `,
  }),
};
