// logger.js
import { createLogger, format, transports } from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Always log to console
    ...(!isProduction
      ? [new transports.File({ filename: 'logs/combined.log' })]
      : []),
  ],
});

export default logger;
