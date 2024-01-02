import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../utils/jwtUtils";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const productRoutes = (router: express.Router) => {
  // Route for getting all products
  router.get("/products/all", getAllProducts);

  // Route for creating a new product (protected, only accessible by admin)
  router.post("/products/create", verifyTokenAndAdmin, createProduct);

  // Route for getting a product by ID
  router.get("/products/:productId", verifyToken, getProductById);

  // Route for updating a product by ID (protected, only accessible by admin)
  router.put("/products/update/:productId", verifyTokenAndAdmin, updateProduct);

  // Route for deleting a product by ID (protected, only accessible by admin)
  router.delete(
    "/products/delete/:productId",
    verifyTokenAndAdmin,
    deleteProduct
  );
};

export default productRoutes;
