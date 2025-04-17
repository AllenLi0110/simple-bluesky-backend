import { ValidationError } from 'joi';
import createPost from '../create-post';
import { mockPostInput, mockPostOutput } from '@/apps/__mocks__/common';
import { PostRepository } from '@/repositories';
import { CreatePostRequest } from '@/requests';
import { CreatePostResponse } from '@/responses';

const [bodyValidator, mainHandler] = createPost;

describe('Create Post Test', () => {
  test('With correct data expect success', async () => {
    const request = {
      body: mockPostInput,
    } as unknown as CreatePostRequest;
    const response = {} as CreatePostResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    await bodyValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  it('Should create a post and return the data', async () => {
    jest.spyOn(PostRepository, 'create').mockResolvedValue({
      createPost: jest.fn().mockResolvedValue(mockPostOutput),
    } as unknown as PostRepository);
    const request = {
      body: mockPostInput,
    } as unknown as CreatePostRequest;
    const response = {
      json: jest.fn(),
    } as unknown as CreatePostResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      data: mockPostOutput,
    });
  });
});
