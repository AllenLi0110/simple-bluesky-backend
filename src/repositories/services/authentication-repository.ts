import AtpRepository from './atp-repository';
import { SignInInput, SignInOutput } from './contracts/authentication';

export default class AuthenticationRepository extends AtpRepository {
  public async signIn(input: SignInInput): Promise<SignInOutput> {
    try {
      const { data } = await this.agent.login({
        identifier: input.identifier,
        password: input.password,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
