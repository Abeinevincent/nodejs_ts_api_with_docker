"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
// Import necessary modules
const Product_1 = __importDefault(require("../models/Product"));
// Create a new product
const createProduct = async (productInput) => {
    try {
        const newProduct = await Product_1.default.create(productInput);
        return newProduct;
    }
    catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
    }
};
exports.createProduct = createProduct;
// Get all products
const getAllProducts = async () => {
    try {
        const products = await Product_1.default.find();
        return products;
    }
    catch (error) {
        throw new Error(`Error getting products: ${error.message}`);
    }
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (productId) => {
    try {
        const product = await Product_1.default.findById(productId);
        return product;
    }
    catch (error) {
        throw new Error(`Error getting product: ${error.message}`);
    }
};
exports.getProductById = getProductById;
// Update product by ID
const updateProduct = async (productId, updatedProduct) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(productId, updatedProduct, {
            new: true,
        });
        return product;
    }
    catch (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
};
exports.updateProduct = updateProduct;
// Delete product by ID
const deleteProduct = async (productId) => {
    try {
        await Product_1.default.findByIdAndDelete(productId);
    }
    catch (error) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productService.js.map