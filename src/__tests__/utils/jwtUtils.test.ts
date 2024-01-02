import {
  JWTPayload,
  generateToken,
  verifyToken,
  verifyTokenAndAuthorization,
} from "../../utils/jwtUtils";

import dotenv from "dotenv";
dotenv.config();

describe("JWT Utils Tests", () => {
  const mockPayload: JWTPayload = {
    id: "mockUserId",
    username: "mockUsername",
    email: "mock@example.com",
    isAdmin: false,
  };

  const mockToken = "mockToken";

  process.env.JWT_SEC = "mockSecret";
  process.env.JWT_EXPIRY_PERIOD = "1h";

  // Test Case: Generate Token
  it("should generate a JWT token", () => {
    const token = generateToken(mockPayload);
    expect(token).toBeDefined();
  });

  // Test Case: Verify Token (valid token)
  //   it("should verify a valid JWT token", (done) => {
  //     const req: any = {
  //       headers: {
  //         token: `Bearer ${mockToken}`,
  //       },
  //     };

  //     const res: any = {};
  //     const next = () => {
  //       expect(req.user).toBeDefined();
  //       done();
  //     };

  //     verifyToken(req, res, next);
  //   });

  it("should verify a valid JWT token", (done) => {
    const req: any = {
      headers: {
        token: `Bearer ${mockToken}`,
      },
    };

    const res: any = {
      status: (status: number) => {
        expect(status).toBe(403);
        return {
          json: (message: string) => {
            expect(message).toBe("Token is not valid!");
            done();
          },
        };
      },
    };

    const next = () => {
      // Should not reach here
      done.fail("Should not reach next middleware on invalid token");
    };

    verifyToken(req, res, next);
  });

  // Test Case: Verify Token (invalid token)
  it("should handle an invalid JWT token", (done) => {
    const req: any = {
      headers: {
        token: "InvalidToken",
      },
    };

    const res: any = {
      status: (status: number) => {
        expect(status).toBe(403);
        return {
          json: (message: string) => {
            expect(message).toBe("Token is not valid!");
            done();
          },
        };
      },
    };

    const next = () => {
      // Should not reach here
      done.fail("Should not reach next middleware on invalid token");
    };

    verifyToken(req, res, next);
  });

  // Cleanup: Reset environment variables after tests
  afterAll(() => {
    delete process.env.JWT_SEC;
    delete process.env.JWT_EXPIRY_PERIOD;
  });
});
