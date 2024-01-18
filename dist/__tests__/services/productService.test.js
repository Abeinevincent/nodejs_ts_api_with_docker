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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService = __importStar(require("../../services/productService"));
const Product_1 = __importDefault(require("../../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Mock the Product model
jest.mock("../../models/Product", () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));
// Mock the product data
const productId = "mockedProductId";
const mockProduct = {
    _id: productId,
    title: "Mocked Product",
    description: "A description for the mocked product",
    image: "mocked_image.jpg",
    category: "Mocked Category",
    quantity: "10",
    inStock: true,
};
// Use the toObject method to include additional properties
const mockProductWithMethods = {
    ...mockProduct,
    toObject: jest.fn(() => mockProduct),
};
// Mock the product retrieval by ID
Product_1.default.findById.mockResolvedValueOnce(mockProductWithMethods);
describe("Product Service Tests", () => {
    // Clean up after tests
    beforeAll(async () => {
        // Set up: Establish the MongoDB connection before running tests
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not defined/set");
        }
        await mongoose_1.default.connect(process.env.MONGODB_URL);
    });
    afterAll(async () => {
        // Teardown: Close the MongoDB connection after all tests have completed
        await mongoose_1.default.connection.close();
        // Clear all jest mocks
        jest.clearAllMocks();
    });
    // Test Case: Create a new product
    it("should create a new product", async () => {
        // Mock the product data
        const productData = {
            title: "Test Product",
            // Add other product properties based on your schema
        };
        // Mock the product creation
        Product_1.default.create.mockResolvedValueOnce({
            ...productData,
            _id: "mockedProductId", // Mocked product ID
        });
        // Create the product
        const createdProduct = await productService.createProduct(productData);
        // Expectations
        expect(createdProduct.title).toBe(productData.title);
        // You can add more expectations based on your schema and business logic
    }, 20000);
    // Test Case: Get product by ID
    it("should get product by ID", async () => {
        // Mock product data
        const productId = "mockedProductId";
        const mockProduct = {
            _id: productId,
            title: "Mocked Product",
            description: "A description for the mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        };
        // Mock the findById method of the Product model
        Product_1.default.findById.mockResolvedValueOnce(mockProduct);
        // Call the service
        const retrievedProduct = await productService.getProductById(productId);
        // Expectations
        expect(retrievedProduct).toEqual(expect.objectContaining({
            _id: mockProduct._id,
            title: mockProduct.title,
            description: mockProduct.description,
            image: mockProduct.image,
            category: mockProduct.category,
            quantity: mockProduct.quantity,
            inStock: mockProduct.inStock,
        }));
        expect(Product_1.default.findById).toHaveBeenCalledWith(productId);
    }, 20000);
    // Test Case: Update product by ID
    it("should update product by ID", async () => {
        // Mock product data
        const productId = "mockedProductId";
        const mockProduct = {
            _id: productId,
            title: "Mocked Product",
            description: "A description for the mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        };
        // Mock the findByIdAndUpdate method of the Product model
        Product_1.default.findByIdAndUpdate.mockResolvedValueOnce(mockProduct);
        // Mock updated product data
        const updatedProductData = {
            title: "Mocked Product", // update some fields
            quantity: "10",
        };
        // Call the service
        const updatedProduct = await productService.updateProduct(productId, updatedProductData);
        // Expectations
        expect(updatedProduct?._id).toBe(mockProduct._id);
        expect(updatedProduct?.title).toBe(updatedProductData.title);
        expect(updatedProduct?.quantity).toBe(updatedProductData.quantity);
        // Add similar expectations for other properties you want to compare
        expect(Product_1.default.findByIdAndUpdate).toHaveBeenCalledWith(productId, updatedProductData, { new: true });
    }, 20000);
    // Test Case: Delete product by ID
    it("should delete product by ID", async () => {
        // Mock product data
        const productId = "mockedProductId";
        const mockProduct = {
            _id: productId,
            title: "Mocked Product",
            description: "A description for the mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        };
        // Mock the findByIdAndDelete method of the Product model
        Product_1.default.findByIdAndDelete.mockResolvedValueOnce(mockProduct);
        // Call the service
        await productService.deleteProduct(productId);
        // Expectations
        expect(Product_1.default.findByIdAndDelete).toHaveBeenCalledWith(productId);
    }, 20000);
    // Test Case: Get all products
    it("should get all products", async () => {
        // Mock product data
        const mockProducts = [
            {
                _id: "product1",
                title: "Product 1",
                description: "Description for Product 1",
                image: "product1_image.jpg",
                category: "Category 1",
                quantity: "5",
                inStock: true,
            },
            {
                _id: "product2",
                title: "Product 2",
                description: "Description for Product 2",
                image: "product2_image.jpg",
                category: "Category 2",
                quantity: "10",
                inStock: false,
            },
        ];
        // Mock the find method of the Product model
        Product_1.default.find.mockResolvedValueOnce(mockProducts);
        // Call the service
        const retrievedProducts = await productService.getAllProducts();
        // Expectations
        expect(Product_1.default.find).toHaveBeenCalled();
        expect(retrievedProducts).toEqual(mockProducts);
    }, 20000);
});
//# sourceMappingURL=productService.test.js.map