import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../../utils/jwtUtils";
import dotenv from "dotenv";
dotenv.config();

// Mock token for testing purposes
const mockTokenForNonAdmin = "YourMockTokenForNonAdmin";

const mockTokenForAdmin = "YourMockTokenForAdmin";
// You can also simulate an actual login process,
// extract the token and store it in a variable like this:

// const adminCredentials = {
//   email: "admin@example.com",
//   password: "adminpassword",
// };

// Assuming you have a function to generate an authentication token
// const getAuthToken = async () => {
//   const response = await supertest(test_server)
//     .post("/api/v1/users/login")
//     .send(adminCredentials);
//   return response.body.token;
// };

// Get the admin authentication token (inside an async function or code block)
// const authToken = await getAuthToken();

// Authorization Test Cases
describe("Authorization Tests", () => {
  // Test Case: Verify Token and Authorization (valid token and authorization)
  it("should verify a valid JWT token and authorization", (done) => {
    const req: any = {
      headers: {
        token: `Bearer ${mockTokenForNonAdmin}`,
      },
      user: {
        id: "mockUserId",
        isAdmin: false,
      },
      params: {
        id: "mockUserId",
      },
    };

    const res: any = {
      status: () => res, // Mock status function
      json: (message: string) => {
        // Assert the message or other expectations
        expect(req.user).toBeDefined();
        done();
      },
    };

    const next = () => {
      // Should not reach here
      done.fail("Should not reach next middleware on valid token");
    };

    verifyTokenAndAuthorization(req, res, next);
  });

  // Test Case: Verify Token and Authorization (unauthorized)
  it("should handle unauthorized access for authorization", (done) => {
    const req: any = {
      headers: {
        token: `Bearer ${mockTokenForNonAdmin}`,
      },
      user: {
        id: "otherUserId",
        isAdmin: false,
      },
      params: {
        id: "mockUserId",
      },
    };

    const res: any = {
      status: () => res, // Mock status function
      json: (message: string) => {
        // Assert the message or other expectations
        expect(message).toBe("You are not allowed to do that!");
        done();
      },
    };

    const next = () => {
      // Should not reach here
      done.fail("Should not reach next middleware on unauthorized access");
    };

    verifyTokenAndAuthorization(req, res, next);
  });
});

// Admin Access Test Cases
describe("Admin Access Tests", () => {
  // Test Case: Verify Token and Admin Access (valid token and admin)
  it("should verify a valid JWT token and admin access", (done) => {
    const req: any = {
      headers: {
        token: `Bearer ${mockTokenForNonAdmin}`,
      },
      user: {
        id: "mockUserId",
        isAdmin: true,
      },
      params: {
        id: "mockUserId",
      },
    };

    const res: any = {
      status: () => res, // Mock status function
      json: (message: string) => {
        // Assert the message or other expectations
        expect(req.user).toBeDefined();
        done();
      },
    };

    const next = () => {
      // Should not reach here
      done.fail(
        "Should not reach next middleware on valid token and admin access"
      );
    };

    verifyTokenAndAdmin(req, res, next);
  });

  // Test Case: Verify Token and Admin Access (non-admin)
  it("should handle non-admin access for admin authorization", (done) => {
    const req: any = {
      headers: {
        token: `Bearer ${mockTokenForNonAdmin}`,
      },
      user: {
        id: "mockUserId",
        isAdmin: false,
      },
      params: {
        id: "mockUserId",
      },
    };

    const res: any = {
      status: () => res, // Mock status function
      json: (message: string) => {
        // Assert the message or other expectations
        expect(message).toBe("You are not allowed to do that!");
        done();
      },
    };

    const next = () => {
      // Should not reach here
      done.fail("Should not reach next middleware on non-admin access");
    };

    verifyTokenAndAdmin(req, res, next);
  });
});
