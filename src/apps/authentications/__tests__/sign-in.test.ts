import { ComAtprotoServerCreateSession } from '@atproto/api';
import { ValidationError } from 'joi';
import signIn from '../sign-in';
import { mockSignInInput, mockSignInOutput } from '@/apps/__mocks__/common';
import { BadRequestError } from '@/exceptions';
import { AuthenticationRepository } from '@/repositories';
import { SignInRequest } from '@/requests/authentication-request';
import { SignInResponse } from '@/responses/authentication-response';

const [bodyValidator, mainHandler] = signIn;

describe('SignIn Test', () => {
  test('With correct data expect success', async () => {
    const request = {
      body: mockSignInInput,
    } as unknown as SignInRequest;
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
      body: mockSignInInput,
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
  });
  test('Test sign-in with incorrect data expect NotFoundError', async () => {
    jest
      .spyOn(AuthenticationRepository.prototype, 'signIn')
      .mockRejectedValue(new BadRequestError()); // Simulate NotFoundError
    const request = {
      body: {
        identifier: 'wrongIdentifier',
        password: 'wrongPassword',
      },
    } as unknown as SignInRequest;
    const response = {} as SignInResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestError));
  });
});
