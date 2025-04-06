import { AtpAgent } from '@atproto/api';
import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

export class QueueService {
  private connection: any = null;
  private channel: any = null;
  private readonly rabbitmqUrl: string;
  private readonly exchangeName: string = 'bluesky_exchange';
  private readonly queueName: string = 'bluesky_tasks';

  constructor() {
    this.rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
  }

  /**
   * Connect to RabbitMQ server
   */
  public async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.rabbitmqUrl);

      if (this.connection) {
        this.channel = await this.connection.createChannel();

        if (this.channel) {
          await this.channel.assertExchange(this.exchangeName, 'direct', { durable: true });
          await this.channel.assertQueue(this.queueName, { durable: true });
          await this.channel.bindQueue(this.queueName, this.exchangeName, 'bluesky.task');

          console.log('Connected to RabbitMQ successfully');
        }
      }

      if (this.connection) {
        this.connection.on('close', () => {
          console.log('RabbitMQ connection closed');
          setTimeout(() => this.connect(), 5000);
        });

        this.connection.on('error', (err: any) => {
          console.error('RabbitMQ connection error:', err);
          setTimeout(() => this.connect(), 5000);
        });
      }
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      setTimeout(() => this.connect(), 5000);
    }
  }

  /**
   * Publish a message to the queue
   * @param task The task to be processed
   * @param data The data related to the task
   */
  public async publishMessage(task: string, data: any): Promise<boolean> {
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
        { persistent: true },
      );
    } catch (error) {
      console.error('Error publishing message:', error);
      return false;
    }
  }

  /**
   * Consume messages from the queue
   * @param callback Function to handle received messages
   */
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

  /**
   * Process Bluesky ATProtocol tasks
   * @param message The message containing task details
   */
  public async processBlueskyTask(message: any): Promise<void> {
    const { task, data } = message;
    const agent = new AtpAgent({ service: 'https://bsky.social' });

    if (data.username && data.password) {
      await agent.login({ identifier: data.username, password: data.password });
    }

    switch (task) {
      case 'post':
        await this.createPost(agent, data);
        break;
      case 'follow':
        await this.followUser(agent, data);
        break;
      case 'like':
        await this.likePost(agent, data);
        break;
      default:
        console.log(`Unknown task: ${task}`);
    }
  }

  /**
   * Create a post on Bluesky
   */
  private async createPost(agent: AtpAgent, data: any): Promise<void> {
    try {
      await agent.post({
        text: data.text,
        ...(data.reply && { reply: data.reply }),
        ...(data.embed && { embed: data.embed }),
      });
      console.log('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  /**
   * Follow a user on Bluesky
   */
  private async followUser(agent: AtpAgent, data: any): Promise<void> {
    try {
      await agent.follow(data.did);
      console.log(`Successfully followed user: ${data.did}`);
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  }

  /**
   * Like a post on Bluesky
   */
  private async likePost(agent: AtpAgent, data: any): Promise<void> {
    try {
      await agent.like(data.uri, data.cid);
      console.log(`Successfully liked post: ${data.uri}`);
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  /**
   * Close the connection to RabbitMQ
   */
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
