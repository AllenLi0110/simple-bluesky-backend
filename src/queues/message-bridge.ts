import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export type Priority = 'release' | 'error' | 'info' | 'alert';
export interface BaseParameter {
  priority?: Priority;
}
export interface SlackParameter extends BaseParameter {
  webhookUrl: string;
}

export default class messageBridge {
  private webhookUrl: string = process.env.SLACK_WEBHOOK_URL!;

  constructor(params: SlackParameter) {
    if (!params.webhookUrl) {
      throw new Error('Webhook URL is required');
    }
    this.webhookUrl = params.webhookUrl;
  }

  public async publishSlack(message: string): Promise<void> {
    try {
      await axios.post(this.webhookUrl, {
        text: message,
      });
      console.log('Notification sent to Slack:', message);
    } catch (error) {
      console.error('Error sending notification to Slack:', error);
    }
  }
}
