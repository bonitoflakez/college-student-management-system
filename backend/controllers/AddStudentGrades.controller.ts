import { Request, Response } from "express";
import pool from "../db/connection";

const AddStudentGrades = (req: Request, res: Response) => {
  const client = pool.connect();

  const user_id = req.user_id;
  const userRole = req.role;

  const { student_id, subject_name, max_grades, secured_grades } = req.body;

  client
    .then(async (client) => {
      try {
        await client.query("BEGIN");

        const addStudentGradesQuery =
          "INSERT INTO student_grades (student_id, subject_name, max_grades, secured_grades) VALUES ($1, $2, $3, $4);";
        const addStudentGradesValues = [
          student_id,
          subject_name,
          max_grades,
          secured_grades,
        ];

        const addStudentGradesResult = await client.query(
          addStudentGradesQuery,
          addStudentGradesValues
        );

        if (addStudentGradesResult.rowCount !== 1) {
          await client.query("ROLLBACK");

          return res.status(500).json({
            message: "Failed to add student grades",
          });
        }

        await client.query("COMMIT");

        return res.status(200).json({
          auth_message: `Logged in as ${user_id} with ${userRole} access!`,
          message: "Added student grades successfully",
        });
      } catch (err: any) {
        console.error("Error while adding student grades:", err.message);

        return res.status(500).json({
          message: "Internal server error",
        });
      } finally {
        client.release();
      }
    })
    .catch((error: Error) => {
      console.error("Error while acquiring a database client:", error);

      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    });
};

export { AddStudentGrades };
