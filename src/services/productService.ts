// Import necessary modules
import Product, { IProduct } from "../models/Product";

// Create a new product
export const createProduct = async (
  productInput: IProduct
): Promise<IProduct> => {
  try {
    const newProduct = await Product.create(productInput);
    return newProduct;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Get all products
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Error getting products: ${error.message}`);
  }
};

// Get product by ID
export const getProductById = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error(`Error getting product: ${error.message}`);
  }
};

// Update product by ID
export const updateProduct = async (
  productId: string,
  updatedProduct: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// Delete product by ID
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
