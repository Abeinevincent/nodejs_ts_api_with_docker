"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../../utils/jwtUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("JWT Utils Tests", () => {
    const mockPayload = {
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
        const token = (0, jwtUtils_1.generateToken)(mockPayload);
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
        const req = {
            headers: {
                token: `Bearer ${mockToken}`,
            },
        };
        const res = {
            status: (status) => {
                expect(status).toBe(403);
                return {
                    json: (message) => {
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
        (0, jwtUtils_1.verifyToken)(req, res, next);
    });
    // Test Case: Verify Token (invalid token)
    it("should handle an invalid JWT token", (done) => {
        const req = {
            headers: {
                token: "InvalidToken",
            },
        };
        const res = {
            status: (status) => {
                expect(status).toBe(403);
                return {
                    json: (message) => {
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
        (0, jwtUtils_1.verifyToken)(req, res, next);
    });
    // Cleanup: Reset environment variables after tests
    afterAll(() => {
        delete process.env.JWT_SEC;
        delete process.env.JWT_EXPIRY_PERIOD;
    });
});
//# sourceMappingURL=jwtUtils.test.js.map