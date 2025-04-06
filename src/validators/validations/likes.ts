import Joi from 'joi';

export const likeTaskSchema = Joi.object({
  uri: Joi.string().required(),
  cid: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
