import { Request } from 'express';
import AtpRepository from './atp-repository';
import { PostInput, PostOutput } from './contracts/post';

export default class PostRepository extends AtpRepository {
  static async create(request: Request) {
    const atpRepository = await AtpRepository.resumeSession(request);
    return new PostRepository({ agent: atpRepository.getAgent() });
  }
  public async post(input: PostInput): Promise<PostOutput> {
    try {
      const { repo, rkey, validate, record, swapCommit } = input;
      const params = {
        repo,
        rkey,
        validate,
        swapCommit,
      };
      const data = await this.agent.app.bsky.feed.post.create(params, record);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
