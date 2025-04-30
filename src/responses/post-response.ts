import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine CreatePostResponse
 *
 * @apiSuccess {Object} data                  The data of response.
 * @apiSuccess {String} data.uri              The URI of the post.
 * @apiSuccess {String} data.cid              The CID of the post.
 * @apiSuccess {Object} data.commit           Commit information.
 * @apiSuccess {String} data.commit.cid       The CID of the commit.
 * @apiSuccess {String} data.commit.rev       The revision of the commit.
 * @apiSuccess {String} data.validationStatus The validation status of the post.
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "uri": "at://did:plc:mockDid/app.bsky.feed.post/mockUri",
 *        "cid": "mockCid",
 *        "commit": {
            "cid": "mockCid",
            "rev": "mockRev"
          },
          "validationStatus": "valid"
 *      }
 *    }
 */
export type CreatePostResponse = Response<BasicResponse>;

/**
 * @apiDefine DeletePostResponse
 *
 * @apiSuccess {Object} data                  The data of response.
 * @apiSuccess {String} data.uri              The URI of the post.
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *    {
 *      "data": {}
 *    }
 */
export type DeletePostResponse = Response<BasicResponse>;
