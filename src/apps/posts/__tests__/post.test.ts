import { ValidationError } from 'joi';
import post from '../post';
import { mockPostInput, mockPostOutput } from '@/apps/__mocks__/common';
import { PostRepository } from '@/repositories';
import { PostRequest } from '@/requests';
import { PostResponse } from '@/responses';

const [bodyValidator, mainHandler] = post;

describe('Post Test', () => {
  test('With correct data expect success', async () => {
    const request = {
      body: mockPostInput,
    } as unknown as PostRequest;
    const response = {} as PostResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    await bodyValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  it('Should create a post and return the data', async () => {
    jest.spyOn(PostRepository, 'create').mockResolvedValue({
      post: jest.fn().mockResolvedValue(mockPostOutput),
    } as unknown as PostRepository);
    const request = {
      body: mockPostInput,
    } as unknown as PostRequest;

    const response = {
      json: jest.fn(),
    } as unknown as PostResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      data: mockPostOutput,
    });
  });
});
