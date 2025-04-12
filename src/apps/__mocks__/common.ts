export const mockSignInput = {
  identifier: 'example.bsky.social',
  password: '**********',
};

export const mockSignOutput = {
  accessJwt: 'mockAccessJwt',
  refreshJwt: 'mockRefreshJwt',
  handle: 'mockHandle',
  did: 'mockDid',
  email: 'mock@example.com',
  emailConfirmed: true,
  emailAuthFactor: false,
  active: true,
  didDoc: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/multikey/v1',
      'https://w3id.org/security/suites/secp256k1-2019/v1',
    ],
    'id': 'mockDid',
    'alsoKnownAs': ['at://mock-handle.bsky.social'],
    'verificationMethod': [
      {
        id: 'mockDid#atproto',
        type: 'Multikey',
        controller: 'mockDid',
        publicKeyMultibase: 'mockPublicKey',
      },
    ],
    'service': [
      {
        id: '#atproto_pds',
        type: 'AtprotoPersonalDataServer',
        serviceEndpoint: 'https://mock.service.endpoint',
      },
    ],
  },
};
