import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine SignInResponse
 *
 * @apiSuccess {String}  did               The user's DID.
 * @apiSuccess {Object}  [didDoc]          The user's DID document.
 * @apiSuccess {String}  handle            The user's handle.
 * @apiSuccess {String}  [email]           The user's email.
 * @apiSuccess {Boolean} [emailConfirmed]  Whether the email is confirmed.
 * @apiSuccess {Boolean} [emailAuthFactor] Whether email is used as auth factor.
 * @apiSuccess {String}  accessJwt         The access JWT token.
 * @apiSuccess {String}  refreshJwt        The refresh JWT token.
 * @apiSuccess {Boolean} [active]          Whether the account is active.
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *      {
 *        "data": {
 *          "did": "mockDid",
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
 *          "handle": "example.bsky.social",
 *          "email": "mock@example.com",
 *          "emailConfirmed": true,
 *          "emailAuthFactor": false,
 *          "accessJwt": "mockAccessJwtToken",
 *          "refreshJwt": "mockRefreshJwtToken",
 *          "active": true
 *        }
 *      }
 */
export type SignInResponse = Response<BasicResponse>;
