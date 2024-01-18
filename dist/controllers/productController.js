"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const ProductService = __importStar(require("../services/productService"));
// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
// Get all products
const getAllProducts = async (_req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductById = getProductById;
// Update product by ID
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductService.updateProduct(req.params.productId, req.body);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.productId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map