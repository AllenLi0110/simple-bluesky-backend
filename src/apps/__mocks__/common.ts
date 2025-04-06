export const mockSignInput = {
  identifier: 'example.bsky.social',
  password: '**********',
};

export const mockSignOutput = {
  accessJwt: 'mock-access-jwt',
  refreshJwt: 'mock-refresh-jwt',
  handle: 'mock-handle',
  did: 'mock-did',
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
    'id': 'mock-did',
    'alsoKnownAs': ['at://mock-handle.bsky.social'],
    'verificationMethod': [
      {
        id: 'mock-did#atproto',
        type: 'Multikey',
        controller: 'mock-did',
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
