import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine SignInResponse
 *
 * @apiSuccess {Object}  data                   Data of the authentication.
 * @apiSuccess {String}  data.accessJwt         The access JWT token.
 * @apiSuccess {String}  data.refreshJwt        The refresh JWT token.
 * @apiSuccess {String}  data.handle            The user's handle.
 * @apiSuccess {String}  data.did               The user's DID.
 * @apiSuccess {Object}  [data.didDoc]          The user's DID document.
 * @apiSuccess {String}  [data.email]           The user's email.
 * @apiSuccess {Boolean} [data.emailConfirmed]  Whether the email is confirmed.
 * @apiSuccess {Boolean} [data.emailAuthFactor] Whether email is used as auth factor.
 * @apiSuccess {Boolean} [data.active]          Whether the account is active.
 * @apiSuccess {String}  [data.status]          Account status if not active.
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *      {
 *        "data": {
 *          "accessJwt": "eyJhbGciOiJIUzI1NiIs...",
 *          "refreshJwt": "eyJhbGciOiJIUzI1NiIs...",
 *          "handle": "user.bsky.social",
 *          "did": "did:plc:abcdef123456",
 *          "email": "user@example.com",
 *          "emailConfirmed": true,
 *          "active": true
 *        }
 *      }
 */
export type SignInResponse = Response<BasicResponse>;
