import { ComAtprotoServerCreateSession } from '@atproto/api';

export interface SignInInput {
  /**
   * The identifier of user
   */
  readonly identifier: string;
  /**
   * The password of user
   */
  readonly password: string;
}

export type SignInOutput = ComAtprotoServerCreateSession.Response['data'];
