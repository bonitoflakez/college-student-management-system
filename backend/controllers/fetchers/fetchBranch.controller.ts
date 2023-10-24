import { Request, Response } from "express";
import pool from "../../db/connection";

const fetchBranch = (req: Request, res: Response) => {
  const client = pool.connect();

  client
    .then(async (client) => {
      try {
        const getBranchQuery = "SELECT * FROM branches";
        const getBranchResult = await client.query(getBranchQuery);

        if (!getBranchResult.rows) {
          return res.status(400).json({
            message: "couldn't fetch branch data",
          });
        }

        return res.status(200).json({
          message: "branch fetched successfully",
          resData: getBranchResult.rows,
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

export { fetchBranch };
