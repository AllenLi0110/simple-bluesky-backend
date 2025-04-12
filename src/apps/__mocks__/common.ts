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

export const mockPostInput = {
  repo: 'mockRepo',
  collection: 'app.bsky.feed.post',
  rkey: 'mockRkey',
  validate: true,
  record: {
    $type: 'app.bsky.feed.post',
    text: 'This is a mock post text.',
    langs: ['en'],
    createdAt: '2025-04-11T17:05:51.782Z',
  },
};
export const mockPostOutput = {
  uri: 'at://did:plc:mockDid/app.bsky.feed.post/mockRkey',
  cid: 'mockCid',
  commit: {
    cid: 'mockCid',
    rev: 'mockRev',
  },
  validationStatus: 'valid',
};
