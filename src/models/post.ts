import {
  AppBskyRichtextFacet,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  ComAtprotoLabelDefs,
  ComAtprotoRepoStrongRef,
} from '@atproto/api';
import Model from './model';

export interface IPost {
  /** Post content text, may be empty if only embeds are present */
  text: string;
  /** Text annotations like mentions, URLs, and hashtags */
  facets?: AppBskyRichtextFacet.Main[];
  /** Reply reference data */
  reply?: ReplyRef;
  /** Post embedded content */
  embed?:
    | AppBskyEmbedImages.Main
    | AppBskyEmbedVideo.Main
    | AppBskyEmbedExternal.Main
    | AppBskyEmbedRecord.Main
    | AppBskyEmbedRecordWithMedia.Main
    | { $type: string };
  /** Human language codes for post content */
  langs?: string[];
  /** Self-applied content labels */
  labels?: ComAtprotoLabelDefs.SelfLabels | { $type: string };
  /** Additional hashtags beyond those in text and facets */
  tags?: string[];
  /** Original post creation timestamp */
  createdAt: string;
  /** Additional arbitrary properties */
  // [k: string]: unknown;
}

export interface ReplyRef {
  /** Type identifier for reply reference */
  $type?: 'app.bsky.feed.post#replyRef';
  /** Reference to root post in thread */
  root: ComAtprotoRepoStrongRef.Main;
  /** Reference to immediate parent post */
  parent: ComAtprotoRepoStrongRef.Main;
}

export class Post extends Model<IPost> {}
