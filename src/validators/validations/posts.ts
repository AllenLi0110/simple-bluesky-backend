import Joi from 'joi';

export const postTaskSchema = Joi.object({
  text: Joi.string().required().max(300),
  reply: Joi.object().optional(),
  embed: Joi.object().optional(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
