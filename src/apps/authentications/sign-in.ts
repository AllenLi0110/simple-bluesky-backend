import { NextFunction } from 'express';
import { AuthenticationRepository } from '@/repositories';
import { SignInRequest } from '@/requests/authentication-request';
import { SignInResponse } from '@/responses/authentication-response';
import Validator from '@/validators';
import { signInSchema } from '@/validators/validations/authentications';

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
    next: NextFunction
  ): Promise<void> {
    try {
      const repository = new AuthenticationRepository();
      const result = await repository.signIn({
        identifier: request.body.identifier,
        password: request.body.password,
      });
      response.json({
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
];
