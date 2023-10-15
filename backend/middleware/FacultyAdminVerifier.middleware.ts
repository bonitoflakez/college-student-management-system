import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const FacultyAdminVerifier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.token as string;
  const user_id = req.user_id;

  try {
    // Decode the token to extract user information
    const decoded = jwt.decode(token) as { role?: string } | null;

    if (!decoded || !decoded.role) {
      return res.status(403).json({
        message: "Invalid or missing user role in the token",
      });
    }

    const userRole = decoded.role;

    if (userRole === "admin" || userRole === "faculty") {
      req.user_id = user_id;
      req.role = userRole;

      next();
    } else {
      res.status(403).json({
        message: "Access denied",
      });
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(403).json({
      message: "Error decoding token",
    });
  }
};

export { FacultyAdminVerifier };
