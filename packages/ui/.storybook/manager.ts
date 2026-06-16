import { addons } from 'storybook/manager-api';

import { neuralTheme } from './theme.js';

addons.setConfig({
  theme: neuralTheme,
});
