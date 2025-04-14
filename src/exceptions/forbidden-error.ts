import { CustomError } from './custom-error';

/**
 * @apiDefine ForbiddenError
 *
 * @apiError (403) {String} error   The request has not permission.
 * @apiError (403) {String} message The request has not permission message.
 * @apiErrorExample {json} Error-Response: HTTP/1.1 403
 *     {
 *       "error": "Forbidden",
 *       "message": "The server understands the request but refuses to authorize it."
 *     }
 */
export class ForbiddenError extends CustomError {
  public readonly name = 'Forbidden';
  public readonly httpStatusCode = 403;
  public message: string;

  constructor(message?: string) {
    super();
    this.message = message || 'Bad request';
  }
}
