// logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const isVercel = !!process.env.VERCEL; // Detect deployment environment

let loggerTransports = [
  new transports.Console(), // Always log to console
];

if (!isVercel) {
  // Local machine → log to file
  const logDir = 'logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logFilePath = path.join(logDir, 'combined.log');
  loggerTransports.push(new transports.File({ filename: logFilePath }));
} else {
  // On Vercel → use /tmp for file logging (optional)
  const logDir = '/tmp/logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logFilePath = path.join(logDir, 'combined.log');
  loggerTransports.push(new transports.File({ filename: logFilePath }));
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
