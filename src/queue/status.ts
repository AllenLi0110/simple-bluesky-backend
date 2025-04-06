import { NextFunction, Request, Response } from 'express';

/**
 * @api {get} /queue/status QueueStatus
 * @apiName QueueStatus
 * @apiDescription Get the current status of the queue
 * @apiGroup Queue
 */

export default [
  async function (_request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      response.status(200).json({
        success: true,
        status: 'running',
        queueName: 'bluesky_tasks',
      });
    } catch (error) {
      return next(error);
    }
  },
];
