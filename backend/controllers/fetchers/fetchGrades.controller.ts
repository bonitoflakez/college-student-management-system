import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchGrades = (req: Request, res: Response) => {
  const client = pool.connect();

  const student_id = req.body.student_id;

  if (!student_id) {
    return res.status(403).json({
      message: "Please fill in all the details",
    });
  }

  client.then(async (client) => {
    try {
      const getStudentGradesQuery =
        "SELECT * FROM student_grades WHERE student_id = $1";
      const getStudentGradesValues = [student_id];

      const getStudentGradesResult = await client.query(
        getStudentGradesQuery,
        getStudentGradesValues
      );

      if (!getStudentGradesResult.rowCount) {
        return res.status(400).json({
          message: "No data found for this user",
        });
      }

      return res.status(200).json({
        message: "Grades fetched",
        resData: getStudentGradesResult.rows,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};

export { fetchGrades };
