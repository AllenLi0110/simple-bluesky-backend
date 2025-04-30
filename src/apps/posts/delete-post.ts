import { NextFunction } from 'express';
import { PostRepository } from '@/repositories';
import { DeletePostRequest } from '@/requests';
import { DeletePostResponse } from '@/responses';
import Validator from '@/validators';
import { deletePostSchema } from '@/validators/validations';

/**
 * @api {delete} /dids/{:did}/posts/{:rkey} DeletePost
 * @apiName DeletePost
 * @apiDescription DeletePost
 * @apiGroup Posts
 *
 * @apiUse DeletePostRequest
 * @apiUse DeletePostResponse
 */

export default [
  Validator.body(deletePostSchema.required()),
  async function (
    request: DeletePostRequest,
    response: DeletePostResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const repository = await PostRepository.create(request);
      const result = await repository.deletePost({
        repo: request.body.repo,
        collection: request.body.collection,
        rkey: request.body.rkey,
      });
      response.json({
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
];
