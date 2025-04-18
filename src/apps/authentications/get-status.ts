import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AtpToken } from '@/models';

/**
 * @api {get} /authentications/status Status
 * @apiName Status
 * @apiDescription Status
 * @apiGroup Authentications
 *
 * @apiUse Request
 * @apiUse Response
 */

export default [
  async function (request: Request, response: Response, next: NextFunction): Promise<void> {
    let authenticated: boolean = false;
    try {
      const token = request.cookies?.access_token;
      const decoded = jwt.decode(token) as AtpToken | null;
      if (token) {
        const now = Math.floor(Date.now() / 1000);
        authenticated = decoded?.exp ? decoded.exp > now : false;
      }
      response.json({ data: { authenticated, did: decoded?.sub } });
    } catch (error) {
      return next(error);
    }
  },
];
