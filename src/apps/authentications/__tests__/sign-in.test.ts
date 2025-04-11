import { ComAtprotoServerCreateSession } from '@atproto/api';
import { ValidationError } from 'joi';
import signIn from '../sign-in';
import { mockSignInput, mockSignOutput } from '@/apps/__mocks__/common';
import { AuthenticationRepository } from '@/repositories';
import { SignInRequest } from '@/requests/authentication-request';
import { SignInResponse } from '@/responses/authentication-response';

const [bodyValidator, mainHandler] = signIn;

describe('SignIn Test', () => {
  test('With correct data expect success', async () => {
    const mockData = {
      identifier: mockSignInput.identifier,
      password: mockSignInput.password,
    };
    const request = {
      body: mockData,
    } as unknown as SignInRequest;
    const response = {} as SignInResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    await bodyValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  test('Test sign-in with correct data expect success', async () => {
    const mockData = {
      identifier: mockSignInput.identifier,
      password: mockSignInput.password,
    };

    jest
      .spyOn(AuthenticationRepository.prototype, 'signIn')
      .mockResolvedValue(
        mockSignOutput as unknown as ComAtprotoServerCreateSession.Response['data'],
      );

    const request = {
      body: mockData,
    } as unknown as SignInRequest;
    const response = {
      json: jest.fn(),
    } as unknown as SignInResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ data: mockSignOutput });
  });
});
