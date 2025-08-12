import mongoose from "mongoose";
import logger from "../logger.js"; // ✅ Import your custom logger



const connectDB = async () => {
    try {
                
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        logger.info(`\n MongoDB connected !! `);
    } catch (error) {
        logger.error("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB