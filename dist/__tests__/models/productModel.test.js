"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../../models/Product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("Product Model Tests", () => {
    let createdProduct;
    beforeAll(async () => {
        // Set up: Establish the MongoDB connection before running tests
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not defined/set");
        }
        await mongoose_1.default.connect(process.env.MONGODB_URL);
    });
    afterAll(async () => {
        // Remove the created product
        // await User.deleteOne({ username: "testuser" });
        // Teardown: Close the MongoDB connection after all tests have completed
        await mongoose_1.default.connection.close();
    });
    // Test Case: Create a new product
    it("should create a new product", async () => {
        const productData = {
            title: "Test Product",
            description: "Product description",
            image: "https://testimage.png",
            category: "test category",
            quantity: "20 kgs",
            // You can add other fields
        };
        createdProduct = await Product_1.default.create(productData);
        expect(createdProduct.title).toBe(productData.title);
        expect(createdProduct.description).toBe(productData.description);
        // Add other expectations for additional fields
    }, 10000); // Increase timeout to 10 seconds
    // Test Case: Fail to create a product with missing required fields
    it("should fail to create a product with missing required fields", async () => {
        const productData = {
        // Omitting required fields
        };
        try {
            // Attempt to create a product with missing required fields
            await Product_1.default.create(productData);
            // If the above line doesn't throw an error, the test should fail
            expect(true).toBe(false);
        }
        catch (error) {
            // Expect a MongoDB validation error
            expect(error.name).toBe("ValidationError");
        }
    }, 10000); // Increase timeout to 10 seconds
    // Test Case: Get all products
    it("should get all products", async () => {
        // Fetch all products from the database
        const allProducts = await Product_1.default.find();
        // Expectations
        const productWithoutTimestamps = {
            //   _id: createdProduct._id,
            title: createdProduct.title,
            description: createdProduct.description,
            // Add other necessary fields
        };
        expect(allProducts).toContainEqual(expect.objectContaining(productWithoutTimestamps));
    });
    const removeMongoProps = (product) => {
        const { __v, _id, createdAt, updatedAt, ...cleanedProduct } = product.toObject();
        return cleanedProduct;
    };
    // Test Case: Get all products
    it("should get all products", async () => {
        const allProducts = await Product_1.default.find();
        // If there is a created product, expect the array to contain an object
        // that partially matches the properties of the createdProduct
        if (createdProduct) {
            const cleanedCreatedProduct = removeMongoProps(createdProduct);
            expect(allProducts).toEqual(expect.arrayContaining([expect.objectContaining(cleanedCreatedProduct)]));
        }
    });
    // Test Case: Update an existing product
    it("should update an existing product", async () => {
        // Check if there is a created product to update
        if (createdProduct) {
            // Define updated data
            const updatedProductData = {
                title: "Test Product", // replace hre with your updated title
                // Update other necessary fields
            };
            // Update the product and get the updated product
            const updatedProduct = await Product_1.default.findByIdAndUpdate(createdProduct._id, updatedProductData, { new: true });
            // Expectations
            expect(updatedProduct?.title).toBe(updatedProductData.title);
            // Add expectations for other updated fields
        }
    });
    // Test Case: Get product by ID
    it("should get product by ID", async () => {
        // Get the created product by ID
        const retrievedProduct = await Product_1.default.findById(createdProduct._id);
        // Expectations
        expect(retrievedProduct?.title).toBe(createdProduct.title);
        // Add other expectations for properties you want to compare
    });
    // Test Case: Delete an existing product
    it("should delete an existing product", async () => {
        // Delete the created product
        await Product_1.default.findByIdAndDelete(createdProduct._id);
        // Attempt to find the deleted product
        const deletedProduct = await Product_1.default.findById(createdProduct._id);
        // Expectations
        expect(deletedProduct).toBeNull();
    });
});
//# sourceMappingURL=productModel.test.js.map