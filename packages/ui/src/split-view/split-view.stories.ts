import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NIcon } from '../icon/icon.component';
import { NSplitView } from './split-view.component';

const shellStyles = `
  border: 1px solid var(--n-border-1);
  border-radius: var(--n-radius-lg);
  overflow: hidden;
`;

const panelHeaderStyles = `
  padding: 9px 14px;
  border-bottom: 1px solid var(--n-border-0);
  display: flex;
  align-items: center;
  gap: 7px;
`;

const panelTitleStyles = `
  font-size: 10.5px;
  font-weight: 600;
  color: var(--n-text-2);
`;

const meta: Meta<NSplitView> = {
  title: 'App Patterns/Split View',
  component: NSplitView,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NSplitView, NIcon],
    }),
  ],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    initialSize: {
      control: { type: 'range', min: 15, max: 85, step: 1 },
    },
    minSize: {
      control: { type: 'range', min: 15, max: 50, step: 1 },
    },
    maxSize: {
      control: { type: 'range', min: 50, max: 85, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<NSplitView>;

export const HorizontalSplit: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 210px; ${shellStyles}">
        <n-split-view
          [direction]="direction"
          [initialSize]="initialSize"
          [minSize]="minSize"
          [maxSize]="maxSize"
        >
          <div panelFirst style="height: 100%; display: flex; flex-direction: column; background: var(--n-surface-1);">
            <div style="${panelHeaderStyles}">
              <n-icon name="play" size="sm" style="color: var(--n-color-primary-light)" />
              <span style="${panelTitleStyles}">Video Preview</span>
            </div>
            <div style="flex: 1; background: linear-gradient(135deg, #030310, #07092a); display: grid; place-items: center;">
              <n-icon name="file-video" size="xl" style="opacity: 0.1; color: var(--n-color-primary-light)" />
            </div>
          </div>

          <div panelSecond style="height: 100%; display: flex; flex-direction: column; background: var(--n-surface-2);">
            <div style="${panelHeaderStyles}">
              <n-icon name="settings" size="sm" style="color: var(--n-text-3)" />
              <span style="${panelTitleStyles}">Inspector</span>
            </div>
            <div style="flex: 1; padding: 12px; display: grid; gap: 8px; overflow: auto;">
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: var(--n-text-3)">Model</span>
                <span style="font-family: var(--n-font-mono); font-size: 10.5px">Real-ESRGAN x4</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: var(--n-text-3)">Scale</span>
                <span style="font-family: var(--n-font-mono); font-size: 10.5px">4×</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: var(--n-text-3)">Denoise</span>
                <span style="font-family: var(--n-font-mono); font-size: 10.5px">0.45</span>
              </div>
              <div style="height: 1px; background: var(--n-border-0)"></div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: var(--n-text-3)">GPU</span>
                <span style="font-family: var(--n-font-mono); font-size: 10.5px; color: var(--n-color-success)">82%</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: var(--n-text-3)">VRAM</span>
                <span style="font-family: var(--n-font-mono); font-size: 10.5px; color: var(--n-color-warning)">78%</span>
              </div>
            </div>
          </div>
        </n-split-view>
      </div>
    `,
  }),
  args: {
    direction: 'horizontal',
    initialSize: 55,
    minSize: 15,
    maxSize: 85,
  },
};

export const ThreePane: Story = {
  render: () => ({
    template: `
      <div style="height: 130px; display: flex; ${shellStyles}">
        <div style="width: 190px; flex-shrink: 0; background: var(--n-surface-1); border-right: 1px solid var(--n-border-0); display: flex; flex-direction: column;">
          <div style="padding: 7px 12px; border-bottom: 1px solid var(--n-border-0); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--n-text-3);">
            Queue
          </div>
          <div style="flex: 1; padding: 4px 6px; display: grid; gap: 2px; overflow: auto;">
            <div style="padding: 5px 7px; border-radius: 6px; background: rgba(66, 133, 244, 0.1); border: 1px solid rgba(66, 133, 244, 0.15);">
              <div style="font-size: 11px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Anime Ep12.mp4</div>
              <div style="font-family: var(--n-font-mono); font-size: 9px; color: var(--n-color-primary-light)">67% · AI Enhance</div>
            </div>
            <div style="padding: 5px 7px; border-radius: 6px; opacity: 0.5;">
              <div style="font-size: 11px; color: var(--n-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Cinematic Short.mp4</div>
              <div style="font-family: var(--n-font-mono); font-size: 9px; color: var(--n-color-success)">Done</div>
            </div>
          </div>
        </div>

        <div style="flex: 1; background: linear-gradient(135deg, #04040f, #070920); display: grid; place-items: center; border-right: 1px solid var(--n-border-0);">
          <n-icon name="play" size="lg" style="opacity: 0.1; color: var(--n-color-primary-light)" />
        </div>

        <div style="width: 170px; flex-shrink: 0; background: var(--n-surface-2); display: flex; flex-direction: column;">
          <div style="padding: 7px 12px; border-bottom: 1px solid var(--n-border-0); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--n-text-3);">
            Inspector
          </div>
          <div style="flex: 1; padding: 7px 12px; display: grid; gap: 5px;">
            <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
              <span style="color: var(--n-text-3)">Resolution</span>
              <span style="font-family: var(--n-font-mono); font-size: 9.5px">3840×2160</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
              <span style="color: var(--n-text-3)">Bitrate</span>
              <span style="font-family: var(--n-font-mono); font-size: 9.5px">45 Mbps</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
              <span style="color: var(--n-text-3)">Codec</span>
              <span style="font-family: var(--n-font-mono); font-size: 9.5px">H.265</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Workspace: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 360px; width: min(920px, 100%); ${shellStyles}">
        <n-split-view [direction]="direction" [initialSize]="initialSize" [minSize]="minSize" [maxSize]="maxSize">
          <div panelFirst style="height: 100%; background: var(--n-surface-1); display: flex; flex-direction: column;">
            <div style="padding: 7px 12px; border-bottom: 1px solid var(--n-border-0); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--n-text-3);">
              Queue
            </div>
            <div style="flex: 1; padding: 4px 6px; display: grid; gap: 2px; overflow: auto;">
              <div style="padding: 5px 7px; border-radius: 6px; background: rgba(66, 133, 244, 0.1); border: 1px solid rgba(66, 133, 244, 0.15);">
                <div style="font-size: 11px; font-weight: 500;">Anime Ep12.mp4</div>
                <div style="font-family: var(--n-font-mono); font-size: 9px; color: var(--n-color-primary-light)">67% · AI Enhance</div>
              </div>
              <div style="padding: 5px 7px; border-radius: 6px; opacity: 0.5;">
                <div style="font-size: 11px; color: var(--n-text-2)">Cinematic Short.mp4</div>
                <div style="font-family: var(--n-font-mono); font-size: 9px; color: var(--n-color-success)">Done</div>
              </div>
            </div>
          </div>

          <div panelSecond style="height: 100%;">
            <n-split-view direction="horizontal" [initialSize]="68" [minSize]="45" [maxSize]="82">
              <div panelFirst style="height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #04040f, #070920);">
                <n-icon name="play" size="lg" style="opacity: 0.1; color: var(--n-color-primary-light)" />
              </div>
              <div panelSecond style="height: 100%; background: var(--n-surface-2); display: flex; flex-direction: column;">
                <div style="padding: 7px 12px; border-bottom: 1px solid var(--n-border-0); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--n-text-3);">
                  Inspector
                </div>
                <div style="flex: 1; padding: 7px 12px; display: grid; gap: 5px;">
                  <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
                    <span style="color: var(--n-text-3)">Resolution</span>
                    <span style="font-family: var(--n-font-mono); font-size: 9.5px">3840×2160</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
                    <span style="color: var(--n-text-3)">Bitrate</span>
                    <span style="font-family: var(--n-font-mono); font-size: 9.5px">45 Mbps</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 10.5px;">
                    <span style="color: var(--n-text-3)">Codec</span>
                    <span style="font-family: var(--n-font-mono); font-size: 9.5px">H.265</span>
                  </div>
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
    initialSize: 24,
    minSize: 15,
    maxSize: 40,
  },
};

export const Playground: Story = {
  ...HorizontalSplit,
};
