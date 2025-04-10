import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import errorHandler from './error-handler';
import authenticationsRouter from '@/apps/authentications';

dotenv.config();

const isDevelop = !!process.env.API_SERVICE_STAGE?.includes('.local');
class APIService {
  private app;
  private port = process.env.API_SERVICE_PORT ?? 8080;
  private rootPath: string = isDevelop ? '/api' : '';

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.get('/', (_req, res) => {
      res.send('OK');
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

apiService.addRouters([authenticationsRouter]);
apiService.use([errorHandler]);
