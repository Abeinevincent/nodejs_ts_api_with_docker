"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import server from "../../../test_setup";
const index_1 = __importDefault(require("../../index"));
// You can either test with a real token like this:
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdmYWVkMDg0ZTQxYzE1MmU5NzMxOCIsInVzZXJuYW1lIjoidHQiLCJlbWFpbCI6InR0QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTUwODQyNSwiZXhwIjoxNzA1NTk0ODI1fQ.rlkUn6gvfaYqYPwS4QZr-M6_7H_4wDf8vXEbvyz5COA";
// Alternatively:
// const nonAdminToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdmYWVkMDg0ZTQxYzE1MmU5NzMxOCIsInVzZXJuYW1lIjoidHQiLCJlbWFpbCI6InR0QGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDU1MDc1NzQsImV4cCI6MTcwNTU5Mzk3NH0.HDX5oH2IL2WEngBmlc7LUpIusficdyHYwl_Z6rG0y1o";
// OR
// Write a function that simulates an actual login process and extract the token from there
// And then store it in a variable for use in various test cases e.g:
// Assuming you have admin credentials for testing
// const adminCredentials = {
//   email: "admin@example.com",
//   password: "adminpassword",
// };
// Assuming you have a function to generate an authentication token
// const getAuthToken = async () => {
//   const response = await supertest(server)
//     .post("/api/v1/users/login")
//     .send(adminCredentials);
//   return response.body.token;
// };
// Get the admin authentication token (inside an async function or code block)
// const authToken = await getAuthToken();
// ------------------> do the same for non admin user and store the token in
// its own variable
// Assuming you have a test product data
const testProduct = {
    title: "Test Product",
    description: "This is a test product",
    image: "test-image.jpg",
    category: "Test Category",
    quantity: "10",
    inStock: true,
};
describe("Product Routes", () => {
    // Test case: Should successfully create a new product with valid admin credentials
    it("should successfully create a new product with valid admin credentials", async () => {
        // Create a new product using the admin token
        const createResponse = await (0, supertest_1.default)(index_1.default)
            .post("/api/v1/products/create")
            .set("token", `Bearer ${adminToken}`)
            .send(testProduct);
        // Expectations
        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("title", "Test Product");
        // Add more expectations based on your product data
    }, 20000);
    // Test case: Should successfully get all products without authentication
    it("should successfully get all products without authentication", async () => {
        // Make a request to the endpoint without providing an authentication token
        const response = await (0, supertest_1.default)(index_1.default).get("/api/v1/products/all");
        // Expectations
        expect(response.status).toBe(200);
        // Add more expectations based on your implementation
    }, 20000);
    // Test case: Should successfully get a product by ID with a valid token
    it("should successfully get a product by ID with a valid token", async () => {
        // Assuming you have a product ID for testing
        const productId = "6593e048731070abb0939faf";
        // Make a request to the endpoint with a valid token and product ID
        const response = await (0, supertest_1.default)(index_1.default)
            .get(`/api/v1/products/${productId}`)
            .set("token", `Bearer ${adminToken}`);
        // Expectations
        expect(response.status).toBe(200);
        // Add more expectations based on your implementation
    }, 20000);
    // Test case: Should successfully update a product by ID with admin access
    it("should successfully update a product by ID with admin access", async () => {
        // Assuming you have a product ID for testing
        const productId = "6593e048731070abb0939faf";
        // Replace 'yourUpdatedProductData' with the data you want to update the product with
        const updatedProductData = {
            title: "Updated Product",
            description: "Updated Product Description",
            // Add more fields as needed
        };
        // Make a request to the endpoint with an admin token and product ID
        const response = await (0, supertest_1.default)(index_1.default)
            .put(`/api/v1/products/update/${productId}`)
            .set("token", `Bearer ${adminToken}`)
            .send(updatedProductData);
        // Expectations
        expect(response.status).toBe(200);
        // Add more expectations based on your implementation
    }, 20000);
    // Test case: Should successfully delete a product by ID with admin access
    it("should successfully delete a product by ID with admin access", async () => {
        // Assuming you have a product ID for testing
        const productId = "6593e0a5451f5e47ce363e00";
        // Make a request to the endpoint with an admin token and product ID
        const response = await (0, supertest_1.default)(index_1.default)
            .delete(`/api/v1/products/delete/${productId}`)
            .set("token", `Bearer ${adminToken}`);
        // Expectations
        expect(response.status).toBe(204);
        // Add more expectations based on your implementation
    }, 20000);
});
afterAll(() => {
    index_1.default.close();
});
//# sourceMappingURL=productRoutes.test.js.map