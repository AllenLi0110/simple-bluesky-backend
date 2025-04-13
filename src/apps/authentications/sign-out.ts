import { NextFunction, Request, Response } from 'express';
import { setCookies } from '@/helpers/set-cookies';

/**
 * @api {post} /authentications/sign-out SignOut
 * @apiName SignOut
 * @apiDescription Sign Out
 * @apiGroup Authentications
 *
 * @apiUse Request
 * @apiUse Response
 */

export default [
  async function (_request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      setCookies(response, 'access_token', '', { maxAge: 0 });
      setCookies(response, 'refresh_token', '', { maxAge: 0 });
      setCookies(response, 'did', '', { maxAge: 0 });
      setCookies(response, 'handle', '', { maxAge: 0 });

      response.json({ data: { message: 'Successfully signed out' } });
    } catch (error) {
      return next(error);
    }
  },
];
