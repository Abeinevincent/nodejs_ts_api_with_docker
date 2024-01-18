"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../../utils/jwtUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Mock token for testing purposes
const mockTokenForNonAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdmYWVkMDg0ZTQxYzE1MmU5NzMxOCIsInVzZXJuYW1lIjoidHQiLCJlbWFpbCI6InR0QGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDU1MDc1NzQsImV4cCI6MTcwNTU5Mzk3NH0.HDX5oH2IL2WEngBmlc7LUpIusficdyHYwl_Z6rG0y1g";
// const mockTokenForAdmin = "YourMockTokenForAdmin";
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
        const req = {
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
        const res = {
            status: () => res, // Mock status function
            json: (message) => {
                // Assert the message or other expectations
                expect(req.user).toBeDefined();
                done();
            },
        };
        const next = () => {
            // Should not reach here
            done.fail("Should not reach next middleware on valid token");
        };
        (0, jwtUtils_1.verifyTokenAndAuthorization)(req, res, next);
    });
    // Test Case: Verify Token and Authorization (unauthorized)
    it("should handle unauthorized access for authorization", (done) => {
        const req = {
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
        const res = {
            status: () => res, // Mock status function
            json: (message) => {
                // Assert the message or other expectations
                expect(message).toBe("You are not allowed to do that!");
                done();
            },
        };
        const next = () => {
            // Should not reach here
            done.fail("Should not reach next middleware on unauthorized access");
        };
        (0, jwtUtils_1.verifyTokenAndAuthorization)(req, res, next);
    });
});
// Admin Access Test Cases
describe("Admin Access Tests", () => {
    // Test Case: Verify Token and Admin Access (valid token and admin)
    it("should verify a valid JWT token and admin access", (done) => {
        const req = {
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
        const res = {
            status: () => res, // Mock status function
            json: (message) => {
                // Assert the message or other expectations
                expect(req.user).toBeDefined();
                done();
            },
        };
        const next = () => {
            // Should not reach here
            done.fail("Should not reach next middleware on valid token and admin access");
        };
        (0, jwtUtils_1.verifyTokenAndAdmin)(req, res, next);
    });
    // Test Case: Verify Token and Admin Access (non-admin)
    it("should handle non-admin access for admin authorization", (done) => {
        const req = {
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
        const res = {
            status: () => res, // Mock status function
            json: (message) => {
                // Assert the message or other expectations
                expect(message).toBe("You are not allowed to do that!");
                done();
            },
        };
        const next = () => {
            // Should not reach here
            done.fail("Should not reach next middleware on non-admin access");
        };
        (0, jwtUtils_1.verifyTokenAndAdmin)(req, res, next);
    });
});
//# sourceMappingURL=jwtAuth.test.js.map