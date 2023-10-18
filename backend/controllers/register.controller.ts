import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import { GenerateUniversityUserID } from "../helpers/userIdGenerater.helper";

import pool from "../db/connection";

/*
// TODO: Add login function
// TODO: Add user validation (check if user already exists)
*/

const AddUser = (req: Request, res: Response) => {
  const client = pool.connect();

  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      message: "Invalid user data",
    });
  }

  // check if an admin already exists
  const searchAdminQuery = "SELECT * FROM users WHERE role_id = 1";

  client
    .then(async (client) => {
      try {
        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a user ID based on the user's role
        const userID = GenerateUniversityUserID(role);

        const addUserQuery =
          "INSERT INTO users (user_id, username, password, email, role_id) VALUES ($1, $2, $3, $4, (SELECT role_id FROM roles WHERE role_name = $5));";

        const addUserValues = [userID, username, hashedPassword, email, role];

        const addInitialStudentDetailsQuery =
          "INSERT INTO student_details (email, student_id) VALUES ($1, $2)";
        const addInitialStudentDetailsValues = [email, userID];

        const addInitialFacultyDetailsQuery =
          "INSERT INTO faculty_details (email, faculty_id) VALUES ($1, $2)";
        const addInitialFacultyDetailsValues = [email, userID];

        if (role === ("Admin" || "admin")) {
          const searchAdminResult = await client.query(searchAdminQuery);

          if (searchAdminResult.rowCount > 0) {
            return res.status(403).json({
              message: "admin user already exists",
            });
          }
        }

        const result = await client.query(addUserQuery, addUserValues);

        if (result.rowCount !== 1) {
          await client.query("ROLLBACK");

          return res.status(401).json({
            status: "Couldn't register user",
            message: "There was some issue while registering user",
          });
        }

        // add initial student data
        if (role === ("Student" || "student")) {
          const addInitialStudentDetailsResult = await client.query(
            addInitialStudentDetailsQuery,
            addInitialStudentDetailsValues
          );

          if (addInitialStudentDetailsResult.rowCount !== 1) {
            await client.query("ROLLBACK");
          }
        }

        if (role === ("Faculty" || "faculty")) {
          const addInitialFacultyDetailsResult = await client.query(
            addInitialFacultyDetailsQuery,
            addInitialFacultyDetailsValues
          );

          if (addInitialFacultyDetailsResult.rowCount !== 1) {
            await client.query("ROLLBACK");
          }
        }

        await client.query("COMMIT");

        // TODO: add initial faculty data

        return res.status(201).send({
          status: "user registered",
          message: {
            user_id: userID,
            username: username,
            email: email,
            role: role,
          },
        });
      } catch (err: any) {
        console.error("Error while adding user:", err.message);
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
