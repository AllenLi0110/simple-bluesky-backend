import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AtpToken } from '@/definitions';
import { BadRequestError } from '@/exceptions';

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
    try {
      const token = request.cookies?.access_token;
      if (!token) {
        throw new BadRequestError('Missing access token');
      }
      const decoded = jwt.decode(token) as AtpToken | null;
      const now = Math.floor(Date.now() / 1000);
      const authenticated = decoded?.exp ? decoded.exp > now : false;
      response.json({ data: { authenticated } });
    } catch (error) {
      return next(error);
    }
  },
];
