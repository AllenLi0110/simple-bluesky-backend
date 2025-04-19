import * as dotenv from 'dotenv';
import { notificationConsumer } from './queues/notification-consumer';
import { apiService } from '@/api-server';

dotenv.config();

const serviceType: string = process.env.SERVICE_TYPE ?? 'api-service';

if (serviceType === 'queue-service') {
  console.info('Start Queue Service');
  void notificationConsumer.start();
} else {
  console.info('Start API Service');
  void apiService.start();
}
