import { CookieOptions, Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export function setCookies(
  res: Response,
  name: string,
  value: string,
  options: Partial<CookieOptions> = {},
) {
  res.cookie(name, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    ...options,
  });
}
