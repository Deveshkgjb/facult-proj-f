// src/logger.js
import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// In production, use /tmp for writable storage (Vercel allows this)
// In development, use ./logs
const logDir = isProduction ? '/tmp/logs' : path.join(process.cwd(), 'logs');

// Only try to create folder if not in production OR using /tmp
if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (err) {
    console.warn(`Could not create log directory at ${logDir}:`, err.message);
  }
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    ...(isProduction
      ? [new transports.File({ filename: path.join(logDir, 'combined.log') })]
      : [new transports.File({ filename: path.join(logDir, 'combined.log') })]),
  ],
});

export default logger;
