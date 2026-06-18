import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NAccordion } from './accordion.component';
import { NAccordionTab } from './accordion-tab.component';

const meta: Meta<NAccordion> = {
  title: 'Components/Accordion',
  component: NAccordion,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NAccordionTab],
    }),
  ],
};

export default meta;
type Story = StoryObj<NAccordion>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-accordion [multiple]="multiple">
        <n-accordion-tab header="Pipeline Configuration" icon="sparkles" [selected]="true">
          <p style="margin:0; color:#8c8c9e;">Algorithm: Real-ESRGAN x4+ Anime</p>
        </n-accordion-tab>
        <n-accordion-tab header="System Metrics" icon="activity">
          <p style="margin:0; color:#8c8c9e;">VRAM Usage: 4.8 GB / 8.0 GB (60%)</p>
        </n-accordion-tab>
      </n-accordion>
    `,
  }),
  args: {
    multiple: false,
  },
};
