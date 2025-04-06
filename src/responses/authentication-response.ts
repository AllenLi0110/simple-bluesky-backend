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
 *          "accessJwt": "mockAccessJwtToken",
 *          "refreshJwt": "mockRefreshJwtToken",
 *          "handle": "mockUserHandle",
 *          "did": "mockDid",
 *          "email": "mock@example.com",
 *          "emailConfirmed": true,
 *          "emailAuthFactor": false,
 *          "active": true,
 *          "didDoc": {
 *            "@context": [
 *              "https://www.w3.org/ns/did/v1",
 *              "https://w3id.org/security/multikey/v1",
 *              "https://w3id.org/security/suites/secp256k1-2019/v1"
 *            ],
 *            "id": "mockDid",
 *            "alsoKnownAs": [
 *              "at://mockUserHandle.bsky.social"
 *            ],
 *            "verificationMethod": [
 *              {
 *                "id": "mockDid#atproto",
 *                "type": "Multikey",
 *                "controller": "mockDid",
 *                "publicKeyMultibase": "mockPublicKey"
 *              }
 *            ],
 *            "service": [
 *              {
 *                "id": "#atproto_pds",
 *                "type": "AtprotoPersonalDataServer",
 *                "serviceEndpoint": "https://mock.service.endpoint"
 *              }
 *            ]
 *          }
 *        },
 *        "headers": {
 *          "access-control-allow-origin": "*",
 *          "connection": "keep-alive",
 *          "content-encoding": "gzip",
 *          "content-type": "application/json; charset=utf-8",
 *          "date": "Sun, 06 Apr 2025 17:50:23 GMT",
 *          "etag": "W/\"mockEtag\"",
 *          "ratelimit-limit": "10",
 *          "ratelimit-remaining": "9",
 *          "ratelimit-reset": "mockResetTime",
 *          "x-powered-by": "Express"
 *        },
 *        "success": true
 *      }
 */
export type SignInResponse = Response<BasicResponse>;
