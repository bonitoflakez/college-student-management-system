import { Request, Response } from "express";
import { PoolClient } from "pg";

import pool from "../db/connection";

const checkCourseAndBranchExistence = async (
  client: PoolClient,
  courseName: string,
  branchName: string
) => {
  try {
    // Check if the course exists
    const courseExistsQuery =
      "SELECT course_id FROM courses WHERE course_name = $1";
    const courseExistsValues = [courseName];
    const courseExistsResult = await client.query(
      courseExistsQuery,
      courseExistsValues
    );

    if (courseExistsResult.rows.length === 0) {
      return { courseExists: false, branchExists: false };
    }

    // Check if the branch exists
    const branchExistsQuery =
      "SELECT branch_id FROM branches WHERE branch_name = $1";
    const branchExistsValues = [branchName];
    const branchExistsResult = await client.query(
      branchExistsQuery,
      branchExistsValues
    );

    if (branchExistsResult.rows.length === 0) {
      return { courseExists: true, branchExists: false };
    }

    return { courseExists: true, branchExists: true };
  } catch (error) {
    throw error;
  }
};

const GetStudentSubjectID = (course_name: string, branch_name: string) => {
  let subject_id = 0;

  if (
    course_name === "Computer Science and Engineering" &&
    branch_name === "Computer Science"
  ) {
    subject_id = 1;
  } else if (
    course_name === "Electrical Engineering" &&
    branch_name === "Electrical and Electronics"
  ) {
    subject_id = 2;
  } else if ((course_name && branch_name) === "Mechanical Engineering") {
    subject_id = 3;
  } else if ((course_name && branch_name) === "Chemistry") {
    subject_id = 4;
  }

  return subject_id;
};

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
    group_id,
    course_name,
    branch_name,
    joining_session,
  } = req.body;

  const requiredFields = [
    "student_id",
    "name",
    "phone_number",
    "guardian_name",
    "guardian_email",
    "guardian_phone_number",
    "group_id",
    "course_name",
    "branch_name",
    "joining_session",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ message: "Please enter all data fields" });
  }

  // add subject details based on branch and course name

  client
    .then(async (client) => {
      try {
        await client.query("BEGIN");

        const existenceCheck = await checkCourseAndBranchExistence(
          client,
          course_name,
          branch_name
        );

        if (!existenceCheck.courseExists) {
          return res.status(403).json({ message: "Invalid course name" });
        }

        if (!existenceCheck.branchExists) {
          return res.status(403).json({ message: "Invalid branch name" });
        }

        const addStudentDetailsQuery =
          "UPDATE student_details SET name = $1, phone_number = $2, guardian_name = $3, guardian_email = $4, guardian_phone_number = $5, group_id = $6, course_name = $7, branch_name = $8, joining_session = $9 WHERE student_id = $10";

        const addStudentDetailsValues = [
          name,
          phone_number,
          guardian_name,
          guardian_email,
          guardian_phone_number,
          group_id,
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

        const subject_id = GetStudentSubjectID(course_name, branch_name);

        if (!subject_id) {
          res.status(403).json({
            message: "something went wrong while arranging subjects",
          });
        }

        const student_subject_id_query =
          "INSERT INTO student_subjects (student_id, subject_id) VALUES ($1, $2)";
        const student_subject_id_values = [student_id, subject_id];

        const student_subject_id_result = await client.query(
          student_subject_id_query,
          student_subject_id_values
        );

        if (student_subject_id_result.rowCount !== 1) {
          await client.query("ROLLBACK");

          return res.status(403).json({
            message: "couldn't add subjects for this student",
          });
        }

        /**
         * fetch all subjects assigned to student
         * 
          ```
            SELECT
              ss.student_id,
              s.subject_id,
              s.subject_name
            FROM
              student_subjects ss
            JOIN
              subjects s ON ss.subject_id = s.course_id AND s.branch_id = (SELECT branch_id FROM student_details WHERE student_id = ss.student_id)
            ORDER BY
              s.subject_id ASC;
          ```

          ```
          SELECT
            ss.student_id,
            s.subject_id,
            s.subject_name
          FROM
            student_subjects ss
          JOIN
            subjects s ON ss.subject_id = s.course_id AND s.branch_id = (SELECT branch_id FROM student_details WHERE student_id = ss.student_id)
          WHERE
            ss.student_id = 'YourSpecificStudentID'
          ORDER BY
            s.subject_id ASC;
          ```
         */

        await client.query("COMMIT");

        return res.status(200).json({
          auth_message: `user ${user_id} with ${userRole} role added some data`,
          message: "added student details successfully",
        });
      } catch (err: any) {
        console.error("Error while adding student details:", err.message);

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
