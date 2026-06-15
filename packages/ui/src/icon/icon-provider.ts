import {
  type EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideLucideIcons } from '@lucide/angular';

import { NEURAL_LUCIDE_ICONS } from './neural-icons.js';

export function provideNeuralIcons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideLucideIcons(...NEURAL_LUCIDE_ICONS)]);
}
