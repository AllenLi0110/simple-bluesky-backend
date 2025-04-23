import * as dotenv from 'dotenv';
import { notificationConsumer } from './queues/notification-consumer';
import { apiService } from '@/api-server';
import { initTracing, shutdownTracing } from '@/monitoring/tracing';

dotenv.config();

const serviceType: string = process.env.SERVICE_TYPE ?? 'api-service';

const start = async () => {
  try {
    await initTracing();

    if (serviceType === 'queue-service') {
      console.info('Start Queue Service');
      await notificationConsumer.start();
    } else {
      console.info('Start API Service');
      await apiService.start();
    }
  } catch (error) {
    console.error('Error starting service:', error);
    await shutdownTracing();
    process.exit(1);
  }
};

void start();
