import { Request, Response } from "express";

import pool from "../db/connection";

const Attendance = (req: Request, res: Response) => {
  const client = pool.connect();

  const user_id = req.user_id;
  const userRole = req.role;

  const { student_id, student_name, present, attendance_date, subject_id } =
    req.body;

  if (
    !student_id ||
    !student_name ||
    !present ||
    !attendance_date ||
    !subject_id
  ) {
    return res.status(500).json({
      message: "Please fill all the input details",
    });
  }

  client
    .then(async (client) => {
      try {
        client.query("BEGIN");

        const addStudentAttendanceQuery =
          "INSERT INTO student_attendance (student_id, student_name, present, attendance_date, subject_id) VALUES ($1, $2, $3, $4, $5);";
        const addStudentAttendanceValues = [
          student_id,
          student_name,
          present,
          attendance_date,
          subject_id,
        ];

        const addStudentAttendanceResult = await client.query(
          addStudentAttendanceQuery,
          addStudentAttendanceValues
        );

        if (addStudentAttendanceResult.rowCount !== 1) {
          client.query("ROLLBACK");

          res.status(500).json({
            message: "couldn't mark attendance of this student",
          });
        }

        client.query("COMMIT");

        res.status(200).json({
          message: `updated attendance of ${student_name} - ${student_id}`,
        });
      } catch (err: any) {
        console.error(
          "Error while marking attendance of student: ",
          err.message
        );

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

export { Attendance };
