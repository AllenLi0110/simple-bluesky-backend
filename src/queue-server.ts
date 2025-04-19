import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

export class QueueService {
  private connection: any = null;
  private channel: any = null;
  private readonly rabbitmqUrl: string;
  private readonly exchangeName: string = 'bluesky_exchange';
  private readonly queueName: string = 'bluesky_tasks';
  private isConnected: boolean = false;

  constructor() {
    this.rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    // Connect when service is instantiated
    this.connect().catch((err) => console.error('Initial connection failed:', err));
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      this.connection = await amqp.connect(this.rabbitmqUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(this.exchangeName, 'direct', { durable: true });
      await this.channel.assertQueue(this.queueName, { durable: true });
      await this.channel.bindQueue(this.queueName, this.exchangeName, 'bluesky.task');

      this.isConnected = true;
      console.log('Successfully connected to RabbitMQ');

      this.connection.on('close', () => {
        console.log('RabbitMQ connection closed');
        this.isConnected = false;
        setTimeout(() => this.connect(), 5000);
      });

      this.connection.on('error', (err: any) => {
        console.error('RabbitMQ connection error:', err);
        this.isConnected = false;
        setTimeout(() => this.connect(), 5000);
      });
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      this.isConnected = false;
      setTimeout(() => this.connect(), 5000);
    }
  }

  public async publishMessage(task: string, data: any): Promise<boolean> {
    if (!this.isConnected) {
      await this.connect();
    }

    if (!this.channel) {
      throw new Error('Channel not established');
    }

    try {
      const message = {
        task,
        data,
        timestamp: new Date().toISOString(),
      };

      return this.channel.publish(
        this.exchangeName,
        'bluesky.task',
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
    } catch (error) {
      console.error('Error publishing message:', error);
      return false;
    }
  }

  public async consumeMessages(callback: (message: any) => Promise<void>): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not established');
    }

    await this.channel.prefetch(1);
    await this.channel.consume(this.queueName, async (msg: any) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await callback(content);
          this.channel?.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          this.channel?.nack(msg, false, true);
        }
      }
    });
  }

  public async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('Disconnected from RabbitMQ');
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
}

export const queueService = new QueueService();
