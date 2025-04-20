import { JobType } from '@/definitions/queues';

export interface CreateJobsInput {
  jobs: {
    jobType: JobType;
    parameters: Record<string, any>;
  }[];
}

export type CreateJobsOutput = Boolean;
