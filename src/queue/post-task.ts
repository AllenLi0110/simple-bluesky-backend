import { NextFunction, Request, Response } from 'express';
import { queueService } from '@/queue-service';
import { postTaskSchema } from '@/validators/validations/posts';

/**
 * @api {post} /queue/post QueuePost
 * @apiName QueuePost
 * @apiDescription Queue a post task for Bluesky
 * @apiGroup Queue
 */

export default [
  async function (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = postTaskSchema.validate(request.body);

      if (error) {
        response.status(400).json({
          success: false,
          message: 'Validation error',
          details: error.details,
        });
        return;
      }

      const success = await queueService.publishMessage('post', value);

      if (success) {
        response.status(202).json({
          success: true,
          message: 'Post task queued successfully',
        });
      } else {
        response.status(500).json({
          success: false,
          message: 'Failed to queue post task',
        });
      }
    } catch (error) {
      return next(error);
    }
  },
];
