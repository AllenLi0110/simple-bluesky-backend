import { NextFunction } from 'express';
import { setCookies } from '@/helpers/set-cookies';
import { AuthenticationRepository } from '@/repositories';
import { SignInRequest } from '@/requests';
import { SignInResponse } from '@/responses';
import Validator from '@/validators';
import { signInSchema } from '@/validators/validations';

/**
 * @api {post} /authentications/sign-in SignIn
 * @apiName SignIn
 * @apiDescription Sign In
 * @apiGroup Authentications
 *
 * @apiUse SignInRequest
 * @apiUse SignInResponse
 */

export default [
  Validator.body(signInSchema.required()),
  async function (
    request: SignInRequest,
    response: SignInResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const repository = new AuthenticationRepository();
      const result = await repository.signIn({
        identifier: request.body.identifier,
        password: request.body.password,
      });
      const { accessJwt, refreshJwt, did, handle } = result;

      setCookies(response, 'access_token', accessJwt, {
        maxAge: 1000 * 60 * 60 * 2,
      });
      setCookies(response, 'refresh_token', refreshJwt, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      setCookies(response, 'did', did, {
        maxAge: 1000 * 60 * 60 * 2,
      });
      setCookies(response, 'handle', handle, {
        maxAge: 1000 * 60 * 60 * 2,
      });

      response.json({ data: result });
    } catch (error) {
      return next(error);
    }
  },
];
