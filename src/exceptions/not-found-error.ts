import { CustomError } from './custom-error';

/**
 * @apiDefine NotFoundError
 *
 * @apiError (404) {String} error   The resource hasn't found.
 * @apiError (404) {String} message The resource hasn't found message.
 * @apiErrorExample {json} Error-Response: HTTP/1.1 404
 *     {
 *       "error": "NotFound",
 *       "message": "The server cannot find the requested resource."
 *     }
 */
export class NotFoundError extends CustomError {
  public readonly name = 'NotFound';
  public readonly httpStatusCode = 404;
  public message: string;

  constructor(message?: string) {
    super();
    this.message = message || 'Not found';
  }
}
