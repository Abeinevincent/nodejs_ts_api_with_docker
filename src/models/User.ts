// Import necessary modules
import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for User document
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  savedProducts: Types.ObjectId[];
}

// Create a schema for the User model
const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Create and export the User model
export default mongoose.model<IUser>("User", userSchema);
