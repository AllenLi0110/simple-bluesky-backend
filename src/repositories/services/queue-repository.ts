import { queueService } from '../../queue-server';
import { JobType } from '@/definitions/queues';

interface Job {
  jobType: JobType;
  parameters: any;
}

interface CreateJobsParams {
  jobs: Job[];
}

export default class QueueRepository {
  async createJobs({ jobs }: CreateJobsParams): Promise<boolean[]> {
    try {
      const results = await Promise.all(
        jobs.map((job) => queueService.publishMessage(job.jobType, job.parameters)),
      );
      return results;
    } catch (error) {
      console.error('Error creating jobs:', error);
      throw error;
    }
  }
}
