"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("User Model Tests", () => {
    let createdUser;
    beforeAll(async () => {
        // Set up: Establish the MongoDB connection before running tests
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not defined/set");
        }
        await mongoose_1.default.connect(process.env.MONGODB_URL);
    });
    afterAll(async () => {
        // Remove the created user
        await User_1.default.deleteOne({ username: "testuser" });
        // Teardown: Close the MongoDB connection after all tests have completed
        await mongoose_1.default.connection.close();
    });
    // Test Case: Create a new user
    it("should create a new user", async () => {
        const userData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            isAdmin: false,
            savedProducts: [],
        };
        createdUser = await User_1.default.create(userData);
        expect(createdUser.email).toBe(userData.email);
        expect(createdUser.username).toBe(userData.username);
        expect(createdUser.isAdmin).toBe(userData.isAdmin);
    }, 10000); // Increase timeout to 10 seconds
    // Test Case: Ensure email and username are unique
    it("should fail to create a user with duplicate email or username", async () => {
        const userData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            isAdmin: false,
            savedProducts: [],
        };
        try {
            // Attempt to create a user with the same email and username
            await User_1.default.create(userData);
            // If the above line doesn't throw an error, the test should fail
            expect(true).toBe(false);
        }
        catch (error) {
            // Expect a MongoDB duplicate key error (code 11000)
            expect(error.code).toBe(11000);
        }
    }, 10000); // Increase timeout to 10 seconds
    // Test Case: Get all users
    it("should get all users", async () => {
        // Fetch all users from the database
        const allUsers = await User_1.default.find();
        // Expectations
        const userWithoutTimestamps = {
            _id: createdUser._id,
            email: createdUser.email,
            username: createdUser.username,
            isAdmin: createdUser.isAdmin,
            savedProducts: createdUser.savedProducts,
        };
        expect(allUsers).toContainEqual(expect.objectContaining(userWithoutTimestamps));
    }, 20000);
    const removeMongoProps = (user) => {
        const { __v, _id, createdAt, updatedAt, ...cleanedUser } = user.toObject();
        return cleanedUser;
    };
    // Test Case: Get all users
    it("should get all users", async () => {
        const allUsers = await User_1.default.find();
        // If there is a created user, expect the array to contain an object
        // that partially matches the properties of the createdUser
        if (createdUser) {
            const cleanedCreatedUser = removeMongoProps(createdUser);
            expect(allUsers).toEqual(expect.arrayContaining([expect.objectContaining(cleanedCreatedUser)]));
        }
    }, 20000);
    // Test Case: Update an existing user
    it("should update an existing user", async () => {
        // Check if there is a created user to update
        if (createdUser) {
            // Define updated data
            const updatedUserData = {
                username: "testuser",
                isAdmin: true,
            };
            // Update the user and get the updated user
            const updatedUser = await User_1.default.findByIdAndUpdate(createdUser._id, updatedUserData, { new: true });
            // Expectations
            expect(updatedUser?.username).toBe(updatedUserData.username);
            expect(updatedUser?.isAdmin).toBe(updatedUserData.isAdmin);
        }
    }, 20000);
    // Test Case: Get user by ID
    it("should get user by ID", async () => {
        // Get the created user by ID
        const retrievedUser = await User_1.default.findById(createdUser._id);
        // Expectations
        expect(retrievedUser?.email).toBe(createdUser.email);
        expect(retrievedUser?.username).toBe(createdUser.username);
        // Add other properties that you want to compare
        // For example, if updatedAt is expected to be different, you can ignore it:
        // expect(retrievedUser?.updatedAt).toBeDefined();
    }, 20000);
    // Test Case: Delete an existing user
    it("should delete an existing user", async () => {
        // Delete the created user
        await User_1.default.findByIdAndDelete(createdUser._id);
        // Attempt to find the deleted user
        const deletedUser = await User_1.default.findById(createdUser._id);
        // Expectations
        expect(deletedUser).toBeNull();
    }, 20000);
});
//# sourceMappingURL=userModel.test.js.map