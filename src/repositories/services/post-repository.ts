import { Request } from 'express';
import AtpRepository from './atp-repository';
import { CreatePostInput, CreatePostOutput } from './contracts/posts';

export default class PostRepository extends AtpRepository {
  static async create(request: Request) {
    const atpRepository = await AtpRepository.resumeSession(request);
    return new PostRepository({ agent: atpRepository.getAgent() });
  }
  public async createPost(input: CreatePostInput): Promise<CreatePostOutput> {
    const { repo, rkey, validate, record, swapCommit } = input;
    const data = await this.agent.app.bsky.feed.post.create(
      {
        repo,
        rkey,
        validate,
        swapCommit,
      },
      record,
    );
    return data;
  }
}
