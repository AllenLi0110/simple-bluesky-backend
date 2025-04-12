import { AppBskyFeedPost, ComAtprotoRepoCreateRecord } from '@atproto/api';

export interface PostInput {
  /**
   * The handle or DID of the repo (aka, current account).
   */
  repo: string;
  /**
   * The NSID of the record collection.
   */
  collection: string;
  /**
   * The Record Key.
   */
  rkey?: string;
  /**
   * Can be set to 'false' to skip Lexicon schema validation of record data, 'true' to require it, or leave unset to validate only for known Lexicons.
   */
  validate?: boolean;
  /**
   * The record itself. Must contain a $type field.
   */
  record: AppBskyFeedPost.Record;
  /**
   * Compare and swap with the previous commit by CID.
   */
  swapCommit?: string;
}

export type PostOutput = ComAtprotoRepoCreateRecord.OutputSchema;
