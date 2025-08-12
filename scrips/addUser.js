import mongoose from "mongoose";
import { User } from "../src/models/userSchema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Use .env MONGO_URI or fallback to hardcoded (not recommended for production)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://2022389166devesh:Devesh123@cluster1.hu59gfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Check if URI exists
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Add it in your .env file.");
  process.exit(1);
}

async function addUser() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2. Create a new user
    const user = new User({
      name: "John Doe",
      role: "admin", // must match enum in your schema
      email: "admin@gmail.com",
      password: "123456", // ⚠️ Hash this in production
      status: true,
      lastLogin: new Date(),
    });

    // 3. Save user
    await user.save();
    console.log("✅ User added successfully:", user.toJSON());

  } catch (error) {
    console.error("❌ Error adding user:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

addUser();
