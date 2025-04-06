import { NextFunction, Request, Response } from 'express';
import { queueService } from '@/queue-service';
import { likeTaskSchema } from '@/validators/validations/likes';

/**
 * @api {post} /queue/like QueueLike
 * @apiName QueueLike
 * @apiDescription Queue a like task for Bluesky
 * @apiGroup Queue
 */

export default [
  async function (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = likeTaskSchema.validate(request.body);

      if (error) {
        response.status(400).json({
          success: false,
          message: 'Validation error',
          details: error.details,
        });
        return;
      }

      const success = await queueService.publishMessage('like', value);

      if (success) {
        response.status(202).json({
          success: true,
          message: 'Like task queued successfully',
        });
      } else {
        response.status(500).json({
          success: false,
          message: 'Failed to queue like task',
        });
      }
    } catch (error) {
      return next(error);
    }
  },
];
