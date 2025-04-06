import { NextFunction, Request, Response } from 'express';
import { queueService } from '@/queue-service';
import { followTaskSchema } from '@/validators/validations/follows';

/**
 * @api {post} /queue/follow QueueFollow
 * @apiName QueueFollow
 * @apiDescription Queue a follow task for Bluesky
 * @apiGroup Queue
 */

export default [
  async function (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = followTaskSchema.validate(request.body);

      if (error) {
        response.status(400).json({
          success: false,
          message: 'Validation error',
          details: error.details,
        });
        return;
      }

      const success = await queueService.publishMessage('follow', value);

      if (success) {
        response.status(202).json({
          success: true,
          message: 'Follow task queued successfully',
        });
      } else {
        response.status(500).json({
          success: false,
          message: 'Failed to queue follow task',
        });
      }
    } catch (error) {
      return next(error);
    }
  },
];
