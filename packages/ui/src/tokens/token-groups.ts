export const NEURAL_TOKEN_GROUPS = [
  'color',
  'surface',
  'text',
  'border',
  'gradient',
  'spacing',
  'radius',
  'typography',
  'elevation',
  'glow',
  'motion',
  'zIndex',
] as const;

export type NeuralTokenGroup = (typeof NEURAL_TOKEN_GROUPS)[number];
