import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchGroup = (req: Request, res: Response) => {
  const client = pool.connect();

  client
    .then(async (client) => {
      try {
        const getGroupQuery = "SELECT * FROM groups";
        const getGroupResult = await client.query(getGroupQuery);

        if (!getGroupResult.rows) {
          return res.status(400).json({
            message: "couldn't fetch Group data",
          });
        }

        return res.status(200).json({
          message: "Group fetched successfully",
          resData: getGroupResult.rows,
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

export { fetchGroup };
