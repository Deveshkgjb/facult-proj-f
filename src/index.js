import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'; // use app, not httpServer
import logger from './logger.js';
import serverless from "serverless-http";

dotenv.config({
  path: './.env'
});

let isDBConnected = false;

async function init() {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
    logger.info("✅ MongoDB connected");
  }
}

// If running locally (not on Vercel), start normal server
if (process.env.NODE_ENV !== "production") {
  connectDB()
    .then(() => {
      app.listen(process.env.PORT || 8000, () => {
        logger.info(`⚙️ Server is running at port: ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      logger.error("❌ MONGO DB connection failed !!! ", err);
    });
}

// Export serverless handler for Vercel
const handler = serverless(app);

export default async function (req, res) {
  try {
    await init();
    return handler(req, res);
  } catch (err) {
    logger.error("❌ Serverless function error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
