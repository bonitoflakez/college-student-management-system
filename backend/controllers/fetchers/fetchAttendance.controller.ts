import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchAttendance = (req: Request, res: Response) => {
  const client = pool.connect();

  const student_id = req.body.student_id;

  client
    .then(async (client) => {
      try {
        const getAttendanceQuery =
          "SELECT * FROM student_attendance WHERE student_id = $1";
        const getAttendanceValues = [student_id];
        const getAttendanceResult = await client.query(
          getAttendanceQuery,
          getAttendanceValues
        );

        if (!getAttendanceResult.rows) {
          return res.status(400).json({
            message: "couldn't fetch attendance data",
          });
        }

        return res.status(200).json({
          message: "Attendance fetched successfully",
          resData: getAttendanceResult.rows,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    })
    .catch((error) => {
      console.error("Error while acquiring a database: ", error.message);

      return res.status(500).json({
        message: "Internal server error",
      });
    });
};

export { fetchAttendance };
