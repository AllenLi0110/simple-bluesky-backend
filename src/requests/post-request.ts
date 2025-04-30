import { AppBskyFeedPost } from '@atproto/api';
import { Request } from 'express';

/**
 * @apiDefine CreatePostRequest
 * @apiParamExample {json} Request-Example:
 *      {
 *          "repo": "did:plc:mockDid",
 *          "collection": "app.bsky.feed.post",
 *          "rkey": "mockRkey",
 *          "validate": true,
 *          "record": {
 *            "$type": "app.bsky.feed.post",
 *            "text": "This is a mock post text.",
 *            "entities": [
 *              {
 *                "$type": "app.bsky.feed.post#entity",
 *                "index": {
 *                  "start": 10,
 *                  "end": 20
 *                },
 *                "type": "mention",
 *                "value": "did:plc:mentionedUserDid"
 *              }
 *            ],
 *            "facets": [
 *              {
 *                "index": {
 *                  "start": 6,
 *                  "end": 10
 *                },
 *                "features": [
 *                  {
 *                    "$type": "app.bsky.richtext.facet#mention",
 *                    "did": "did:plc:bobdid"
 *                  }
 *                ]
 *              }
 *            ],
 *            "reply": {
 *              "$type": "app.bsky.feed.post#replyRef",
 *              "root": {
 *                "$link": "mockRootCid",
 *                "uri": "https://example.com/root"
 *              },
 *              "parent": {
 *                "$link": "mockParentCid",
 *                "uri": "https://example.com/root"
 *              }
 *            },
 *            "embed": {
 *              "$type": "app.bsky.embed.recordWithMedia",
 *              "media": {
 *                "$type": "app.bsky.embed.images",
 *                "images": [
 *                  {
 *                    "image": {
 *                      "cid": "mockImageCid",
 *                      "mimeType": "image/png"
 *                    },
 *                    "alt": "Mock image alt text"
 *                  }
 *                ]
 *              }
 *            },
 *            "langs": ["en"],
 *            "tag": ["mockTag"],
 *            "createdAt": "2025-04-11T17:04:51.782Z"
 *          },
 *          "swapCommit": "mockCID"
 *      }
 *
 * @apiBody {String}   repo                                     The DID of the repository (user).
 * @apiBody {String}   collection                               The NSID of the record type (e.g., app.bsky.feed.post).
 * @apiBody {String}   [rkey]                                   Optional record key (for update/overwrite).
 * @apiBody {Boolean}  [validate]                               Whether to validate the record.
 * @apiBody {Object}   record                                   The post record object.
 * @apiBody {String}   record.$type                             The NSID type of the record (should match collection).
 * @apiBody {String}   record.text                              The text content of the post.
 * @apiBody {Object[]} [record.entities]                        Optional legacy entities (mention/link).
 * @apiBody {String}   record.entities.$type                    The entity type (e.g., app.bsky.feed.post#entity).
 * @apiBody {Object}   record.entities.index                    The index of the text slice.
 * @apiBody {Number}   record.entities.index.start              Start position in the text.
 * @apiBody {Number}   record.entities.index.end                End position in the text.
 * @apiBody {String}   record.entities.type                     Entity type: "mention" | "link".
 * @apiBody {String}   record.entities.value                    DID or URL.
 * @apiBody {Object[]} [record.facets]                          Rich text facets.
 * @apiBody {Object}   record.facets.index                      The text range for the facet.
 * @apiBody {Number}   record.facets.index.start                Start position.
 * @apiBody {Number}   record.facets.index.end                  End position.
 * @apiBody {Object[]} record.facets.features                   Array of facet features.
 * @apiBody {String}   record.facets.features.$type             The feature type (e.g., mention/link/tag).
 * @apiBody {String}   [record.facets.features.did]             DID (for mentions).
 * @apiBody {String}   [record.facets.features.uri]             URI (for links).
 * @apiBody {String}   [record.facets.features.tag]             Tag string (for tags).
 * @apiBody {Object}   [record.reply]                           Optional reply reference.
 * @apiBody {String}   record.reply.$type                       Type of replyRef.
 * @apiBody {Object}   record.reply.root                        Root post reference.
 * @apiBody {String}   record.reply.root.$link                  CID or URI of the root post.
 * @apiBody {Object}   record.reply.parent                      Parent post reference.
 * @apiBody {String}   record.reply.parent.$link                CID or URI of the parent post.
 * @apiBody {Object}   [record.embed]                           Optional embedded media or post.
 * @apiBody {String}   record.embed.$type                       Type of embedded content.
 * @apiBody {Object}   record.embed.media                       Media content (e.g., image).
 * @apiBody {Object[]} record.embed.media.images                Array of images.
 * @apiBody {Object}   record.embed.media.images.image          Image metadata.
 * @apiBody {String}   record.embed.media.images.image.cid      Image CID.
 * @apiBody {String}   record.embed.media.images.image.mimeType Image MIME type.
 * @apiBody {String}   record.embed.media.images.alt            Alt text for the image.
 * @apiBody {String[]} record.langs                             Array of language codes (e.g., "en").
 * @apiBody {String[]} [record.tag]                             Optional array of hashtags or labels.
 * @apiBody {String}   record.createdAt                         ISO timestamp of post creation.
 * @apiBody {String}   [swapCommit]                             Optional swap commit ID (for concurrency control).
 */

export type CreatePostRequest = Request<
  {
    did: string;
  },
  any,
  {
    repo: string;
    collection: string;
    rkey?: string;
    validate?: boolean;
    record: AppBskyFeedPost.Record;
    swapCommit?: string;
  },
  never
>;

/**
 * @apiDefine DeletePostRequest
 * @apiParamExample {json} Request-Example:
 *      {
 *          "repo": "did:plc:mockDid",
 *          "collection": "app.bsky.feed.post",
 *          "rkey": "mockRkey"
 *      }
 *
 * @apiBody {String}   repo                                     The DID of the repository (user).
 * @apiBody {String}   collection                               The NSID of the record type (e.g., app.bsky.feed.post).
 * @apiBody {String}   rkey                                     The record key.
 */

export type DeletePostRequest = Request<
  {
    did: string;
    rkey: string;
  },
  any,
  {
    repo: string;
    collection: string;
    rkey: string;
  },
  never
>;
