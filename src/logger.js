// logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const isVercel = process.env.VERCEL === '1';

// Logger config
const loggerTransports = [
  new transports.Console(), // Always works in both local & Vercel
];

// Only write logs to file locally
if (!isVercel) {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir); // ✅ Allowed locally
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
