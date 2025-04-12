import 'express';

declare module 'express' {
  export interface Request {
    cookies: {
      access_token?: string;
      refresh_token?: string;
      did?: string;
      handle?: string;
    };
  }
}
