import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NProgress } from './progress.component.js';
import { NProgressRing } from './progress-ring.component.js';
import { NSkeleton } from '../skeleton/skeleton.component.js';
import { NSpinner } from '../spinner/spinner.component.js';

const meta: Meta<NProgress> = {
  title: 'Components/Progress',
  component: NProgress,
  decorators: [
    moduleMetadata({
      imports: [NProgress, NProgressRing, NSpinner, NSkeleton],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'gemini',
        'gemini-full',
        'primary',
        'secondary',
        'success',
        'success-blue',
        'warning',
        'danger',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: {
    value: 67,
    max: 100,
    variant: 'gemini',
    size: 'sm',
    indeterminate: false,
    label: 'Gemini Gradient · Determinate',
    showValue: true,
  },
};

export default meta;

type Story = StoryObj<NProgress>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(480px, calc(100vw - 48px));">
        <n-progress
          [value]="value"
          [max]="max"
          [variant]="variant"
          [size]="size"
          [indeterminate]="indeterminate"
          [label]="label"
        />
      </div>
    `,
  }),
};

export const Basic: Story = {
  args: {
    value: 67,
    max: 100,
    variant: 'gemini',
    size: 'sm',
    indeterminate: false,
    label: 'Gemini Gradient · Determinate',
    showValue: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(480px, calc(100vw - 48px));">
        <n-progress
          [value]="value"
          [max]="max"
          [variant]="variant"
          [size]="size"
          [indeterminate]="indeterminate"
          [label]="label"
          [showValue]="showValue"
        />
      </div>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:480px">
        <section>
          <p class="n-story-section-label">Linear Progress</p>
          <div class="n-story-list" style="gap:20px">
            <n-progress
              variant="gemini"
              size="sm"
              [value]="67"
              label="Gemini Gradient · Determinate"
              [showValue]="true"
            />
            <n-progress
              variant="primary"
              size="sm"
              [value]="42"
              label="Blue → Violet"
            />
            <n-progress
              variant="primary"
              size="sm"
              [indeterminate]="true"
              label="Indeterminate · Running"
            />
            <n-progress
              variant="primary"
              size="sm"
              [step]="3"
              [totalSteps]="5"
              label="Segmented · Step 3 / 5"
            />
            <n-progress
              variant="gemini"
              size="lg"
              [value]="78"
              label="Thick · Model download"
              hint="Real-ESRGAN x4 · 1.8 GB / 2.3 GB"
              [showValue]="true"
            />
          </div>
        </section>

        <section>
          <p class="n-story-section-label">Circular &amp; Spinners</p>
          <div class="n-story-row" style="align-items:flex-end;flex-wrap:wrap;gap:24px">
            <n-progress-ring size="lg" variant="primary" [value]="67" caption="Ring · Blue" />
            <n-progress-ring size="md" variant="secondary" [value]="60" caption="Ring · Violet" />
            <n-progress-ring size="sm" variant="success" [value]="100" caption="Done" />
            <n-spinner mode="ring" label="Loading" />
            <n-spinner mode="dots" label="Loading" />
          </div>
        </section>

        <section>
          <p class="n-story-section-label">Skeleton Loaders</p>
          <div class="n-story-skeleton-grid">
            <div class="n-story-skeleton-card">
              <n-skeleton shape="text" width="55%" height="13px" />
              <n-skeleton shape="text" width="92%" />
              <n-skeleton shape="text" width="78%" />
              <n-skeleton shape="text" width="62%" />
            </div>
            <div class="n-story-skeleton-card">
              <div class="n-story-skeleton-row">
                <n-skeleton shape="circle" width="34px" height="34px" />
                <div class="n-story-skeleton-stack">
                  <n-skeleton shape="text" width="68%" height="11px" />
                  <n-skeleton shape="text" width="44%" />
                </div>
              </div>
              <n-skeleton width="100%" height="60px" radius="8px" />
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-list" style="width: min(420px, calc(100vw - 48px)); gap: var(--n-space-4);">
        <n-progress [value]="72" variant="gemini" label="Gemini" [showValue]="true" />
        <n-progress [value]="72" variant="primary" label="Primary" [showValue]="true" />
        <n-progress [value]="72" variant="secondary" label="Secondary" [showValue]="true" />
        <n-progress [value]="100" variant="success" label="Complete" [showValue]="true" />
        <n-progress [value]="48" variant="warning" label="Throttled" [showValue]="true" />
        <n-progress [value]="22" variant="danger" label="Failing" [showValue]="true" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-list" style="width: min(420px, calc(100vw - 48px)); gap: var(--n-space-4);">
        <n-progress [value]="64" variant="gemini" size="sm" />
        <n-progress [value]="64" variant="gemini" size="md" />
        <n-progress [value]="64" variant="gemini" size="lg" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-progress variant="primary" [indeterminate]="true" label="Analyzing frames" />
      </div>
    `,
  }),
};

export const Segmented: Story = {
  render: () => ({
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-progress variant="primary" [step]="3" [totalSteps]="5" label="Segmented · Step 3 / 5" />
      </div>
    `,
  }),
};

export const AIPatterns: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:520px">
        <section>
          <p class="n-story-section-label">Progress Orbital · Circular</p>
          <div class="n-story-row" style="align-items:flex-end;flex-wrap:wrap;gap:28px">
            <n-progress-ring
              size="orbital"
              variant="primary"
              [value]="75"
              metric="CPU"
              caption="Blue-Violet"
            />
            <n-progress-ring
              size="orbital"
              variant="secondary"
              [value]="50"
              metric="RAM"
              caption="Violet-Pink"
            />
            <n-progress-ring
              size="orbital"
              variant="gemini"
              [value]="90"
              metric="GPU"
              caption="Gemini Full"
            />
            <n-progress-ring
              size="orbital"
              variant="success-blue"
              [value]="20"
              metric="NET"
              caption="Success-Blue"
            />
          </div>
        </section>

        <section>
          <p class="n-story-section-label">Progress Bars · Gradient Fill</p>
          <div class="n-story-list" style="gap:14px">
            <n-progress
              variant="gemini-full"
              size="sm"
              [value]="78"
              label="Tokens procesados"
              [showValue]="true"
            />
            <n-progress
              variant="primary"
              size="md"
              [value]="54"
              label="Memoria del contexto"
              [showValue]="true"
            />
            <n-progress
              variant="secondary"
              size="xs"
              [value]="91"
              label="Capacidad del modelo"
              [showValue]="true"
            />
            <n-progress
              variant="gemini-full"
              size="sm"
              [indeterminate]="true"
              indeterminateMode="bar"
              label="Cargando modelo…"
              [showValue]="true"
            />
          </div>
        </section>
      </div>
    `,
  }),
};
