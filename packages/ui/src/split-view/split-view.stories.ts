import { type Meta, type StoryObj } from '@storybook/angular';
import { NSplitView } from './split-view.component';

const meta: Meta<NSplitView> = {
  title: 'App Patterns/Split View',
  component: NSplitView,
  tags: ['!autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    initialSize: {
      control: { type: 'range', min: 10, max: 90, step: 1 },
    },
    minSize: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
    maxSize: {
      control: { type: 'range', min: 50, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<NSplitView>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 360px; width: min(920px, 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; background: #0f0f1c;">
        <n-split-view [direction]="direction" [initialSize]="initialSize" [minSize]="minSize" [maxSize]="maxSize">
          <div panelFirst style="height: 100%; padding: 14px; background: rgba(255,255,255,0.025);">
            <div style="font: 700 10px var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-3); margin-bottom: 12px;">Queue</div>
            <div style="display: grid; gap: 8px;">
              <div style="padding: 10px; border: 1px solid rgba(66,133,244,.32); border-radius: 10px; background: rgba(66,133,244,.09); color: var(--n-text-1);">Cinematic Short.mp4</div>
              <div style="padding: 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; color: var(--n-text-2);">Anime_Ep12.mp4</div>
              <div style="padding: 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; color: var(--n-text-2);">Export Queue</div>
            </div>
          </div>
          <div panelSecond style="height: 100%;">
            <n-split-view direction="horizontal" [initialSize]="68" [minSize]="45" [maxSize]="82">
              <div panelFirst style="height: 100%; display: grid; place-items: center; background: radial-gradient(circle at 50% 32%, rgba(66,133,244,.22), transparent 32%), #070814;">
                <span style="font: 700 12px var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-color-primary-light);">Preview</span>
              </div>
              <div panelSecond style="height: 100%; padding: 14px; background: rgba(255,255,255,.018);">
                <div style="font: 700 10px var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-3); margin-bottom: 12px;">Inspector</div>
                <div style="display: grid; gap: 10px; color: var(--n-text-2); font-size: 12px;">
                  <span>Resolution <b style="float:right; color: var(--n-text-1);">4K UHD</b></span>
                  <span>Denoise <b style="float:right; color: var(--n-text-1);">45</b></span>
                  <span>GPU Load <b style="float:right; color: var(--n-color-warning);">High</b></span>
                </div>
              </div>
            </n-split-view>
          </div>
        </n-split-view>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    initialSize: 30,
    minSize: 20,
    maxSize: 80,
  },
};

export const Playground: Story = {
  ...Default,
};
