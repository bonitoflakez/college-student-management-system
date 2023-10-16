import { Request, Response } from "express";

import pool from "../db/connection";

const AddStudentDetails = (req: Request, res: Response) => {
  const client = pool.connect();

  const user_id = req.user_id;
  const userRole = req.role;

  const {
    student_id,
    name,
    phone_number,
    guardian_name,
    guardian_email,
    guardian_phone_number,
    course_name,
    branch_name,
    joining_session,
  } = req.body;

  client
    .then(async (client) => {
      try {
        await client.query("BEGIN");

        const addStudentDetailsQuery =
          "UPDATE student_details SET name = $1, phone_number = $2, guardian_name = $3, guardian_email = $4, guardian_phone_number = $5, course_name = $6, branch_name = $7, joining_session = $8 WHERE student_id = $9";

        const addStudentDetailsValues = [
          name,
          phone_number,
          guardian_name,
          guardian_email,
          guardian_phone_number,
          course_name,
          branch_name,
          joining_session,
          student_id,
        ];

        const addStudentDetailsResult = await client.query(
          addStudentDetailsQuery,
          addStudentDetailsValues
        );

        if (addStudentDetailsResult.rowCount !== 1) {
          await client.query("ROLLBACK");

          return res.status(403).json({
            message: "couldn't update student details",
          });
        }

        await client.query("COMMIT");

        return res.status(200).json({
          auth_message: `Logged in as ${user_id} with ${userRole} access!`,
          message: "added student details successfully",
        });
      } catch (err: any) {
        console.error("Error while adding student details:", err.message);
        await client.query("ROLLBACK");
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

export { AddStudentDetails };
