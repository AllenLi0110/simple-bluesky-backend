import Joi from 'joi';

export const followTaskSchema = Joi.object({
  did: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
