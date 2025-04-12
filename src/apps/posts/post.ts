import { NextFunction } from 'express';
import { PostRepository } from '@/repositories';
import { PostRequest } from '@/requests';
import { PostResponse } from '@/responses';
import Validator from '@/validators';
import { postSchema } from '@/validators/validations';

/**
 * @api {post} /did/{:did}/posts Post
 * @apiName Post
 * @apiDescription Post
 * @apiGroup Posts
 *
 * @apiUse PostRequest
 * @apiUse PostResponse
 */

export default [
  Validator.body(postSchema.required()),
  async function (request: PostRequest, response: PostResponse, next: NextFunction): Promise<void> {
    try {
      const repository = await PostRepository.create(request);
      const result = await repository.post({
        repo: request.body.repo,
        collection: request.body.collection,
        rkey: request.body.rkey,
        validate: request.body.validate,
        record: request.body.record,
        swapCommit: request.body.swapCommit,
      });
      response.json({
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
];
