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
const userService = __importStar(require("../../services/userService"));
const passwordUtils = __importStar(require("../../utils/passwordUtils"));
const jwtUtils = __importStar(require("../../utils/jwtUtils"));
const User_1 = __importDefault(require("../../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    .mockImplementation(async (user) => {
    // Mock the behavior of populateUser function
    return user; // You can replace this with your desired mock value
});
describe("User Service Tests", () => {
    let createdUser;
    // Clean up after tests
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
        const userData = {
            email: "test2@example.com",
            username: "testuser2",
            password: "testpassword",
            isAdmin: false,
            savedProducts: [],
        };
        createdUser = await userService.createUser(userData);
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
        const { user, token } = await userService.loginUser(loginEmail, loginPassword);
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
    const removeMongoProps = (user) => {
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
            expect(allUsers).toEqual(expect.arrayContaining([expect.objectContaining(cleanedCreatedUser)]));
        }
    }, 20000);
    // Test Case: Delete an existing user
    it("should delete an existing user", async () => {
        // Delete the created user
        await User_1.default.findByIdAndDelete(createdUser._id);
        // Attempt to find the deleted user
        const deletedUser = await User_1.default.findById(createdUser._id);
        // Expectations
        expect(deletedUser).toBeNull();
    }, 2000);
});
//# sourceMappingURL=userService.test.js.map