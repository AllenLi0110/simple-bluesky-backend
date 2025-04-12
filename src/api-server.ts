import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import errorHandler from './error-handler';
import { RepositoryFactory } from './repositories';
import authenticationsRouter from '@/apps/authentications';
import postRouter from '@/apps/posts';

dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      repositoryFactory: RepositoryFactory;
      user?: {
        did: string;
        handle: string;
        accessJwt: string;
        refreshJwt: string;
      };
    }
    export interface Response {}
    export interface Application {}
  }
}

const isDevelop = !!process.env.API_SERVICE_STAGE?.includes('.local');
class APIService {
  private app;
  private port = process.env.API_SERVICE_PORT ?? 8080;
  private rootPath: string = isDevelop ? '/api' : '';

  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: process.env.WEB_APP_DOMAIN || 'http://localhost:5173' || 'http://localhost:8080',
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.get('/', (_req, res) => {
      res.send('OK');
    });
    this.app.use((req, _res, next) => {
      const accessJwt = req.cookies.access_token;
      const refreshJwt = req.cookies.refresh_token;
      const did = req.cookies.did;
      const handle = req.cookies.handle;
      if (accessJwt && refreshJwt && did && handle) {
        req.user = { accessJwt, refreshJwt, did, handle };
      }
      next();
    });
  }

  public addRouters(routers: Router[]): void {
    for (const router of routers) {
      this.app.use(this.rootPath, router);
    }
  }

  public use(handlers: any[]) {
    for (const handler of handlers) {
      this.app.use(handler);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}

export const apiService = new APIService();

apiService.addRouters([authenticationsRouter, postRouter]);
apiService.use([errorHandler]);
