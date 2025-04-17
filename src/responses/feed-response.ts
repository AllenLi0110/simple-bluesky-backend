import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine ListFeedsResponse
 *
 * @apiSuccess {Object}   data                                Feed response data
 * @apiSuccess {Object[]} data.feed                           Array of feed items
 * @apiSuccess {Object}   data.feed[].post                    Post information
 * @apiSuccess {String}   data.feed[].post.uri                URI of the post
 * @apiSuccess {String}   data.feed[].post.cid                CID of the post
 * @apiSuccess {Object}   data.feed[].post.author             Author information
 * @apiSuccess {String}   data.feed[].post.author.did         Author's DID
 * @apiSuccess {String}   data.feed[].post.author.handle      Author's handle
 * @apiSuccess {String}   data.feed[].post.author.displayName Author's display name
 * @apiSuccess {String}   data.feed[].post.author.avatar      Author's avatar URL
 * @apiSuccess {Object}   data.feed[].post.author.viewer      Author's viewer
 * @apiSuccess {Object[]} data.feed[].post.author.labels      Author's labels
 * @apiSuccess {String}   data.feed[].post.author.createdAt   Author's createdAt
 * @apiSuccess {Object}   data.feed[].post.record             Post record
 * @apiSuccess {String}   data.feed[].post.record.$type       Record type
 * @apiSuccess {String}   data.feed[].post.record.text        Post content
 * @apiSuccess {String}   data.feed[].post.record.createdAt   Post creation time
 * @apiSuccess {Number}   data.feed[].post.replyCount         Number of replies
 * @apiSuccess {Number}   data.feed[].post.repostCount        Number of reposts
 * @apiSuccess {Number}   data.feed[].post.likeCount          Number of likes
 * @apiSuccess {Number}   data.feed[].post.quoteCount         Number of quotes
 * @apiSuccess {String}   data.feed[].post.indexedAt          Indexing timestamp
 * @apiSuccess {Object}   data.feed[].post.viewer             Post's viewer
 * @apiSuccess {Object[]} data.feed[].post.labels             Post's labels
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "feat": [
 *          {
 *            "post": {
 *              "uri": "at://did:plc:mockDid/app.bsky.feed.post/mockRkey",
 *              "cid": "mockCid",
 *              "author": {
 *                "did": "did:plc:mockDid",
 *                "handle": "example.bsky.social",
 *                "displayName": "",
 *                "avatar": "https://cdn.bsky.app/img/avatar/plain/did:plc:mockDid/mockCid@jpeg",
 *                "viewer": {
 *                  "muted": false,
 *                  "blockedBy": false
 *                },
 *                "labels": [],
 *                "createdAt": "2025-03-08T07:09:11.040Z"
 *              },
 *              "record": {
 *                "$type": "app.bsky.feed.post",
 *                "createdAt": "2025-03-16T08:20:22.993Z",
 *                "text": "Hello World!"
 *              },
 *              "replyCount": 0,
 *              "repostCount": 0,
 *              "likeCount": 0,
 *              "quoteCount": 0,
 *              "indexedAt": "2025-03-16T08:20:24.153Z",
 *              "viewer": {
 *                "threadMuted": false,
 *                "embeddingDisabled": false
 *              },
 *              "labels": []
 *            }
 *          }
 *        ]
 *      }
 *    }
 */

export type ListFeedsResponse = Response<BasicResponse>;
