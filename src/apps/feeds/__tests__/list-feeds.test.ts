import { ValidationError } from 'joi';
import listFeeds from '../list-feeds';
import { mockListFeedsInput, mockListFeedsOutput } from '@/apps/__mocks__/common';
import { FeedRepository } from '@/repositories';
import { ListFeedsRequest } from '@/requests';
import { ListFeedsResponse } from '@/responses';

const [queryValidator, mainHandler] = listFeeds;

describe('List Feeds Test', () => {
  it('Should correct data expect success', async () => {
    const request = {
      query: mockListFeedsInput,
    } as unknown as ListFeedsRequest;
    const response = {} as ListFeedsResponse;
    const mockNext = jest.fn((error?: ValidationError | string) => {
      expect(error).toEqual(undefined);
    });
    queryValidator(request, response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  it('Should successfully list feeds and return data', async () => {
    jest.spyOn(FeedRepository, 'create').mockResolvedValue({
      listFeeds: jest.fn().mockResolvedValue(mockListFeedsOutput),
    } as unknown as FeedRepository);
    const request = {
      query: mockListFeedsInput,
    } as unknown as ListFeedsRequest;
    const response = {
      json: jest.fn(),
    } as unknown as ListFeedsResponse;
    const mockNext = jest.fn();
    await mainHandler(request, response, mockNext);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      data: mockListFeedsOutput,
    });
  });
});
