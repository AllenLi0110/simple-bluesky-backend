import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import status from '../status';
import { AtpToken } from '@/definitions';

const [mainHandler] = status;

describe('Status', () => {
  it('Should return bad request if access token is missing', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;
    await mainHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { authenticated: false } });
    expect(mockNext).not.toHaveBeenCalled();
  });
  it('Should return authenticated false if token is invalid', async () => {
    const mockRequest = {
      cookies: { access_token: 'invalid_token' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;
    await mainHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { authenticated: false } });
    expect(mockNext).not.toHaveBeenCalled();
  });
  it('Should return authenticated true if token is valid', async () => {
    const payload: AtpToken = {
      scope: 'mock.scope',
      sub: 'did:plc:mockDid',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
      aud: 'did:web:mockAud',
    };
    const validToken = jwt.sign(payload, 'mock-secret');
    const mockRequest = {
      cookies: { access_token: validToken },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;
    await mainHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { authenticated: true, did: payload.sub },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
