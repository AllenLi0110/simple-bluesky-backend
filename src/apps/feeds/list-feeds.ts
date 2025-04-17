import { NextFunction } from 'express';
import { FeedRepository } from '@/repositories';
import { ListFeedsRequest } from '@/requests';
import { ListFeedsResponse } from '@/responses';
import Validator from '@/validators';
import { listFeedsSchema } from '@/validators/validations/feeds';

/**
 * @api {get} /dids/{:did}/feeds List Feeds
 * @apiName ListFeeds
 * @apiDescription List Feeds
 * @apiGroup Feeds
 *
 * @apiUse ListFeedsRequest
 * @apiUse ListFeedsResponse
 */

export default [
  Validator.query<ListFeedsRequest>(listFeedsSchema.required()),
  async function (
    request: ListFeedsRequest,
    response: ListFeedsResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const repository = await FeedRepository.create(request);
      const result = await repository.listFeeds({
        actor: request.query.actor,
        limit: Number(request.query.limit),
        cursor: request.query.cursor,
        filter: request.query.filter,
        includePins: Boolean(request.query.includePins),
      });
      response.json({
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
];
