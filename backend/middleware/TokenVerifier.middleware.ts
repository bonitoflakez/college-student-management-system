import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface JwtPayload {
  id?: string;
  exp?: number;
  role?: string;
  token?: string;
}

declare global {
  namespace Express {
    interface Request {
      role?: string;
      token?: string;
      user_id?: string;
    }
  }
}

/**
 * TODO: (Feat) Add token revoke functionality
 */

export const TokenVerifier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaderToken = req.header("Authorization");

  if (!authHeaderToken || !authHeaderToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const token = authHeaderToken.substring(7);

  const verifyTokenAsync = async () => {
    try {
      const decoded = (await jwt.verify(
        token,
        process.env.SECRET_KEY as Secret
      )) as JwtPayload;

      if (!decoded.id || !decoded.role) {
        return res.status(403).json({
          message: "Faulty auth token!",
        });
      }

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({
          message: "Token expired",
        });
      }

      req.user_id = decoded.id;
      req.token = token;

      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  };

  verifyTokenAsync();
};

export default TokenVerifier;
