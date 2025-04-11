import { Response } from 'express';
import { BasicResponse } from '.';

/**
 * @apiDefine SignInResponse
 *
 * @apiSuccess {String}  accessJwt         The access JWT token.
 * @apiSuccess {String}  refreshJwt        The refresh JWT token.
 * @apiSuccess {String}  handle            The user's handle.
 * @apiSuccess {String}  did               The user's DID.
 * @apiSuccess {Object}  [didDoc]          The user's DID document.
 * @apiSuccess {String}  [email]           The user's email.
 * @apiSuccess {Boolean} [emailConfirmed]  Whether the email is confirmed.
 * @apiSuccess {Boolean} [emailAuthFactor] Whether email is used as auth factor.
 * @apiSuccess {Boolean} [active]          Whether the account is active.
 * @apiSuccess {String}  [status]          Account status if not active.
 *
 * @apiSuccessExample {json} Success-Response: HTTP/1.1 200 OK
 *      {
 *        "accessJwt": "mockAccessJwtToken",
 *        "refreshJwt": "mockRefreshJwtToken",
 *        "handle": "mockUserHandle",
 *        "did": "mockDid",
 *        "email": "mock@example.com",
 *        "emailConfirmed": true,
 *        "emailAuthFactor": false,
 *        "active": true,
 *        "didDoc": {
 *          "@context": [
 *            "https://www.w3.org/ns/did/v1",
 *            "https://w3id.org/security/multikey/v1",
 *            "https://w3id.org/security/suites/secp256k1-2019/v1"
 *          ],
 *          "id": "mockDid",
 *          "alsoKnownAs": [
 *            "at://mockUserHandle.bsky.social"
 *          ],
 *          "verificationMethod": [
 *            {
 *              "id": "mockDid#atproto",
 *              "type": "Multikey",
 *              "controller": "mockDid",
 *              "publicKeyMultibase": "mockPublicKey"
 *            }
 *          ],
 *          "service": [
 *            {
 *              "id": "#atproto_pds",
 *              "type": "AtprotoPersonalDataServer",
 *              "serviceEndpoint": "https://mock.service.endpoint"
 *            }
 *          ]
 *        }
 *      }
 */
export type SignInResponse = Response<BasicResponse>;
