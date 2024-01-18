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
const ProductController = __importStar(require("../../controllers/productController"));
const ProductService = __importStar(require("../../services/productService"));
// Mock the ProductService
jest.mock("../../services/productService");
describe("Product Controller Tests", () => {
    // Test Case: Create a new product
    it("should create a new product", async () => {
        // Mock the request and response objects
        const mockRequest = {
            body: {
                title: "Mocked Product",
                description: "A description for the mocked product",
                image: "mocked_image.jpg",
                category: "Mocked Category",
                quantity: "10",
                inStock: true,
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the createProduct function of the ProductService
        ProductService.createProduct.mockResolvedValueOnce({
            _id: "mockedProductId",
            title: "Mocked Product",
            description: "A description for the mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        });
        // Call the createProduct controller
        await ProductController.createProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.createProduct).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            _id: "mockedProductId",
            title: "Mocked Product",
            description: "A description for the mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 201 status
    });
    // Test Case: Get all products - Success
    it("should get all products successfully", async () => {
        // Mock the request and response objects
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the getAllProducts function of the ProductService
        ProductService.getAllProducts.mockResolvedValueOnce([
            {
                _id: "mockedProductId1",
                title: "Mocked Product 1",
                description: "Description for mocked product 1",
                image: "image1.jpg",
                category: "Category 1",
                quantity: "5",
                inStock: true,
            },
            {
                _id: "mockedProductId2",
                title: "Mocked Product 2",
                description: "Description for mocked product 2",
                image: "image2.jpg",
                category: "Category 2",
                quantity: "10",
                inStock: false,
            },
        ]);
        // Call the getAllProducts controller
        await ProductController.getAllProducts(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.getAllProducts).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            {
                _id: "mockedProductId1",
                title: "Mocked Product 1",
                description: "Description for mocked product 1",
                image: "image1.jpg",
                category: "Category 1",
                quantity: "5",
                inStock: true,
            },
            {
                _id: "mockedProductId2",
                title: "Mocked Product 2",
                description: "Description for mocked product 2",
                image: "image2.jpg",
                category: "Category 2",
                quantity: "10",
                inStock: false,
            },
        ]);
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 200 status
    });
    // Test Case: Get all products - Error
    it("should handle errors when getting all products", async () => {
        // Mock the request and response objects
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the getAllProducts function of the ProductService to throw an error
        ProductService.getAllProducts.mockRejectedValueOnce(new Error("Error getting products"));
        // Call the getAllProducts controller
        await ProductController.getAllProducts(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.getAllProducts).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error getting products",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 500 status
    });
    // Test Case: Get product by ID - Success
    it("should get product by ID successfully", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the getProductById function of the ProductService
        ProductService.getProductById.mockResolvedValueOnce({
            _id: "mockedProductId",
            title: "Mocked Product",
            description: "Description for mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        });
        // Call the getProductById controller
        await ProductController.getProductById(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.getProductById).toHaveBeenCalledWith("mockedProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            _id: "mockedProductId",
            title: "Mocked Product",
            description: "Description for mocked product",
            image: "mocked_image.jpg",
            category: "Mocked Category",
            quantity: "10",
            inStock: true,
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 200 status
    });
    // Test Case: Get product by ID - Not Found
    it("should handle product not found when getting by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "nonExistentProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the getProductById function of the ProductService to return null
        ProductService.getProductById.mockResolvedValueOnce(null);
        // Call the getProductById controller
        await ProductController.getProductById(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.getProductById).toHaveBeenCalledWith("nonExistentProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Product not found",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 404 status
    });
    // Test Case: Get product by ID - Error
    it("should handle errors when getting product by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the getProductById function of the ProductService to throw an error
        ProductService.getProductById.mockRejectedValueOnce(new Error("Error getting product by ID"));
        // Call the getProductById controller
        await ProductController.getProductById(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.getProductById).toHaveBeenCalledWith("mockedProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error getting product by ID",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 500 status
    });
    // Test Case: Update product by ID - Success
    it("should update product by ID successfully", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
            body: {
                title: "Updated Product",
                description: "Updated description",
                image: "updated_image.jpg",
                category: "Updated Category",
                quantity: "15",
                inStock: false,
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the updateProduct function of the ProductService
        ProductService.updateProduct.mockResolvedValueOnce({
            _id: "mockedProductId",
            title: "Updated Product",
            description: "Updated description",
            image: "updated_image.jpg",
            category: "Updated Category",
            quantity: "15",
            inStock: false,
        });
        // Call the updateProduct controller
        await ProductController.updateProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.updateProduct).toHaveBeenCalledWith("mockedProductId", mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            _id: "mockedProductId",
            title: "Updated Product",
            description: "Updated description",
            image: "updated_image.jpg",
            category: "Updated Category",
            quantity: "15",
            inStock: false,
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 200 status
    });
    // Test Case: Update product by ID - Not Found
    it("should handle product not found when updating by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "nonExistentProductId" },
            body: {
                title: "Updated Product",
                description: "Updated description",
                image: "updated_image.jpg",
                category: "Updated Category",
                quantity: "15",
                inStock: false,
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the updateProduct function of the ProductService to return null
        ProductService.updateProduct.mockResolvedValueOnce(null);
        // Call the updateProduct controller
        await ProductController.updateProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.updateProduct).toHaveBeenCalledWith("nonExistentProductId", mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Product not found",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 404 status
    });
    // Test Case: Update product by ID - Error
    it("should handle errors when updating product by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
            body: {
                title: "Updated Product",
                description: "Updated description",
                image: "updated_image.jpg",
                category: "Updated Category",
                quantity: "15",
                inStock: false,
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the updateProduct function of the ProductService to throw an error
        ProductService.updateProduct.mockRejectedValueOnce(new Error("Error updating product by ID"));
        // Call the updateProduct controller
        await ProductController.updateProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.updateProduct).toHaveBeenCalledWith("mockedProductId", mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error updating product by ID",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 500 status
    });
    // Test Case: Delete product by ID - Success
    it("should delete product by ID successfully", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        // Call the deleteProduct function of the ProductService
        await ProductController.deleteProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.deleteProduct).toHaveBeenCalledWith("mockedProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });
    // Test Case: Delete product by ID - Not Found
    it("should handle product not found when deleting by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "nonExistentProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the deleteProduct function of the ProductService to return null
        ProductService.deleteProduct.mockResolvedValueOnce(null);
        // Call the deleteProduct controller
        await ProductController.deleteProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.deleteProduct).toHaveBeenCalledWith("nonExistentProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled(); // Ensure json is not called for a 204 status
    });
    // Test Case: Delete product by ID - Error
    it("should handle errors when deleting product by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: { productId: "mockedProductId" },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the deleteProduct function of the ProductService to throw an error
        ProductService.deleteProduct.mockRejectedValueOnce(new Error("Error deleting product by ID"));
        // Call the deleteProduct controller
        await ProductController.deleteProduct(mockRequest, mockResponse);
        // Expectations
        expect(ProductService.deleteProduct).toHaveBeenCalledWith("mockedProductId");
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error deleting product by ID",
        });
        expect(mockResponse.send).not.toHaveBeenCalled(); // Ensure send is not called for a 500 status
    });
});
//# sourceMappingURL=productController.test.js.map