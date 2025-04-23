import { NextFunction, Request, Response } from 'express';
import { ValidationError as JoiValidationError } from 'joi';
import {
  BadRequestError,
  CustomError,
  ForbiddenError,
  NotFoundError,
  UnauthenticatedError,
} from './exceptions';

export default async function (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  let message: string = error.message || 'Unknown Error';
  let statusCode: number = 400;
  let details: unknown = undefined;
  try {
    console.log(request.originalUrl);
    console.error(error);
    switch (error.constructor) {
      case UnauthenticatedError: //401
      case BadRequestError: //400
      case ForbiddenError: //403
      case NotFoundError: //404
        statusCode = (error as CustomError).httpStatusCode ?? 400;
        message = error.message;
        break;
      case JoiValidationError: // 422
        statusCode = 422;
        message = error.message;
        details = (error as JoiValidationError).details;
        break;
      default:
    }
    response.status(statusCode).send({ error: message, details: details });
  } catch (_error) {
    response.status(statusCode).send({
      error: message,
      details: details,
    });
  } finally {
    next();
  }
}
