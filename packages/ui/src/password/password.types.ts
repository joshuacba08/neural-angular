export type NPasswordSize = 'sm' | 'md' | 'lg';

export type NPasswordStrengthLevel = 'weak' | 'medium' | 'strong';

export interface NPasswordStrength {
  level: NPasswordStrengthLevel;
  label: string;
}
