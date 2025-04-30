import { AtProtoPost } from '@/definitions';
import Joi from 'joi';

export const createPostSchema = Joi.object({
  repo: Joi.string().required(),
  collection: Joi.string().required(),
  rkey: Joi.string().optional(),
  validate: Joi.boolean().optional(),
  swapCommit: Joi.string().optional(),
  record: Joi.object({
    $type: Joi.string().valid('app.bsky.feed.post').required(),
    text: Joi.string().required(),
    createdAt: Joi.string().isoDate().required(),
    langs: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    tag: Joi.array().items(Joi.string()).optional(),
    entities: Joi.array()
      .items(
        Joi.object({
          $type: Joi.string().optional(),
          index: Joi.object({
            start: Joi.number().required(),
            end: Joi.number().required(),
          }).required(),
          type: Joi.string().valid('mention', 'link').required(),
          value: Joi.string().required(),
        })
      )
      .optional(),
    facets: Joi.array().items(Joi.object()).optional(),
    reply: Joi.object({
      $type: Joi.string().optional(),
      root: Joi.object({
        $link: Joi.string().optional(),
      }).optional(),
      parent: Joi.object({
        $link: Joi.string().optional(),
      }).optional(),
    }).optional(),
    embed: Joi.object().optional(),
    labels: Joi.object().optional(),
  })
    .unknown(true)
    .required(),
});

export const deletePostSchema = Joi.object({
  collection: Joi.string().valid(AtProtoPost.AppBskyFeedPost).required(),
  repo: Joi.string().required(),
  rkey: Joi.string().required(),
});
