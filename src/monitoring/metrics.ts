import express from 'express';
import client from 'prom-client';

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

export const metricsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const end = httpRequestDuration.startTimer();

  res.on('finish', () => {
    const method = req.method;
    const path = req.route ? req.route.path : req.path;
    const status = res.statusCode.toString();

    httpRequestCounter.inc({ method, path, status });
    end({ method, path, status });
  });

  next();
};

export const setupMetricsRoute = (app: express.Application) => {
  app.get('/metrics', async (_req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });
};
