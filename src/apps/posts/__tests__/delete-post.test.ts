import { ValidationError } from 'joi';
import deletePost from '../delete-post';
import { mockDeletePostInput, mockDeletePostOutput } from '@/apps/__mocks__/common';
import { PostRepository } from '@/repositories';
import { DeletePostRequest } from '@/requests';
import { DeletePostResponse } from '@/responses';

const [bodyValidator, mainHandler] = deletePost;

describe('Delete Post Test', () => {
  test('With correct data expect success', async () => {
    const request = {
      body: mockDeletePostInput,
    } as unknown as DeletePostRequest;
    const response = {} as DeletePostResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    await bodyValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  test('Should delete a post and return the data', async () => {
    jest.spyOn(PostRepository, 'create').mockResolvedValue({
      deletePost: jest.fn().mockResolvedValue(mockDeletePostOutput),
    } as unknown as PostRepository);
    const request = {
      body: mockDeletePostInput,
    } as unknown as DeletePostRequest;
    const response = {
      json: jest.fn(),
    } as unknown as DeletePostResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      data: mockDeletePostOutput,
    });
  });
});
