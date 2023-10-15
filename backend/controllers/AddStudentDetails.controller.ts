import { Request, Response } from "express";

const AddStudentDetails = (req: Request, res: Response) => {
  const user_id = req.user_id;
  const userRole = req.role;

  res.status(200).json({
    message: `Logged in as ${user_id} with ${userRole} access!`,
  });
};

export { AddStudentDetails };
