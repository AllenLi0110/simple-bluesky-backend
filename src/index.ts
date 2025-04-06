import express, { Express } from 'express';

class APIService {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 8080;
    this.app.get('/', (_req, res) => {
      res.send('OK');
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}

export const server = new APIService();
server.start();
