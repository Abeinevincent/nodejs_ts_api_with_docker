"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    if (!process.env.JWT_SEC) {
        throw new Error("JWT_SEC environment variable is not defined");
    }
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SEC, {
        expiresIn: process.env.JWT_EXPIRY_PERIOD,
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = Array.isArray(authHeader)
            ? authHeader[0].split(" ")[1]
            : authHeader.split(" ")[1];
        if (!process.env.JWT_SEC) {
            throw new Error("JWT_SEC environment variable is not defined");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                // Use the res object with a status function
                res.status(403).json("Token is not valid!");
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        // Use the res object with a status function
        res.status(401).json("You are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
// Authorize account owner
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id.toString() === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
// Authorize admin
const verifyTokenAndAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
//# sourceMappingURL=jwtUtils.js.map