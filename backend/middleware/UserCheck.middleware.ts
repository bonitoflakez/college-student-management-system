import { NextFunction, Request, Response } from "express";

import pool from "../db/connection";

const UserCheck = (req: Request, res: Response, next: NextFunction) => {
  const client = pool.connect();

  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      message: "Invalid user data",
    });
  }

  const userSearchQuery =
    "SELECT * FROM users WHERE email = $1 OR username = $2";
  const userSearchValues = [email, username];

  client
    .then(async (client) => {
      try {
        const result = await client.query(userSearchQuery, userSearchValues);

        if (result.rows.length > 0) {
          if (result.rows[0].username === username) {
            return res.status(409).json({
              message: "Username already taken",
            });
          } else {
            return res.status(409).json({
              message: "Email already taken",
            });
          }
        }

        next();
      } catch (error: any) {
        console.error("Error while checking user: ", error);
      }
    })
    .catch((error) => {
      console.error("Error acquiring a database client:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    });
};

export default UserCheck;
