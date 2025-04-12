import { AtpAgent } from '@atproto/api';
import { Request } from 'express';

interface AtpRepositoryOptions {
  service?: string;
  agent?: AtpAgent;
}

export default class AtpRepository {
  static async resumeSession(request: Request, options?: AtpRepositoryOptions) {
    const accessJwt = request.cookies.access_token;
    const refreshJwt = request.cookies.refresh_token;
    const did = request.cookies.did;
    const handle = request.cookies.handle;

    if (!accessJwt || !refreshJwt || !did || !handle) {
      throw new Error('Missing session information in cookies');
    }

    const agent = new AtpAgent({
      service: options?.service || 'https://bsky.social',
    });

    await agent.resumeSession({
      accessJwt,
      refreshJwt,
      did,
      handle,
      active: true,
    });
    return new AtpRepository({ agent });
  }

  protected readonly agent: AtpAgent;

  constructor(option?: AtpRepositoryOptions) {
    if (option?.agent) {
      this.agent = option.agent;
    } else {
      const service = option?.service || 'https://bsky.social';
      this.agent = new AtpAgent({ service });
    }
  }

  getAgent() {
    return this.agent;
  }

  getSession() {
    return this.agent.session;
  }
}
