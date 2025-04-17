import { AppBskyFeedGetAuthorFeedFilter } from '@/definitions';

export const mockSignInInput = {
  identifier: 'example.bsky.social',
  password: '**********',
};
export const mockSignInOutput = {
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
  data: {
    uri: 'at://did:plc:mockDid/app.bsky.feed.post/mockRkey',
    cid: 'mockCid',
    commit: {
      cid: 'mockCid',
      rev: 'mockRev',
    },
    validationStatus: 'valid',
  },
};

export const mockListFeedsInput = {
  actor: 'mockDid',
  filter: AppBskyFeedGetAuthorFeedFilter.PostsAndAuthorThreads,
  cursor: 'mock-cursor',
  includePins: true,
  limit: 30,
};
export const mockListFeedsOutput = {
  data: [
    {
      post: {
        uri: 'at://did:plc:mockDid/app.bsky.feed.post/mockRkey',
        cid: 'mockCid',
        author: {
          did: 'did:plc:mockDid',
          handle: 'example.bsky.social',
          displayName: '',
          avatar: 'https://cdn.bsky.app/img/avatar/plain/did:plc:mockDid/mockCid@jpeg',
          viewer: {
            muted: false,
            blockedBy: false,
          },
          labels: [],
          createdAt: '2025-03-08T07:09:11.040Z',
        },
        record: {
          $type: 'app.bsky.feed.post',
          createdAt: '2025-03-16T08:20:22.993Z',
          text: 'Hello World!',
        },
        replyCount: 0,
        repostCount: 0,
        likeCount: 0,
        quoteCount: 0,
        indexedAt: '2025-03-16T08:20:24.153Z',
        viewer: {
          threadMuted: false,
          embeddingDisabled: false,
        },
        labels: [],
      },
    },
  ],
};
