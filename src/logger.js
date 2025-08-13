// logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

// Detect if running on Vercel (read-only filesystem except /tmp)
const isVercel = !!process.env.VERCEL;

// Choose log directory
const logDir = isVercel ? '/tmp/logs' : 'logs';
const logFilePath = path.join(logDir, 'combined.log');
const dateTrackerPath = path.join(logDir, 'last-log-date.txt');

// Ensure logs folder exists (if writable)
if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (err) {
    console.error('Log directory creation failed:', err.message);
  }
}

// Daily log reset (only if writable)
try {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  let lastLoggedDate = null;

  if (fs.existsSync(dateTrackerPath)) {
    lastLoggedDate = fs.readFileSync(dateTrackerPath, 'utf-8').trim();
  }

  if (lastLoggedDate !== currentDate) {
    fs.writeFileSync(logFilePath, ''); // clears the log
    fs.writeFileSync(dateTrackerPath, currentDate);
  }
} catch (err) {
  console.warn('Skipping daily log reset (read-only filesystem)');
}

// Winston logger setup
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Only add file logging if writable
    ...(fs.existsSync(logDir)
      ? [new transports.File({ filename: logFilePath })]
      : []),
    new transports.Console(),
  ],
});

export default logger;
