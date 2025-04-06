import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RequestPart } from '@/definitions/validators/validators';

export default class Validator {
  public static body<T extends Request>(schema: Joi.ObjectSchema) {
    return this.validate<T>(schema, 'body');
  }

  public static query<T extends Request>(schema: Joi.ObjectSchema) {
    return this.validate<T>(schema, 'query');
  }

  public static params<T extends Request>(schema: Joi.ObjectSchema) {
    return this.validate<T>(schema, 'params');
  }

  public static headers<T extends Request>(schema: Joi.ObjectSchema) {
    return this.validate<T>(schema, 'headers');
  }

  private static validate<T extends Request>(schema: Joi.ObjectSchema, part: RequestPart) {
    return (request: T, _response: Response, next: NextFunction) => {
      const { error } = schema.validate(request[part], { abortEarly: false });
      error ? next(error) : next();
    };
  }
}
