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
const UserController = __importStar(require("../../controllers/userController"));
const UserService = __importStar(require("../../services/userService"));
// Mock the UserService
jest.mock("../../services/userService");
describe("User Controller Tests", () => {
    // Test Case: Create a new user
    it("should create a new user", async () => {
        // Mock user data from the request body
        const mockUserData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            isAdmin: false,
            savedProducts: [],
        };
        // Mock the create user response from the UserService
        const mockCreatedUser = {
            _id: "mockUserId",
            ...mockUserData,
        };
        // Mock the request and response objects
        const mockRequest = {
            body: mockUserData,
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the createUser function of the UserService
        UserService.createUser.mockResolvedValueOnce(mockCreatedUser);
        // Call the createUser controller
        await UserController.createUser(mockRequest, mockResponse);
        // Expectations
        expect(UserService.createUser).toHaveBeenCalledWith(mockUserData);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedUser);
    }, 20000);
    // Test Case: Login user
    it("should login a user and return a token", async () => {
        // Mock user credentials from the request body
        const mockUserCredentials = {
            email: "test@example.com",
            password: "testpassword",
        };
        // Mock the login response from the UserService
        const mockLoginResponse = {
            user: {
                _id: "mockUserId",
                email: mockUserCredentials.email,
                username: "testuser",
                isAdmin: false,
                savedProducts: [],
            },
            token: "mocked_token",
        };
        // Mock the request and response objects
        const mockRequest = {
            body: mockUserCredentials,
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the loginUser function of the UserService
        UserService.loginUser.mockResolvedValueOnce(mockLoginResponse);
        // Call the loginUser controller
        await UserController.loginUser(mockRequest, mockResponse);
        // Expectations
        expect(UserService.loginUser).toHaveBeenCalledWith(mockUserCredentials.email, mockUserCredentials.password);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockLoginResponse);
    }, 20000);
    // Test Case: Get all users
    it("should get all users", async () => {
        // Mock the array of users from the UserService
        const mockUsers = [
            {
                _id: "mockUserId1",
                email: "user1@example.com",
                username: "user1",
                isAdmin: false,
                savedProducts: [],
            },
            {
                _id: "mockUserId2",
                email: "user2@example.com",
                username: "user2",
                isAdmin: true,
                savedProducts: [],
            },
        ];
        // Mock the request and response objects
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the getAllUsers function of the UserService
        UserService.getAllUsers.mockResolvedValueOnce(mockUsers);
        // Call the getAllUsers controller
        await UserController.getAllUsers(mockRequest, mockResponse);
        // Expectations
        expect(UserService.getAllUsers).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    }, 20000);
    // Test Case: Error fetching users
    it("should handle error when fetching users", async () => {
        // Mock the error response from the UserService
        const mockErrorResponse = {
            message: "Error fetching users",
        };
        // Mock the request and response objects
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the getAllUsers function of the UserService to throw an error
        UserService.getAllUsers.mockRejectedValueOnce(mockErrorResponse);
        // Call the getAllUsers controller
        await UserController.getAllUsers(mockRequest, mockResponse);
        // Expectations
        expect(UserService.getAllUsers).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: mockErrorResponse.message,
        });
    }, 20000);
    // Test Case: Get user by ID
    it("should get user by ID", async () => {
        // Mock the user from the UserService
        const mockUser = {
            _id: "mockUserId",
            email: "mock@example.com",
            username: "mockUser",
            isAdmin: false,
            savedProducts: [],
        };
        // Mock the request and response objects
        const mockRequest = {
            params: {
                userId: "mockUserId",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the getUserById function of the UserService
        UserService.getUserById.mockResolvedValueOnce(mockUser);
        // Call the getUserById controller
        await UserController.getUserById(mockRequest, mockResponse);
        // Expectations
        expect(UserService.getUserById).toHaveBeenCalledWith(mockRequest.params.userId);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    }, 20000);
    // Test Case: User not found
    it("should handle case where user is not found", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: {
                userId: "nonexistentUserId",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the getUserById function of the UserService to return null
        UserService.getUserById.mockResolvedValueOnce(null);
        // Call the getUserById controller
        await UserController.getUserById(mockRequest, mockResponse);
        // Expectations
        expect(UserService.getUserById).toHaveBeenCalledWith(mockRequest.params.userId);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "User not found" });
    }, 20000);
    // Test Case: Error fetching user
    it("should handle error when fetching user by ID", async () => {
        // Mock the error response from the UserService
        const mockErrorResponse = {
            message: "Error fetching user",
        };
        // Mock the request and response objects
        const mockRequest = {
            params: {
                userId: "errorUserId",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Mock the getUserById function of the UserService to throw an error
        UserService.getUserById.mockRejectedValueOnce(mockErrorResponse);
        // Call the getUserById controller
        await UserController.getUserById(mockRequest, mockResponse);
        // Expectations
        expect(UserService.getUserById).toHaveBeenCalledWith(mockRequest.params.userId);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: mockErrorResponse.message,
        });
    }, 20000);
    // Test Case: Delete user by ID
    it("should delete user by ID", async () => {
        // Mock the request and response objects
        const mockRequest = {
            params: {
                userId: "mockUserId",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        // Mock the deleteUser function of the UserService
        UserService.deleteUser.mockResolvedValueOnce(null);
        // Call the deleteUser controller
        await UserController.deleteUser(mockRequest, mockResponse);
        // Expectations
        expect(UserService.deleteUser).toHaveBeenCalledWith(mockRequest.params.userId);
        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled(); // Ensure json is not called for a 204 status
    }, 20000);
});
//# sourceMappingURL=userController.test.js.map