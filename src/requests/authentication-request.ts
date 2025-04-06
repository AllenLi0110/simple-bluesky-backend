import { Request } from 'express';

/**
 * @apiDefine SignInRequest
 * @apiParamExample {json} Request-Example:
 *      {
 *          "identifier": "example.bsky.social",
 *          "password": "**********"
 *      }
 * @apiBody  {String}   account   The identifier of user.
 * @apiBody  {String}   password  The password of user.
 */

export type SignInRequest = Request<
  never,
  any,
  {
    identifier: string;
    password: string;
  },
  never
>;
