import * as userService from "../../services/userService";
import * as passwordUtils from "../../utils/passwordUtils";
import * as jwtUtils from "../../utils/jwtUtils";
import User, { IUser } from "../../models/User";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as productModel from "../../models/Product"; // Import the Product model
dotenv.config();

// Mock the Product model
jest.mock("../../models/Product", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

// Mock the populateUser function
jest
  .spyOn(userService, "populateUser")
  .mockImplementation(async (user: IUser) => {
    // Mock the behavior of populateUser function
    return user; // You can replace this with your desired mock value
  });

describe("User Service Tests", () => {
  let createdUser: IUser;

  // Clean up after tests
  beforeAll(async () => {
    // Set up: Establish the MongoDB connection before running tests
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined/set");
    }

    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    // Remove the created user
    await User.deleteOne({ username: "testuser" });

    // Teardown: Close the MongoDB connection after all tests have completed
    await mongoose.connection.close();

    // Clear all jest mocks
    jest.clearAllMocks();
  });

  // Mock the hashPassword function
  jest
    .spyOn(passwordUtils, "hashPassword")
    .mockImplementation(async (password) => {
      // Mocked hash implementation
      return password + "_hashed";
    });
  // Mock the jwtUtils' generateToken function
  jest
    .spyOn(jwtUtils, "generateToken")
    .mockImplementation(() => "mocked_token");

  // Test Case: Create a new user
  it("should create a new user", async () => {
    const userData: Partial<IUser> = {
      email: "test2@example.com",
      username: "testuser2",
      password: "testpassword",
      isAdmin: false,
      savedProducts: [],
    };

    createdUser = await userService.createUser(userData as IUser);

    // Expectations
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.username).toBe(userData.username);
    expect(createdUser.isAdmin).toBe(userData.isAdmin);
    expect(passwordUtils.hashPassword).toHaveBeenCalledWith(userData.password);
  }, 30000);

  // Test Case: Login user
  it("should login a user and generate a token", async () => {
    // Mock user data for login
    const loginEmail = "test2@example.com";
    const loginPassword = "testpassword";

    // Mock the comparePassword function
    jest
      .spyOn(passwordUtils, "comparePassword")
      .mockImplementation(async (inputPassword, hashedPassword) => {
        return inputPassword === hashedPassword.replace("_hashed", "");
      });

    const { user, token } = await userService.loginUser(
      loginEmail,
      loginPassword
    );

    // Expectations
    expect(user.email).toBe(createdUser.email);
    expect(user.username).toBe(createdUser.username);
    expect(user.isAdmin).toBe(createdUser.isAdmin);
    expect(jwtUtils.generateToken).toHaveBeenCalledWith({
      id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
    expect(token).toBe("mocked_token");
  }, 20000);

  const removeMongoProps = (user: any) => {
    const { __v, _id, createdAt, updatedAt, ...cleanedUser } = user.toObject();
    return cleanedUser;
  };

  // Test Case: Get all users
  it("should get all users", async () => {
    // Fetch all users from the database
    const allUsers = await userService.getAllUsers();

    // If there is a created user, expect the array to contain an object
    // that partially matches the properties of the createdUser
    if (createdUser) {
      const cleanedCreatedUser = removeMongoProps(createdUser);

      expect(allUsers).toEqual(
        expect.arrayContaining([expect.objectContaining(cleanedCreatedUser)])
      );
    }
  }, 20000);

  // Test Case: Delete an existing user
  it("should delete an existing user", async () => {
    // Delete the created user
    await User.findByIdAndDelete(createdUser._id);

    // Attempt to find the deleted user
    const deletedUser = await User.findById(createdUser._id);

    // Expectations
    expect(deletedUser).toBeNull();
  }, 2000);
});
