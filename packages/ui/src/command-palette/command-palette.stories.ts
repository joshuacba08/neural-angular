import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NCommandPalette } from './command-palette.component.js';
import { NCommandPaletteGroup } from './command-palette-group.component.js';
import { NCommandPaletteItem } from './command-palette-item.component.js';

const meta: Meta<NCommandPalette> = {
  title: 'Components/Command Palette',
  component: NCommandPalette,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NCommandPalette, NCommandPaletteGroup, NCommandPaletteItem, NIcon],
    }),
  ],
  argTypes: {
    placeholder: {
      description: 'Search input placeholder text.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'Type a command or search...' },
      },
    },
  },
  args: {
    placeholder: 'Type a command or search...',
  },
};

export default meta;

type Story = StoryObj<NCommandPalette>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: rgba(4, 4, 14, 0.7); backdrop-filter: blur(12px); padding: 40px; border-radius: 20px; display: flex; justify-content: center; width: 100%; max-width: 580px; box-sizing: border-box;">
        <n-command-palette [placeholder]="placeholder">
          <n-command-palette-group label="Recent">
            <n-command-palette-item value="open-episode" label="Open Anime Episode 12" icon="clock" shortcut="↵" />
            <n-command-palette-item value="process-esrgan" label="Real-ESRGAN x4 · process" icon="clock" />
          </n-command-palette-group>
          
          <n-command-palette-group label="Actions">
            <n-command-palette-item value="import-video" label="Import Video…" description="Add new source to workspace" icon="upload-cloud" iconColor="var(--n-color-primary-bright)" shortcut="⌘I" />
            <n-command-palette-item value="enhance-selected" label="Enhance Selected" description="Apply model to current selection" icon="sparkles" iconColor="var(--n-color-secondary)" shortcut="⌘E" />
            <n-command-palette-item value="export-queue" label="Export Queue…" icon="download" iconColor="var(--n-color-success)" shortcut="⌘⇧E" />
            <n-command-palette-item value="pause-jobs" label="Pause All Jobs" icon="pause-circle" shortcut="⌘." />
          </n-command-palette-group>
        </n-command-palette>
      </div>
    `,
  }),
};

export const Basic: Story = {
  render: () => ({
    template: `
      <div style="background: rgba(4, 4, 14, 0.7); backdrop-filter: blur(12px); padding: 40px; border-radius: 20px; display: flex; justify-content: center; width: 100%; max-width: 580px; box-sizing: border-box;">
        <n-command-palette>
          <n-command-palette-group label="Recent">
            <n-command-palette-item value="open-episode" label="Open Anime Episode 12" icon="clock" shortcut="↵" />
            <n-command-palette-item value="process-esrgan" label="Real-ESRGAN x4 · process" icon="clock" />
          </n-command-palette-group>
          
          <n-command-palette-group label="Actions">
            <n-command-palette-item value="import-video" label="Import Video…" description="Add new source to workspace" icon="upload-cloud" iconColor="var(--n-color-primary-bright)" shortcut="⌘I" />
            <n-command-palette-item value="enhance-selected" label="Enhance Selected" description="Apply model to current selection" icon="sparkles" iconColor="var(--n-color-secondary)" shortcut="⌘E" />
            <n-command-palette-item value="export-queue" label="Export Queue…" icon="download" iconColor="var(--n-color-success)" shortcut="⌘⇧E" />
            <n-command-palette-item value="pause-jobs" label="Pause All Jobs" icon="pause-circle" shortcut="⌘." />
          </n-command-palette-group>
        </n-command-palette>
      </div>
    `,
  }),
};

export const InteractivePalette: Story = {
  render: () => ({
    template: `
      <div style="background: rgba(4, 4, 14, 0.7); backdrop-filter: blur(12px); padding: 40px; border-radius: 20px; display: flex; justify-content: center; width: 100%; max-width: 580px; box-sizing: border-box;">
        <n-command-palette>
          <n-command-palette-group label="Recent">
            <n-command-palette-item value="open-episode" label="Open Anime Episode 12" icon="clock" shortcut="↵" />
            <n-command-palette-item value="process-esrgan" label="Real-ESRGAN x4 · process" icon="clock" />
          </n-command-palette-group>
          
          <n-command-palette-group label="Actions">
            <n-command-palette-item value="import-video" label="Import Video…" description="Add new source to workspace" icon="upload-cloud" iconColor="var(--n-color-primary-bright)" shortcut="⌘I" />
            <n-command-palette-item value="enhance-selected" label="Enhance Selected" description="Apply model to current selection" icon="sparkles" iconColor="var(--n-color-secondary)" shortcut="⌘E" />
            <n-command-palette-item value="export-queue" label="Export Queue…" icon="download" iconColor="var(--n-color-success)" shortcut="⌘⇧E" />
            <n-command-palette-item value="pause-jobs" label="Pause All Jobs" icon="pause-circle" shortcut="⌘." />
          </n-command-palette-group>

          <n-command-palette-group label="Models">
            <n-command-palette-item value="switch-esrgan-x2" label="Switch to Real-ESRGAN x2" description="Faster · 4 GB VRAM" icon="box" />
            <n-command-palette-item value="switch-gfpgan" label="Switch to GFPGAN Face Restore" description="For portrait footage" icon="box" />
          </n-command-palette-group>
        </n-command-palette>
      </div>
    `,
  }),
};
