import { Request, Response } from "express";
import * as UserController from "../../controllers/userController";
import * as UserService from "../../services/userService";
import { IProduct } from "models/Product";
import { IUser } from "models/User";

// Mock the UserService
jest.mock("../../services/userService");

describe("User Controller Tests", () => {
  // Test Case: Create a new user
  it("should create a new user", async () => {
    // Mock user data from the request body
    const mockUserData: IUser = {
      email: "test@example.com",
      username: "testuser",
      password: "testpassword",
      isAdmin: false,
      savedProducts: [],
    } as IUser;

    // Mock the create user response from the UserService
    const mockCreatedUser = {
      _id: "mockUserId",
      ...mockUserData,
    };

    // Mock the request and response objects
    const mockRequest = {
      body: mockUserData,
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the createUser function of the UserService
    (UserService.createUser as jest.Mock).mockResolvedValueOnce(
      mockCreatedUser
    );

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

    type IMockCreatedUser = {
      user: Partial<IUser>;
      token: string;
    };
    // Mock the login response from the UserService
    const mockLoginResponse: IMockCreatedUser = {
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
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the loginUser function of the UserService
    (UserService.loginUser as jest.Mock).mockResolvedValueOnce(
      mockLoginResponse
    );

    // Call the loginUser controller
    await UserController.loginUser(mockRequest, mockResponse);

    // Expectations
    expect(UserService.loginUser).toHaveBeenCalledWith(
      mockUserCredentials.email,
      mockUserCredentials.password
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockLoginResponse);
  }, 20000);

  // Test Case: Get all users
  it("should get all users", async () => {
    // Mock the array of users from the UserService
    const mockUsers: IUser[] = [
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
    ] as IUser[];

    // Mock the request and response objects
    const mockRequest = {} as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the getAllUsers function of the UserService
    (UserService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

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
    const mockRequest = {} as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the getAllUsers function of the UserService to throw an error
    (UserService.getAllUsers as jest.Mock).mockRejectedValueOnce(
      mockErrorResponse
    );

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
    const mockUser: IUser = {
      _id: "mockUserId",
      email: "mock@example.com",
      username: "mockUser",
      isAdmin: false,
      savedProducts: [],
    } as IUser;

    // Mock the request and response objects
    const mockRequest: any = {
      params: {
        userId: "mockUserId",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the getUserById function of the UserService
    (UserService.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the getUserById controller
    await UserController.getUserById(mockRequest, mockResponse);

    // Expectations
    expect(UserService.getUserById).toHaveBeenCalledWith(
      mockRequest.params.userId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
  }, 20000);

  // Test Case: User not found
  it("should handle case where user is not found", async () => {
    // Mock the request and response objects
    const mockRequest: any = {
      params: {
        userId: "nonexistentUserId",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the getUserById function of the UserService to return null
    (UserService.getUserById as jest.Mock).mockResolvedValueOnce(null);

    // Call the getUserById controller
    await UserController.getUserById(mockRequest, mockResponse);

    // Expectations
    expect(UserService.getUserById).toHaveBeenCalledWith(
      mockRequest.params.userId
    );
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
    const mockRequest: any = {
      params: {
        userId: "errorUserId",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the getUserById function of the UserService to throw an error
    (UserService.getUserById as jest.Mock).mockRejectedValueOnce(
      mockErrorResponse
    );

    // Call the getUserById controller
    await UserController.getUserById(mockRequest, mockResponse);

    // Expectations
    expect(UserService.getUserById).toHaveBeenCalledWith(
      mockRequest.params.userId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: mockErrorResponse.message,
    });
  }, 20000);

  // Test Case: Delete user by ID
  it("should delete user by ID", async () => {
    // Mock the request and response objects
    const mockRequest: Request<
      { userId: string },
      any,
      any,
      any,
      Record<string, any>
    > = {
      params: {
        userId: "mockUserId",
      },
    } as Request<{ userId: string }, any, any, any, Record<string, any>>;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the deleteUser function of the UserService
    (UserService.deleteUser as jest.Mock).mockResolvedValueOnce(null);

    // Call the deleteUser controller
    await UserController.deleteUser(mockRequest, mockResponse);

    // Expectations
    expect(UserService.deleteUser).toHaveBeenCalledWith(
      mockRequest.params.userId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled(); // Ensure json is not called for a 204 status
  }, 20000);
});
