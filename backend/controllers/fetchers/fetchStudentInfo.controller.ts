import { Request, Response } from "express";
import { PoolClient } from "pg";

import pool from "../../db/connection";

const fetchStudentInfo = (req: Request, res: Response) => {
  const client = pool.connect();

  const student_id = req.user_id;
  const userRole = req.role;

  if (!student_id || !userRole) {
    return res.status(400).json({
      message: "Invalid student id",
    });
  }

  client.then(async (client) => {
    try {
      const studentDataQuery =
        "SELECT * FROM student_details WHERE student_id = $1";
      const studentDataValues = [student_id];

      const studentDataResult = await client.query(
        studentDataQuery,
        studentDataValues
      );

      // if branch & course -> fetch subjects related to that course

      return res.status(200).json({
        message: `Fetched data for user ${student_id}`,
        resData: studentDataResult.rows,
      });
    } catch (error: any) {
      console.error("Error while fetching user data: ", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};

const SearchStudent = (req: Request, res: Response) => {
  const client = pool.connect();

  const student_id = req.body.student_id;
  const userRole = req.role;

  if (!student_id || !userRole) {
    return res.status(400).json({
      message: "Invalid student id",
    });
  }

  client.then(async (client) => {
    try {
      const studentDataQuery =
        "SELECT * FROM student_details WHERE student_id = $1";
      const studentDataValues = [student_id];

      const studentDataResult = await client.query(
        studentDataQuery,
        studentDataValues
      );

      // if branch & course -> fetch subjects related to that course

      return res.status(200).json({
        message: `Fetched data for user ${student_id}`,
        resData: studentDataResult.rows,
      });
    } catch (error: any) {
      console.error("Error while fetching user data: ", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};

export { fetchStudentInfo, SearchStudent };
