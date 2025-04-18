import { Request } from 'express';
import AtpRepository from './atp-repository';
import { ListFeedsInput, ListFeedsOutput } from './contracts/feeds';

export default class FeedRepository extends AtpRepository {
  static async create(request: Request) {
    const atpRepository = await AtpRepository.resumeSession(request);
    return new FeedRepository({ agent: atpRepository.getAgent() });
  }
  public async listFeeds(input: ListFeedsInput): Promise<ListFeedsOutput> {
    const { actor, limit, cursor, filter, includePins } = input;
    const data = await this.agent.app.bsky.feed.getAuthorFeed({
      actor,
      limit,
      cursor,
      filter,
      includePins,
    });
    return data.data;
  }
}
