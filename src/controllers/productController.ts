import { Request, Response } from "express";
import * as ProductService from "../services/productService";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
export const getAllProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await ProductService.getProductById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedProduct = await ProductService.updateProduct(
      req.params.productId,
      req.body
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await ProductService.deleteProduct(req.params.productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
