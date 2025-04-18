import { AppBskyFeedGetAuthorFeed } from '@atproto/api';

export interface ListFeedsInput {
  /**
   * The handle or DID of the author whose feed to fetch
   */
  actor: string;

  /**
   * Maximum number of feed items to return
   */
  limit?: number;

  /**
   * Pagination cursor for the next page of results
   */
  cursor?: string;

  /**
   * Filter to apply to the feed items
   */
  filter?: string;

  /**
   * Whether to include pinned posts
   */
  includePins?: boolean;
}
export type ListFeedsOutput = AppBskyFeedGetAuthorFeed.OutputSchema;
