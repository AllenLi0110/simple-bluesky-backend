import Joi from 'joi';

export const signInSchema = Joi.object({
  identifier: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required(),
});
