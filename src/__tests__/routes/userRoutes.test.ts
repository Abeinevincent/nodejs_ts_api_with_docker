// userRoutes.test.ts
import request from "supertest";
// import server from "../../../test_setup";
import server from "../../index";
import User from "../../models/User";

// You can either test with a real token like this:
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdmYWVkMDg0ZTQxYzE1MmU5NzMxOCIsInVzZXJuYW1lIjoidHQiLCJlbWFpbCI6InR0QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTUwODQyNSwiZXhwIjoxNzA1NTk0ODI1fQ.rlkUn6gvfaYqYPwS4QZr-M6_7H_4wDf8vXEbvyz5COA";

// Alternatively:
const nonAdminToken = "YourNonAdminToken";

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

describe("User Routes", () => {
  beforeAll(async () => {});

  // Clean up after tests
  afterAll(async () => {
    // Remove the created user
    await User.deleteOne({
      username: "testuser",
    });

    // Clear all jest mocks
    jest.clearAllMocks();
    server.close();
  });

  // Test case for creating a new user
  // it("should create a new user", async () => {
  //   const response = await request(server)
  //     .post("/api/v1/users/create") // Update the route path accordingly
  //     .send({
  //       // Your user data for testing
  //       email: "admin@example.com",
  //       password: "adminpassword",
  //       username: "testuser",
  //       isAdmin: false,
  //       savedProducts: [],
  //     });

  //   // Expectations
  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("email", "admin@example.com");
  //   expect(response.body).toHaveProperty("username", "testuser");
  //   // Add more expectations based on your user data

  //   // Optionally, you can store the created user for future tests
  //   const createdUser = response.body;
  // }, 20000);

  // // Test case for logging in a user
  // it("should login a user and return a token", async () => {
  //   // Assuming you have a test user created previously
  //   const testUser = {
  //     email: "admin@example.com",
  //     password: "adminpassword",
  //   };

  //   const response = await request(server)
  //     .post("/api/v1/users/login") // Update the route path accordingly
  //     .send({
  //       email: testUser.email,
  //       password: testUser.password,
  //     });

  //   // Expectations
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("user");
  //   expect(response.body).toHaveProperty("token");
  //   // Add more expectations based on your login data

  //   // Optionally, you can store the token for future authenticated requests
  //   const authToken = response.body.token;
  // }, 20000);

  // // Assuming you have admin credentials for testing
  // const adminCredentials = {
  //   email: "admin@example.com",
  //   password: "adminpassword",
  // };

  // Assuming you have a function to generate an authentication token
  // const getAuthToken = async (credentials: object) => {
  //   const response = await supertest(server)
  //     .post("/api/v1/users/login")
  //     .send(credentials);
  //   return response.body.token;
  // };

  // Test case for getting all users (admin access)
  it("should get all users with admin access", async () => {
    // Assuming you have admin credentials for testing
    const adminCredentials = {
      email: "admin@example.com",
      password: "adminpassword",
    };

    // Log in as admin to get the admin token
    // const adminToken = await getAuthToken(adminCredentials);

    // Send a request to the route with the admin token
    const response = await request(server)
      .get("/api/v1/users/all")
      .set("token", `Bearer ${adminToken}`);

    // Expectations
    expect(response.status).toBe(200);
    // Add more expectations based on your user data

    // Optionally, you can store the users for further assertions
    const allUsers = response.body;
  }, 20000);

  // Test case for getting all users without admin access
  it("should return 403 Forbidden when accessing all users without admin access", async () => {
    // Assuming you have non-admin credentials for testing
    const nonAdminCredentials = {
      email: "nonadmin@example.com",
      password: "nonadminpassword",
    };

    // Log in as non-admin to get the non-admin token
    // const nonAdminToken = await getAuthToken(nonAdminCredentials);

    // Send a request to the route with the non-admin token
    const response = await request(server)
      .get("/api/v1/users/all")
      .set("token", `Bearer ${nonAdminToken}`);

    // Expectations
    expect(response.status).toBe(403);
    // Add more expectations based on how you handle non-admin access
  }, 20000);

  // Test case: Should successfully update a user with valid credentials (admin or account owner)
  it("should successfully update a user with valid credentials (admin or account owner)", async () => {
    // Assuming you have a test user created previously
    // If you dont have you can create one programattically like we did writing
    // Tests for create new user

    const testUser = {
      email: "testuser@example.com",
      password: "testuserpassword",
      username: "testuser",
    };

    // Update the user using the hardcoded token
    const updateResponse = await request(server)
      .put(`/api/v1/users/update/6593ca275db905747ea085aa`)
      .set("token", `Bearer ${adminToken}`)
      .send({
        // Your updated user data
        username: "updateduser",
      });

    // Expectations
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("username", "updateduser");
    // Add more expectations based on your updated user data
  }, 20000);

  // Test case: Should return 403 Forbidden when updating a user without valid credentials
  it("should return 403 Forbidden when updating a user without valid credentials", async () => {
    // Assuming you have a different user for testing
    const otherUserCredentials = {
      email: "otheruser@example.com",
      password: "otheruserpassword",
      username: "otheruser",
    };

    // Create a different user
    const createResponse = await request(server)
      .post("/api/v1/users/create")
      .send(otherUserCredentials);

    // Get the ID of the created user
    const otherUserId = createResponse.body._id;

    // Attempt to update the user without valid credentials (not admin or account owner)
    const updateResponse = await request(server)
      .put(`/api/v1/users/update/${otherUserId}`)
      .set("token", `Bearer ${nonAdminToken}`)
      .send({
        // Your updated user data
        username: "updateduser",
      });

    // Expectations
    expect(updateResponse.status).toBe(403);
    // Add more expectations based on how you handle non-authorized updates
  }, 20000);

  // Test case: Should successfully delete a user with valid credentials (admin or account owner)
  it("should successfully delete a user with valid credentials (admin or account owner)", async () => {
    // Assuming you have a test user created previously
    const testUser = {
      email: "testuser@example.com",
      password: "testuserpassword",
      username: "testuser",
    };

    // Create a test user
    const createResponse = await request(server)
      .post("/api/v1/users/create")
      .send(testUser);

    // Get the ID of the created user
    const userId = createResponse.body._id;

    // Log the ID to check if it's correct
    console.log("User ID:", userId);

    // Delete the user using the hardcoded token
    const deleteResponse = await request(server)
      .delete(`/api/v1/users/delete/${userId}`)
      .set("token", `Bearer ${adminToken}`);

    // Expectations
    expect(deleteResponse.status).toBe(204);
  }, 20000);
});
