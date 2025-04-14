import { CustomError } from './custom-error';

/**
 * @apiDefine UnauthenticatedError
 *
 * @apiError (401) {String} error The request has not permission.
 * @apiError (401) {String} message The request has not permission message.
 * @apiErrorExample {json} Error-Response: HTTP/1.1 401
 *     {
 *       "error": "Unauthenticated",
 *       "message": "The client (e.g., web browser) attempting to access a resource does not have valid authentication credentials for that resource."
 *     }
 */
export class UnauthenticatedError extends CustomError {
  public readonly name = 'Unauthenticated';
  public readonly httpStatusCode = 401;
  public message: string;

  constructor(message?: string) {
    super();
    this.message = message || 'Unauthenticated';
  }
}
