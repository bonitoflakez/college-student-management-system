import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchSubject = (req: Request, res: Response) => {
  const client = pool.connect();

  client
    .then(async (client) => {
      try {
        const getSubjectQuery = "SELECT * FROM subjects";
        const getSubjectResult = await client.query(getSubjectQuery);

        if (!getSubjectResult.rows) {
          return res.status(400).json({
            message: "couldn't fetch Subject data",
          });
        }

        return res.status(200).json({
          message: "Subject fetched successfully",
          resData: getSubjectResult.rows,
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

export { fetchSubject };
