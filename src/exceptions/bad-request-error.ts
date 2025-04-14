import { CustomError } from './custom-error';

/**
 * @apiDefine BadRequestError
 *
 * @apiError (400) {String} error   The request has invalid data.
 * @apiError (400) {String} message The request has invalid data message.
 * @apiErrorExample {json} Error-Response: HTTP/1.1 400
 *     {
 *       "error": "Bad Request",
 *       "message": "The server could not process the client's request."
 *     }
 */
export class BadRequestError extends CustomError {
  public readonly name = 'BadRequest';
  public readonly httpStatusCode = 400;
  public message: string;

  constructor(message?: string) {
    super();
    this.message = message || 'Bad request';
  }
}
