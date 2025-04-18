import { NextFunction, Request, Response } from 'express';
import { decodeJwt } from 'jose';
import { AtpToken } from '@/models';

export const verifyDid = async function (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = request.cookies.access_token;
    if (!token) return next(new Error('Bearer token missing'));
    const atpToken = decodeJwt(token) as unknown as AtpToken;
    if (atpToken.sub !== request.params.did) {
      return next(new Error('AtpToken error: DID mismatch'));
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
