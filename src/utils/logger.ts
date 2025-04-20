import winston from 'winston';
import path from 'path';

const logDir =
  process.env.NODE_ENV === 'production' ? '/opt/app/logs' : path.join(process.cwd(), 'logs');

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'bluesky-backend' },
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, service }) => {
          return `${timestamp} [${service}] ${level}: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
    }),
  ],
});

export default logger;
