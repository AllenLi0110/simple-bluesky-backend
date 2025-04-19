import { queueService } from '../queue-server';
import messageBridge from './message-bridge';
import { JobType } from '@/definitions/queues';

export class NotificationConsumer {
  private messageBridge: messageBridge;

  constructor() {
    this.messageBridge = new messageBridge({
      webhookUrl: process.env.SLACK_WEBHOOK_URL!,
    });
  }

  public async start(): Promise<void> {
    try {
      await queueService.connect();
      await queueService.consumeMessages(async (message) => {
        if (message.task === JobType.SendNotification) {
          await this.messageBridge.publishSlack(message.data.data);
        }
      });
      console.log('Notification consumer started successfully');
    } catch (error) {
      console.error('Failed to start notification consumer:', error);
      throw error;
    }
  }
}

export const notificationConsumer = new NotificationConsumer();
