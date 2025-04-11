import { SignInOutput } from '../services/contracts/authentication';

export const mockOutputSchema: SignInOutput = {
  did: 'did:plc:mockId',
  didDoc: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/multikey/v1',
      'https://w3id.org/security/suites/secp256k1-2019/v1',
    ],
    'id': 'did:plc:mockId',
    'alsoKnownAs': ['at://example.bsky.social'],
    'verificationMethod': [
      {
        id: 'did:plc:mockId#atproto',
        type: 'mockType',
        controller: 'did:plc:mockId',
        publicKeyMultibase: 'mockPublicKeyMultibase',
      },
    ],
    'service': [
      {
        id: '#atproto_pds',
        type: 'AtprotoPersonalDataServer',
        serviceEndpoint: 'https://mazegill.us-west.host.bsky.network',
      },
    ],
  },
  handle: 'example.bsky.social',
  email: 'example@gmail.com',
  emailConfirmed: true,
  emailAuthFactor: false,
  accessJwt: 'eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NksifQ.mockAccessJwt',
  refreshJwt: 'eyJ0eXAiOiJyZWZyZXNoK2p3dCIsImFsZyI6IkVTMjU2SyJ9.mockRefreshJwt',
  active: true,
};
