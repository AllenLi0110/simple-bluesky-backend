import * as dotenv from 'dotenv';
import { apiService } from '@/api-server';

dotenv.config();

const serviceType: string = process.env.SERVICE_TYPE ?? 'api-service';

if (serviceType === 'queue-service') {
  console.info(' Start Queue Service');
} else {
  console.info('Start API Service');
  void apiService.start();
}
