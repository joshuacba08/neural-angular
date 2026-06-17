import { applicationConfig, type Preview } from '@storybook/angular';

import {
  provideNeuralIcons,
  provideNeuralOverlay,
  provideNeuralTheme,
} from '../src/index.js';
import { neuralTheme } from './theme.js';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideNeuralTheme({
          defaultTheme: 'dark',
          storage: false,
        }),
        provideNeuralIcons(),
        provideNeuralOverlay(),
      ],
    }),
  ],
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'neural dark',
      values: [
        { name: 'neural dark', value: '#06060e' },
        { name: 'surface', value: '#0f0f1c' },
        { name: 'light', value: '#f7f8fb' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' surfaces violations in the a11y panel without failing the build.
      // Promote to 'error' once components are audited.
      test: 'todo',
    },
    docs: {
      // Keep autodocs pages on the dark Neural theme, cohesive with components.
      theme: neuralTheme,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Installation', 'Configuration', 'Playground'],
          'Foundation',
          'Components',
          'Forms',
          '*',
        ],
      },
    },
    layout: 'centered',
  },
  // Generate an autodocs page for every component story by default.
  tags: ['autodocs'],
};

export default preview;
