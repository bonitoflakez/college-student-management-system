import { Request, Response } from "express";

import pool from "../db/connection";

const AddFacultyDetails = (req: Request, res: Response) => {
  const client = pool.connect();

  const user_id = req.user_id;
  const userRole = req.role;

  const {
    faculty_id,
    name,
    phone_number,
    subrole_id,
    group_id,
    course_name,
    branch_name,
    joining_session,
  } = req.body;

  const requiredFields = [
    "faculty_id",
    "name",
    "phone_number",
    "subrole_id",
    "group_id",
    "course_name",
    "branch_name",
    "joining_session",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ message: "Please enter all data fields" });
  }

  client
    .then(async (client) => {
      try {
        const addFacultyDetailsQuery =
          "UPDATE faculty_details SET name = $1, phone_number = $2, subrole_id = $3, group_id = $4, course_name = $5, branch_name = $6, joining_session = $7 WHERE faculty_id = $8";

        const addFacultyDetailsValues = [
          name,
          phone_number,
          subrole_id,
          group_id,
          course_name,
          branch_name,
          joining_session,
          faculty_id,
        ];

        const addFacultyDetailsResult = await client.query(
          addFacultyDetailsQuery,
          addFacultyDetailsValues
        );

        if (addFacultyDetailsResult.rowCount !== 1) {
          await client.query("ROLLBACK");

          return res.status(403).json({
            message: "couldn't update faculty details",
          });
        }

        await client.query("COMMIT");

        // faculty details
        return res.status(200).json({
          auth_message: `Logged in as ${user_id} with ${userRole} access!`,
          message: "added faculty details successfully",
        });
      } catch (err: any) {
        console.error("Error while adding faculty details:", err.message);

        return res.status(500).json({
          message: "Internal server error",
        });
      } finally {
        client.release();
      }
    })
    .catch((error) => {
      console.error("Error while acquiring a database client:", error);

      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    });
};

export { AddFacultyDetails };
