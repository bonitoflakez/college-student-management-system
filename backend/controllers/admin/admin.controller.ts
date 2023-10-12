import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import pool from "../../db/connection";

/*
TODO: Add login function
TODO: Add user validation (check if user already exists)
*/

// generate a userID based on user's role
const generateUniversityUserID = (role: string) => {
  var roleSuffix;

  if (role === "admin" || role === "Admin") {
    roleSuffix = "AD";
  } else if (role === "faculty" || role === "Faculty") {
    roleSuffix = "FC";
  } else if (role === "student" || role === "Student") {
    roleSuffix = "ST";
  } else {
    roleSuffix = null;
  }

  const numericPart = Math.floor(Math.random() * 9900000) + 100000;

  const userID = `${numericPart}${roleSuffix}`;

  return userID;
};

const AddUser = (req: Request, res: Response) => {
  const client = pool.connect();

  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      message: "Invalid user data",
    });
  }

  client
    .then(async (client) => {
      try {
        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a user ID based on the user's role
        const userID = generateUniversityUserID(role);

        const addUserQuery =
          "INSERT INTO users (user_id, username, password, email, role_id) VALUES ($1, $2, $3, $4, (SELECT role_id FROM roles WHERE role_name = $5));";

        const addUserValues = [userID, username, hashedPassword, email, role];

        const result = await client.query(addUserQuery, addUserValues);

        if (result.rowCount === 1) {
          await client.query("COMMIT");

          return res.status(201).send({
            status: "user registered",
            message: {
              username: username,
              email: email,
              role: role,
            },
          });
        } else {
          await client.query("ROLLBACK");

          return res.status(401).json({
            status: "Couldn't register user",
            message: "There was some issue while registering user",
          });
        }
      } catch (error: any) {
        console.error("Error while adding user:", error.message);
        await client.query("ROLLBACK");
        return res.status(500).json({
          message: "Internal server error",
        });
      } finally {
        client.release();
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

export { AddUser };
