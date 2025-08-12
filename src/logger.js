// logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logFilePath = path.join('logs', 'combined.log');

// Ensure logs folder exists
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Check and clear log file daily
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const dateTrackerPath = path.join('logs', 'last-log-date.txt');

// Compare with last log date
let lastLoggedDate = null;
if (fs.existsSync(dateTrackerPath)) {
  lastLoggedDate = fs.readFileSync(dateTrackerPath, 'utf-8').trim();
}

if (lastLoggedDate !== currentDate) {
  // New day: clear log file and update date tracker
  fs.writeFileSync(logFilePath, ''); // clears the log
  fs.writeFileSync(dateTrackerPath, currentDate);
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: logFilePath }),
    new transports.Console(),
  ],
});

export default logger;
