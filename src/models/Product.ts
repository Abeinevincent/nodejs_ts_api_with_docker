// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for Product document
export interface IProduct extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  quantity: string;
  inStock: boolean;
}

// Create a schema for the Product model
const productSchema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: String, required: true },
    inStock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create and export the Product model
export default mongoose.model<IProduct>("Product", productSchema);
