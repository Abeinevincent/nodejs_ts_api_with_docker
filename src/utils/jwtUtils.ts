// utils/jwtUtils.ts
import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Types } from "mongoose";

// Generate jwt token
type JWTPayload = {
  id: Types.ObjectId;
  username: string;
  email: string;
  isAdmin: boolean;
};

// Custom Request type with 'user' property
interface CustomRequest extends Request {
  user: {
    id: Types.ObjectId;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

export const generateToken = (payload: JWTPayload): string => {
  if (!process.env.JWT_SEC) {
    throw new Error("JWT_SEC environment variable is not defined");
  }

  const token = jwt.sign(payload, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRY_PERIOD,
  });
  return token;
};

// Verify token
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = Array.isArray(authHeader)
      ? authHeader[0].split(" ")[1]
      : authHeader.split(" ")[1];

    if (!process.env.JWT_SEC) {
      throw new Error("JWT_SEC environment variable is not defined");
    }

    jwt.verify(
      token,
      process.env.JWT_SEC,
      (err: VerifyErrors | null, user: any) => {
        if (err) return res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      }
    );
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

// Authorize account owner
export const verifyTokenAndAuthorization = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  verifyToken(req, res, () => {
    if (req.user.id.toString() === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

// Authorize admin
export const verifyTokenAndAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};
