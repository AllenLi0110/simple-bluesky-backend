import { AtpAgent } from '@atproto/api';
import { SignInInput, SignInOutput } from './contracts/authentication';

export default class AuthenticationRepository {
  private readonly agent: AtpAgent;

  constructor() {
    this.agent = new AtpAgent({
      service: 'https://bsky.social',
    });
  }

  public async signIn(input: SignInInput): Promise<SignInOutput> {
    try {
      const response = await this.agent.login({
        identifier: input.identifier,
        password: input.password,
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
