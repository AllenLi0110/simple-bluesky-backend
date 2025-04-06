import { NextFunction, Request, Response } from 'express';
import { ValidationError as JoiValidationError } from 'joi';

export default async function (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    console.log(request.originalUrl);
    const statusCode = error instanceof JoiValidationError ? 422 : 400;
    const message = error.message || 'Unknown Error';
    response.status(statusCode).send({ error: message });
  } catch (catchError) {
    response.status(500).send({ error: 'Internal Server Error' });
  } finally {
    next();
  }
}
