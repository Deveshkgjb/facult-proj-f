import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['btech', 'faculty', 'admin', 'intern', 'mtech', 'phd', 'projectstaff'] 
  },
  status: { type: Boolean, default: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  number: { type: String, required: false }, // New field for phone/contact number
  lastLogin: { type: Date }
}, { timestamps: true });

// create indexes
userSchema.index({ email: 1 }); // Unique index already created by 'unique: true'
userSchema.index({ role: 1, status: 1 }); // Compound index for role/status queries
userSchema.index({ name: 'text' }); // Text index for name search
userSchema.index({ lastLogin: -1 }); // Descending index for recent logins
userSchema.index({ createdAt: -1 }); // For sorting by newest users
userSchema.index({ updatedAt: -1 }); // For sorting by recently modified users
userSchema.index({ number: 1 }); // Index for number lookups if needed

export const User = mongoose.model("User", userSchema);
