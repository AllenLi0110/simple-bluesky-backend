import { Request } from 'express';
import { AppBskyFeedGetAuthorFeedFilter } from '@/definitions';

/**
 * @apiDefine ListFeedsRequest
 * @apiParamExample {json} Request-Example:
 *      {
 *          "actor": "did:plc:mockDid",
 *          "limit": 30,
 *          "cursor": "nextPageCursor",
 *          "filter": "posts_and_author_threads",
 *          "includePins": true
 *      }
 *
 * @apiParam {String}  actor          The DID of the user whose feed is being requested
 * @apiParam {Number}  [limit]        Maximum number of feed items to return (optional)
 * @apiParam {String}  [cursor]       Pagination cursor for fetching next page (optional)
 * @apiParam {String}  [filter]       Filter type for the feed items (posts_with_media, posts_no_replies, etc.) (optional)
 * @apiParam {Boolean} [includePins]  Whether to include pinned posts in the response (optional)
 */

export type ListFeedsRequest = Request<
  {
    did: string;
  },
  any,
  never,
  {
    actor: string;
    limit?: string;
    cursor?: string;
    filter?: AppBskyFeedGetAuthorFeedFilter;
    includePins?: string;
  }
>;
