import * as dotenv from 'dotenv';
import { apiService } from '@/api-server';
import { queueService } from '@/queue-service';

dotenv.config();

const serviceType: string = process.env.SERVICE_TYPE ?? 'api-service';

if (serviceType === 'queue-service') {
  console.info('Start Queue Service');

  void queueService.connect().then(() => {
    void queueService.consumeMessages(async (message) => {
      console.log('Processing message:', message);
      await queueService.processBlueskyTask(message);
    });
  });

  process.on('SIGINT', async () => {
    console.log('Shutting down queue service...');
    await queueService.close();
    process.exit(0);
  });
} else {
  console.info('Start API Service');
  void apiService.start();
}
