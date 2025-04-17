import AtpRepository from './atp-repository';
import { SignInInput, SignInOutput } from './contracts/authentications';

export default class AuthenticationRepository extends AtpRepository {
  public async signIn(input: SignInInput): Promise<SignInOutput> {
    const { data } = await this.agent.login({
      identifier: input.identifier,
      password: input.password,
    });
    return data;
  }
}
