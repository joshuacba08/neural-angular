export type NAIStatus =
  | 'idle'
  | 'thinking'
  | 'running'
  | 'streaming'
  | 'success'
  | 'warning'
  | 'error';

export type NAIMessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface NAIMessage {
  id?: string;
  role: NAIMessageRole;
  content: string;
  author?: string;
  avatar?: string;
  timestamp?: string | Date;
  status?: NAIStatus;
  metadata?: Record<string, unknown>;
}

export type NAIPipelineStepStatus =
  | 'pending'
  | 'running'
  | 'success'
  | 'warning'
  | 'error'
  | 'skipped';

export interface NAIPipelineStep {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  status?: NAIPipelineStepStatus;
  progress?: number;
  metadata?: string;
}
