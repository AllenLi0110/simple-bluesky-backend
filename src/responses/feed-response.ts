import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine ListFeedsResponse
 *
 * @apiSuccess {Object[]} data                         Array of feed items
 * @apiSuccess {Object}   data.post                    Post information
 * @apiSuccess {String}   data.post.uri                URI of the post
 * @apiSuccess {String}   data.post.cid                CID of the post
 * @apiSuccess {Object}   data.post.author             Author information
 * @apiSuccess {String}   data.post.author.did         Author's DID
 * @apiSuccess {String}   data.post.author.handle      Author's handle
 * @apiSuccess {String}   data.post.author.displayName Author's display name
 * @apiSuccess {String}   data.post.author.avatar      Author's avatar URL
 * @apiSuccess {Object}   data.post.author.viewer      Author's viewer
 * @apiSuccess {Object[]} data.post.author.labels      Author's labels
 * @apiSuccess {String}   data.post.author.createdAt   Author's createdAt
 * @apiSuccess {Object}   data.post.record             Post record
 * @apiSuccess {String}   data.post.record.$type       Record type
 * @apiSuccess {String}   data.post.record.text        Post content
 * @apiSuccess {String}   data.post.record.createdAt   Post creation time
 * @apiSuccess {Number}   data.post.replyCount         Number of replies
 * @apiSuccess {Number}   data.post.repostCount        Number of reposts
 * @apiSuccess {Number}   data.post.likeCount          Number of likes
 * @apiSuccess {Number}   data.post.quoteCount         Number of quotes
 * @apiSuccess {String}   data.post.indexedAt          Indexing timestamp
 * @apiSuccess {Object}   data.post.viewer             Post's viewer
 * @apiSuccess {Object[]} data.post.labels             Post's labels
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "post": {
 *            "uri": "at://did:plc:mockDid/app.bsky.feed.post/mockRkey",
 *            "cid": "mockCid",
 *            "author": {
 *              "did": "did:plc:mockDid",
 *              "handle": "example.bsky.social",
 *              "displayName": "",
 *              "avatar": "https://cdn.bsky.app/img/avatar/plain/did:plc:mockDid/mockCid@jpeg",
 *              "viewer": {
 *                "muted": false,
 *                "blockedBy": false
 *              },
 *              "labels": [],
 *              "createdAt": "2025-03-08T07:09:11.040Z"
 *            },
 *            "record": {
 *              "$type": "app.bsky.feed.post",
 *              "createdAt": "2025-03-16T08:20:22.993Z",
 *              "text": "Hello World!"
 *            },
 *            "replyCount": 0,
 *            "repostCount": 0,
 *            "likeCount": 0,
 *            "quoteCount": 0,
 *            "indexedAt": "2025-03-16T08:20:24.153Z",
 *            "viewer": {
 *              "threadMuted": false,
 *              "embeddingDisabled": false
 *            },
 *            "labels": []
 *          }
 *        }
 *      ]
 *    }
 */

export type ListFeedsResponse = Response<BasicResponse>;
