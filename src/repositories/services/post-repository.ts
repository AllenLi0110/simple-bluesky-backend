import { Request } from 'express';
import AtpRepository from './atp-repository';
import {
  CreatePostInput,
  CreatePostOutput,
  DeletePostInput,
  DeletePostOutput,
} from './contracts/posts';

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
  public async deletePost(input: DeletePostInput): Promise<DeletePostOutput> {
    const { repo, rkey } = input;
    const data = (await this.agent.app.bsky.feed.post.delete({
      repo,
      rkey,
    })) as unknown as DeletePostOutput;
    return data || {};
  }
}
