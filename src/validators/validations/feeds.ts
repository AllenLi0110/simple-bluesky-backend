import Joi from 'joi';
import { AppBskyFeedGetAuthorFeedFilter } from '@/definitions';

export const listFeedsSchema = Joi.object({
  actor: Joi.string().required(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  cursor: Joi.string().optional(),
  filter: Joi.string()
    .valid(...Object.values(AppBskyFeedGetAuthorFeedFilter))
    .optional(),
  includePins: Joi.boolean().optional(),
});
