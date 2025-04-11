import AuthenticationRepository from '../authentication-repository';
import { SignInInput } from '../contracts/authentication';
import { mockOutputSchema } from '@/repositories/__mocks__/common';

describe('AuthenticationRepository', () => {
  let authRepo: AuthenticationRepository;

  beforeEach(() => {
    authRepo = new AuthenticationRepository();
  });

  it('should sign in successfully and return SignInOutput', async () => {
    const input: SignInInput = { identifier: 'example.bsky.social', password: 'mockPassword' };
    (authRepo as any).agent.login = jest.fn().mockResolvedValue({ data: mockOutputSchema });
    const result = await authRepo.signIn(input);
    expect(result).toEqual(mockOutputSchema);
  });

  it('should throw an error on failed sign in', async () => {
    const input: SignInInput = { identifier: 'example.bsky.social', password: 'mockPassword' };
    (authRepo as any).agent.login = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    await expect(authRepo.signIn(input)).rejects.toThrow('Invalid credentials');
  });
});
