import { applicationConfig, type Preview } from '@storybook/angular';

import {
  provideNeuralIcons,
  provideNeuralOverlay,
  provideNeuralTheme,
} from '../src/index.js';

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
    layout: 'centered',
  },
};

export default preview;
