import { NextFunction } from 'express';
import { JobType } from '@/definitions/queues';
import { BadRequestError } from '@/exceptions';
import { setCookies } from '@/helpers/set-cookies';
import { AuthenticationRepository } from '@/repositories';
import RepositoryFactory from '@/repositories/repository-factory';
import QueueRepository from '@/repositories/services/queue-repository';
import { SignInRequest } from '@/requests';
import { SignInResponse } from '@/responses';
import logger from '@/utils/logger';
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
 * @apiUse BadRequestError
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
      const result = await repository
        .signIn({
          identifier: request.body.identifier,
          password: request.body.password,
        })
        .catch((error) => {
          logger.error('Login failed', {
            identifier: request.body.identifier,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
            error: error.message,
          });
          throw new BadRequestError('Invalid identifier or password.');
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

      const data = `The ${result.email} sign in the Simple Bluesky.`;
      const jobType = JobType.SendNotification;
      const repositoryFactory = new RepositoryFactory();
      const queueRepository = repositoryFactory.create(QueueRepository);

      await queueRepository.createJobs({
        jobs: [
          {
            jobType,
            parameters: {
              data,
            },
          },
        ],
      });

      response.json({ data: result });
    } catch (error) {
      return next(error);
    }
  },
];
