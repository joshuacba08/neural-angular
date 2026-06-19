import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NDataView } from './data-view.component.js';
import { NGridItem, NListItem } from './data-view-item.directive.js';
import { NBadge } from '../badge/badge.component.js';
import { NIcon } from '../icon/icon.component.js';

const dummyModels = [
  { id: 1, name: 'Real-ESRGAN x4', detail: '4× · Best quality', status: 'Installed', vram: '8 GB VRAM', state: 'installed' },
  { id: 2, name: 'Real-ESRGAN x2', detail: '2× · Fast', status: 'Active', vram: '4 GB VRAM', state: 'active' },
  { id: 3, name: 'GFPGAN v1.3', detail: 'Face restore', status: 'Available', vram: '5 GB VRAM', state: 'available' },
  { id: 4, name: 'SwinIR', detail: 'Denoising', status: 'Available', vram: '3 GB VRAM', state: 'available' },
];

const meta: Meta<NDataView> = {
  title: 'Components/DataView',
  component: NDataView,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NDataView, NGridItem, NListItem, NBadge, NIcon],
    }),
  ],
  argTypes: {
    layout: {
      description: 'Active visual display layout template.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'grid | list' },
        defaultValue: { summary: 'grid' },
      },
      options: ['grid', 'list'],
    },
  },
  args: {
    layout: 'grid',
    data: dummyModels,
  },
};

export default meta;

type Story = StoryObj<NDataView>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-data-view [data]="data" [layout]="layout">
        <ng-template nGridItem let-item>
          <div class="n-dv-card" [class.n-dv-card--active]="item.state === 'active'" [class.n-dv-card--default]="item.state === 'installed'" [class.n-dv-card--muted]="item.state === 'available'">
            <div style="font-size:12.5px;font-weight:600;margin-bottom:4px"
                 [style.background]="item.state === 'active' ? 'var(--n-gradient-gemini)' : null"
                 [style.-webkit-background-clip]="item.state === 'active' ? 'text' : null"
                 [style.-webkit-text-fill-color]="item.state === 'active' ? 'transparent' : null">
              {{ item.name }}
            </div>
            <div style="font-size:11px;color:var(--n-text-3, #7b7bb2);margin-bottom:8px">{{ item.detail }}</div>
            @if (item.state === 'active') {
              <n-badge variant="success">Active</n-badge>
            } @else if (item.state === 'installed') {
              <n-badge variant="info">Installed</n-badge>
            } @else {
              <n-badge variant="neutral">Available</n-badge>
            }
          </div>
        </ng-template>

        <ng-template nListItem let-item>
          <div class="n-dv-list-item" [class.n-dv-list-item--active]="item.state === 'active'" [class.n-dv-list-item--default]="item.state === 'installed'" [class.n-dv-list-item--muted]="item.state === 'available'">
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600"
                   [style.background]="item.state === 'active' ? 'var(--n-gradient-gemini)' : null"
                   [style.-webkit-background-clip]="item.state === 'active' ? 'text' : null"
                   [style.-webkit-text-fill-color]="item.state === 'active' ? 'transparent' : null">
                {{ item.name }}
              </div>
              <div style="font-size:11px;color:var(--n-text-3, #7b7bb2)">{{ item.detail }} upscale · {{ item.vram }}</div>
            </div>
            @if (item.state === 'active') {
              <n-badge variant="success">Active</n-badge>
            } @else if (item.state === 'installed') {
              <n-badge variant="info">Installed</n-badge>
            } @else {
              <n-badge variant="neutral">Available</n-badge>
            }
          </div>
        </ng-template>
      </n-data-view>
    `,
  }),
};

export const GridView: Story = {
  args: {
    layout: 'grid',
  },
  render: (args) => ({
    props: args,
    template: `
      <n-data-view [data]="data" layout="grid">
        <ng-template nGridItem let-item>
          <div class="n-dv-card" [class.n-dv-card--active]="item.state === 'active'" [class.n-dv-card--default]="item.state === 'installed'" [class.n-dv-card--muted]="item.state === 'available'">
            <div style="font-size:12.5px;font-weight:600;margin-bottom:4px"
                 [style.background]="item.state === 'active' ? 'var(--n-gradient-gemini)' : null"
                 [style.-webkit-background-clip]="item.state === 'active' ? 'text' : null"
                 [style.-webkit-text-fill-color]="item.state === 'active' ? 'transparent' : null">
              {{ item.name }}
            </div>
            <div style="font-size:11px;color:var(--n-text-3, #7b7bb2);margin-bottom:8px">{{ item.detail }}</div>
            @if (item.state === 'active') {
              <n-badge variant="success">Active</n-badge>
            } @else if (item.state === 'installed') {
              <n-badge variant="info">Installed</n-badge>
            } @else {
              <n-badge variant="neutral">Available</n-badge>
            }
          </div>
        </ng-template>
      </n-data-view>
    `,
  }),
};

export const ListView: Story = {
  args: {
    layout: 'list',
  },
  render: (args) => ({
    props: args,
    template: `
      <n-data-view [data]="data" layout="list">
        <ng-template nListItem let-item>
          <div class="n-dv-list-item" [class.n-dv-list-item--active]="item.state === 'active'" [class.n-dv-list-item--default]="item.state === 'installed'" [class.n-dv-list-item--muted]="item.state === 'available'">
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600"
                   [style.background]="item.state === 'active' ? 'var(--n-gradient-gemini)' : null"
                   [style.-webkit-background-clip]="item.state === 'active' ? 'text' : null"
                   [style.-webkit-text-fill-color]="item.state === 'active' ? 'transparent' : null">
                {{ item.name }}
              </div>
              <div style="font-size:11px;color:var(--n-text-3, #7b7bb2)">{{ item.detail }} upscale · {{ item.vram }}</div>
            </div>
            @if (item.state === 'active') {
              <n-badge variant="success">Active</n-badge>
            } @else if (item.state === 'installed') {
              <n-badge variant="info">Installed</n-badge>
            } @else {
              <n-badge variant="neutral">Available</n-badge>
            }
          </div>
        </ng-template>
      </n-data-view>
    `,
  }),
};
