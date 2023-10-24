import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchCourse = (req: Request, res: Response) => {
  const client = pool.connect();

  client
    .then(async (client) => {
      try {
        const getCourseQuery = "SELECT * FROM courses";
        const getCourseResult = await client.query(getCourseQuery);

        if (!getCourseResult.rows) {
          return res.status(400).json({
            message: "couldn't fetch course data",
          });
        }

        return res.status(200).json({
          message: "courses fetched successfully",
          resData: getCourseResult.rows,
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

export { fetchCourse };
