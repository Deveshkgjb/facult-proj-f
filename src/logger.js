// logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

// Detect if running on Vercel (read-only filesystem except /tmp)
const isVercel = !!process.env.VERCEL;

let loggerTransports = [
  new transports.Console(), // Always log to console
];

if (!isVercel) {
  // Local environment → use 'logs' folder
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  loggerTransports.push(
    new transports.File({ filename: path.join(logDir, 'combined.log') })
  );
} else {
  // Production (Vercel) → use /tmp folder if you want file logs
  const logDir = '/tmp/logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  loggerTransports.push(
    new transports.File({ filename: path.join(logDir, 'combined.log') })
  );
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: loggerTransports,
});

export default logger;
