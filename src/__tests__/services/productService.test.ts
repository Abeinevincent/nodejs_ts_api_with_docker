import * as productService from "../../services/productService";
import Product, { IProduct } from "../../models/Product";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
const mockProduct: IProduct = {
  _id: productId,
  title: "Mocked Product",
  description: "A description for the mocked product",
  image: "mocked_image.jpg",
  category: "Mocked Category",
  quantity: "10",
  inStock: true,
} as IProduct;

// Use the toObject method to include additional properties
const mockProductWithMethods = {
  ...mockProduct,
  toObject: jest.fn(() => mockProduct),
};

// Mock the product retrieval by ID
(Product.findById as jest.Mock).mockResolvedValueOnce(mockProductWithMethods);

describe("Product Service Tests", () => {
  // Clean up after tests
  beforeAll(async () => {
    // Set up: Establish the MongoDB connection before running tests
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined/set");
    }

    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    // Teardown: Close the MongoDB connection after all tests have completed
    await mongoose.connection.close();

    // Clear all jest mocks
    jest.clearAllMocks();
  });

  // Test Case: Create a new product
  it("should create a new product", async () => {
    // Mock the product data
    const productData: Partial<IProduct> = {
      title: "Test Product",
      // Add other product properties based on your schema
    };

    // Mock the product creation
    (Product.create as jest.Mock).mockResolvedValueOnce({
      ...productData,
      _id: "mockedProductId", // Mocked product ID
    });

    // Create the product
    const createdProduct = await productService.createProduct(
      productData as IProduct
    );

    // Expectations
    expect(createdProduct.title).toBe(productData.title);
    // You can add more expectations based on your schema and business logic
  }, 20000);

  // Test Case: Get product by ID
  it("should get product by ID", async () => {
    // Mock product data
    const productId = "mockedProductId";
    const mockProduct: IProduct = {
      _id: productId,
      title: "Mocked Product",
      description: "A description for the mocked product",
      image: "mocked_image.jpg",
      category: "Mocked Category",
      quantity: "10",
      inStock: true,
    } as IProduct;

    // Mock the findById method of the Product model
    (Product.findById as jest.Mock).mockResolvedValueOnce(mockProduct);

    // Call the service
    const retrievedProduct = await productService.getProductById(productId);

    // Expectations
    expect(retrievedProduct).toEqual(
      expect.objectContaining({
        _id: mockProduct._id,
        title: mockProduct.title,
        description: mockProduct.description,
        image: mockProduct.image,
        category: mockProduct.category,
        quantity: mockProduct.quantity,
        inStock: mockProduct.inStock,
      })
    );
    expect(Product.findById).toHaveBeenCalledWith(productId);
  }, 20000);

  // Test Case: Update product by ID
  it("should update product by ID", async () => {
    // Mock product data
    const productId = "mockedProductId";
    const mockProduct: IProduct = {
      _id: productId,
      title: "Mocked Product",
      description: "A description for the mocked product",
      image: "mocked_image.jpg",
      category: "Mocked Category",
      quantity: "10",
      inStock: true,
    } as IProduct;

    // Mock the findByIdAndUpdate method of the Product model
    (Product.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockProduct);

    // Mock updated product data
    const updatedProductData: Partial<IProduct> = {
      title: "Mocked Product", // update some fields
      quantity: "10",
    };

    // Call the service
    const updatedProduct = await productService.updateProduct(
      productId,
      updatedProductData
    );

    // Expectations
    expect(updatedProduct?._id).toBe(mockProduct._id);
    expect(updatedProduct?.title).toBe(updatedProductData.title);
    expect(updatedProduct?.quantity).toBe(updatedProductData.quantity);
    // Add similar expectations for other properties you want to compare

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProductData,
      { new: true }
    );
  }, 20000);

  // Test Case: Delete product by ID
  it("should delete product by ID", async () => {
    // Mock product data
    const productId = "mockedProductId";
    const mockProduct: IProduct = {
      _id: productId,
      title: "Mocked Product",
      description: "A description for the mocked product",
      image: "mocked_image.jpg",
      category: "Mocked Category",
      quantity: "10",
      inStock: true,
    } as IProduct;

    // Mock the findByIdAndDelete method of the Product model
    (Product.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockProduct);

    // Call the service
    await productService.deleteProduct(productId);

    // Expectations
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
  }, 20000);

  // Test Case: Get all products
  it("should get all products", async () => {
    // Mock product data
    const mockProducts: IProduct[] = [
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
    ] as IProduct[];

    // Mock the find method of the Product model
    (Product.find as jest.Mock).mockResolvedValueOnce(mockProducts);

    // Call the service
    const retrievedProducts = await productService.getAllProducts();

    // Expectations
    expect(Product.find).toHaveBeenCalled();
    expect(retrievedProducts).toEqual(mockProducts);
  }, 20000);
});
