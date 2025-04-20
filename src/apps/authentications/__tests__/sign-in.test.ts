import { ComAtprotoServerCreateSession } from '@atproto/api';
import { ValidationError } from 'joi';
import signIn from '../sign-in';
import { mockSignInInput, mockSignInOutput } from '@/apps/__mocks__/common';
import { BadRequestError } from '@/exceptions';
import { AuthenticationRepository } from '@/repositories';
import RepositoryFactory from '@/repositories/repository-factory';
import QueueRepository from '@/repositories/services/queue-repository';
import { SignInRequest } from '@/requests/authentication-request';
import { SignInResponse } from '@/responses/authentication-response';

jest.mock('@/utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/queue-server', () => {
  const mockQueueService = {
    connect: jest.fn().mockResolvedValue(undefined),
    publishMessage: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(undefined),
    isConnected: true,
  };
  return { queueService: mockQueueService };
});

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockCreateJobs = jest.fn().mockResolvedValue(true);
const mockCreate = jest.fn().mockReturnValue({
  createJobs: mockCreateJobs,
});

jest.mock('@/repositories/repository-factory', () => {
  return jest.fn().mockImplementation(() => ({
    create: mockCreate,
  }));
});

const [bodyValidator, mainHandler] = signIn;

const createMockRequest = (body: any) =>
  ({
    body,
    ip: '127.0.0.1',
    headers: {
      'user-agent': 'test-user-agent',
    },
  }) as unknown as SignInRequest;

describe('SignIn Test', () => {
  let mockRepositoryFactory: InstanceType<typeof RepositoryFactory>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepositoryFactory = new RepositoryFactory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('With correct data expect success', async () => {
    const request = createMockRequest(mockSignInInput);
    const response = {} as SignInResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    await bodyValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('Test sign-in with correct data expect success', async () => {
    jest
      .spyOn(AuthenticationRepository.prototype, 'signIn')
      .mockResolvedValue(
        mockSignInOutput as unknown as ComAtprotoServerCreateSession.Response['data'],
      );

    const mockCookie = jest.fn();
    const request = {
      ...createMockRequest(mockSignInInput),
      repositoryFactory: mockRepositoryFactory,
    } as unknown as SignInRequest;
    const response = {
      cookie: mockCookie,
      json: jest.fn(),
    } as unknown as SignInResponse;
    const mockNext = jest.fn();

    await mainHandler(request, response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockCookie).toHaveBeenCalledWith(
      'access_token',
      mockSignInOutput.accessJwt,
      expect.objectContaining({ httpOnly: true }),
    );
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ data: mockSignInOutput });
    expect(mockCreate).toHaveBeenCalledWith(QueueRepository);
    expect(mockCreateJobs).toHaveBeenCalledWith({
      jobs: [
        expect.objectContaining({
          jobType: 'SendNotification',
          parameters: expect.any(Object),
        }),
      ],
    });
  });

  test('Test sign-in with incorrect data expect NotFoundError', async () => {
    jest
      .spyOn(AuthenticationRepository.prototype, 'signIn')
      .mockRejectedValue(new BadRequestError());
    const request = createMockRequest({
      identifier: 'wrongIdentifier',
      password: 'wrongPassword',
    });
    const response = {} as SignInResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestError));
  });
});
