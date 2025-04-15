import { Request, Response, NextFunction } from 'express';
import signOut from '../sign-out';
import { setCookies } from '@/helpers/set-cookies';

jest.mock('@/helpers/set-cookies');

const [mainHandler] = signOut;

describe('Sign Out', () => {
  it('Should call next with error on failure', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    (setCookies as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });
    await mainHandler(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });
  it('Should clear cookies and return success message', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;
    await mainHandler(mockRequest, mockResponse, mockNext);
    expect(setCookies).toHaveBeenCalledTimes(4);
    expect(setCookies).toHaveBeenCalledWith(mockResponse, 'access_token', '', { maxAge: 0 });
    expect(setCookies).toHaveBeenCalledWith(mockResponse, 'refresh_token', '', { maxAge: 0 });
    expect(setCookies).toHaveBeenCalledWith(mockResponse, 'did', '', { maxAge: 0 });
    expect(setCookies).toHaveBeenCalledWith(mockResponse, 'handle', '', { maxAge: 0 });
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { message: 'Successfully signed out' },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
