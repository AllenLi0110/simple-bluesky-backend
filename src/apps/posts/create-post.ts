import { NextFunction } from 'express';
import { PostRepository } from '@/repositories';
import { CreatePostRequest } from '@/requests';
import { CreatePostResponse } from '@/responses';
import Validator from '@/validators';
import { createPostSchema } from '@/validators/validations';

/**
 * @api {post} /dids/{:did}/posts Post
 * @apiName Post
 * @apiDescription Post
 * @apiGroup Posts
 *
 * @apiUse CreatePostRequest
 * @apiUse CreatePostResponse
 */

export default [
  Validator.body(createPostSchema.required()),
  async function (
    request: CreatePostRequest,
    response: CreatePostResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const repository = await PostRepository.create(request);
      const result = await repository.createPost({
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
